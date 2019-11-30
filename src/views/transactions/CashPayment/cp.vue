<template>
  <div class="about">
    <label> {{ Status }} </label>
    {{ items.MHeadID }}
    {{ items.MHead }}
    <input type="text" v-model="editedItem.MHeadID" placeholder="MHeadID" >
    <input type="text" v-model="editedItem.MHead" placeholder="MHead" >
    <input type="button" @click="Add" value="Post"/>
    <h1>cash payment</h1>
    
    <div v-for="m in mainList" :key="m.MHeadID">
        {{ m.MHeadID }}
        {{ m.MHead }}
        <button @click="Delete(m)">Delete</button>
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
      editedItem: {
        MHeadID: '',
        MHead: ''
      },
      editedIndex: -1,
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
      axios.post(this.url, vm.editedItem)
      .then(function(response){
          if (this.editedIndex > -1) {
            Object.assign(this.mainList[this.editedIndex], this.editedItem)
          } else {
            this.mainList.push(this.editedItem)
          }

          vm.Status = response.data.value;
      })
    },
    Delete(item){
      var vm = this;
      const index = this.mainList.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.mainList.splice(index, 1);
      axios.delete(this.url + "(" + item.MHeadID  + ")")
      .then(function(response){
          vm.Status = response;
      })
    }
  }
}
</script>