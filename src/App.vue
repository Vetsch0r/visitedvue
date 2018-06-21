<template>
  <v-ons-page id="app">
    <v-ons-splitter>
      <v-ons-splitter-side swipeable collapse width="250px"
        :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
        :open.sync="menuIsOpen">
        <menu-page :visited="visited" :wanted="wanted"></menu-page>
      </v-ons-splitter-side>
      <v-ons-splitter-content>
        <header-page></header-page>
        <content-page :visited="visited" :wanted="wanted"></content-page>
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
  
  mounted: function() {
    this.visited = JSON.parse(window.localStorage.getItem('visited') || '[]');
    this.wanted = JSON.parse(window.localStorage.getItem('wanted') || '[]');

    EventBus.$on('regionClicked', (data) => {
      this.handleRegionClick(data.code);
    });
  },

  data: function() {
    return {
      visited: [],
      wanted: []
    }
  },

  methods: {
    handleRegionClick: function (code) {
      alert("handleClick")
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ons-splitter-side[side=left][animation=overlay] {
  border-right: 1px solid #BBB;
}
</style>
