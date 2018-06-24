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
            updateSelection() {
                var areas = [];
                for (var i = 0, len = this.visited.length; i < len; i++) {
                    areas.push({
                        id: this.visited[i],
                        color: this.visitedColor
                    })
                }
                for (var i = 0, len = this.wanted.length; i < len; i++) {
                    areas.push({
                        id: this.wanted[i],
                        color: this.wantedColor
                    })
                }
                this.map.dataProvider.areas = areas;
                this.map.validateData();
            }
        },

        mounted: function() {
            this.updateSelection();
        },

        data: function() {
            return {
                map : null,
                visitedColor: "#222222",
                wantedColor: "#AAAAAA"
            }
        },

        created () {
            this.map = AmCharts.makeChart("mapdiv", {
                "type": "map",
                "theme": "light",
                "addClassNames": true,
                "hideCredits":true,
                "dataProvider": {
                    "map": "worldHigh",
                    "getAreasFromMap": true,
                },
                "areasSettings": {
                    "selectable": true
                },
                "zoomControl": {
		            "zoomControlEnabled": false,
                    "homeButtonEnabled": false
	            },
                "smallMap": {
		            "enabled": false
	            },
            });
            this.map.addListener("clickMapObject", function(event) {
                EventBus.$emit('regionClicked', {
                    code: event.mapObject.id
                });
            });
        },

        watch: {
            visited: function (newList) {
                this.updateSelection();
            },
            wanted: function (newList) {
                this.updateSelection();
            }
        }
    }
</script>

<style scoped>
    .mapPage{
        position:absolute; 
        height: 100%;
        width: 100%;
    }

    .map-container {
        width: 100%;
        height: 100%;
        background: #383f47;
    }

</style>