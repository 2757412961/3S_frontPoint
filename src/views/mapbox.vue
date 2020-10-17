<template>
    <!--<div>-->
        <!--<div>-->
            <!--<el-button type="primary" @click="addGeojson">主要按钮</el-button>-->
        <!--</div>-->
        <div ref="basicMapbox" style="position: absolute;height: 85%;width: 98%;top: 90px;margin-left: 1%"
             id="map"></div>
    <!--</div>-->
</template>
<script>
    import mapboxgl from "mapbox-gl"
    import MapboxLanguage from '@mapbox/mapbox-gl-language'
    import 'mapbox-gl/dist/mapbox-gl.css'
    import {MapboxLayer} from "@deck.gl/mapbox";
    import {GeoJsonLayer} from '@deck.gl/layers';
    import {
        booleanPointInPolygon,
        booleanWithin,
        bbox,
        getGeom,
        point,
        polygon,
        booleanDisjoint
    } from '../../static/js/turf.min'

    export default {
        data() {
            return {
                geojsonData: {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {"count": 227},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.410756,
                                    39.927596
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 157},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.400759,
                                    39.884597
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 243},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.332852,
                                    39.927678
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 195},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.345829,
                                    39.876656
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 268},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.390749,
                                    39.980596
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 321},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.454832,
                                    39.935654
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 286},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.280945,
                                    39.985762
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 215},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.167788,
                                    40.088675
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 181},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.200888,
                                    40.000739
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 223},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.272969,
                                    39.861776
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 217},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.139747,
                                    39.82264
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 231},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.177839,
                                    39.912702
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 220},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.129736,
                                    39.740634
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 189},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.500007,
                                    39.793785
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 242},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.657116,
                                    39.884897
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 252},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.649108,
                                    40.125899
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 180},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.223907,
                                    40.215749
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 194},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.099672,
                                    39.935601
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 141},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    117.093441,
                                    40.141567
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 184},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.62214,
                                    40.326902
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 136},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.825935,
                                    40.368803
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 217},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    115.965912,
                                    40.4518
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 206},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.21388,
                                    40.290724
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 177},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    115.981874,
                                    40.363787
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 133},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.904996,
                                    40.497845
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 127},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    117.113441,
                                    40.098575
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 192},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.776944,
                                    39.710801
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 207},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.293984,
                                    39.518807
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 312},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    115.993932,
                                    39.578849
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 198},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.388761,
                                    39.8976
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 202},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.387765,
                                    39.874602
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 249},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.342826,
                                    39.952658
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 203},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.3618,
                                    39.854631
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {"count": 362},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    116.476903,
                                    39.937709
                                ]
                            }
                        }


                    ]
                }
            }
        },
        components: {},

        mounted() {
            this.init();
        },
        methods: {

            init() {
                let that = this;
                mapboxgl.accessToken = 'pk.eyJ1IjoibGl5dWV5aSIsImEiOiJjanpkZmh1aGswMW91M3Bsa2ZxZmFpNGtjIn0.3O_iLJM7u3UyEyGBVKt1ug';
                this.$globalConstant.map = {};
                this.$globalConstant.map = new mapboxgl.Map({
                    container: "map",
                    style: 'mapbox://styles/mapbox/streets-v9',
                    center: [121.64, 29.70],
                    zoom: 4
                });

                // 设置语言
                let language = new MapboxLanguage({defaultLanguage: "zh"});
                that.$globalConstant.map.addControl(language);
                // 地图导航
                let nav = new mapboxgl.NavigationControl();
                that.$globalConstant.map.addControl(nav, "top-right");
                // 比例尺
                let scale = new mapboxgl.ScaleControl({
                    maxWidth: 80,
                    unit: "imperial"
                });
                that.$globalConstant.map.addControl(scale);
                scale.setUnit("metric");
                // 全屏
                that.$globalConstant.map.addControl(new mapboxgl.FullscreenControl());
                //设置鼠标样式
                that.$globalConstant.map.getCanvas().style.cursor = 'default';
                that.$globalConstant.map.on('load',function () {
                    that.addGeojson();
                })

            },
            addGeojson() {
                console.log(this.$globalConstant.map.getStyle().layers.length);
                let layer = new MapboxLayer({
                    id: "testmylayerzju",
                    type: GeoJsonLayer,
                    data: this.geojsonData,
                    stroked: true,
                    filled: true,
                    wireframe: true,
                    // lineWidthMinPixels: 1000,
                    // getPolygon: d => d.geometry.coordinates,
                    // getFillColor: d => global.rgbOrRgbaToArray(color(d.properties['count'])),
                    // getLineColor: d => global.rgbOrRgbaToArray(color(d.properties['count'])),
                    // getFillColor: d => global.rgbOrRgbaToArray(color(d.properties['人口数量'])),
                    // getLineColor: d => global.rgbOrRgbaToArray(color(d.properties['人口数量'])),
                    // getLineWidth: d => 0,
                    // lineWidthUnits: "meters",
                    pickable: true,
                    autoHighlight: true,
                    // lineWidthScale: 20,
                    // lineWidthMinPixels: 2,
                    getFillColor: [255,69,0],
                    // getLineColor: [160, 160, 180, 200],
                    getRadius: 1000,
                    // getLineWidth: 1,
                    getElevation: 30
                    // onClick: ({x, y, object}) => {
                    //     const tooltip = document.getElementById("tooltip");
                    //     debugger;
                    //     if (object) {
                    //         console.log(object.properties);
                    //
                    //         let keysArr = Object.keys(object.properties);
                    //         let showStr = '<table border="1">';
                    //         keysArr.forEach(
                    //             key =>
                    //                 (showStr =
                    //                     showStr +
                    //                     "<tr><td>" +
                    //                     key.toString() +
                    //                     ":" +
                    //                     "</td>" +
                    //                     "<td>" +
                    //                     object.properties[key] +
                    //                     "</td></tr>")
                    //         );
                    //         tooltip.style.top = `${y}px`;
                    //         tooltip.style.left = `${x + 265}px`;
                    //         showStr += "</table>";
                    //         tooltip.innerHTML = showStr;
                    //         setTimeout("tooltip.innerHTML = ''", 5000);
                    //     } else {
                    //         tooltip.innerHTML = "";
                    //     }
                    // }
                });
                console.log(this.$globalConstant.map.getStyle().layers.length);
                this.$globalConstant.map.addLayer(layer);
                let testLayer=this.$globalConstant.map.getLayer("testmylayerzju");
                console.log(this.$globalConstant.map.getStyle().layers.length);
                // let bbox = [item1, item2];
                // console.log(bbox);
                this.$globalConstant.map.fitBounds([ [116.293984,39.518807], [116.3618,39.854631]]);
            }
        },


        created() {
            let that = this;

        },
        computed: {},

    }
