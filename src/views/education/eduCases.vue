<template>
    <div>
        <Jupyter @backto="Back" v-show="jdis"></Jupyter>
        <markdown @backto2="Back2" v-show="mkdis"></markdown>
        <div v-show="mdis">
            <el-row :style="{'min-height': ($window.height-116)+'px',clear:'right'}">
                <el-col :span="8" v-for="(eduCase,index) in myEduList" :key="eduCase.id" style="width:16%;height: 70%;margin: 2%">
                    <el-card :body-style="{ padding: '0px' }">
                        <!--后续将图片的url也构成数组中的某个元素-->
                        <img :src=$URL.baseUrl+eduCase.picPath
                             :style="{position:'relative',left:'15px',top:'5px',width:'90%',height:'200px'}"
                             class="image">
                        <div style="padding-left: 15px;padding-bottom: 25px">
                            <div><span>{{eduCase.name}}</span></div>
                            <div style="float:left">
                                <el-tag size="mini">{{eduCase.keywords}}</el-tag>
                            </div>
                            <div style="float:right">
                                <span @click="switchUrl(index)"><i class="el-icon-info"></i></span>
                                <!--                            http://10.79.231.81:8888/notebooks/MetallogenicPred/Metallogenic%20Prediction.ipynb-->
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div style="height: 12px"></div>
            <div style="height:12%;width: 100%;text-align:center;">
                <el-pagination v-model="pagemodel"
                               :page-size="pageSize"
                               layout="prev, pager, next"
                               :total="mytotal"
                               background
                               @current-change="ChangePage">
                </el-pagination>
            </div>
            <el-row  type="flex" justify="end" >
                <el-button style="margin-right: 22px;" v-on:click="download()" >案例下载</el-button>
            </el-row>
            <div style="height: 10px"></div>
        </div>
    </div>

</template>

<script>
    import Jupyter from "./jupyter/jupyter";
    import Markdown from "./markdown/markdown";
    export default {
        name: "eduCases",
        components: {Markdown, Jupyter},
        mounted() {

            this.$axios.get(this.$URL.getEduCasesUrl+"?pageNo="+this.pageNo+"&pageSize="+this.pageSize).then(res=>{
            debugger;
                this.mytotal=res.body.totalCount;
                this.myEduList=res.body.result;
            }).catch(err=>{})
        },
        data(){
            return{
                jdis:false,
                mkdis:false,
                mdis:true,
                myEduist:[],
                pagemodel:'',
                mytotal:0,
                pageNo:1,
                pageSize:10
            }
        },
        methods:{
            Back()
            {
              this.jdis=false;
              this.mdis=true;
            },
            Back2()
            {
                this.mkdis=false;
                this.mdis=true;
            },
            switchUrl(index)
            {
                // global.console.log(index);
                global.console.log(this.myEduList[index]);
                debugger;

                if(this.myEduList[index]['fileType'] == "1"){
                    this.$Bus.$emit('teachModelInfoMD',{
                        filePath: this.myEduList[index]['filePath'],
                        picPath: this.myEduList[index]['picPath'],

                    });
                    global.console.log(this.myEduList[index]['filePath']);
                    this.mkdis=true;
                    this.mdis=false;
                } else {
                    this.$Bus.$emit('teachModelInfoJP',{
                        filePath: this.myEduList[index]['filePath'],
                        picPath: this.myEduList[index]['picPath'],
                    });
                    this.jdis=true;
                    this.mdis=false;
                }
                // window.open(url);
            },
            ChangePage(currentPage)
            {
                this.pageNo=currentPage;
                this.$axios.get(this.$URL.getEduCasesUrl+"?pageNo="+this.pageNo+"&pageSize="+this.pageSize).then(res=>{
                debugger;
                    this.mytotal=res.body.totalCount;
                    this.myEduList=res.body.result;
                }).catch(err=>{})
            },
            download(){
            //    src="http://10.79.231.81:90/images/"
                let url = "http://10.79.231.81:90/images/";
                window.open(url);

            }
        }
    }
</script>

<style scoped>

</style>