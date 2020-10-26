<!--自定义工程名，通过post方法，保存当前工程至服务器指定路径-->
<template>
    <el-form label-position="top" style="{display:displayForm}">
        <el-form-item label="请选择工程" prop="proName"><!--prop必须有，和data中一致-->
            <el-select v-model="value" placeholder="请选择" style="width:100%">
                <el-option
                        v-for="i in projects.length"
                        :key=i
                        :label="projects[i-1]"
                        :value="projects[i-1]">
                    <span style="float: left">{{ projects[i-1] }}</span>
                </el-option>
            </el-select>
        </el-form-item>
        <el-button type="primary" @click="openProject()" style="margin-top:20px; float:right">打开</el-button>
    </el-form>

</template>

<script>
    // import mapbox from "../views/mapbox";
    // import mapboxDraw from '../../static/js/mapbox-gl-draw.js';
    // import mapboxgl from "mapbox-gl"
    import 'mapbox-gl/dist/mapbox-gl.css'
    import layerContent from "./layerContent";
    // import mapUrl from "../../util/mapurl";
    // import * as turf from '@turf/turf';
    import axios from "../../util/axios";

    let layers = [];

    export default {
        name: "openPro",
        data() {
            return {
                displayForm:'block',
                projects: [],
                value: '',
            }
        },
        components: {
            layerContent
        },
        props:{
            layerNames:Array,
            myMap:Object
        },
        methods:{
            //获取工程列表
            getProjectlist(){
                axios.get('http://127.0.0.1:13000/summer/file/temp/list',{
                    params:{
                        type: 1
                    }
                }).then((res) => {
                    this.projects = res.data.body;
                }).catch(function(error) {
                    console.log(error);
                });
                //console.log(this.layerNames);
            },
            //打开对应工程
            openProject() {
                if(this.value){
                    axios.get('http://127.0.0.1:13000/summer/file/temp/'+this.value,{
                        params:{
                            type:1
                        }
                    })
                    .then(res=>{
                        let jsonData=res.data.body[0];
                        //读取工程数据内容:地图样式以及图层列表
                        let styleJson=jsonData.style;
                        let layers=jsonData.layers;
                        if(layers)
                        {
                            let map=this.myMap;
                            while(this.layerNames.length)
                            this.layerNames.pop();
                            //若图层列表不为空，则加载图层内容
                            map.setStyle(styleJson);
                            for(let i=0;i<layers.length; i++){
                                for(let key in layers[i]){
                                    this.layerNames.push(key);
                                    let templayers=layers[i][key];
                                    let relatedLayers=[];
                                    for(let j=0;j<templayers.length;j++)
                                    {
                                        relatedLayers.push(templayers[j]);
                                    }
                                    sessionStorage.setItem(key,JSON.stringify(relatedLayers));
                                }
                            }
                            //更新缓存数据库
                            sessionStorage.setItem('layers',this.layerNames);
                            sessionStorage.setItem('mapstyle',JSON.stringify(styleJson));

                        };
                    })
                    .catch(err=>{
                        this.$message.error("数据加载失败");
                        console.log(err);
                    })
                }
                else{
                    this.$message.warning("请选择工程");
                }
            }
        },
        mounted() {
            this.getProjectlist();
        },
    }
</script>

<style scoped>
</style>