<template>
  <v-ons-page class="header-page">
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
    <map-view :visited="visited" :wanted="wanted"></map-view>
  </v-ons-page>
</template>

<script>
  import MapView from '../components/MapView'

  export default {
    methods: {

    },
    
    props: ['visited', 'wanted'],
    components: {
      MapView
    },

  }
</script>
<style scoped>
  .header-page {
    height: 45%;
  }

  .toolbar {
    height:56px;
    background: #34aedc;
  }

  .toolbar-button {
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
