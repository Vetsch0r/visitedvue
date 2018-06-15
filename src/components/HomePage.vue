<template>
  <v-ons-page class="toolbar-page">
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">
        <img class="toolbar-logo" src="../assets/header.png"></img>
      </div>

    </v-ons-toolbar>
  </v-ons-page>
</template>

<script>
  export default {
    methods: {

    }
  }
</script>
<style scoped>
  .toolbar-page {
    height: 56px;
  }

  .toolbar--material {
    height:56px;
    background: #34aedc;
  }

  .toolbar-button--material {
    color: white;
  }

  .toolbar-logo {
    height: 34px;
    position: absolute;
    top:11px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }
</style>
