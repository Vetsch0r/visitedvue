<template>
    <v-ons-page class="mapPage">    
        <div id="mapdiv" class="map-container"></div>
    </v-ons-page>
</template>

<script>
    import { EventBus } from '../js/event-bus.js';

    export default {

        props: ['visited', 'wanted'],

        methods: {

        },

        created () {
            var map = AmCharts.makeChart("mapdiv", {
                "type": "map",
                "addClassNames": true,
                "dataProvider": {
                    "map": "worldHigh",
                    "getAreasFromMap": true,
                    "areas": this.get
                },
                "areasSettings": {
                    "selectable": true
                },
                "zoomControl": {
		            "zoomControlEnabled": false
	            },
                "smallMap": {
		            "enabled": false
	            },
            });
            map.addListener("clickMapObject", function(event) {
                EventBus.$emit('regionClicked', {
                    code: event.mapObject.id
                });
            });
        }
    }
</script>

<style scoped>
    .mapPage{
        position:absolute; 
        height: 100%;
        width: 100%;
    }

    .mapPage a {
        display: none !important;
    }

    .map-container {
        width: 100%;
        height: 100%;
        background: #383f47;
    }

</style>