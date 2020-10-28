<!--主控制面板sidebar-->
<template>
    <div id="control">
        <div class="sidebar-default">
            <div class="sidebar-menu">
                <div class="sidebar-menu-UID">
                    <el-button icon="el-icon-s-custom" plain circle></el-button>
                </div>
                <button id="showDatabt" class="sidebar-menu-item" @click="showDataitem()">
                    <i class="el-icon-coin"></i>
                    <p>数据</p>
                </button>
                <button id="showBasemapbt" class="sidebar-menu-item" @click="showBasemapitem()">
                    <i class="el-icon-reading"></i>
                    <p>底图</p>
                </button>
                <button id="showSaveprobt" class="sidebar-menu-item" @click="showSaveproitem()">
                    <i class="el-icon-folder-add"></i>
                    <p>保存</p>
                </button>
                <button id="showOpenprobt" class="sidebar-menu-item" @click="showOpenproitem()">
                    <i class="el-icon-folder-opened"></i>
                    <p>打开</p>
                </button>
            </div>

        </div>
        <div style="width: 20%;">
            <div id="dataItem" class="sidebar-tool-panel" style="display:none">
                <div class="sidebar-tool-panel-title">
                    <span>数据</span>
                    <button style="float:right" @click="close('dataItem')">
                        <i class="el-icon-close"></i>
                    </button>
                </div>
                <div class="sidebar-tool-panel-content">
                    <el-scrollbar style="height:100%">
                        <div class="data-list-wrap" style="margin:15px;">
                            <div class="tool-panel-data-add">
                                <i class="el-icon-plus"></i>
                                <span @click="show('uploadData')">上传数据</span>
                            </div>
                            <div class="tool-panel-data-add">
                                <i class="el-icon-plus"></i>
                                <span @click="show('addjsonData')">添加数据</span>
                            </div>
                            <div class="tool-panel-data-add">
                                <i class="el-icon-plus"></i>
                                <span @click="show('drawLayer')">绘制数据</span>
                            </div>
                            <layerContent v-if="layerCon" style="margin-top:10px;width:245px"
                                          :layerNames="$parent.layerNames" :myMap="$parent.myMap"></layerContent>
                        </div>
                    </el-scrollbar>
                </div>
            </div>

            <div id="basemapItem" class="sidebar-tool-panel" style="display:none">
                <div class="sidebar-tool-panel-title">
                    <span>底图</span>
                    <button style="float:right" @click="close('basemapItem')">
                        <i class="el-icon-close"></i>
                    </button>
                </div>
                <div class="sidebar-tool-panel-content">
                    <el-scrollbar style="height:100%;">
                        <ul class="map-list" style="margin:5%;">
                            <li class="map-item">
                                <div class="map-item-thumb" @click="showVectertdt()">
                                    <el-image :src="basemapUrl[0]"></el-image>
                                </div>
                                <p class="map-item-title">矢量底图</p>
                            </li>
                            <li class="map-item">
                                <div class="map-item-thumb" @click="showImagetdt()">
                                    <el-image :src="basemapUrl[1]"></el-image>
                                </div>
                                <p class="map-item-title">影像底图</p>
                            </li>
                            <li class="map-item">
                                <div class="map-item-thumb" @click="showTerraintdt()">
                                    <el-image :src="basemapUrl[2]"></el-image>
                                </div>
                                <p class="map-item-title">地形晕染</p>
                            </li>
                        </ul>
                    </el-scrollbar>
                </div>
            </div>

            <div id="saveproItem" class="sidebar-tool-panel" style="display:none">
                <div class="sidebar-tool-panel-title">
                    <span>保存项目</span>
                    <button style="float:right" @click="close('saveproItem')">
                        <i class="el-icon-close"></i>
                    </button>
                </div>
                <div class="sidebar-tool-panel-content">
                    <el-scrollbar style="height:100%;">
                        <div style="margin:15px;">
                            <savePro :style="{width:'294px'}"></savePro>
                        </div>
                    </el-scrollbar>

                </div>
            </div>

            <div id="openproItem" class="sidebar-tool-panel" style="display:none">
                <div class="sidebar-tool-panel-title">
                    <span>打开项目</span>
                    <button style="float:right" @click="close('openproItem')">
                        <i class="el-icon-close"></i>
                    </button>
                </div>
                <div class="sidebar-tool-panel-content">
                    <el-scrollbar style="height:100%;">
                        <div style="margin:15px;">
                            <openPro v-if="openProject" style="margin-top:10px;width:294px" :layerNames="$parent.layerNames" :myMap="$parent.myMap"></openPro>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import LayerContent from "./layerContent";
    import SavePro from "./savePro";
    import openPro from "./openPro";
    import mapUrl from "../../util/mapurl";
    let map;
    export default {
        name: "controlAll",
        components: {SavePro, openPro, LayerContent},
        data() {
            return {
                isCollapse: true,
                layerCon:false,
                openProject:false,
                basemapUrl:[
                    'http://10.79.231.81/images/summer/map/basemap_vec.png',
                    'http://10.79.231.81/images/summer/map/basemap_img.png',
                    'http://10.79.231.81/images/summer/map/basemap_ter.png',
                ],
            };
        },
        mounted() {

        },
        methods: {
            show(str) {
                this.$emit(str);
            },
            //控制子功能面板的关闭
            close(str){
                if(str==='dataItem'){
                    dataItem.style.display='none';
                }
                else if(str==='basemapItem'){
                    basemapItem.style.display='none';
                }
                else if(str==='saveproItem'){
                    saveproItem.style.display='none';
                }
                else if(str==='openproItem'){
                    openproItem.style.display='none';
                }
            },
            //控制数据功能面板的开关及sidebar样式调整
            showDataitem() {
                this.layerCon = true;
                //未选中的功能面板隐藏
                basemapItem.style.display='none';
                saveproItem.style.display='none';
                openproItem.style.display='none';
                let val = dataItem.style.display;
                //选中的功能面板改变当前display样式
                if (val === 'none') {
                    dataItem.style.display = 'block';
                    //选中的功能按钮切换底色，未选中的功能按钮保持sidebar底色
                    showDatabt.style.backgroundColor='#44a5da';
                    showBasemapbt.style.backgroundColor='#273142';
                    showSaveprobt.style.backgroundColor='#273142';
                    showOpenprobt.style.backgroundColor='#273142';
                }
                else{
                    dataItem.style.display='none';
                    showDatabt.style.backgroundColor='#273142';
                }
            },
            //控制底图功能面板的打开及sidebar样式调整
            showBasemapitem(){
                dataItem.style.display='none';
                saveproItem.style.display='none';
                openproItem.style.display='none';
                let val = basemapItem.style.display;
                if(val==='none'){
                    basemapItem.style.display='block';
                    showBasemapbt.style.backgroundColor='#44a5da';
                    showDatabt.style.backgroundColor='#273142';
                    showSaveprobt.style.backgroundColor='#273142';
                    showOpenprobt.style.backgroundColor='#273142';
                }
                else{
                    basemapItem.style.display='none';
                    showBasemapbt.style.backgroundColor='#273142';
                }
            },
            //控制保存项目功能面板的打开及sidebar样式调整
            showSaveproitem() {
                this.show('showSavepro');
                dataItem.style.display='none';
                basemapItem.style.display='none';
                openproItem.style.display='none';
                let val = saveproItem.style.display;
                if(val==='none'){
                    saveproItem.style.display='block';
                    showSaveprobt.style.backgroundColor='#44a5da';
                    showDatabt.style.backgroundColor='#273142';
                    showBasemapbt.style.backgroundColor='#273142';
                    showOpenprobt.style.backgroundColor='#273142';
                }
                else{
                    saveproItem.style.display='none';
                    showSaveprobt.style.backgroundColor='#273142';
                }
            },
            //控制打开项目功能面板的打开及sidebar样式调整
            showOpenproitem(){
                this.openProject=true;
                dataItem.style.display='none';
                basemapItem.style.display='none';
                saveproItem.style.display='none';
                let val = openproItem.style.display;
                if(val==='none'){
                    openproItem.style.display='block';
                    showOpenprobt.style.backgroundColor='#44a5da';
                    showDatabt.style.backgroundColor='#273142';
                    showBasemapbt.style.backgroundColor='#273142';
                    showSaveprobt.style.backgroundColor='#273142';
                }
                else{
                    openproItem.style.display='none';
                    showOpenprobt.style.backgroundColor='#273142';
                }
            },
            //显示矢量底图
            showVectertdt(){
                //通过设置各图层可见性实现底图更换
                this.$parent.myMap.setLayoutProperty("tdtvec", 'visibility', 'visible');
                this.$parent.myMap.setLayoutProperty("tdtcva", 'visibility', 'visible');
                this.$parent.myMap.setLayoutProperty("tdtimg", 'visibility', 'none');
                this.$parent.myMap.setLayoutProperty("tdtcia", 'visibility', 'none');
                this.$parent.myMap.setLayoutProperty("tdtter", 'visibility', 'none');
                this.$parent.myMap.setLayoutProperty("tdtcta", 'visibility', 'none');
            },
            //显示影像底图
            showImagetdt(){
                this.$parent.myMap.setLayoutProperty("tdtvec", 'visibility', 'none');
                this.$parent.myMap.setLayoutProperty("tdtcva", 'visibility', 'none');
                this.$parent.myMap.setLayoutProperty("tdtimg", 'visibility', 'visible');
                this.$parent.myMap.setLayoutProperty("tdtcia", 'visibility', 'visible');
                this.$parent.myMap.setLayoutProperty("tdtter", 'visibility', 'none');
                this.$parent.myMap.setLayoutProperty("tdtcta", 'visibility', 'none');
            },
            //显示地形晕染底图
            showTerraintdt(){
                this.$parent.myMap.setLayoutProperty("tdtvec", 'visibility', 'none');
                this.$parent.myMap.setLayoutProperty("tdtcva", 'visibility', 'none');
                this.$parent.myMap.setLayoutProperty("tdtimg", 'visibility', 'none');
                this.$parent.myMap.setLayoutProperty("tdtcia", 'visibility', 'none');
                this.$parent.myMap.setLayoutProperty("tdtter", 'visibility', 'visible');
                this.$parent.myMap.setLayoutProperty("tdtcta", 'visibility', 'visible');
            }
        }
    }
