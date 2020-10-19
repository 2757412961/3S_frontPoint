<template>
    <div>
        <el-container>
            <el-aside width="260px">
                <el-col>
                    <el-input placeholder="输入用户名查询上传的数据" prefix-icon="el-icon-search"
                        @keyup.enter.native="searchByuserName"
                        v-model="input">
                    </el-input>
                    <el-menu default-active="2" class="el-menu-vertical-demo" 
                        unique-opened>
                        <div  v-for="item in menuList" :key="item.index">
                            <el-submenu v-if="item.children" :index="item.index">
                                <template slot="title">
                                    <span>{{item.title}}</span>
                                </template>
                                <el-menu-item-group v-if="item.children">
                                    <el-menu-item v-for="subItem in item.children" :key="subItem.title" :index="subItem.index"
                                        @click="filterByType2(subItem.title,item.title)">
                                        {{subItem.title}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-menu-item v-else :index="item.index" @click="filterByType1(item.title)">
                                <span slot="title">{{item.title}}</span>
                            </el-menu-item>
                        </div>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-main>
                <div class="hm">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>空间数据</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-button type="primary" style="margin-top: 10px">热门数据</el-button>
                </div>
                <spaceList ref="spaceList" :tableData="datalist"></spaceList>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import axios from 'axios'
    import spaceList from '../components/spaceList'
    export default {
        data() {
            return {
                input: '',
                menuList: [
                    {
                        index: '0',
                        title: '全部资源'
                    },
                    {
                        index: '1',
                        title: '土地资源类数据',
                        children: [
                            {
                                index: '1-1',
                                title: '土地利用数据'
                            },
                            {
                                index: '1-2',
                                title: '地形、地貌、土壤数据'
                            },
                            {
                                index: '1-3',
                                title: '遥感数据'
                            },
                            {
                                index: '1-4',
                                title: '作物数据'
                            }
                        ]
                    },
                    {
                        index: '2',
                        title: '生态环境类数据',
                        children: [
                            {
                                index: '2-1',
                                title: '环境污染数据'
                            },
                            {
                                index: '2-2',
                                title: '生态系统数据'
                            },
                            {
                                index: '2-3',
                                title: '植被指数数据'
                            },
                            {
                                index: '2-4',
                                title: '地表相关数据'
                            },
                            {
                                index: '2-5',
                                title: '作物数据'
                            }
                        ]
                    },
                    {
                        index: '3',
                        title: '地理国情资源类',
                        children: [
                            {
                                index: '3-1',
                                title: '土地利用数据'
                            }
                        ]
                    },
                    {
                        index: '4',
                        title: '地理信息科学类',
                        children: [
                            {
                                index: '4-1',
                                title: '地形、地貌、土壤数据'
                            },
                            {
                                index: '4-2',
                                title: '作物数据'
                            },
                            {
                                index: '1-3',
                                title: '遥感数据'
                            },
                            {
                                index: '1-4',
                                title: '土地利用数据'
                            }
                        ]
                    },
                    {
                        index: '5',
                        title: '社会经济类数据',
                        children: [
                            {
                                index: '5-1',
                                title: '作物数据'
                            },
                        ]
                    }
                ],
                dataLength: 0,
                odatalist: [{
                    title:'内蒙古植被NDVI变化趋势及影响因子数据集（2000-2015）',
                    uploader:'陈宽,潮洛濛',
                    time:'2020-08-01',
                    type_1:'生态环境类数据',
                    type_2:'植被指数数据',
                    keywords:'内蒙古,NDVI,影响因子,2000-2015',
                    abstract:'作者基于2000-2015年每月的分辨率为1km的SPOT/VEGETATION NDVI数据，运用最大值合成法生成每年的NDVI数据；结合统计年鉴数据，采用趋势分析法和地理探测器模型，计算得到内蒙古植被NDVI变化趋势及影响因子数据集（2000-2015）。该数据集包括地理信息系统空间数据和统计表格数据两种类型。空间数据包括：（1）内蒙古2000-2015年NDVI年变化趋势1km栅格数据；（2）基于2000-2015年NDVI年变化趋势的变化程度分类1km栅格数据;（3）自然因子数据，包括2000-2015年的降水量、平均气温变化趋势、坡向、坡度分级和植被类型1 km栅格数据；（4）以旗、县为基础单元的人为因子地理信息系统数据，包括2000-2015年乡村人口变化趋势、乡村户数变化趋势、乡村劳动力变化趋势、粮食产量变化趋势、农牧民人均纯收入变化趋势和牲畜数量变化趋势等6项属性数据。表格数据包括：（1）基于植被NDVI变化划分的植被变化等级所占的面积及比例；（2）导致内蒙古牧业旗县和非牧业旗县植被NDVI变化的主要影响因素及q值。数据集存储为.tif、.shp 和.xlsx 格式，由47个文件组成，数据量为65.4 MB（压缩为1个文件，12.7 MB）。',
                    reference:'陈宽,潮洛濛*.内蒙古植被NDVI变化趋势及影响因子数据集（2000-2015）[DB/J].全球变化数据仓储,2020.DOI:10.3974/geodb.2020.05.07.V1.',
                    picture:'http://www.geodoi.ac.cn/Upload/1541/Image/Suo_2020819142524637334439242019411.jpg;http://www.geodoi.ac.cn/Upload/1541/Image/Suo_2020819142524637334439249349830.jpg',
                    old_filename:'内蒙古植被NDVI变化趋势及影响因子数据集（2000-2015）',
                    new_filename:'NDVITrends&FactorsInnerMongolia',
                    format:'.tif,.shp,.xlsx',
                    ram:'12.7MB',
                    download_times:'1',
                    username:'zjh',
                    download_authority:'1'
                },{
                    title:'南极冰架年崩解数据集（2005-2019）',
                    uploader:'戚梦真,刘岩,程晓*,冯启阳,惠凤鸣,陈卓奇',
                    time:'2020-07-01',
                    type_1:'土地资源类数据',
                    type_2:'地形、地貌、土壤数据',
                    keywords:'南极,冰架,崩解,遥感',
                    abstract:'崩解是南极冰架物质平衡的核心过程之一，也是精细监测冰架变化的重要物理量。作者运用2005-2019年每年8月初的多源遥感数据，提取了2005年8月至2019年8月14年间南极冰架发生的所有面积在1 km²以上的年崩解事件，计算了它们的面积、厚度、崩解量与崩解周期等，得到南极冰架年崩解数据集（2005-2019）。该数据集包括14个年度的南极冰架崩解分布数据，包括冰架崩解年份区间、崩解区长度、面积、平均厚度、崩解量、崩解周期和崩解类型等信息。该数据集以.shp格式存储，由112个数据文件组成，数据总量为10.2 MB（压缩为1个文件，3.23 MB）。',
                    reference:'戚梦真,刘岩,程晓*,冯启阳,惠凤鸣,陈卓奇.南极冰架年崩解数据集（2005-2019）[DB/J].全球变化数据仓储,2020.DOI:10.3974/geodb.2020.04.09.V1.',
                    picture:'http://www.geodoi.ac.cn/Upload/1516/Image/Suo_202072817619637315527798764105.jpg;http://www.geodoi.ac.cn/Upload/1516/Image/Suo_202072817620637315527807884627.jpg',
                    old_filename:'南极冰架年崩解数据集（2005-2019）',
                    new_filename:'IcebergCalvingAntarctic_2005-2019',
                    format:'.shp',
                    ram:'3.23MB',
                    download_times:'4',
                    username:'zjh',
                    download_authority:'1'
                }],
                datalist:[],
                queryData:{
                    "title": '',
                    "type1": '',
                    "type2": ''
                }
            }
        },
        methods: {
            searchByuserName(){
                let name=this.input
                this.$refs.spaceList.currentPage=1
                let that=this
                that.$axios.get(that.$URL.userNameSelect+'?userName='+name).then(
                    res=>{
                        that.dataLength=res.body.totalCount
                        that.$axios.get(that.$URL.userNameSelect+'?userName='+name+'&pageNo=1&pageSize='+that.dataLength).then(
                            res=>{
                                if (res.code == 200) {
                                    that.datalist = res.body.result
                                    for (let i in that.datalist) {
                                        if (that.datalist[i].downloadAuthority) {
                                            that.datalist[i].downloadAuthority = '可以下载'
                                        } else {
                                            that.datalist[i].downloadAuthority = '禁止下载'
                                        }
                                    }
                                }
                            }
                        ).catch(err=>{})
                    }
                ).catch(err=>{})
            },
            filterByType2(type2,type1){
                //console.log(type2,type1)
                this.$refs.spaceList.currentPage=1
                let that=this
                that.$axios.get(that.$URL.bytype2Select+'?type='+type2).then(
                    res=>{
                        that.dataLength=res.body.totalCount
                        debugger
                        that.$axios.get(that.$URL.bytype2Select+'?type='+type2+'&pageNo=1&pageSize='+that.dataLength).then(
                            res=>{
                                if(res.code==200){
                                    that.datalist=[]
                                    for(let i in res.body.result) {
                                        if (res.body.result[i].type1 == type1) {
                                            that.datalist.push(res.body.result[i])
                                        }
                                    }
                                    for(let i in that.datalist){
                                        if(that.datalist[i].downloadAuthority){
                                            that.datalist[i].downloadAuthority='可以下载'
                                        }
                                        else{
                                            that.datalist[i].downloadAuthority='禁止下载'
                                        }
                                    }
                                }
                            }
                        ).catch(err=>{})
                    }
                ).catch(err=>{})
            },
            filterByType1(type1){
                this.$refs.spaceList.currentPage=1;
                let that=this
                if(type1=='全部资源'){
                    this.$options.methods.selectAll(that)
                }
                else{
                    that.$axios.get(that.$URL.bytype1Select+'?type='+type1).then(
                        res=> {
                            that.dataLength = res.body.totalCount
                            that.$axios.get(that.$URL.bytype1Select + '?type=' + type1 + '&pageNo=1&pageSize=' + that.dataLength).then(
                                res => {
                                    if (res.code == 200) {
                                        that.datalist = res.body.result
                                        for (let i in that.datalist) {
                                            if (that.datalist[i].downloadAuthority) {
                                                that.datalist[i].downloadAuthority = '可以下载'
                                            } else {
                                                that.datalist[i].downloadAuthority = '禁止下载'
                                            }
                                        }
                                    }
                                }
                            ).catch(err => {})
                        }
                    ).catch(err=>{})
                }
            },
            selectAll(that){
                that.$axios.get(that.$URL.geodataAllSelect).then(
                    res=>{
                        that.dataLength=res.body.totalCount
                        that.$axios.get(that.$URL.geodataAllSelect+'?pageNo=1&pageSize='+that.dataLength).then(
                            res=>{
                                if(res.code==200){
                                    that.datalist=res.body.result
                                    for(let i in that.datalist){
                                        if(that.datalist[i].downloadAuthority){
                                            that.datalist[i].downloadAuthority='可以下载'
                                        }
                                        else{
                                            that.datalist[i].downloadAuthority='禁止下载'
                                        }
                                    }
                                }
                            }
                        ).catch(err=>{})
                    }
                ).catch(err=>{})
            }
        },
        components: {
            spaceList
        },
        mounted () {
            this.datalist=this.selectAll(this)
        },
    }
</script>

<style lang="less" scoped>
    .el-container {
        border: 1px solid #ddd;
        border-radius: 10px;
        margin: 10px;
        padding: 10px;
        min-height: 500px;
        .el-aside {
            color: #fff;

            .el-input {
                margin-bottom: 15px;
                width: 250px;
            }

            .el-menu {
                border-top: 1px solid #ddd;
                border-radius: 5px;
                width: 250px;
                min-height: 500px;
            }
        }

        .el-main {
            .hm {
                margin-bottom: 10px;
                margin-left: 30px;
            }
        }
    }
</style>