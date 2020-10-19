<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible" width="60%">
            <div slot="title" class="dialogTitle">
                <i class="el-icon-coin"></i>
                <span>数据详情</span>
            </div>
            <h2 style="text-align:center;">{{spaceData.oldName}}</h2>
            <h3 style="text-align:center;">{{spaceData.newName}}</h3>
            <p class="spaceContent">
                <span style="font-weight: bold">摘要：</span>
                <span class="abstractCut" id="ac">{{spaceData.abstractInfo | ellipsis}}</span>
                <el-button v-if="spaceData.abstractInfo.length > 300" @click="controlLength" type="text" id="cl">查看更多</el-button>
            </p>
            <p class="spaceContent"><span style="font-weight: bold">关键词：</span>{{spaceData.keywords}}</p>
            <p class="spaceContent"><span style="font-weight: bold">参考文献：</span>{{spaceData.reference}}</p>
            <p class="spaceContent"><span style="font-weight: bold">作者：</span>{{spaceData.uploader}}</p>
            <p class="spaceContent"><span style="font-weight: bold">数据类型：</span>{{spaceData.type1}}{{spaceData.type2}}</p>
            <p class="spaceContent"><span style="font-weight: bold">数据格式：</span>{{spaceData.format}}</p>
            <p class="spaceContent"><span style="font-weight: bold">数据大小：</span>{{spaceData.ram}}</p>
            <div class="spaceContent">
                <span style="font-weight: bold">数据图集：</span>
                <el-image v-if="picture_src" :fit="contain" style="width: 50px; height: 50px" :src="picture_src[0]" :preview-src-list="picture_src"></el-image>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        data () {
            return{
                dialogVisible: false,
                spaceData:[],
                showAll:false,
                picture_src:[],
                showViewer:true
            }
        },
        methods:{
            controlLength(){
                console.log(this.showAll)
                if(!this.showAll){
                    document.getElementById("ac").innerHTML=this.spaceData.abstractInfo
                    document.getElementById("cl").innerHTML="收起"
                }
                else{
                    document.getElementById("ac").innerHTML=this.spaceData.abstractInfo.slice(0,300)+"..."
                    document.getElementById("cl").innerHTML="查看更多"
                }
                this.showAll=!this.showAll
            },
            showPreview(){
                this.showViewer=true
            },
            closeViewer(){
                this.showViewer=false
            }
        },
        filters: {
            ellipsis(value) {
                if (!value) return "";
                if (value.length > 300) {
                    return value.slice(0, 300) + "...";
                }
                return value;
            }
        },
        created() {
           let that=this;
            this.$Bus.$on('spaceInfo',param=>{
                that.dialogVisible=param.dialogVisible
                that.spaceData=param.spaceData
                that.showAll=false
                that.picture_src=param.spaceData.picture.split(";")
            })
         }
    }
</script>

<style>
    .spaceContent{
        font-size: 16px;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .dialogTitle {
        text-align: left;
        font-size: 14px;
        font-weight: 700;
        overflow: hidden;
        /*background-color: #409eff;*/
    }
    .dialogTitle i {
        color: #409eff;
        font-size: 16px;
    }
    .abstractCut{
        line-height: 30px;
        /*letter-spacing: 2px;*/
    }
</style>