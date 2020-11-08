<!--图层控制器 获取mapbox组件当中的layerids变量 通过v-for遍历构建图层列表
    主要功能:控制图层显示隐藏，调整样式，调整顺序，删除，缩放-->
<template>
    <el-form class="formclass" ref="form" :model="form">
        <el-form-item v-for="layerName in layerNames"
                      :key="layerName"
                      :id="layerName"
                      style="width:294px;">
            <el-button type="plain"
                       :style="{backgroundColor:bColor,color:tColor,width:'294px',height:'35px'}">
                <span @click="showHidden($event)"
                      :style="{position:'absolute',left:'40px',width:'200px',top:'10px', 'text-align':'left'}">
                    {{ layerName.substring(0, Math.min(layerName.length, 13)) }}
                </span>
                <div @click="switchChange($event,layerName)">
                    <el-switch :aria-checked="true"
                               class="is-checked"
                               :style="{position:'absolute',left:'5px',top:'8px',width:'30px'}">
                    </el-switch>
                </div>
                <i :style="{position:'absolute',right:'56px',top:'10px'}"
                   @click="move($event,layerName)"
                   class="el-icon-d-caret"></i>
                <i :style="{position:'absolute',right:'38px',top:'10px'}"
                   @click="locate(layerName)"
                   class="el-icon-map-location"></i>
                <i :style="{position:'absolute',right:'20px',top:'10px'}"
                   @click="destroy(layerName)"
                   class="el-icon-delete"></i>
            </el-button>
            <polygonRender v-if="myMap.getSource(layerName).type==='geojson'&&
                                (myMap.getLayer(layerName).type==='fill'||
                                 myMap.getLayer(layerName).type==='fill-extrusion')"
                           :layername="layerName"
                           :myMap="myMap"
                           @refreshStorage="refreshStorage">
            </polygonRender>
            <pointRender v-if=" myMap.getSource(layerName).type==='geojson'&&
                               (myMap.getLayer(layerName).type==='circle'||
                                myMap.getLayer(layerName).type==='symbol'||
                                myMap.getLayer(layerName).type==='heatmap')"
                         :layername="layerName"
                         :myMap="myMap"
                         @refreshStorage="refreshStorage">
            </pointRender>
            <lineRenderer v-if=" myMap.getSource(layerName).type==='geojson'&&
                                (myMap.getLayer(layerName).type==='line')"
                          :layername="layerName"
                          :myMap="myMap"
                          @refreshStorage="refreshStorage">
            </lineRenderer>
        </el-form-item>
    </el-form>
</template>

