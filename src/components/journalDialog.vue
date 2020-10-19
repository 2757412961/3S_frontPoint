<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible" width="60%">
            <div slot="title" class="dialogTitle">
                <i class="el-icon-document"></i>
                <span>文章详情</span>
            </div>
            <h2 style="text-align:center;">{{journalData.title}}</h2>
            <p style="text-align:center;font-size: 16px;margin-top: 5px;">{{journalData.author}}</p>
            <p class="infoContent">
                <span style="font-weight: bold">摘要：</span>
                <span class="abstractCut" id="ac">{{journalData.abstract_ | ellipsis}}</span>
                <el-button v-if="journalData.abstract_.length > 300" @click="controlLength" type="text" id="cl">查看更多</el-button>
            </p>
            <p class="infoContent"><span style="font-weight: bold">关键词：</span>{{journalData.keywords}}</p>
            <p class="infoContent"><span style="font-weight: bold">发表年份：</span>{{journalData.year}}</p>
            <p class="infoContent"><span style="font-weight: bold">来源：</span>{{journalData.source}}第{{journalData.volume}}版第{{journalData.issue}}期{{journalData.pages}}页</p>
            <p class="infoContent"><span style="font-weight: bold">作者单位：</span>{{journalData.authorAffiliation}}</p>
            <el-button class="infoContent" @click="toJournal" type="text">获取文章</el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        data () {
            return{
               dialogVisible: false,
               journalData:[],
               showAll:false
            }
        },
        methods:{
            controlLength(){
                console.log(this.showAll)
                if(!this.showAll){
                    document.getElementById("ac").innerHTML=this.journalData.abstract_
                    document.getElementById("cl").innerHTML="收起"
                }
                else{
                    document.getElementById("ac").innerHTML=this.journalData.abstract_.slice(0,300)+"..."
                    document.getElementById("cl").innerHTML="查看更多"
                }
                this.showAll=!this.showAll
            },
            toJournal(){
                window.open(this.journalData.url, '_blank')
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
            this.$Bus.$on('journalInfo',param=>{
                that.dialogVisible=param.dialogVisible
                that.journalData=param.journalData
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