<template>
  <div>
    <v-autocomplete
      v-model="searchID"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      color="white"
      hide-no-data
      hide-selected
      item-text="MHead"
      item-value="MHeadID"
      label="Select 1st Level"
      placeholder="Start typing to Search"
      prepend-icon="mdi-database-search"
    ></v-autocomplete>
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

    <v-btn color="info" @click="GetDetails()">Search</v-btn>
    <v-spacer></v-spacer>
    <!-- List -->
    <v-data-table :headers="headers" :items="mainList" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.HeadID }}</td>
        <td class="text-xs-centre">{{ props.item.Head }}</td>
        <td class="text-xs-centre">{{ props.item.MHeadID }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="Delete(props.item)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <!-- End List -->
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
      isLoading: "",
      mainList: [],
      Status: "",
      urlDet: "",
      searchID: 0,
      title: "BRT Systems",
      autoMheads: [],
      items: [],
      editedItem: {
        MHeadID: "",
        HeadID: "",
        Head: ""
      },
      headers: [
        { text: "HeadID", align: "left", value: "HeadID" },
        { text: "Head", value: "Head" },
        { text: "MHeadID", value: "MHeadID" }
      ]
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
          vm.items = response.data.value;
          vm.isLoading = false;
        })
        .catch(function(error) {
          // eslint-disable-next-line
          Console.log(error);
          vm.alertType = "error";
          vm.Status = error;
        });
    },
    GetDetails() {
      var vm = this;
      this.urlDet =
        this.$store.state.url + "tbl_Head?$filter=MHeadID eq " + this.searchID;
      axios
        .get(this.urlDet)
        .then(function(response) {
          vm.Status = response.data.value;
          vm.mainList = response.data.value;
        })
        .catch(function(response) {
          vm.Status = response;
        });
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
      } else {
        Object.assign(this.mainList[this.editedIndex], this.editedItem);
        axios
          .put(this.url + "(" + item.MHeadID + ")", this.editedItem)
          .then(function(response) {
            vm.Status = response.config.data;
            //vm.mainList.push(JSON.parse(response.config.data));
          });
        // this.editedIndex = this.mainList.indexOf(item)
        // this.mainList = Object.assign({}, item)
        this.dialog = false;
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