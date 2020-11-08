<!--主控制面板sidebar-->
<template>
    <div id="control">
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
                                <span @click="show('uploadData')">上传个人数据</span>
                            </div>
                            <div class="tool-panel-data-add">
                                <i class="el-icon-plus"></i>
                                <span @click="show('addjsonData')">添加个人数据</span>
                            </div>
                            <div class="tool-panel-data-add">
                                <i class="el-icon-plus"></i>
                                <span @click="show('addDBData')">添加公共数据</span>
                            </div>
<!--                            <div class="tool-panel-data-add">-->
<!--                                <i class="el-icon-plus"></i>-->
<!--                                <span @click="show('drawLayer')">绘制数据</span>-->
<!--                            </div>-->
                            <layerContent v-if="layerCon" style="margin-top:10px;width:245px"
                                          :layerNames="$parent.layerNames" :myMap="$parent.myMap"></layerContent>
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
            };
        },
        mounted() {

        },
        methods: {
            show(str) {
                this.$emit(str);
            },
            //控制子功能面板的关闭
            close(str) {
                if (str === 'dataItem') {
                    dataItem.style.display = 'none';
                }
            },
            //控制数据功能面板的开关及sidebar样式调整
            showDataitem(bl) {
                this.layerCon = true;
                dataItem.style.display='block';
                // dataItem.style.display = (dataItem.style.display==='block')?'none':'block';
                // if(!bl) dataItem.style.display='block';
            }
        },
        created() {
            let that=this;
            this.$Bus.$on('showdataItem',pa=>{
                that.showDataitem(pa);
            })
        }
    }
</script>

<style>
    #control {
        float: left;
        height: 100%;
        /*min-width: 418px;*/
        /*position: absolute;*/
        /*z-index: 10;*/
        /*margin-right: -350px;*/
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
        left: 0px;
        top: 0px;
        z-index: 20;
        width: 350px;
        height: 100%;
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