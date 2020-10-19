<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible" width="60%">
            <div slot="title" class="dialogTitle">
                <i class="el-icon-document"></i>
                <span>文章详情</span>
            </div>
            <h2 style="text-align:center;">{{infoData.title}}</h2>
            <h3 style="text-align:center;">{{infoData.englishTitle}}</h3>
            <p style="text-align:center;font-size: 16px;margin-top: 5px;">{{infoData.author}}</p>
            <p class="infoContent">
                <span style="font-weight: bold">摘要：</span>
                <span class="abstractCut" id="ac">{{infoData.abstract_ | ellipsis}}</span>
                <el-button v-if="infoData.abstract_.length > 300" @click="controlLength" type="text" id="cl">查看更多</el-button>
            </p>
            <p class="infoContent"><span style="font-weight: bold">发表年份：</span>{{infoData.year}}</p>
            <p class="infoContent"><span style="font-weight: bold">所在单位/学校：</span>{{infoData.publisher}}</p>
            <el-button class="infoContent" @click="toPPT" type="text">查看论文</el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        data () {
            return{
               dialogVisible: false,
               infoData:[],
               showAll:false
            }
        },
        methods:{
            controlLength(){
                //console.log(this.showAll)
                if(!this.showAll){
                    document.getElementById("ac").innerHTML=this.infoData.abstract_
                    document.getElementById("cl").innerHTML="收起"
                }
                else{
                    document.getElementById("ac").innerHTML=this.infoData.abstract_.slice(0,300)+"..."
                    document.getElementById("cl").innerHTML="查看更多"
                }
                this.showAll=!this.showAll
            },
            toPPT(){
                window.open(this.infoData.url, '_blank')
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
            this.$Bus.$on('paperInfo',param=>{
                that.dialogVisible=param.dialogVisible
                that.infoData=param.infoData
                that.showAll=false
            })
         }
    }
</script>

<style>
    .infoContent{
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