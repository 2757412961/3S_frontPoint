import axios from 'axios';
// import Vue from 'vue'
import "../../node_modules/openlayers/dist/ol-debug.js"

// import ZoomSlider from 'ol/control.js';

export function mapInit(targetId, center, baseLayer) {
    let source = new ol.source.Vector({wrapX: false});
    let vector = new ol.layer.Vector({
        source: source
    });
    let gaode_layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:
                "http://webrd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
            crossOrigin: "Anonymous"//png下载
        }),
        projection: "EPSG:3857"
    });
    let layers = [];
    if (baseLayer !== '') {
        layers = [gaode_layer, vector];
    }

    // let RotateNorthControl = (function (Control) {
    //     function RotateNorthControl(opt_options) {
    //         let options = opt_options || {};
    //
    //         let button = document.createElement('button');
    //         button.innerHTML = 'N';
    //
    //         let element = document.createElement('div');
    //         element.className = 'rotate-north ol-unselectable ol-control';
    //         element.appendChild(button);
    //
    //         Control.call(this, {
    //             element: element,
    //             target: options.target
    //         });
    //
    //         button.addEventListener('click', this.handleRotateNorth.bind(this), false);
    //     }
    //
    //     if ( Control ) RotateNorthControl.__proto__ = Control;
    //     RotateNorthControl.prototype = Object.create( Control && Control.prototype );
    //     RotateNorthControl.prototype.constructor = RotateNorthControl;
    //
    //     RotateNorthControl.prototype.handleRotateNorth = function handleRotateNorth () {
    //         this.getMap().getView().setRotation(0);
    //     };
    //
    //     return RotateNorthControl;
    // }(Control));

    //创建地图实例
    let targetMap = new ol.Map({
        target: targetId,
        layers: layers,
        view: new ol.View({
            center: ol.proj.transform(center, "EPSG:4326", "EPSG:3857"), //初始化中心为北京
            zoom: 10,
            minZoom: 3,
            maxZoom: 18
        }),
        controls: ol.control
            .defaults({
                attributionOptions: {collapsible: false},
                rotateOptions: {className: "custom-rotate"},
            })
            .extend([
                new ol.control.OverviewMap({//全局视图
                    collapsible: false,
                    collapsed: false,
                    className: "custom-overview-map"
                }),
                new ol.control.ScaleLine({units: "metric", className: "ol-scale-line"}),//比例尺
                new ol.control.FullScreen({className: "custom-fullscreen", source: 'map2'}),//全屏
                new ol.control.MousePosition({//鼠标位置
                    coordinateFormat: ol.coordinate.createStringXY(4),
                    projection: "EPSG:4326",
                    className: "custom-mouse-position"
                }),
                new ol.control.ZoomSlider({className: "ol-zoomslider"}),//缩放刻度
                // new ol.control.RotateNorthControl({})
                // new ol.control.PanZoomBar({}),
                // new ol.control.ZoomToExtent({className:"custom-zoom-extent" })
            ]),
        logo: false
    }); //Map初始化
    // let zoomslider = new ZoomSlider();
    // targetMap.addControl(zoomslider);

    return targetMap;
}


