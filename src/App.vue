<template>
  <v-ons-page id="app">
    <v-ons-splitter>
      <v-ons-splitter-side collapse width="250px"
        :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
        :open.sync="menuIsOpen">
        <menu-page :visited="visited" :wanted="wanted" :visitedColor="visitedColor" :wantedColor="wantedColor"></menu-page>
      </v-ons-splitter-side>
      <v-ons-splitter-content>
        <header-page :visited="visited" :wanted="wanted"></header-page>
        <content-page :visited="visited" :wanted="wanted" :visitedColor="visitedColor" :wantedColor="wantedColor"></content-page>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>
import HeaderPage from './components/HeaderPage'
import MenuPage from './components/MenuPage'
import MapView from './components/MapView'
import ContentPage from './components/ContentPage'
import { EventBus } from './js/event-bus.js';

export default {
  name: 'app',
  
  created: function() {
    this.visited = JSON.parse(window.localStorage.getItem('visited') || '[]');
    this.wanted = JSON.parse(window.localStorage.getItem('wanted') || '[]');
    
    this.visitedColor = window.localStorage.getItem('visitedColor');
    if(this.visitedColor == undefined || this.visitedColor == null){
      this.visitedColor = "#03a834";
    }
    this.wantedColor = window.localStorage.getItem('wantedColor');
    if(this.wantedColor == undefined || this.wantedColor == null){
      this.wantedColor = "#a80303";
    }

    EventBus.$on('regionClicked', (data) => {
      this.handleRegionClick(data.code);
    });
    EventBus.$on('iconClicked', (data) => {
      this.handleIconClick(data.code, data.mode);
    });
  },

  data: function() {
    return {
      visited: [],
      wanted: [],
      visitedColor: undefined,
      wantedColor: undefined
    }
  },

  methods: {
    handleRegionClick: function (code) {
      if (this.visited.indexOf(code) != -1) {
        this.wanted.push(code);
        this.visited.splice(this.visited.indexOf(code), 1);
      }
      else if (this.wanted.indexOf(code) != -1) {
        this.wanted.splice(this.wanted.indexOf(code), 1);
      }
      else {
        this.visited.push(code);
      }
    },
    
    handleIconClick: function(code, mode){
      if(mode === 'visited'){
        if(this.visited.indexOf(code) != -1){
          this.visited.splice(this.visited.indexOf(code), 1);
        }
        else{
          this.visited.push(code);
          if(this.wanted.indexOf(code) != -1){
            this.wanted.splice(this.wanted.indexOf(code), 1);
          }
        }
      }
      if(mode === 'wanted'){
        if(this.wanted.indexOf(code) != -1){
          this.wanted.splice(this.wanted.indexOf(code), 1);
        }
        else{
          this.wanted.push(code);
          if(this.visited.indexOf(code) != -1){
            this.visited.splice(this.visited.indexOf(code), 1);
          }
        }
      }
    }
  },

  computed: {
    menuIsOpen: {
      get () {
        return this.$store.state.splitter.open
      },
      set (newValue) {
        this.$store.commit('splitter/toggle', newValue)
      }
    }
  },

  components: {
    HeaderPage,
    MenuPage,
    ContentPage
  },

  watch: {
    visited: function (newList) {
      window.localStorage.setItem('visited', JSON.stringify(newList));
    },
    wanted: function (newList) {
      window.localStorage.setItem('wanted', JSON.stringify(newList));
    }
  }
}
</script>

<style scoped>

</style>
