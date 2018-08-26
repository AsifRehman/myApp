<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Party Categories</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-btn color="success" dark class="mb-2" @click="post">Save</v-btn>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.id" label="PartyCateg ID"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.PartyCateg" label="PartyCateg"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="mainList" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-centre">{{ props.item.PartyCateg }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from 'axios';

  export default {
    data: () => ({
      dialog: false,
      url: 'http://localhost/odata/tbl_PartyCateg/',
      headers: [
        {
          text: 'PartyCategID',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        { text: 'PartyCateg', value: 'PartyCateg' }
      ],
      mainList: [],
      editedIndex: -1,
      editedItem: {
        PartyCateg: ''
      },
      defaultItem: {
        PartyCateg: '',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        var vm = this;
        axios.get( this.url, { "content-type": "application/json"})
        .then(function(response){
            vm.mainList = response.data.value;
        })
        .catch(function(error){
            console.log(error);
        })
      },
      post () {
        var vm = this;
        axios.post( this.url, mainList)
        .then(function(response){
            vm.mainList = response.data.value;
        })
        .catch(function(error){
            console.log(error);
        })
      },
      editItem (item) {
        this.editedIndex = this.mainList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.mainList.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.mainList.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.mainList[this.editedIndex], this.editedItem)
        } else {
          this.mainList.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>