export function baseMapInit(basemaps) {
    //OpenStreetMap
    let osm_layer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    //OpenStreetMap地形图
    let osm_terrain_layer = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'http://tile-{a-c}.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        })
    });
    // OpenStreetMap自行车地图
    let osm_bicycle_layer = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'http://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'
        })
    });
    // 天地图路网图
    let tianditu_road_layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
        })
    });
    // 天地图路网注记
    let tianditu_road_annotation = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
        })
    });
    // 天地图地形图
    let tianditu_terrain_layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}"
        })
    });
    // 天地图地形注记
    let tianditu_terrain_annotaation = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}"
        })
    });
    // 天地图影像图
    let tianditu_image_layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}"
        })
    });
    // 天地图影像注记
    let tianditu_image_annotation = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}"
        })
    });
    // 高德地图
    let gaode_layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://webrd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
        }),
        projection: 'EPSG:3857'
    });
    // 谷歌交通地图
    let google_map_layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
        })
    });
    // 谷歌地形地图
    let google_terrain_layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://mt3.google.cn/vt/lyrs=t@131,r@216000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Gal'//谷歌地形地图
        }),
        projection: 'EPSG:3857'

    });
    // 谷歌卫星地图
    let google_satellite_layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G'
        }),
        projection: 'EPSG:3857'
    });

    basemaps["osm"] = {title: "OpenStreetMap", layer: osm_layer};
    basemaps["osmt"] = {title: "OpenStreetMap地形图", layer: osm_terrain_layer};
    basemaps["osmb"] = {title: "OpenStreetMap自行车图", layer: osm_bicycle_layer};
    basemaps["tdtr"] = {title: "天地图路网图", layer: tianditu_road_layer};
    basemaps["tdtra"] = {title: "天地图路网注记", layer: tianditu_road_annotation};
    basemaps["tdtt"] = {title: "天地图地形图", layer: tianditu_terrain_layer};
    basemaps["tdtta"] = {title: "天地图地形注记", layer: tianditu_terrain_annotaation};
    basemaps["tdti"] = {title: "天地图影像图", layer: tianditu_image_layer};
    basemaps["tdtia"] = {title: "天地图影像注记", layer: tianditu_image_annotation};
    basemaps["gd"] = {title: "高德地图", layer: gaode_layer};
    basemaps["gm"] = {title: "谷歌交通地图", layer: google_map_layer};
    basemaps["gt"] = {title: "谷歌地形地图", layer: google_terrain_layer};
    basemaps["gs"] = {title: "谷歌卫星地图", layer: google_satellite_layer};
}

export function addMapData(targetMap, queryUrl, queryParams, callback) {
    //根据数据id获取指定数据的geojson
    let url = '';
    if (queryParams !== '') {
        url = queryUrl + '?offset=' + queryParams.offset + '&size=' + queryParams.size;
    } else {
        url = queryUrl;
    }
    axios.get(url).then(
        function (res) {
            if (res.data.body) {
                let vectorLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: new ol.format.GeoJSON().readFeatures(res.data.body, {
                            dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                            featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                        })
                    }),
                    style: styleInit
                });
                let extent = ol.proj.transformExtent(res.data.body.bbox, 'EPSG:4326', 'EPSG:3857');
                targetMap.getView().fit(extent, targetMap.getSize());//视图更新到当前图层的bbox
                targetMap.addControl(new ol.control.ZoomToExtent({
                    extent: extent,
                    className: "custom-zoom-extent"
                }));//增加缩放到当前图层控件
                // targetMap.addLayer(vectorLayer);
                callback(vectorLayer, res.data.body);
                // return vectorLayer;
            }
            else {
                // return null;
            }
        }).catch(function (err) {
        console.log(err)
    })
}

// export function dataOnMap(targetMap,queryUrl,queryParams,callback){
//     //根据数据id获取指定数据的geojson
//     axios.post(queryUrl, queryParams).then(
//         function (res) {
//             if (res.body) {
//                 let vectorLayer = new ol.layer.Vector({
//                     source: new ol.source.Vector({
//                         features: new ol.format.GeoJSON().readFeatures(res.body, {
//                             dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
//                             featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
//                         })
//                     }),
//                     style: styleInit
//                 });
//                 let extent = ol.proj.transformExtent(res.body.bbox, 'EPSG:4326', 'EPSG:3857');
//                 targetMap.getView().fit(extent, that.map.getSize());//视图更新到当前图层的bbox
//                 targetMap.addControl(new ol.control.ZoomToExtent({
//                     extent: extent,
//                     className: "custom-zoom-extent"
//                 }));//增加缩放到当前图层控件
//                 // targetMap.addLayer(vectorLayer);
//                 // return vectorLayer;
//                 callback(vectorLayer, res.body);
//             }
//             else {
//                 // that.$Bus.$emit("alertModalParams", {
//                 //     alertType: "warning",
//                 //     alertDescription: "数据上图失败"
//                 // });
//                 // return null;
//             }
//         }).catch(function (err) {
//         console.log(err)
//     })
// }


