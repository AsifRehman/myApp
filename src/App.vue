<template>
  <v-app>
    <v-alert :value="true" >
      {{title}}
    </v-alert>
    <v-toolbar  dense flat dark >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/partycategs">Party Categories</v-btn>
        <v-btn flat to="/partytypes">Party Types</v-btn>
        <v-btn flat to="/cr">Cash Receipt</v-btn>
        <v-btn flat to="/cp">Cash Payment</v-btn>
        <v-btn flat to="/jv">General Journal</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-fade-transition mode="out-in">
      <router-view></router-view>
    </v-fade-transition>
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
