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
    <v-btn color="info" @click="showDialog">Dialog</v-btn>
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