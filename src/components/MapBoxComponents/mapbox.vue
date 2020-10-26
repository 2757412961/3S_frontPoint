<template>
<!--    <div class="row" style="width: 95%; margin: 0 auto 0 auto; overflow-y: hidden">-->
<!--        <div style="height: 600px; width: 418px; margin: 0 -350px 0 auto; overflow-y: hidden; position: relative; display:inline-block; zoom:1;">-->
<!--        </div>-->
<!--        <div style="height: 600px; width: 80%; margin: 0 auto 0 0">-->
<!--            <div ref="basicMapbox" style="height: 100%;width: 100%"-->
<!--                 id="map">-->
<!--                <controlAll-->
<!--                        @drawLayer="drawLayer"-->
<!--                        @showSavepro="showSavepro"-->
<!--                        @addjsonData="addjsonData"-->
<!--                        @uploadData="uploadData"></controlAll>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div>-->
<!--            <dataList></dataList>-->
<!--            <uploadData></uploadData>-->
<!--        </div>-->
<!--    </div>-->

    <div style="width: 100%; height: 100%;">
        <div style="float:right; width: 100%; height: 100%;">
            <div ref="basicMapbox" style="height: 100%;width: 100%"
                 id="map">
                <controlAll
                        @drawLayer="drawLayer"
                        @showSavepro="showSavepro"
                        @addjsonData="addjsonData"
                        @uploadData="uploadData"></controlAll>
            </div>
        </div>
    </div>
