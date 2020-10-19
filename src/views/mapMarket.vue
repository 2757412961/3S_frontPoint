<template>
    <div>
        <el-row :style="{'min-height': ($window.height-116)+'px',clear:'right'}">
            <el-col :span="8" v-for="map in mymapList" :key="map.id" style="width:16%;height: 70%;margin: 2%">
                <el-card :body-style="{ padding: '0px' }">
                    <!--后续将图片的url也构成数组中的某个元素-->
                    <img :src="map.PICTURE"
                         :style="{position:'relative',left:'15px',top:'5px',width:'220px',height:'200px'}"
                         class="image">
                    <div style="padding-left: 15px;padding-bottom: 25px">
                        <div><span>{{map.NAME}}</span></div>
                        <div style="float:left">
                            <el-tag size="mini">{{map.COMPANY}}</el-tag>
                        </div>
                        <div style="float:right">
                            <span @click="switchUrl(map.URL)"><i class="el-icon-info"></i></span>
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
        <div style="height: 12px"></div>
    </div>
</template>

<script>
    export default {
        name: "mapMarket",
        mounted() {

            this.$axios.get(this.$URL.getmapService+"?pageNo="+this.pageNo+"&pageSize="+this.pageSize).then(res=>{
                debugger;
                this.mytotal=res.body.totalCount;
                this.mymapList=res.body.result;
            }).catch(err=>{})
        },
        data(){
            return{
                mymapList:[],
                pagemodel:'',
                mytotal:0,
                pageNo:1,
                pageSize:10
            }
        },
        methods:{
            switchUrl(url)
            {
                window.open(url);
            },
            ChangePage(currentPage)
            {
                this.pageNo=currentPage;
                this.$axios.get(this.$URL.getmapService+"?pageNo="+this.pageNo+"&pageSize="+this.pageSize).then(res=>{
                    debugger;
                    this.mytotal=res.body.totalCount;
                    this.mymapList=res.body.result;
                }).catch(err=>{})
            }
        }
    }
</script>

<style scoped>

</style>