<script>
    // import * as turf from "turf/turf";
    import * as turf from '../../../static/js/turf.min'
    import polygonRender from "./polygonRender";
    import pointRender from "./pointRender";
    import lineRenderer from "./lineRenderer";
    import axios from "../../util/axios";

    let white = "#fff";
    let grey = "#909399";
    let blue = "#409eff";

    export default {
        name: "layerContent",
        data() {
            return {
                form: {},
                bColor: white,
                tColor: grey
            };
        },
        components: {
            pointRender,
            lineRenderer,
            polygonRender
        },
        mounted() {
        },
        created() {
        },
        props: {
            layerNames: Array,
            myMap: Object
        },
        methods: {
            switchChange(e, layerName) {
                let eclassList = e.target.parentNode.classList;
                let map = this.myMap;
                let layerids = JSON.parse(sessionStorage.getItem(layerName));
                if (eclassList.length === 1) {
                    map.setLayoutProperty(layerName, "visibility", "visible");
                    for (let id in layerids) {
                        map.setLayoutProperty(layerids[id], "visibility", "visible");
                    }
                    eclassList.add("is-checked");
                } else {
                    map.setLayoutProperty(layerName, "visibility", "none");
                    for (let id in layerids) {
                        map.setLayoutProperty(layerids[id], "visibility", "none");
                    }
                    eclassList.remove("is-checked");
                }
            },
            showHidden(e) {
                //控制图层的显示隐藏，排除子节点以及BUTTON的点击事件
                let childList = e.target.parentNode.parentNode.parentNode.childNodes;
                for (let i = 0; i < childList.length; i++) {
                    if (childList[i].id === "polygonRender") {
                        childList[i].style.display =
                            childList[i].style.display === "none" ? "block" : "none";
                    } else if (childList[i].id === "pointRender") {
                        childList[i].style.display =
                            childList[i].style.display === "none" ? "block" : "none";
                    } else if (childList[i].id === 'lineRenderer') {
                        childList[i].style.display =
                            (childList[i].style.display === 'none') ? 'block' : 'none';
                    }
                }
            },
            //控制图层上下移动
            move(e, layerName) {
                //判断当前点击是上移或者下移，控制图层移动的方向
                if (e.offsetY < 6) {
                    this.upDown(layerName, "up");
                } else {
                    this.upDown(layerName, "down");
                }
                this.$forceUpdate(); //强制刷新视图
            },
            //缩放至点击图层
            locate(layerName) {
                //注：此功能实现过程假设所有的数据都存在服务器端，
                // 访问服务器存储数据文件夹的路径获取得到数据源，如有外来数据则此功能需要修改
                let map = this.myMap;
                let url = map.getSource(layerName)._data;

                if (url.match("/summer/file/dataJson/") != null) {
                    let filename = url.substr(url.lastIndexOf("/") + 1, url.length);
                    axios
                        .get(this.$platfromUrl.readProjectFile + filename, {
                            params: {
                                type: 2
                            }
                        })
                        .then(res => {
                            let jsonData = res.data.body;
                            //利用turf的bbox函数，为jsonData数据构建外包盒
                            let bbox1 = turf.bbox(jsonData);
                            //将bbox1增加一个1经纬度的外包盒，以免缩放至单点图层出错
                            let newbbox = [
                                bbox1[0] - 0.01 < -180 ? -180 : bbox1[0] - 0.01,
                                bbox1[1] - 0.01 < -90 ? -90 : bbox1[1] - 0.01,
                                bbox1[2] + 0.01 > 180 ? 180 : bbox1[2] + 0.01,
                                bbox1[3] + 0.01 > 90 ? 90 : bbox1[3] + 0.01
                            ];
                            if (newbbox[0] == Infinity) alert("选中图层未在视野内");
                            else {
                                map.fitBounds(newbbox);
                            }
                        })
                        .catch(err => console.log(err));
                } else {
                    var request = new XMLHttpRequest();
                    // make a GET request to parse the GeoJSON at the url
                    request.open('GET', url, true);
                    request.onload = function () {
                        if (this.status >= 200 && this.status < 400) {
                            // retrieve the JSON from the response
                            var jsonData = JSON.parse(this.response);

                            //利用turf的bbox函数，为jsonData数据构建外包盒
                            let bbox1 = turf.bbox(jsonData);
                            //将bbox1增加一个1经纬度的外包盒，以免缩放至单点图层出错
                            let newbbox = [
                                bbox1[0] - 0.01 < -180 ? -180 : bbox1[0] - 0.01,
                                bbox1[1] - 0.01 < -90 ? -90 : bbox1[1] - 0.01,
                                bbox1[2] + 0.01 > 180 ? 180 : bbox1[2] + 0.01,
                                bbox1[3] + 0.01 > 90 ? 90 : bbox1[3] + 0.01
                            ];
                            if (newbbox[0] == Infinity) alert("选中图层未在视野内");
                            else {
                                map.fitBounds(newbbox);
                            }
                        }
                    };
                    request.send();
                }
            },
            //删除选中图层
            destroy(layerName) {
                this.removeLayerid(layerName);
            },
            //更新缓存数据库内容
            refreshStorage() {
                sessionStorage.setItem("layers", this.layerNames);
                let styleJson = this.myMap.getStyle();
                sessionStorage.setItem("mapstyle", JSON.stringify(styleJson));
            },
            removeLayerid(str) {
                //读取图层是否存在关联图层(如点聚类效果关联的文字图层)
                let layerids = JSON.parse(sessionStorage.getItem(str));
                for (let id in layerids) {
                    this.myMap.removeLayer(layerids[id]);
                }
                sessionStorage.removeItem(str);
                //在map上移除某图层，更新图层数组，更新缓存数据库
                let pos;
                for (let i = 0; i < this.layerNames.length; i++) {
                    if (this.layerNames[i] === str) {
                        pos = i;
                        break;
                    }
                }
                this.myMap.removeLayer(str);
                this.myMap.removeSource(str);
                this.layerNames.splice(pos, 1);
                this.refreshStorage();
                this.$message({
                    message: str + "图层删除成功",
                    type: "success"
                });
            },
            upDown(str, dir) {
                //解析当前要调整的图层以及调整方向，调用对应函数，并更新数据库缓存
                let pos;
                for (let i = 0; i < this.layerNames.length; i++) {
                    if (this.layerNames[i] === str) {
                        pos = i;
                        break;
                    }
                }
                if (dir === "up") this.wrapLayerid(pos - 1, pos);
                else this.wrapLayerid(pos, pos + 1);
                this.refreshStorage();
            },
            wrapLayerid(a, b) {
                //调整图层列表中两个图层顺序 默认a<b
                if (a < 0 || b > this.layerNames.length - 1) return;
                this.myMap.moveLayer(this.layerNames[a], this.layerNames[b]);
                let temp = this.layerNames[a];
                this.layerNames[a] = this.layerNames[b];
                this.layerNames[b] = temp;
            }
        }
    };
</script>

<style scoped>
    .formclass {
        z-index: 2;
    }
</style>
