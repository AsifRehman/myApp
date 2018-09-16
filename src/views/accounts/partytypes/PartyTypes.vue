<template>
  <div>
    <v-btn color="success" @click="get">Get</v-btn>

    <v-card class="hide-overflow" color="purple lighten-1" dark>
      <v-toolbar card color="purple">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">Party Types</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="purple darken-3" fab small @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field v-model="masterEntry.PartyTypeID" :disabled="!isEditing" color="white" label="PartyType ID"></v-text-field>
        <v-text-field v-model="masterEntry.PartyType" :disabled="!isEditing" color="white" label="PartyType"></v-text-field>
        <v-autocomplete v-model="masterEntry.PartyCategID" :disabled="!isEditing" :items="Categories" :filter="customFilter" color="white" item-text="name" label="Party Catgory"></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">Save</v-btn>
      </v-card-actions>
      <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>Your profile has been updated</v-snackbar>
    </v-card>
    <v-data-table :headers="headers" :items="master" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.PartyType }}</td>
        <td class="text-xs-centre">{{ props.item.UPartyType }}</td>
        <td class="text-xs-centre">{{ props.item.PartyCategID }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data () {
      return {
        headers: [
          {
            text: 'PartyTypeID',
            align: 'left',
            value: 'name'
          },
          { text: 'PartyType', value: 'partytype' },
          { text: 'UPartyType', value: 'Upartytype' },
          { text: 'PartyCategID', value: 'PartyCategID' }
        ],
        master:[],
        masterEntry: { PartyTypeID: null, PartyType: '', PartyCategID: null },
        url: this.$store.state.url,
        localUrl: this.$store.state.url + 'tbl_PartyType',
        hasSaved: false,
        isEditing: true,
        model: null,
        Categories: [
          { name: 'Assetts', abbr: 'AS', id: 1 },
          { name: 'Libilities', abbr: 'Li', id: 2 },
          { name: 'Revenues', abbr: 'Re', id: 3 },
          { name: 'Expenses', abbr: 'Ex', id: 4 },
          { name: 'PL', abbr: 'PL', id: 5 }
        ]
      }
    },

    methods: {
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      save () {
        this.isEditing = !this.isEditing
        console.log(this.master);
        axios.post(this.localUrl , this.masterEntry)
        .then(function(response){
          console.log(response);
        })
        .catch(function (error){
          //console.log(error);
        });
        this.hasSaved = true
      },
      mounted() {
        this.get();
        console.log('xyz');
      },
      get () {
        console.log('get');
        var vm = this;
        axios.get(this.localUrl , {"content-type" : "application/json"})
        .then(function(response){
          vm.master = response.data.value;
          console.log(response.data.value);
        })
        .catch(function(error){
          console.log(error);
        });
      }
    }
  }
</script>