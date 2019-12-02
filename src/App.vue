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
        <v-btn flat to="/mhead">1st Level</v-btn>
        <v-btn flat to="/head">2nd Level</v-btn>
        <v-btn flat to="/partycategs">3rd Level</v-btn>
        <v-btn flat to="/partytypes">4th Level</v-btn>
        <v-btn flat to="/cr">CR</v-btn>
        <v-btn flat to="/cp">CP</v-btn>
        <v-btn flat to="/jv">JV</v-btn>
        <v-btn flat to="/test1">Test 1</v-btn>
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
      title: "BRT Systems"
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