</template>
<script>
    import mapboxDraw from '../../../static/js/mapbox-gl-draw.js';
    import mapboxgl from "mapbox-gl"
    import mapboxLanguage from '@mapbox/mapbox-gl-language'
    import 'mapbox-gl/dist/mapbox-gl.css'
    import layerContent from "./layerContent";
    import controlAll from "./controlAll";
    import mapUrl from "../../util/mapurl";
    // import * as turf from '@turf/turf';
    import * as turf from '../../../static/js/turf.min'
    import axios from "../../util/axios";
    import SavePro from "./savePro";
    import openPro from "./openPro";
    import dataList from "./dataList";
    import uploadData from "./uploadData";

    let layerids=[];
    let draw;
    let mymap;
    export default {
        data() {
            return {
                layerNames:layerids,
                drawTool:draw,
                myMap:mymap,
                drawTime:0
            }
        },
        components: {
            SavePro,
            openPro,
            controlAll,
            layerContent,
            dataList,
            uploadData
        },
        mounted() {
            mymap=this.init();
            this.drawTool=draw;
            this.myMap=mymap;
        },
        methods: {
            init() {
                let that = this;
                //读取缓存数据内容:地图样式以及图层列表
                let styleJson=sessionStorage.getItem('mapstyle');
                let layers=sessionStorage.getItem('layers');
                let pos=0;
                if(layers)
                {
                    //若图层列表不为空，则更新layerids中内容，使其与缓存一致
                    let settemp;
                    for(let i=0;i<layers.length;i++)
                    {
                        settemp=new Set(layerids);
                        if(layers[i]===',')
                        {
                            if(!settemp.has(layers.substr(pos,i-pos)))
                                layerids.push(layers.substr(pos,i-pos));
                            pos=i+1;
                        }
                        if(i===layers.length-1)
                        {
                            if(!settemp.has(layers.substr(pos,i+1-pos)))
                                layerids.push(layers.substr(pos,i+1-pos));
                        }

                    }
                }
                mapboxgl.accessToken = mapUrl.MapaccessToken ;
                if(styleJson){


                    //若已有缓存样式，则加载地图样式为缓存样式
                    this.$globalConstant.map = new mapboxgl.Map({
                        container: "map",
                        style: JSON.parse(styleJson),
                        center: [121.64, 29.70],
                        zoom: 4,
                        version:8,
                        interactive: true,
                    });
                }
                else
                {
                    //缓存数据库中无内容，初始化地图，加载天地图底图和注记
                    this.$globalConstant.map = new mapboxgl.Map({
                        container: "map",
                        style: {
                            "version": 8,
                            "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
                            "sources": {
                                "tdtvec": {
                                    "type": "raster",
                                    "tiles": [mapUrl.tdtvecUrl],
                                    "tileSize": 256,
                                },
                                "tdtcva":{
                                    "type": "raster",
                                    "tiles": [mapUrl.tdtcvaUrl],
                                    "tileSize": 256,
                                },
                                "tdtimg": {
                                    "type": "raster",
                                    "tiles": [mapUrl.tdtimgUrl],
                                    "tileSize": 256,
                                },
                                "tdtcia":{
                                    "type": "raster",
                                    "tiles": [mapUrl.tdtciaUrl],
                                    "tileSize": 256,
                                },
                                "tdtter": {
                                    "type": "raster",
                                    "tiles": [mapUrl.tdtterUrl],
                                    "tileSize": 256,
                                },
                                "tdtcta":{
                                    "type": "raster",
                                    "tiles": [mapUrl.tdtctaUrl],
                                    "tileSize": 256,
                                }
                            },
                            "layers": [
                                {
                                    "id":"tdtvec",
                                    "type":"raster",
                                    "source":"tdtvec",
                                    "layout": {
                                        'visibility': 'visible',
                                    },
                                    "minzoom":0,
                                    "maxzoom":17
                                },
                                {
                                    "id":"tdtcva",
                                    "type":"raster",
                                    "source":"tdtcva",
                                    "layout": {
                                        'visibility': 'visible',
                                    },
                                    "minzoom":0,
                                    "maxzoom":17
                                },
                                {
                                    "id":"tdtimg",
                                    "type":"raster",
                                    "source":"tdtimg",
                                    "layout": {
                                        'visibility': 'none',
                                    },
                                    "minzoom":0,
                                    "maxzoom":17
                                },
                                {
                                    "id":"tdtcia",
                                    "type":"raster",
                                    "source":"tdtcia",
                                    "layout": {
                                        'visibility': 'none',
                                    },
                                    "minzoom":0,
                                    "maxzoom":17
                                },
                                {
                                    "id":"tdtter",
                                    "type":"raster",
                                    "source":"tdtter",
                                    "layout": {
                                        'visibility': 'none',
                                    },
                                    "minzoom":0,
                                    "maxzoom":17
                                },
                                {
                                    "id":"tdtcta",
                                    "type":"raster",
                                    "source":"tdtcta",
                                    "layout": {
                                        'visibility': 'none',
                                    },
                                    "minzoom":0,
                                    "maxzoom":17
                                }
                            ]
                        },
                        interactive: true,
                        center: [121.64, 29.70],
                        zoom: 4
                    });
                }
                draw = new mapboxDraw({
                    id: 'draw',
                    displayControlsDefault: false,
                    controls: {
                        polygon: true,
                        point: true,
                        line_string:true,
                        trash: true
                    }
                });
                setTimeout(function () {
                    //二次加载后，缓存库中存在大量gl-draw工具的图层，
                    // 待map加载完毕后，需删除这些图层，再加载drawcontrol，否则会出现冲突
                    if(!styleJson)
                    {
                        that.$globalConstant.map.addControl(draw);
                        return;
                    }
                    if(styleJson)
                    {
                        for(let i=0;i<JSON.parse(styleJson).layers.length;i++)
                        {
                            if(JSON.parse(styleJson).layers[i].id.substr(0,7)==='gl-draw')
                                that.$globalConstant.map.removeLayer(JSON.parse(styleJson).layers[i].id);
                        }
                        that.$globalConstant.map.removeSource('mapbox-gl-draw-cold');
                        that.$globalConstant.map.removeSource('mapbox-gl-draw-hot');
                    }
                    that.$globalConstant.map.addControl(draw);
                },1000)


                // 设置语言
                let language = new mapboxLanguage({defaultLanguage: "zh"});
                that.$globalConstant.map.addControl(language);
                // 地图导航
                let nav = new mapboxgl.NavigationControl();

                that.$globalConstant.map.addControl(nav, "top-right");
                // 比例尺
                let scale = new mapboxgl.ScaleControl({
                    maxWidth: 80,
                    unit: "imperial"
                });
                that.$globalConstant.map.addControl(scale, "bottom-right");
                scale.setUnit("metric");
                // 全屏
                that.$globalConstant.map.addControl(new mapboxgl.FullscreenControl());
                //设置鼠标样式
                that.$globalConstant.map.getCanvas().style.cursor = 'default';
                return that.$globalConstant.map;
            },
            drawLayer() {
                let feas=draw.getSelected().features;
                let pointfeatures=turf.featureCollection([]);
                let polygonfeatures=turf.featureCollection([]);
                let linefeatures=turf.featureCollection([]);
                let layername=0;
                if(layerids.length)
                {
                    for(let i=0;i<layerids.length;i++)
                    {
                        let index=layerids[i].lastIndexOf('_');
                        if(index!==-1)
                        {
                            if(layername<parseInt(layerids[i].substr(index+1,layerids[0].length))+1)
                                layername=parseInt(layerids[i].substr(index+1,layerids[0].length))+1;
                        }

                    }
                }
                if(feas.length===0) {this.$message.warning('当前未选中任何图形对象');return;}
                //将点线面分别归置到对应的featurecollection当中
                for(let i=0;i<feas.length;i++)
                {
                    let type=feas[i].geometry.type;
                    if(type==='Point')
                    {
                        pointfeatures.features.push(feas[i]);
                    }
                    else if(type==='Polygon')
                    {
                        polygonfeatures.features.push(feas[i]);
                    }
                    else
                    {
                        linefeatures.features.push(feas[i]);
                    }
                    draw.delete(feas[i].id);
                }
                //以点线面featurecollection作为数据源，如不为空则添加对应图层
                let map=this.myMap;
                if(polygonfeatures.features.length>0)
                {
                    //上传绘制数据到服务器，通过url的方式加载数据
                    axios.post('http://127.0.0.1:13000/summer/file/temp/datajsonSubmit',{
                        polygonfeatures
                    },{
                        params:{
                            name:'polygon_'+layername+'.json'
                        }
                    }).then(re=>{
                        map.addLayer({
                            'id': 'polygon_'+layername,
                            'type':'fill',
                            'source': {
                                'type': 'geojson',
                                'data': 'http://127.0.0.1:13000/summer/file/temp/dataJson/'+'polygon_'+layername+'.json'
                            },
                            'paint': {
                                'fill-color': '#4682B4',
                                'fill-opacity': 0.5,
                                'fill-outline-color':'#0e2944'
                            }

                        });
                        //更新图层列表以及数据库缓存
                        this.addLayerid('polygon_'+layername);
                    }).catch()

                }
                if(linefeatures.features.length>0)
                {
                    axios.post('http://127.0.0.1:13000/summer/file/temp/datajsonSubmit',{
                        linefeatures
                    },{
                        params:{
                            name:'line_'+layername+'.json'
                        }
                    }).then(re=> {
                        map.addLayer({
                            'id': 'line_'+layername,
                            'type':'line',
                            'source': {
                                'type': 'geojson',
                                'data': 'http://127.0.0.1:13000/summer/file/temp/dataJson/'+'line_'+layername+'.json'
                            },
                            'paint':{
                                'line-color':'#4682B4'
                            }
                        });
                        //更新图层列表以及数据库缓存
                        this.addLayerid('line_'+layername);
                    }).catch()

                }
                if(pointfeatures.features.length>0)
                {
                    axios.post('http://127.0.0.1:13000/summer/file/temp/datajsonSubmit',{
                        pointfeatures
                    },{
                        params:{
                            name:'point_'+layername+'.json'
                        }
                    }).then(re=> {
                        map.addLayer({
                            'id': 'point_'+layername,
                            'type':'circle',
                            'source': {
                                'type': 'geojson',
                                'data': 'http://127.0.0.1:13000/summer/file/temp/dataJson/'+'point_'+layername+'.json'
                            },
                            'paint':{
                                'circle-color':'#4682B4'
                            }
                        });
                        //更新图层列表以及数据库缓存
                        this.addLayerid('point_'+layername);
                    }).catch()

                }
            },
            showSavepro()
            {
                this.$Bus.$emit('savePropara',{
                    myMap:mymap,
                    layerNames:layerids
                })
            },
            showOpenpro()
            {
                //控制工程保存控件的显示和隐藏
                let display=this.$refs.openPro.displayForm;
                this.$refs.openPro.displayForm=(display==='none')?'block':'none';
            },
            addjsonData()
            {
                //获取样例数据列表
                axios.get('http://127.0.0.1:13000/summer/file/temp/list',{
                    params:{
                        type:2
                    }
                }).then(response=>{
                    let jsonData=[];
                    let dataArray=response.data.body;
                    for(let i=0;i<dataArray.length;i++)
                    {
                        let obdata={data:dataArray[i]};
                        jsonData.push(obdata);
                    }
                    //弹出组件dataList
                    this.$Bus.$emit('dataListpara',{
                        title:'样例数据',
                        dialogVisible:true,
                        tableData:jsonData
                    })
                }).catch(error=>{
                    this.$message.error("数据列表请求失败");
                    console.log(error);
                })
            },
            uploadData()
            {
                //弹出组件uploadData
                this.$Bus.$emit('uploadDatapara',{
                    title:'上传数据',
                    dialogVisible:true
                })
            },
            refreshStorage()
            {
                sessionStorage.setItem('layers',layerids);
                let styleJson = this.myMap.getStyle();
                sessionStorage.setItem('mapstyle',JSON.stringify(styleJson));
            },
            addLayerid(str) {
                //在map上添加图层后调用此函数，更新图层数组，更新数据库缓存
                layerids.push(str);
                if (layerids.length > 1) {
                    for (let i = layerids.length - 1; i > 0; i--) {
                        layerids[i] = layerids[i - 1];
                    }
                    layerids[0] = str;
                }
                this.refreshStorage();
                this.$message({
                    message: str + '图层添加成功',
                    type: 'success'
                });
            },
            created() {
                let that = this;
            }

        }
    };
