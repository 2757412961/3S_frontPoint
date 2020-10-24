<template>
    <!--    :style="{position:'absolute','left':'10%','margin-left':'1%', 'width':'100%'}"-->
    <div style="width: 100%; height: 100%;">
        <div id="map" style="position: relative; width: 100%; height: 100%;"></div>
        <el-button type="warning" icon="el-icon-minus" size="mini" circle
                   @click="addGeoJsonPoint('layer1', geoJsonPointsSource)">addGeoJsonPoint
        </el-button>
        <el-button type="warning" icon="el-icon-minus" size="mini" circle
                   @click="addGeoJsonLine('layer2', geoJsonLineSource)">addGeoJsonLine
        </el-button>
        <el-button type="warning" icon="el-icon-minus" size="mini" circle
                   @click="addGeoJsonPolygon('layer3', geoJsonPolygonSource)">addGeoJsonPolygon
        </el-button>
    </div>
</template>
<script>
    import mapboxgl from "mapbox-gl"
    import MapboxLanguage from '@mapbox/mapbox-gl-language'
    import {MapboxLayer} from "@deck.gl/mapbox";
    import {GeoJsonLayer} from '@deck.gl/layers';

    export default {
        data() {
            return {
                // globalMap: this.$globalConstant.map,
                geoJsonPointsSource: {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.03238901390978, 38.913188059745586]
                            },
                            "properties": {
                                "title": "Mapbox DC",
                                "icon": "monument"
                            }
                        }, {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-122.414, 37.776]
                            },
                            "properties": {
                                "title": "Mapbox SF",
                                "icon": "harbor"
                            }
                        }]
                    }
                },
                geoJsonLineSource: {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "LineString",
                                "coordinates": [
                                    [-122.48369693756104, 37.83381888486939],
                                    [-122.48348236083984, 37.83317489144141],
                                    [-122.48339653015138, 37.83270036637107],
                                    [-122.48356819152832, 37.832056363179625],
                                    [-122.48404026031496, 37.83114119107971],
                                    [-122.48404026031496, 37.83049717427869],
                                    [-122.48348236083984, 37.829920943955045],
                                    [-122.48356819152832, 37.82954808664175],
                                    [-122.48507022857666, 37.82944639795659],
                                    [-122.48610019683838, 37.82880236636284],
                                    [-122.48695850372314, 37.82931081282506],
                                    [-122.48700141906738, 37.83080223556934],
                                    [-122.48751640319824, 37.83168351665737],
                                    [-122.48803138732912, 37.832158048267786],
                                    [-122.48888969421387, 37.83297152392784],
                                    [-122.48987674713133, 37.83263257682617],
                                    [-122.49043464660643, 37.832937629287755],
                                    [-122.49125003814696, 37.832429207817725],
                                    [-122.49163627624512, 37.832564787218985],
                                    [-122.49223709106445, 37.83337825839438],
                                    [-122.49378204345702, 37.83368330777276],
                                    [122.493782043457023, 37.83368330777276],
                                ]
                            }
                        }
                        ]
                    }
                },
                geoJsonPolygonSource: {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [[[-67.13734351262877, 45.137451890638886],
                                [-66.96466, 44.8097],
                                [-68.03252, 44.3252],
                                [-69.06, 43.98],
                                [-70.11617, 43.68405],
                                [-70.64573401557249, 43.090083319667144],
                                [-70.75102474636725, 43.08003225358635],
                                [-70.79761105007827, 43.21973948828747],
                                [-70.98176001655037, 43.36789581966826],
                                [-70.94416541205806, 43.46633942318431],
                                [-71.08482, 45.3052400000002],
                                [-70.6600225491012, 45.46022288673396],
                                [-70.30495378282376, 45.914794623389355],
                                [-70.00014034695016, 46.69317088478567],
                                [-69.23708614772835, 47.44777598732787],
                                [-68.90478084987546, 47.184794623394396],
                                [-68.23430497910454, 47.35462921812177],
                                [-67.79035274928509, 47.066248887716995],
                                [-67.79141211614706, 45.702585354182816],
                                [-67.13734351262877, 45.137451890638886]]]
                        }
                    }
                },

            }
        },
        components: {},

        mounted() {
            this.initMap();
            // this.$Bus.$on('resizeMap', () => {
            //     this.$globalConstant.map.resize();
            // });

        },
        methods: {
            initMap() {
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
                this.$globalConstant.map.addControl(language);
                // 地图导航
                let nav = new mapboxgl.NavigationControl();
                this.$globalConstant.map.addControl(nav, "top-right");
                // 比例尺
                let scale = new mapboxgl.ScaleControl({
                    maxWidth: 80,
                    unit: "imperial"
                });
                this.$globalConstant.map.addControl(scale);
                scale.setUnit("metric");
                // 全屏
                this.$globalConstant.map.addControl(new mapboxgl.FullscreenControl());
                //设置鼠标样式
                this.$globalConstant.map.getCanvas().style.cursor = 'default';
                this.$globalConstant.map.on('load', () => {
                    this.$globalConstant.map.resize();
                });
            },
            addGeoJsonPoint(layerID, source) {
                this.$globalConstant.map.addLayer({
                    "id": layerID,
                    "type": "symbol",
                    "source": source,
                    // "layout": {
                    //     "icon-image": "{icon}-15",
                    //     "text-field": "{title}",
                    //     "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    //     "text-offset": [0, 0.6],
                    //     "text-anchor": "top"
                    // }
                    "paint": {
                        'circle-color': '#4682B4'
                    }
                })
            },
            addGeoJsonLine(layerID, source) {
                this.$globalConstant.map.addLayer({
                    "id": layerID,
                    "type": "line",
                    "source": source,
                    "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    "paint": {
                        "line-color": "#d28d19",
                        "line-width": 8
                    }
                })
            },
            addGeoJsonPolygon(layerID, source) {
                this.$globalConstant.map.addLayer({
                    'id': layerID,
                    'type': 'fill',
                    'source': source,
                    'layout': {},
                    'paint': {
                        'fill-color': '#088',
                        'fill-opacity': 0.8
                    }
                })
            },
            addFeatureCollection(LayerID, Type, Source, Layout, Paint) {
                this.$globalConstant.map.addLayer({
                    'id': LayerID,
                    'type': Type,
                    'source': Source,
                    'layout': Layout,
                    'paint': Paint
                });
            }


        },
        watch: {},

    }
</script>

<style>


</style>