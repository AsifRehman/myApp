<template>
  <div class="about">
    <v-alert :type="alertType">{{ Status }}</v-alert>
    <v-btn color="success" @click="dialog=true">New Item</v-btn>
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>New Item</v-card-title>

        <v-card-text>
          <!-- New Entry -->
          <v-text-field
            v-model="editedItem.MHeadID"
            ref="MHeadID"
            label="MHead ID"
            @keyup.enter="this.$refs.MHead.focus()"
          ></v-text-field>
          <v-text-field v-model="editedItem.MHead" ref="MHead" label="MHead"></v-text-field>
          <!-- End New Entry -->
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="Add">Post</v-btn>
          <v-btn color="info" @click="dialog=false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- List -->
    <v-data-table :headers="headers" :items="mainList" hide-actions class="elevation-1" dense>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.MHeadID }}</td>
        <td class="text-xs-centre">{{ props.item.MHead }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="Delete(props.item)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <!-- End List -->

    <div v-show="loading">Loading...</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      editedIndex: -1,
      dialog: false,
      url: "",
      alertType: "success",
      mainList: [],
      loading: true,
      headers: [
        {
          text: "MHeadID",
          align: "left",
          sortable: true,
          value: "MHeadID"
        },
        { text: "MHead", value: "MHead" }
      ],
      editedItem: {
        MHeadID: "",
        MHead: ""
      },
      Status: ""
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.url = this.$store.state.url + "tbl_MHead";
      var vm = this;
      axios
        .get(this.url)
        .then(function(response) {
          vm.mainList = response.data.value;
          vm.loading = false;
        })
        .catch(function(error) {
          // eslint-disable-next-line
          Console.log(error);
          vm.alertType = "error";
          vm.Status = error;
        });
    },
    editItem(item) {
      this.editedIndex = this.mainList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    Reset() {
      this.editedItem.MHeadID = null;
      this.editedItem.MHead = "";
    },
    ShowForm() {
      this.dialog = true;
    },
    Add() {
      //debugger
      var vm = this;
      var item = { ...this.editedItem };
      if (this.editedIndex < 0) {
        this.Reset();
        vm.$refs.MHeadID.focus();

        axios.post(this.url, item).then(function(response) {
          vm.Status = response.config.data;
          vm.mainList.push(JSON.parse(response.config.data));
        });
      }
      else {
        Object.assign(this.mainList[this.editedIndex], this.editedItem)
        axios.put(this.url + "(" + item.MHeadID + ")", this.editedItem).then(function(response) {
          vm.Status = response.config.data;
          //vm.mainList.push(JSON.parse(response.config.data));
        });
        // this.editedIndex = this.mainList.indexOf(item)
        // this.mainList = Object.assign({}, item)
         this.dialog = false
      }
    },
    Delete(item) {
      //debugger
      var vm = this;
      const index = vm.mainList.indexOf(item);
      this.mainList.splice(index, 1);
      axios
        .delete(this.url + "(" + item.MHeadID + ")")
        .then(function(response) {
          vm.Status = response;
        })
        .catch(function(response) {
          vm.Status = response;
          vm.mainList.push(item);
        });
    }
  }
};
</script>