</script>


<style>
    @import url("../../../static/css/mapbox-gl.css");
    @import url("../../../static/css/mapbox-gl-draw.css");

    #menu {
        background: #fff;
        position: absolute;
        z-index: 1;
        top: 100px;
        right: 80px;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, 0.4);
        box-shadow: 5px 5px 10px #888888;
        font-family: "Open Sans", sans-serif;
    }

    .map-overlay {
        font: bold 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
        position: absolute;
        width: 15%;
        top: 0;
        left: 3%;
        padding: 10px;
    }

    .map-overlay .map-overlay-inner {
        background-color: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
        box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.1);
    }

    .mapboxgl-ctrl-icon {
        width: 30px;
        height: 30px;
        box-sizing: border-box;
        display: block;
    }
    .mapboxgl-ctrl-scale{
        position: absolute;
        top:550px;
        right:0px
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
        box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24), 0 0 2px rgba(10, 16, 20, 0.12);
        box-sizing: border-box;
        transition: box-shadow 0.5s;
        margin: 0px 8px;
    }

    #tooltip:empty {
        display: none;
        position: static;
    }

    #tooltip {
        font-family: Helvetica, Arial, sans-serif;
        position: fixed;
        padding: 4px;
        margin: 8px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        max-width: 300px;
        font-size: 10px;
        z-index: 10;
        pointer-events: none;
    }
</style>