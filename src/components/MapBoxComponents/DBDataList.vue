<!--获取后端数据库中的样例数据列表，显示在窗口中
当点击加载，向后端请求对应数据，
判别数据的类型，加载数据至地图中-->
<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="35%">

        <el-scrollbar style="height:400px">
            <el-row v-for="data in tableData" :key="data.id">
                <el-col :span="21" style="padding: 12px 20px; ">{{ data.title }}</el-col>
                <el-col :span="3" style="padding: 2px 20px; ">
                    <el-button @click="loadLayer( data.id, data.title )" type="text" size="small">加载</el-button>
                </el-col>
            </el-row>
        </el-scrollbar>

        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

</template>

<script>
    import * as d3 from 'd3';
    import axios from "../../util/axios"

    export default {
        name: "dbDataList",
        data() {
            return {
                title: '',
                tableData: [],
                dialogVisible: false
            }
        },
        mounted() {
        },
        methods: {
            loadLayer(id, title) {
                let that = this;
                //axios get(http://127.0.0.1:13000/summer/file/temp/dataJson/)
                // 返回的对象是JsonElement
                // 网页打开对应url直接读取可以读取到
                // 但axios会跳转到error

                axios
                    .get(this.$platfromUrl.readProjectFile + id, {
                        params: {
                            type: 2
                        }
                    })
                    .then(res => {
                        if (res.data == null) {
                            this.$message.error("服务器找不到该数据");
                            return;
                        }
                        let geoType = 'LineString';
                        let geoUrl = '';
                        let layerName = title;

                        // delete after testing
                        if (layerName == 'DEM Image Layer') {
                            geoType = 'Raster'
                        } else if (layerName == 'WorldMap Tile') {
                            geoType = 'PolygonTile'
                        }

                        // is existing in map
                        if (that.$parent.myMap.getLayer(layerName)) {
                            this.$message({
                                message: '同名同层已存在',
                                type: 'error'
                            });
                            return;
                        }

                        // 添加图层至地图
                        // Point, LineString, Polygon,
                        // MultiPoint, MultiLineString, MultiPolygon,
                        // PointTile, LineTile, PolygonTile
                        // Raster
                        if (geoType == "Point" || geoType == 'MultiPoint') {
                            that.$parent.myMap.addLayer({
                                'id': layerName,
                                'type': 'circle',
                                'source': {
                                    'type': 'geojson',
                                    'data': geoUrl
                                },
                                'paint': {
                                    'circle-color': '#4682B4'
                                }
                            });
                        } else if (geoType == "LineString" || geoType == 'MultiLineString') {
                            that.$parent.myMap.addLayer({
                                'id': layerName,
                                'type': 'line',
                                'source': {
                                    'type': 'geojson',
                                    // let geoUrl = 'http://10.79.231.81:90/bigGeoPlatform/viz/tmpForFrontEnd/line.json';
                                    'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson'
                                },
                                'paint': {
                                    'line-color': '#4682B4'
                                }
                            });
                        } else if (geoType == "Polygon" || geoType == 'MultiPolygon') {
                            that.$parent.myMap.addLayer({
                                'id': layerName,
                                'type': 'fill',
                                'source': {
                                    'type': 'geojson',
                                    'data': geoUrl
                                },
                                'paint': {
                                    'fill-color': '#4682B4',
                                    'fill-opacity': 0.5,
                                    'fill-outline-color': '#0e2944'
                                }
                            });
                        } else if (geoType == "PointTile") {
                            that.$parent.myMap.addLayer({
                                "id": layerName,
                                "type": "circle",
                                'source': {
                                    "type": "vector",
                                    "scheme": "tms",
                                    "tiles": [geoUrl],
                                    "minzoom": 1,
                                    "maxzoom": 14
                                },
                                "source-layer": layerName,
                            });
                        } else if (geoType == "LineTile") {
                            that.$parent.myMap.addLayer({
                                "id": layerName,
                                "type": "line",
                                'source': {
                                    "type": "vector",
                                    "scheme": "tms",
                                    "tiles": [
                                        "http://10.79.231.81:90/bigGeoPlatform/viz/vectorTileMVT/{z}/{x}_{y}.mvt"
                                    ],
                                    "minzoom": 1,
                                    "maxzoom": 14
                                },
                                "source-layer": layerName,
                            });
                        } else if (geoType == "PolygonTile") {
                            that.$parent.myMap.addLayer({
                                "id": layerName,
                                "type": "fill",
                                'source': {
                                    "type": "vector",
                                    "scheme": "tms",
                                    "tiles": [
                                        "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/Class_3S%3Aval@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf"
                                    ],
                                    "minzoom": 1,
                                    "maxzoom": 14
                                },
                                "source-layer": 'val',
                                "paint": {
                                    "fill-color": "#d28d19",
                                    "fill-opacity": 0.8
                                },
                            });
                        } else if (geoType == "Raster") {
                            that.$parent.myMap.addLayer({
                                "id": layerName,
                                "type": "raster",
                                'source': {
                                    'type': 'image',
                                    'url': "http://localhost:8080/geoserver/sf/wms?service=WMS&version=1.1.0&request=GetMap&layers=sf:sfdem&styles=&bbox=589980.0,4913700.0,609000.0,4928010.0&width=768&height=577&srs=EPSG:26713&format=image%2Fpng",
                                    'coordinates': [
                                        [76.54, 39.18],
                                        [70.00, 39.18],
                                        [70.00, 36.00],
                                        [76.54, 36.00]
                                    ]
                                },
                            });
                        } else {
                            this.$message({
                                message: '数据不符合要求',
                                type: 'error'
                            });
                            return;
                        }

                        //更新图层列表以及数据库缓存
                        that.$parent.addLayerid(layerName);
                    })
                    .catch(err => {
                        this.$message.error("数据加载失败");
                        console.log(err);
                    })
            }
        },
        created() {
            let that = this;
            this.$Bus.$on("getDBDtaList", para => {
                that.dialogVisible = para.dialogVisible,
                    that.tableData = para.tableData,
                    that.title = para.title
            })
        }

    }
</script>

<style scoped>

</style>
