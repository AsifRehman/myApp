<template>
  <div class="about">
    <label> {{ Status }} </label>
    {{ items.MHeadID }}
    {{ items.MHead }}
    <input type="text" v-model="items.MHeadID" placeholder="MHeadID" >
    <input type="text" v-model="items.MHead" placeholder="MHead" >
    <input type="button" @click="Add" value="Post"/>
    <h1>cash payment</h1>
    <div v-for="v in mainList" :key="v.MHeadID">
        {{ v.MHeadID }}
        {{ v.MHead }}
    </div>
    <div v-show="loading">
        Loading...
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      url: '',
      mainList: [],
      loading: true,
      items: {
        MHeadID: '',
        MHead: ''
      },
      Status: ''
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.url = this.$store.state.url + 'tbl_MHead';
      var vm = this;
      axios.get( this.url, { "content-type": "application/json"})
      .then(function(response){
          vm.mainList = response.data.value;
          vm.loading = false;
      })
      .catch(function(error){
        // eslint-disable-next-line
        Console.log(error);
      })
    },
    Add(){
      var vm = this;
      var vMHeadID = vm.items.MHeadID;
      var vMHead = vm.items.MHead;
      

      axios.post(this.url, {MHeadID: vMHeadID, MHead: vMHead})
      .then(function(response){
          vm.Status = response;
      })
    }
  }
}
</script>