</script>

<style>
    @import url('../../static/css/mapbox-gl.css');
    @import url('../../static/css/mapbox-gl-draw.css');

    .map-overlay {
        font: bold 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
        position: absolute;
        width: 15%;
        top: 0;
        left: 3%;
        padding: 10px;
    }

    .map-overlay .map-overlay-inner {
        background-color: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.20);
        border-radius: 3px;
        padding: 10px;
        margin-bottom: 10px;
    }

    .map-overlay label {
        display: block;
        margin: 0 0 10px;
    }

    .map-overlay input {
        background-color: transparent;
        display: inline-block;
        width: 100%;
        position: relative;
        margin: 0;
        cursor: ew-resize;
    }

    .map-overlay-inner fieldset {
        border: none;
        padding: 0;
        margin: 0 0 10px;
    }

    .map-overlay-inner fieldset:last-child {
        margin: 0;
    }

    .map-overlay-inner select {
        width: 100%;
    }

    .map-overlay-inner label {
        display: block;
        font-weight: bold;
        margin: 0 0 5px;
    }

    .map-overlay-inner button {
        display: inline-block;
        width: 36px;
        height: 20px;
        border: none;
        cursor: pointer;
    }

    .map-overlay-inner button:focus {
        outline: none;
    }

    .map-overlay-inner button:hover {
        box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.10);
    }

    .mapboxgl-ctrl-icon {
        width: 30px;
        height: 30px;
        box-sizing: border-box;
        display: block;
    }

    .control {
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }

    .attTable {
        font-family: Verdana, Arial, Sans-Serif;
        font-size: 11px;
        color: #333333;
        border: 1px solid #666666;
        border-collapse: collapse;
        max-width: 300px;
        table-layout: inherit;
        border-radius: 5px;
        width: 100%;
        overflow-x: auto;
    }

    .attTable th {
        text-align: center;
        border: 1px solid #666666;
        background-color: #dedede;
        padding: 8px;
    }

    .attTable td {
        text-align: center;
        border: 1px solid #666666;
        background-color: #ffffff;
        padding: 8px;
    }

    .attDiv {
        max-width: 400px;
        overflow: auto;
    }

    #queryDiv {
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 2px rgba(10, 16, 20, .24), 0 0 2px rgba(10, 16, 20, .12);
        box-sizing: border-box;
        transition: box-shadow .5s;
        margin: 0px 8px;
    }
</style>