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
            calculateDataSeries: function () {
                var self = this;
                var visitedSeries = this.visited.reduce(function (result, item, index, array) {
                    result[item] = self.visitedColor;
                    return result;
                }, {});
                var wantedSeries = this.wanted.reduce(function (result, item, index, array) {
                    result[item] = self.wantedColor;
                    return result;
                }, {});
                return Object.assign(visitedSeries, wantedSeries)
            },

            updateColors: function() {
                jQuery('#mapdiv').vectorMap("set", "colors", this.calculateDataSeries());
            },

            loadMap: function(){
                var self = this;
                jQuery('#mapdiv').vectorMap(
                {
                    map: 'world_en',
                    backgroundColor: '#383f47',
                    borderColor: '#818181',
                    borderOpacity: 0.25,
                    borderWidth: 1,
                    color: '#f4f3f0',
                    enableZoom: true,
                    normalizeFunction: 'linear',
                    colors: this.calculateDataSeries(),
                    onRegionOver: function (event, code, region) {
                        event.preventDefault();
                    },
                    onRegionClick: function(event, countryCode, region)
                    {
                        event.preventDefault();
                        if(self.wanted.indexOf(countryCode) != -1){
                            var colorObject = {};
                            colorObject[countryCode] = '#f4f3f0';
                            jQuery('#mapdiv').vectorMap("set", "colors", colorObject);
                        }
                        EventBus.$emit('regionClicked', {
                            code: countryCode
                        });
                                       
                    }
                });
            }
        },

        mounted: function() {
            this.loadMap();
        },

        data: function() {
            return {
                map : null,
                visitedColor: "#03a834",
                wantedColor: "#a80303"
            }
        },
        watch: {
            visited: function (newList) {
                this.updateColors();
            },
            wanted: function (newList) {
                this.updateColors();
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