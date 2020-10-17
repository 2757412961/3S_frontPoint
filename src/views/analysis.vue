<template>
    <el-container :style="{height:$window.height+'px'}">
       <el-aside style="width:10% ">
           <el-menu
                   default-active="1"
                   class="el-menu-vertical-demo"
                   :background-color="'#303133'"
                   :text-color="'#ddd'"
                   :active-text-color="'#409eff'"
                   :style="{position: 'fixed',width: '10%',height: '100%',scroll:'false','z-index':3}">
               <el-menu-item index="1" @click="modelManagedis=true,workFlowdis=false,jobMonitordis=false">模型管理</el-menu-item>
               <el-menu-item index="2" @click="modelManagedis=false,workFlowdis=true,jobMonitordis=false">工作流构建</el-menu-item>
               <el-menu-item index="3" @click="modelManagedis=false,workFlowdis=false,jobMonitordis=true">任务监控</el-menu-item>
           </el-menu>
       </el-aside>
        <el-main style="height: 100%">
            <modelManager v-show="modelManagedis"
                          :style="{position:'relative','margin-left':'10%'}"></modelManager>
            <workFlow v-show="workFlowdis"
                      :style="{position:'relative','margin-left':'10%'}"></workFlow>
            <taskMonitor v-show="jobMonitordis"
                         :style="{position:'relative','margin-left':'10%'}" ></taskMonitor>

        </el-main>
      <el-footer>
          <page-footer style="margin-left:10%;"></page-footer>
      </el-footer>

    </el-container>

</template>

<script>
    import workFlow from "../components/workFlow";
    import modelManager from "../components/modelManager";
    import taskMonitor from "../components/taskMonitor";
    import pageFooter from "../components/pageFooter";

    export default {
        name: "analysis",
        computed:
        {},
        data(){
          return{
              modelManagedis:true,
              workFlowdis:false,
              jobMonitordis:false,
              UsageList:[],
              ModelList:[],
              totalCount:0
          }
        },
        mounted() {
        },
        components:{
            workFlow,
            modelManager,
            taskMonitor,
            pageFooter
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
.all{
    float:top;
    width: 100%;
    height: 100%;

}
</style>