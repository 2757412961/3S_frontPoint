<template>
    <!--    :style="{position:'absolute','left':'10%','margin-left':'1%', 'width':'100%'}"-->
    <div style="width: 100%; height: 100%;">
        <div style="float:left; width: 20%; height: 100%;" class="borderStyle">
            <el-tabs v-model="elTabsActive" type="card">
                <el-tab-pane label="地图图层" name="elTabsActive">
                    <el-form style="margin: 10px">
                        <el-form-item>
                            <p>测试按钮</p>
                            <el-button size="mini" @click="addLayerButton(geoJsonPointsLayer)">
                                addGeoJsonPoint
                            </el-button>
                            <el-button size="mini" @click="addLayerButton(geoJsonLineLayer)">
                                addGeoJsonLine
                            </el-button>
                            <el-button size="mini" @click="addLayerButton(geoJsonPolygonLayer)">
                                addGeoJsonPolygon
                            </el-button>
                        </el-form-item>

                        <el-form-item v-for="layerInfo in layerInfos" :id="layerInfo.layerID" :key="layerInfo.layerID">
                            <el-button type="plain">
                                <el-switch v-model="layerInfo.isShow"
                                           @change="showAndHiddenLayer(layerInfo.layerID, layerInfo.isShow)"></el-switch>
                                <el-tag type="info" style="width: 80px; margin: 0 8px">{{ layerInfo.layerName }}</el-tag>
                                <el-button type="danger" plain size="small" @click="removeButton(layerInfo.layerID)">移除图层</el-button>
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div style="float:right; width: 78%; height: 100%;" class="borderStyle">
            <div id="mapByZjh" style="position: relative; width: 100%; height: 100%;"></div>
        </div>
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
                geoJsonPointsLayer: {
                    layerID: 'layer_001', // 唯一标识符
                    layerName: '点图层', // 中/英文名称
                    type: 'circle', // 类型，为上面的注释中的一个
                    source: {
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
                    isShow: true, // 是否显示
                },
                geoJsonLineLayer: {
                    layerID: 'layer_002',
                    layerName: '线图层',
                    type: 'line',
                    source: {
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
                    isShow: true,
                },
                geoJsonPolygonLayer: {
                    layerID: 'layer_003',
                    layerName: '多边形图层',
                    type: 'fill',
                    source: {
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
                    isShow: true,
                },


                // type: [fill, line, symbol, circle, heatmap, fill-extrusion, raster, hillshade, background]
                layerInfos: [{
                    layerID: 'layer_test', // 唯一标识符
                    layerName: 'test', // 中/英文名称
                    type: 'circle', // 类型，为上面的注释中的一个
                    source: {
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
                    isShow: true, // 是否显示
                }],
                elTabsActive: 'elTabsActive',
                // globalMap: this.$globalMap.map,

            }
        },
        components: {},

        mounted() {
            this.initMap();
            // this.$Bus.$on('resizeMap', () => {
            //     this.$globalMap.map.resize();
            // });

        },
        methods: {
            initMap() {
                mapboxgl.accessToken = 'pk.eyJ1IjoibGl5dWV5aSIsImEiOiJjanpkZmh1aGswMW91M3Bsa2ZxZmFpNGtjIn0.3O_iLJM7u3UyEyGBVKt1ug';
                this.$globalMap.map = {};
                this.$globalMap.map = new mapboxgl.Map({
                    container: "mapByZjh",
                    style: 'mapbox://styles/mapbox/streets-v9',
                    center: [121.64, 29.70],
                    zoom: 1
                });

                // 设置语言
                let language = new MapboxLanguage({defaultLanguage: "zh"});
                this.$globalMap.map.addControl(language);
                // 地图导航
                let nav = new mapboxgl.NavigationControl();
                this.$globalMap.map.addControl(nav, "top-right");
                // 比例尺
                let scale = new mapboxgl.ScaleControl({
                    maxWidth: 80,
                    unit: "imperial"
                });
                this.$globalMap.map.addControl(scale);
                scale.setUnit("metric");
                // 全屏
                this.$globalMap.map.addControl(new mapboxgl.FullscreenControl());
                //设置鼠标样式
                this.$globalMap.map.getCanvas().style.cursor = 'default';
                this.$globalMap.map.on('load', () => {
                    this.$globalMap.map.resize();
                });
            },
            addFeatureCollection(LayerID, Type, Source, Layout, Paint) {
                this.$globalMap.map.addLayer({
                    'id': LayerID,
                    // [fill, line, symbol, circle, heatmap, fill-extrusion, raster, hillshade, background]
                    'type': Type,
                    'source': Source,
                    'layout': Layout,
                    'paint': Paint
                });
            },
            showAndHiddenLayer(layerID, layerShow) {
                if (this.$globalMap.map.getLayer(layerID) != undefined) {
                    if (layerShow) {
                        this.$globalMap.map.setLayoutProperty(layerID, 'visibility', 'visible');
                    } else {
                        this.$globalMap.map.setLayoutProperty(layerID, 'visibility', 'none');
                    }
                }
            },
            removeLayer(layerID) {
                if (this.$globalMap.map.getLayer(layerID) != undefined) {
                    this.$globalMap.map.removeLayer(layerID);
                    this.$globalMap.map.removeSource(layerID);
                }
            },
            removeButton(layerID) {
                this.removeLayer(layerID);
                let i = 0;
                for (; i < this.layerInfos.length; i++) {
                    if (this.layerInfos[i].layerID === layerID) {
                        break;
                    }
                }

                this.layerInfos.splice(i, 1);
            },
            choosePaint() {
                let PaintType = {
                    'circle': {
                        'circle-color': '#b41221'
                    }, 'line': {
                        "line-color": "#d28d19",
                        "line-width": 8
                    }, 'fill': {
                        'fill-color': '#088',
                        'fill-opacity': 0.8
                    }
                };
                return PaintType;
            },
            addLayerButton(layerInfo, layerSource) {
                if (this.$globalMap.map.getLayer(layerInfo.layerID) == undefined) {
                    this.layerInfos.push(layerInfo);

                    // 添加到地图
                    let LayerID = layerInfo.layerID;
                    let Type = layerInfo.type;
                    let Source = layerInfo.source;
                    let Layout = {};
                    let Paint = this.choosePaint()[Type];

                    this.addFeatureCollection(LayerID, Type, Source, Layout, Paint);
                }
            },


        },
        watch: {},

    }
</script>

<style>
    .borderStyle {
        border: 1px solid #ddd;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    }

</style>