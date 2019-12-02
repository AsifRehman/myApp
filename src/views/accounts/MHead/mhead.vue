<template>
  <div class="about">
    <v-alert :type="alertType">
      {{ Status }}
    </v-alert>

    <!-- New Entry -->
    <v-text-field v-model="editedItem.MHeadID" ref="MHeadID" label="MHead ID" @keyup.enter="this.$refs.MHead.focus()"></v-text-field>
    <v-text-field v-model="editedItem.MHead" ref="MHead" label="MHead"></v-text-field>
    <v-btn color="success" @click="Add">Post</v-btn>
    <h1>cash payment</h1>
    <!-- End New Entry -->

    <!-- List -->
    <v-data-table :headers="headers" :items="mainList" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.MHeadID }}</td>
        <td class="text-xs-centre">{{ props.item.MHead }}</td>
        <td class="justify-center layout px-0">
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
      url: "",
      alertType: 'success',
      mainList: [],
      loading: true,
      headers: [
        {
          text: 'MHeadID',
          align: 'left',
          sortable: true,
          value: 'MHeadID'
        },
        { text: 'MHead', value: 'MHead' }],
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
        .get(this.url, { "content-type": "application/json" })
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
    Reset() {
      this.editedItem.MHeadID = null;
      this.editedItem.MHead = "";
    },
    Add() {
      //debugger
      var vm = this;
      var item = { ...this.editedItem}
      this.Reset();
      vm.$refs.MHeadID.focus();

      axios.post(this.url, item).then(function(response) {
        vm.Status = response.config.data;
        vm.mainList.push(JSON.parse(response.config.data));
      });
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