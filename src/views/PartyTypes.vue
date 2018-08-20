<template>
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
      <v-text-field v-model="PartyTypeID" :disabled="!isEditing" color="white" label="PartyType ID"></v-text-field>
      <v-text-field v-model="PartyType" :disabled="!isEditing" color="white" label="PartyType"></v-text-field>
      <v-autocomplete v-model="PartyCategID" :disabled="!isEditing" :items="Categories" :filter="customFilter" color="white" item-text="name" label="Party Catgory"></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!isEditing" color="success" @click="save">Save</v-btn>
    </v-card-actions>
    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>Your profile has been updated</v-snackbar>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        PartyTypeID: null,
        PartyType: '',
        PartyCategID: null,

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
        console.log(queryText);
        console.log(itemText);

        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      save () {
        this.isEditing = !this.isEditing
        this.hasSaved = true
      }
    }
  }
</script>