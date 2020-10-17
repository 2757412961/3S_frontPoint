<template>
    <!--模型管理界面,主要的功能为注册模型，注销模型，查看模型信息，搜索-->
    <div class="modelMain">
        <modelUpload></modelUpload>
        <modelSearch @modelRefresh="refresh(currentPage[activeName],activeName)" @modelInfo="moreInfo($event)"></modelSearch>
        <modelInfo></modelInfo>
        <div class="search">
            <el-button icon="el-icon-refresh" circle @click="refresh(currentPage[activeName],activeName)"></el-button>
            <el-button icon="el-icon-plus" circle @click="startUpload"></el-button>
            <el-button id="searchButton" icon="el-icon-search" circle @click="searchModel()"></el-button>
            <el-input v-if="inputDis" v-model="modelInput" placeholder="" style="width:120px"></el-input>
        </div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="ChangeUse" style="height: 100%">
            <el-tab-pane v-for="usage in myusageList" :key="usage.name" :label="usage.name" :name="usage.name" style="height: 100%">
                <el-row :style="{'min-height': $window.height*0.61+'px',clear:'right'}">
                    <el-col :style="{width:'12%',height:'40%',margin:'10px'}" :span="8" v-for="model in mymodelList" :key="model.id">
                        <el-card :body-style="{ padding: '0px' }">
                            <!--后续将图片的url也构成数组中的某个元素-->
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                 :style="{position:'relative',left:'15px',top:'5px',width:'77%',height:'90%'}"
                                 class="image">
                            <div style="padding-left: 15px;padding-bottom: 25px">
                                <div><span>{{model.name}}</span></div>
                                <div style="float:left">
                                    <el-tag size="mini">{{model.isPublic}}</el-tag>
                                </div>
                                <div style="float:right">
                                    <span @click="unregister(model.name)"><i class="el-icon-remove"></i></span>
                                    <span @click="moreInfo(model.name)"><i class="el-icon-info"></i></span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <div style="height: 12px"></div>
                <div style="height:12%;width: 100%;text-align:center;">
                    <el-pagination v-model="usage.name"
                                   :page-size="14"
                                   :pager-count="5"
                                   layout="prev, pager, next"
                                   :total="mytotal"
                                   background
                                   @current-change="ChangePage">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
    import axios from "../util/axios"
    import modelUpload from "./Dialog/modelUpload";
    import modelSearch from "./Dialog/modelSearch";
    import modelInfo from "./Dialog/modelInfo";
    export default {
        name: "modelManager",
        computed:{},
        components:{
            modelInfo,
            modelUpload,
            modelSearch
        },
        mounted() {
            console.log('mountedmm');
            //重新挂载的时候刷新页面
            this.$axios.get(this.$platfromUrl.getAllUsagesUrl).then(res=>{

                console.log('getusages');
                this.myusageList=res.body;
                this.myusageList.push({'name':'我的模型'});
                this.activeName=this.myusageList[0].name;
                this.refresh(1,this.activeName);
            }).catch(err=>{})

        },
        data(){
            return {
                UsageList:[],
                activeName:'',
                mytotal:0,
                modelInput:'',
                inputDis:false,
                myusageList:[],
                mymodelList:[],
                currentPage:{}
            }
        },
        methods:{
            ChangePage(currentPage)
            {
                //每次调整页码的时候获取到对应的页码,存入currentPage对象中
                this.currentPage[this.activeName]=currentPage;
                //调用后端接口，传入pagesize，当前页，当前类别，通过refresh函数实现
                if(currentPage)
                {
                    this.refresh(currentPage,this.activeName);
                }

            },
            ChangeUse(para)
            {
                //当第一次跳转到页面的时候
                let cp=this.currentPage[this.activeName];
                if(!cp) this.currentPage[this.activeName]=1;

                let usage=para.name;
                //每次切换tag页面，显示对应类别的第一页，并且更新totalC(总条目数)，通过refresh函数实现
                if(usage)
                {
                    this.refresh(this.currentPage[this.activeName],usage);
                }
            },
            //根据输入的文本信息this.modelInput获取得到模型列表，通过tableData数组传递，获取完毕后显示modelSearch
            searchModel()
            {
                let that=this;
                if(this.inputDis)
                {
                    let el=document.getElementById('searchButton');
                    el.childNodes[1].classList.remove('el-icon-search');
                    el.childNodes[1].classList.add('el-icon-loading');
                    console.log();

                    if(this.modelInput==='')
                        this.$message.warning("搜索内容不可为空");
                    else
                    {
                        this.$axios.get(this.$platfromUrl.searchModelUrl,{

                                keywords:this.modelInput

                        }).then(res=>{
                            let re=res.body;
                            let totalc=re.totalCount;
                            let mlist=re.result;
                            let tableData=[];

                            for(let i=0;i<mlist.length;i++)
                            {
                                let pub='私有';
                                if(mlist[i].isPublic) pub='公有';
                                tableData.push({'name':mlist[i].artifactId,'usage':mlist[i].usages,'isPublic':pub,'description':mlist[i].keywords});
                            }
                            el.childNodes[1].classList.remove('el-icon-loading');
                            el.childNodes[1].classList.add('el-icon-search');
                            this.$Bus.$emit('modelSearch',{
                                tableData:tableData,
                                dialogVisible:true,
                                keywords:that.modelInput,
                                totalCount:totalc
                            })
                        }).catch(err=>{})
                    }
                    this.inputDis=false;
                }
                else{
                    this.inputDis=true;
                }
            },
            //显示注册模型的dialog(modelUpload)
            startUpload()
            {
                //显示一个上传文件的dialog
                this.$Bus.$emit('modelUpload',{
                    dialogVisible:true
                })
            },
            //根据对应的模型名注销模型
            unregister(modelname)
            {
                let that=this;
                this.$axios.remove(this.$platfromUrl.deleteModelUrl+modelname).then(res=>{
                    //重新获取当前页面的对应条目数
                    if(res.code===200)
                    {
                        //通过refresh函数刷新页面
                        that.refresh(that.currentPage,that.activeName);
                        this.$message.success('模型删除成功')
                    }
                    else
                    {
                        this.$message.error(res.message)
                    }
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })

            },
            moreInfo(modelname)
            {
                this.$axios.get(this.$platfromUrl.getModelbyId+modelname).then(res=>{
                    let temp=res.body;
                    let re={};
                   // let params=temp.params;
                  //  console.log(JSON.parse(params));
                    re['模型名']=temp.artifactId;
                    re['用途']=temp.usages;
                    re['关键词']=temp.keywords;
                    re['描述']=temp.description;
                    if(temp.isPublic) re['权限']='公有';
                    else re['权限']='私有';
                    for(let key in re)
                    {
                        if(re[key]==='') re[key]='暂无信息';
                    }
                    this.$Bus.$emit('modelInfo',{
                        dialogVisible:true,
                        formData:re
                    })
                }).catch(err=>{})

            },
            //基于所给的页码和当前类别，获取得到对应的模型列表，更新this.mytotal(获取到正确的分页列表)
            refresh(page,type)
            {
                debugger;
                console.log('refresh');
                if(type==='我的模型')
                {
                    //查询当前用户对应的模型列表
                    this.$axios.get(this.$platfromUrl.getModelbyUserUrl).then(res=>{

                        while(this.mymodelList.length) this.mymodelList.pop();
                        debugger;
                        let mlist=res.body.result;
                        this.mytotal=mlist.length;
                        for(let i=0;i<mlist.length;i++)
                        {
                            let pub='私有';
                            if(mlist[i].isPublic) pub='公有';
                            this.mymodelList.push({'id':i,'name':mlist[i].artifactId,'usage':mlist[i].usages,'isPublic':pub});
                        }
                        this.$forceUpdate();
                    }).catch(err=>{})
                }
                else
                {
                    this.$axios.get(this.$platfromUrl.getModelbyTypeUrl+type,
                        {
                            pageNo:page,
                            pageSize:14
                        }
                    ).then(res=>{
                        debugger;
                        while(this.mymodelList.length) this.mymodelList.pop();
                        let mlist=res.body.result;
                        this.mytotal=res.body.totalCount;
                        for(let i=0;i<mlist.length;i++)
                        {
                            let pub='私有';
                            if(mlist[i].isPublic) pub='公有';
                            this.mymodelList.push({'id':i,'name':mlist[i].artifactId,'isPublic':pub});
                        }
                        this.$forceUpdate();
                    }).catch(err=>{
                        console.log(err);
                    })
                }

            }
        },

        created() {
        }

    }
</script>

<style scoped>
.modelMain
{
    position:relative;
    width: 90%;
    height: 100%;
    margin-left: 10px;
}
.search
{
    position: absolute;
    right: 0%;
    top:0%;
    z-index: 2;
}
.el-tabs__content
{
    height: 100%;
}
</style>