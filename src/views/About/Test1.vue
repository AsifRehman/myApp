<template>
  <div>
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-btn color="success" @click="showDialog">Show Dialog 1</v-btn>
      <v-btn color="success" @click="showDialog2">Show Dialog 2</v-btn>

      <v-dialog
        v-model="dialog2"
        scrollable
        persistent
        :overlay="true"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-btn color="success" @click="showDialog2">Button 1</v-btn>
      </v-dialog>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
      item-key="name"
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.key }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>text</v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialog2: false
    };
  },
  methods: {
    showDialog() {
      this.dialog = !this.dialog;
    },
    showDialog2() {
      this.dialog2 = !this.dialog2;
    }
  }
};
</script>