export function addPMData(targetMap, callback) {
    let heatData = {
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
    };
    //矢量图层 获取geojson数据
    let vectorSource = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(heatData, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        })
    });
    // Heatmap热力图
    let vectorLayer = new ol.layer.Heatmap({
        source: vectorSource,
        // opacity: [1],//透明度
        blur: 12,//模糊大小（以像素为单位）,默认15
        radius: 15,//半径大小（以像素为单位,默认8
        shadow: 250,//阴影像素大小，默认250
        weight: function (feature) {
            // get your feature property
            let weightProperty = feature.get('count');
            //min max = 127 362
            weightProperty = (weightProperty - 127) / (260);
            return weightProperty;
        },
        renderMode: 'vector'
    });
    targetMap.addLayer(vectorLayer);
    callback(heatData);
}

export function addKnownMap(mapData, targetMap) {
    for (let map of mapData) {
        let vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(map, {
                    dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                    featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                })
            }),
            style: styleInit
        });
        targetMap.addLayer(vectorLayer);
    }
}

function styleInit(feature) {
    //TODO:其他geometry的样式需要美化
    let geometryType = feature.getGeometry().getType();
    switch (geometryType) {
        case "Point":
            if (Object.keys(feature.values_).indexOf("ClusterID") !== -1) {
                return clazzStyle(feature.values_.ClusterID);
            } else {
                return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: 'red'
                        })
                    })
                });
            }
        case "LineString":
            return lineStyle(feature);
        case "MultiLineString":
            return lineStyle(feature);
        case "MultiPoint":
            return new ol.style.Style({
                fill: new ol.style.Fill({color: '#e6a299'}), //填充
                stroke: new ol.style.Stroke({
                    color: 'rgb(165,24,27)',
                    width: 3,
                    lineDash: [10, 10]
                })
            });
        case "MultiPolygon":
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'yellow',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 0, 0.5)'
                })
            });
        case "Polygon":
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'blue',
                    lineDash: [4],
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })
            });
        case "GeometryCollection":
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'magenta',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: 'magenta'
                }),
                image: new ol.style.Circle({
                    radius: 10,
                    fill: null,
                    stroke: new ol.style.Stroke({
                        color: 'magenta'
                    })
                })
            });
        case "Circle":
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255,0,0,0.2)'
                })
            });
        default:
            return null;
    }
}

//线样式编辑器
function lineStyle(feature) {
    let geometry = feature.getGeometry();
    let styles = [
        new ol.style.Style({
            fill: new ol.style.Fill({//填充样式
                color: '#ff9f64'
            }),
            stroke: new ol.style.Stroke({//线样式
                width: 3,
                color: '#94c0ff',
                lineDash: [6],
            })
        })
    ];
    geometry.forEachSegment(function (start, end) {
        let endLonLat = [end[0], end[1]];
        let startLonLat = [start[0], start[1]];
        styles.push(new ol.style.Style({
            geometry: new ol.geom.Point(endLonLat),
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: '#f88b7b'
                })
            })
        }));
        styles.push(new ol.style.Style({
            geometry: new ol.geom.Point(startLonLat),
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: '#9bcd5d'
                })
            })
        }));
    });
    return styles;
}

function clazzStyle(clazz) {
    if (clazz == 0) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#3a83d7'
                })
            })
        });
    } else if (clazz == 1) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#2bd6ff'
                })
            })
        });
    } else if (clazz == 2) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ff9b76'
                })
            })
        });
    } else if (clazz == 3) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ff148c'
                })
            })
        });
    } else if (clazz == 4) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#46ff38'
                })
            })
        });
    } else if (clazz == 5) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#a851ff'
                })
            })
        });
    }
}