</script>

<style>
    #control {
        height: 600px;
        min-width: 418px;
        position: absolute;
        z-index: 10;
        margin-right: -350px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }

    .sidebar-default {
        position: relative;
        margin: 0;
        height: 100%;
        width: 68px;
        font-size: 13px;
        box-shadow: 2px 0 4px rgba(0, 0, 0, 0.35);
    }

    .sidebar-menu {
        position: relative;
        left: 0;
        height: 100%;
        width: 68px;
        padding: 68px 8px 8px;
        background-color: #273142;
        min-height: 600px;
    }

    .sidebar-menu-UID {
        position: absolute;
        left: 0;
        top: 0;
        margin-top: 9px;
        padding-top: 9px;
        width: 100%;
        height: 68px;
        text-align: center;
        overflow: hidden;
    }

    .sidebar-menu-item {
        width: 52px;
        height: 52px;
        color: #fff;
        backgroundcolor: #273142;
        margin-top: 9px;
        margin-bottom: 9px;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;
    }

    .sidebar-menu-item-active {
        width: 52px;
        height: 52px;
        color: #fff;
        backgroundcolor: #44a5da;
        margin-top: 9px;
        margin-bottom: 9px;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;
    }

    .sidebar-menu-item:hover {
        background-color: #1a1a1a;
    }

    .sidebar-menu-item > i {
        font-size: 20px;
        height: 24px;
        line-height: 22px;
        margin-top: 1px;
    }

    .sidebar-menu-item-button {
        width: 100%;
        height: 100%;
        border-radius: 3px
    }

    .sidebar-tool-panel {
        position: absolute;
        left: 68px;
        top: 0px;
        z-index: 20;
        width: 350px;
        min-height: 600px;
        background-color: #fff;
        border: 1px solid #ddd;
        color: rgba(9, 17, 32, 0.65);
    }

    .sidebar-tool-panel-title {
        padding: 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        font-size: 16px
    }


    .sidebar-tool-panel-content {
        padding: 12px;
        position: absolute;
        top: 43px;
        bottom: 0;
        left: 0;
        width: 348px;
        z-index: 3;
    }

    .el-scrollbar__wrap {
        overflow-x: hidden;
    }

    .tool-panel-data-add {
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        transition: background-color .3s ease-in-out;
    }

    .tool-panel-data-add:hover {
        background-color: #dee4c8;
    }

    .map-list {
        padding: 0;
        margin-top: 4px;
        width:90%;
        overflow-y: auto;
        text-align: center;
        list-style: none;
        padding: 8px;
        display: inline-block;
        float: left;
    }

    .map-item {
        padding: 0;
        margin-top: 4px;
        overflow-y: auto;
        text-align: center;
        list-style: none;
        padding: 8px;
        display: inline-block;
        float: left;
    }


    .map-item-thumb {
        width: 120px;
        height: 110px;
        background-size: contain;
        border-radius: 2px;
        cursor: pointer;
        text-align: center;
        border: 1px solid #dbdbdb;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
        position: relative;
    }

    .map-item-title {
        height: 25px;
        padding-top: 6px;
        color: rgba(9, 17, 32, .65);
    }
</style>