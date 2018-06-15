<template>
    <v-ons-page style="position:absolute; top:56px; height: 100%; width:100%">    
        <div id="mapdiv" class="map-container"></div>
    </v-ons-page>
</template>

<script>
    import { EventBus } from '../js/event-bus.js';
    export default {
        created () {
            var map = AmCharts.makeChart("mapdiv", {
                "type": "map",
                "addClassNames": true,
                "dataProvider": {
                    "map": "worldHigh",
                    "getAreasFromMap": true
                },
                "zoomControl": {
		            "zoomControlEnabled": false
	            },
               "smallMap": {
		            "enabled": false
	            },
                "areasSettings": {
                    "color": "#B4B4B4",
                    "selectable": true,
                },
                "smallMap": {}
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
    .amcharts-zoom-control-zoom{
        display:none;
    }

    .map-container {
        width: 100%;
        height: 40%;
        background: #383f47;
    }

</style>