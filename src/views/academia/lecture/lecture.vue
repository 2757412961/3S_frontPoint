<template>
    <el-container>
        <!-- 左侧检索栏 -->
        <el-aside width="270px">
            <div class="primarySearch">
                <el-select v-model="beforeInput" slot="prepend" placeholder="请选择" size="medium">
                    <el-option v-for="item in options[0]" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
                <el-input placeholder="请输入内容" v-model="input">
                    <el-button slot="append" icon="el-icon-search" @click="searchByName" style="width:40px;padding: 0"></el-button>
                </el-input>
            </div>
            <div class="btn">
                <el-button type="text" size="small" @click="resetData">重置搜索</el-button>
            </div>
        </el-aside>
        <!-- 右侧内容区 -->
        <el-main>
            <div class="content-header">
                <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 30px;margin-top:10px">
                    <el-breadcrumb-item :to="{ path: '/index' }">主页</el-breadcrumb-item>
                    <el-breadcrumb-item>学术中心</el-breadcrumb-item>
                    <el-breadcrumb-item>讲座</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 右侧查询结果区域 -->
            <lectureList ref="lectureList" :tableData="tableData"></lectureList>
        </el-main>
    </el-container>
</template>

<script>
    import lectureList from '../../../components/lectureList'
    import axios from 'axios'
    export default {
        data() {
            return {
                refresh: true,
                beforeInput: '',
                input: '',
                dataLength: 0,
                otableData: [{
                    name: '地科学术报告—兰州大学王鑫教授学术报告通知',
                    speaker: '王鑫 教授',
                    place:'玉泉校区第六教学楼211',
                    time:'2020-11-12 15:00:00'
                },
                {
                    name: '外籍院士校园行—WOLF DIETER BLUEMEL教授学术报告回顾',
                    speaker: 'WOLF DIETER BLUEMEL 教授',
                    place: '浙江大学玉泉校区教六211室',
                    time: '2020-10-16 21:30:00'
                }],
                tableData:[],
                options: [
                    ['名称', '主讲', '地点', '时间'],
                    ['并含', '或含', '不含'],
                    ['并且', '或者', '不含']
                ]
            }
        },
        components: {
            lectureList
        },
        mounted() {
            this.beforeInput=this.options[0][0]
            this.tableData=this.selectAll(this)
        },
        methods: {
            resetData(){
                this.input=''
                this.tableData=this.selectAll(this)
            },
            // 按照输入框内容进行搜索
            searchByName() {
                let tag=this.beforeInput
                let value=this.input
                this.$refs.lectureList.currentPage=1

            },
            selectAll(that){
                that.$refs.lectureList.currentPage=1
                that.$axios.get(that.$URL.lectureAllSelect).then(
                    res=>{
                        that.dataLength=res.body.totalCount
                        that.$axios.get(that.$URL.lectureAllSelect+'?pageNo=1&pageSize='+that.dataLength).then(
                            res=>{
                                if(res.code==200){
                                    that.tableData=res.body.result
                                }
                            }
                        ).catch(err=>{})
                    }
                ).catch(err=>{})
            }
        }
    }

</script>

<style lang="less" scoped>
    .el-container {
        border: 1px solid #ddd;
        border-radius: 10px;
        margin: 10px;
        padding: 10px;
        .el-aside {
            .primarySearch {
                .el-select {
                    width: 85px;
                    font-weight: bold;
                    margin-right: -4px;
                    padding: 0;
                }
                .el-input{
                    width: 170px;
                }
            }
            .btn {
                margin-top: 5px;
                margin-left: 210px;
            }
            .catalog {
                margin-bottom: 10px;
                padding-bottom: 5px;
                border-bottom: 1px solid #ddd;
            }
            .el-tag {
                margin: 5px;
                cursor: pointer;
            }
            .chosedTag {
                font-weight: bold;
            }
            .el-checkbox {
                display: block;
                width: 120px;
                margin: 3px 5px;
            }
        }

        .el-main {
            min-height: 500px;
            padding-top: 0;
            position: relative;

            .content-header {
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;

                .el-breadcrumb {
                    float: left;
                    align-self: center;
                }
                .orderlist {
                    float: right;
                    align-self: center;

                    .el-dropdown {
                        vertical-align: top;
                    }

                    .el-dropdown+.el-dropdown {
                        margin-left: 15px;
                    }

                    .el-icon-arrow-down {
                        font-size: 12px;
                    }
                }
            }
        }
    }

</style>
