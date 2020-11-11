<template>
    <el-container id="myAnalysis" :style="{height:$store.state.height+'px'}">
        <el-aside width="200">
            <el-menu
                    default-active="1"
                    :background-color="'#303133'"
                    :text-color="'#ddd'"
                    :active-text-color="'#409eff'"
                    :style="{width: '200px', height: '100%', scroll:'false','z-index':3}">
                <el-menu-item index="1"
                              @click="modelManagedis=true,workFlowdis=false,jobMonitordis=false,mapVisualdis=false,mapBoxdis=false">
                    模型管理
                </el-menu-item>
                <el-menu-item index="2"
                              @click="modelManagedis=false,workFlowdis=true,jobMonitordis=false,mapVisualdis=false,mapBoxdis=false,resizeEchart()">
                    工作流构建
                </el-menu-item>
                <el-menu-item index="3"
                              @click="modelManagedis=false,workFlowdis=false,jobMonitordis=true,mapVisualdis=false,mapBoxdis=false">
                    任务监控
                </el-menu-item>
                <el-menu-item index="5"
                              @click="modelManagedis=false,workFlowdis=false,jobMonitordis=false,mapVisualdis=false,resizeMap()">
                    地图上图
                </el-menu-item>

            </el-menu>
        </el-aside>

        <el-container>
            <el-main>
                <modelManager v-if="modelManagedis"></modelManager>
                <workFlow ref="workflow" v-show="workFlowdis"></workFlow>
                <taskMonitor v-show="jobMonitordis"></taskMonitor>
                <mapBoxFromSummer v-show="mapBoxdis"></mapBoxFromSummer>
            </el-main>
            <el-footer>
                <page-footer></page-footer>
            </el-footer>
        </el-container>

    </el-container>

</template>

<script>
    import workFlow from "../components/workFlow";
    import modelManager from "../components/modelManager";
    import taskMonitor from "../components/taskMonitor";
    import pageFooter from "../components/pageFooter";
    import MapVisualization from "../components/MapBoxComponents/MapVisualization";
    import mapBoxFromSummer from "../components/MapBoxComponents/mapbox"

    export default {
        name: "analysis",
        computed:
            {},
        data() {
            return {
                modelManagedis: true,
                workFlowdis: false,
                jobMonitordis: false,
                mapVisualdis: false,
                mapBoxdis: false,
                UsageList: [],
                ModelList: [],
                totalCount: 0
            }
        },
        mounted() {},
        components: {
            workFlow,
            modelManager,
            taskMonitor,
            pageFooter,
            MapVisualization,
            mapBoxFromSummer
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            resizeMap() {
                this.$Bus.$emit('showdataItem',this.mapBoxdis);
                // this.$Bus.$emit('resizeMap', 'something');
                this.mapBoxdis=true;
                setTimeout(() => {
                    this.$globalConstant.map.resize();
                }, 100);
            },
            resizeEchart()
            {
                this.$refs.workflow.resize();
            }
        }
    }
</script>

<style scoped>

</style>