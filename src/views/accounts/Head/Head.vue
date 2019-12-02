<template>
  <div>
    <div>{{ Status }}</div>
    <v-chip label color="deep-purple" text-color="primary">
      <v-icon left>delete</v-icon> {{searchID}}
    </v-chip>
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
      label="Public APIs"
      placeholder="Start typing to Search"
      prepend-icon="mdi-database-search"
      
    ></v-autocomplete>
    <v-btn color="info" @click="GetDetails()">Search</v-btn>
    <v-spacer></v-spacer>
    <!-- List -->
    <v-data-table :headers="headers" :items="mainList" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.HeadID }}</td>
        <td class="text-xs-centre">{{ props.item.Head }}</td>
        <td class="text-xs-centre">{{ props.item.MHeadID }}</td>
        <td class="justify-center layout px-0">
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
      isLoading: '',
      mainList: '',
      Status: '',
      url: '',
      urlDet: '',
      searchID: 0,
      title: "BRT Systems",
      autoMheads: [],
      items: [],
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
          vm.items = response.data.value
          vm.isLoading = false
        })
        .catch(function(error) {
          // eslint-disable-next-line
          Console.log(error);
          vm.alertType = "error";
          vm.Status = error;
        });
    },
    GetDetails(){
      var vm = this;
      this.urlDet = this.$store.state.url + "tbl_Head?$filter=MHeadID eq " + this.searchID
      axios.get(this.urlDet)
      .then(function(response){
        vm.Status = response.data.value
        vm.mainList = response.data.value
      })
      .catch(function(response){
        vm.Status = response;
      })
    }

  }
};
</script>