<template>
  <v-card
    color="red lighten-2"
    dark
  >
    <v-card-title class="headline red lighten-3">
      Search for Public APIs
    </v-card-title>
    <v-card-text>
      Explore hundreds of free API's ready for consumption! For more information visit
      <a
        class="grey--text text--lighten-3"
        href="https://github.com/toddmotto/public-apis"
        target="_blank"
      >the Github repository</a>.
    </v-card-text>
    <v-card-text>
      <v-autocomplete
        v-model="model"
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
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="model" class="red lighten-3">
        <v-list-item
          v-for="(field, i) in fields"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="field.value"></v-list-item-title>
            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!model"
        color="grey darken-3"
        @click="model = null"
      >
        Clear
        <v-icon right>mdi-close-circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
        title: "BRT Systems",
        autoMheads: [],
        items: [],
        headers: [
        { text: 'HeadID', align: 'left', sortable: true, value: 'MHead' },
        { text: 'MHead', value: 'MHead' },
        { text: 'HeadID', value: 'HeadID' }]
    }
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
          vm.items = response.data.value;
          vm.loading = false;
        })
        .catch(function(error) {
          // eslint-disable-next-line
          Console.log(error);
          vm.alertType = "error";
          vm.Status = error;
        });
      }
    }
};
</script>