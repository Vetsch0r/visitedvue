<template>
    <v-ons-page class="content-page">
        <ons-list>
            <template v-for="(value, key) in sortedContinents">
                <ons-list-item  id="expandable-list-item" @click="toggleContinent(key)"
                                :class="{'active-continent' : isContinentShown(key)}"
                                class="list-item_continent">
                    <div class="left">{{ $t(key) }}</div>
                    <div class="center"></div>
                    <div class="right"><span class="notification">{{getContinentCount(key)}}</span></div>
                </ons-list-item>
                <ons-list-item class="item-accordion" 
                    :key="country.code" v-for="country in value.countries" 
                    v-if="isContinentShown(key)">
                    <div class="left">
                        <img class="list-item__thumbnail" :src="getImgUrl(country.code)">
                    </div>
                    <div class="center">
                        {{country.name}}
                    </div>
                    <div class="right">
                        <font-awesome-icon  :class="{'icon-visited-active' : isVisited(country.code)}" class="icon-visited"  
                                            icon="check-circle" @click="clickIcon(country.code, 'visited')" size="2x"/>
                        <font-awesome-icon  :class="{'icon-wanted-active' : isWanted(country.code)}"
                                            icon="heart" size="2x" @click="clickIcon(country.code, 'wanted')"/>
                    </div>
                </ons-list-item>
            </template>
        </ons-list>
    </v-ons-page>
</template>

<script>
    import continents from '../data/continents';
    import { EventBus } from '../js/event-bus.js';

    export default {

        props: ['visited', 'wanted', 'visitedColor', 'wantedColor'],

        data() {
            return {
                continents: continents,
                currentContinent: null
            };
        },

        methods: {
            isVisited(countryCode){
                return this.visited.indexOf(countryCode) > -1;
            },
            isWanted(countryCode){
                return this.wanted.indexOf(countryCode) > -1;
            },
            clickIcon(countryCode, clickedMode) {
                EventBus.$emit('iconClicked', {
                    code: countryCode,
                    mode: clickedMode
                });
            },
            getImgUrl(code) {
                var images = require.context('../assets/', false, /\.png$/)
                return images('./' + code.toUpperCase() + ".png")
            },
            getContinentCount(key) {
                var count = 0;
                var arr = this.continents[key].countries;
                for (var i = 0, len = arr.length; i < len; i++) {
                    if(this.visited.indexOf(arr[i].code) > -1 ){
                        count += 1;
                    }
                }
                return count + '/' + arr.length;
            },
            toggleContinent(continent) {
                if(this.isContinentShown(continent)){
                    this.currentContinent = null;
                }
                else{
                    this.currentContinent = continent;
                }
            },
            isContinentShown(continent){
                return this.currentContinent === continent;
            }
        },
        computed: {
            sortedContinents: function(){
                var sortedContinents = this.continents
                Object.keys(this.continents).forEach(function(key) {
                    sortedContinents[key].countries.sort(function(countryA, countryB){
                        if(countryA.name > countryB.name){
                            return 1;
                        }
                        if(countryA.name < countryB.name){
                            return -1;
                        }
                        return 0;
                    });
                });
                return sortedContinents;
            }
        }
    }
</script>

<style scoped>
    .content-page {
        position: absolute;
        width: 100%;
        overflow-y: scroll;
        background-color:#444546;
        top:45%;
    }
    
    .list-item{
        border-bottom: 1px solid #494949;
    }

    .list-item_continent{
        color: white;
        font-weight: bold;
    }

    .notification {
        background-color: white;
        color:black;
        right: 10px;
        position: absolute;
        top: 14px;
        padding: 0 10px;
        font-weight: bold;
    }

    .list-item__left{
        padding-top:8px;
        padding-bottom:8px;
    }

    .list-item__center{
        background-image: none;
    }

    .fa-2x{
        font-size: 1.7em;
    }

    .icon-visited {
        padding-right: 20px;
    }

    .icon-visited-active {
        color: #03a834;
    }

    .icon-wanted-active {
        color: #a80303;
    }

    .active-continent {
        background: #34aedc;
    }
</style>