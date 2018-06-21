<template>
    <v-ons-page class="content-page">
        <template v-for="(value, key) in continents">
            <ons-list-header>{{ $t(key) }}<span class="notification">{{getContinentCount(key)}}</span></ons-list-header>
            <ons-list-item :key="country.code" v-for="country in value.countries">
                <div class="left">
                    <img class="list-item__thumbnail" :src="getImgUrl(country.code)">
                </div>
                <div class="center">
                    {{country.name}}
                </div>
            </ons-list-item>
        </template>
    </v-ons-page>
</template>

<script>
    import continents from '../data/continents';
    export default {

        props: ['visited', 'wanted'],

        data() {
            return {
                continents: continents
            };
        },

        methods: {
            getImgUrl(code) {
                var images = require.context('../assets/', false, /\.png$/)
                return images('./' + code + ".png")
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
            }
        }
    }
</script>

<style scoped>
    .content-page {
        position: absolute;
        width: 100%;
        overflow-y: scroll;
        height: 65%;
        background-color:#444546;
        top:35%;
    }

    .list-header{
        color: white;
        font-weight: bold;
    }

    .list-item{
        border-bottom: 1px solid #494949;
    }

    .notification {
        background-color: green;
        right: 10px;
        position: absolute;
        top: 12px;
        padding: 0 10px;
        font-weight: bold;
    }

    .list-item__center{
        background-image: none;
    }
</style>