<template>
  <v-app>
    <v-alert type="accent" :value="true" >
      {{title}}
    </v-alert>
    <v-toolbar color="accent">

    </v-toolbar>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      title: "Vuetify.js"
    };
  },
  methods: {
    LoadPage(data) {
      //console.log(data[0]);
      this.$router.push(data[0]);
      //console.log(this.$router);
    }
  }
};
</script>
