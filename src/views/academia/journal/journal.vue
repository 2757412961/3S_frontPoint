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
                    <el-breadcrumb-item>专业期刊</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 右侧查询结果区域 -->
            <journalList ref="journalList" :tableData="tableData"></journalList>
        </el-main>
    </el-container>
</template>

<script>
    import journalList from '../../../components/journalList'
    import axios from 'axios'
    export default {
        data() {
            return {
                refresh: true,
                beforeInput: '',
                input: '',
                dataLength: 0,
                checked: ['期刊论文', '会议论文'],
                checkGroup: ['期刊论文', '会议论文'],
                otableData:[{
                    type:'期刊论文',
                    title:'全球科研论文合作网络的结构异质性及其邻近性机理',
                    author:'刘承良; 桂钦昌; 段德忠; 殷美元',
                    year:'2017',
                    source:'地理学报',
                    volume:'72',
                    issue:'4',
                    pages:'737-752',
                    keywords:'科研论文合作网络; 结构异质性; 复杂网络分析; 重力模型; 邻近性机制',
                    abstract:'以科研论文为媒介的知识合作网络已成为知识溢出的重要通道,但目前学术界对全球科研合作网络结构的复杂性涌现机制缺乏深入的探讨。基于2014年Web of Science核心合集所收录的科研论文合著数据,借助大数据挖掘技术、复杂网络、空间统计和重力模型分析,刻画了全球科研论文合作网络的拓扑结构、空间格局及其邻近性机理。结果发现：①拓扑结构上,形成了以美国为核心的层级网络,具有小世界性和等级层次性,发育出典型的等级＂核心—边缘＂结构。②空间格局上,以美国、西欧、中国和澳大利亚为顶点的＂四边形＂成为全球科研论文合作网络的骨架；三大中心性指标值的空间分异明显,强度中心性形成以美国为极核,加拿大、澳大利亚、中国及西欧诸国为次中心的＂一超多强＂格局,与之类似的介数中心性呈现北美、西欧和东亚＂三足鼎立＂的形态,度中心性分布则相对均匀,表现出＂大分散、小集中＂的＂多中心—边缘集散＂格局。③重力回归分析发现,地理距离抑制了国际科研论文合作,不过其影响力较弱；社会与经济邻近性对全球科研论文合作具有明显的促进作用,语言差异不是国际科研合作交流的障碍。',
                    au_affiliation:'华东师范大学城市与区域科学学院,上海200241; 华东师范大学科技创新与发展战略研究中心,上海200062',
                    category:'TP301.6',
                    url:'http://qikan.cqvip.com/Qikan/Article/Detail?id=671961997'
                },{
                    type:'期刊论文',
                    title:'Applicability evaluation of the SWIM at river basins of the black soil region in Northeast China： A case study of the upper and middle Wuyuer River basin',
                    author:'Zhiyuan, YANG; Chao, GAO; Shuying, ZANG; Xiuchun, YANG',
                    year:'2016',
                    source:'地理学报：英文版',
                    volume:'27',
                    issue:'7',
                    pages:'817-834',
                    keywords:'东北黑土区; 适用性评价; 河流域; 游泳; 中国; 集成模型; 径流系数; 径流模拟',
                    abstract:'在这份报纸，我们作为学习区域在东北中国的黑土壤区域选择了 Wuyuer 河盆的中间、上面的活动范围。我们采用了土壤和水综合模型(游泳) 并且用部分关联系数评估了参数敏感。我们在河盆和各种各样的气象站从 1961 ～ 1997 记录的蒸发数据的插头从 Yian 水文学车站基于每日的流量数据校准了并且验证我们的模拟结果。对观察数据的当模特儿的数据的后面的评估，我们在场在黑人的河盆的游泳的适用性玷污区域，并且讨论产生错误和他们的可能的原因。在刻度和确认的时期，每月、每日的流量的 Nash-Sutcliffe 效率(NSE ) 系数是的结果表演不少于 0.71 和 0.55，并且相对错误是不到 6.0% 。把流量比作每天，每月的流量的模拟结果更好。另外，潜在的每月的蒸发的 NSE 系数是不少于 0.81。一起，结果建议校准的游泳能在东北中国的黑土壤区域在每月的规模上在流量的各种各样的模拟分析被利用。相反，模型在从 snowmelt 模仿流量有一些限制并且冻结土壤。同时，当与春天和夏天洪水适用于年时，刺激数据大部分从测量数据背离了。模仿的年度流量比有年度降水的突然的增加的年里的测量数据更加高。然而，模型能够在洪水季节期间在流量复制变化。在摘要，这个模型能为 Wuyuer 的全面管理提供基本水文学信息河盆水环境，和它的申请能潜在地在黑土壤区域被扩大到另外的河盆。',
                    au_affiliation:'Key Laboratory of Remote Sensing Monitoring of Geographic Environment, Harbin Normal University, Harbin 150025, China; College of Territorial Resources and Tourism, Anhui Normal University, Wuhu 241000, Anhui, China; Institute of Agricultural Resources and Regional Planning, Chinese Academy of Agricultural Sciences, Beijing 100081, China',
                    category:'P333.1; S157.2',
                    url:'http://qikan.cqvip.com/Qikan/Article/Detail?id=671770239'
                }],
                tableData:[],
                yearStart: '',
                yearEnd: '',
                pickerOptionsStart: {
                    disabledDate: time => {
                        if (this.yearEnd) {
                            return time.getFullYear() > new Date(this.yearEnd).getFullYear()
                        }
                        else{
                            return time.getFullYear() > new Date().getFullYear()
                        }
                    }
                },
                pickerOptionsEnd: {
                    disabledDate: time => {
                        if (this.yearStart) {
                            return time.getFullYear() < new Date(this.yearStart).getFullYear() || time.getFullYear() > new Date().getFullYear()
                        }
                        else{
                            return time.getFullYear() > new Date().getFullYear()
                        }
                    }
                },
                options: [
                    ['标题', '作者', '来源'],
                    ['并含', '或含', '不含'],
                    ['并且', '或者', '不含']
                ]
            }
        },
        components: {
            journalList
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
                this.$refs.journalList.currentPage=1

            },
            selectAll(that){
                that.$refs.journalList.currentPage=1
                that.$axios.get(that.$URL.journalAllSelect).then(
                    res=>{
                        that.dataLength=res.body.totalCount
                        that.$axios.get(that.$URL.journalAllSelect+'?pageNo=1&pageSize='+that.dataLength).then(
                            res=>{
                                if(res.code==200){
                                    that.tableData=res.body.result
                                    for(let i in that.tableData){
                                        if(that.tableData[i].type=="conference"){
                                            that.tableData[i].type="会议论文"
                                        }
                                        else{
                                            that.tableData[i].type="期刊论文"
                                        }
                                    }
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