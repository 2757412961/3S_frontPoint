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
                    <el-breadcrumb-item>学位论文</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 右侧查询结果区域 -->
            <pages ref="pages" :tableData="tableData"></pages>
            <!--分页-->
            <el-pagination @current-change="paginationCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
                           layout="total, prev, pager, next, jumper" :total="dataLength" align="center">
            </el-pagination>
        </el-main>
    </el-container>
</template>

<script>
    import pages from '../../../components/pages'
    import axios from 'axios'
    export default {
        data() {
            return {
                refresh: true,
                beforeInput: '',
                input: '',
                dataLength: 0,
                currentPage:1,
                pageSize:6,
                checked: ['学士论文', '硕士论文', '博士论文'],
                checkGroup: ['学士论文', '硕士论文', '博士论文'],
                timeCategory: [],
                sourceCategory: [],
                otableData: [{
                    title: '基于Google Earth Engine的环渤海地区土地覆盖分类',
                    author: '于莉莉',
                    publisher:'应用生态学报',
                    tertiary_author:'某老师',
                    year:'2019',
                    type:'硕士论文',
                    english_title:'Extraction of land-cover and wetland area in Bohai Rim region based on Google Earth Engine',
                    keywords:'Google earth engine;Sentinel-2A影像;土地覆盖;湿地提取;CART分类;',
                    abstract:'环渤海地区由于城市和经济发展导致土地覆盖快速变化，对其进行高精度实时的变化监测是相关研究的重要基础。传统单机处理模式难以进行大尺度和长时间序列的快速监测，整合海量数据的遥感大数据云计算平台的出现使其成为可能。本研究基于Google Earth Engine（GEE）处理平台，采用决策树（CART）方法对研究区2000—2019年土地覆盖进行解译分类，并综合分析研究区土地覆盖变化及对比不同数据源解译结果。结果表明：基于GEE平台能够实现大区域快速土地覆盖分类，对沿海湿地和其他覆盖类型具有较高的分类精度，与实测点对比达到80%以上。相较于Landsat影像，基于Sentinel-2A影像的解译结果在精度上有较大提高，总体分类精度从85%提高到95%，地表更多细节信息可以得到体现。2000年，研究区湿地、建设用地、耕地、林地和水体面积分别为1612.5、5734.9 km2、32074.8、11853、3504.3 km2，分别占2.9%、10.5%、58.6%、21.6%、6.4%。到2019年，湿地减少了775.1 km2，下降40.1%；建设用地增加5310.5 km2，增加率达92.6%；耕地、林地和水体均呈下降趋势，分别下降了1841.6、1823.5、870.3 km2，下降率分别为5.7%、24.8%、48.1%。沿海的城市化过程导致建设用地占用其他类型是研究区土地覆盖变化的最主要驱动力。'
                }, {
                    title: '基于Google Earth Engine和作物模型快速评估低温冷害对大豆生产的影响',
                    author: '曹娟',
                    publisher:'地理学报',
                    tertiary_author:'某老师，某老师',
                    year:'2020',
                    type:'学士论文',
                    english_title:'Damage evaluation on soybean chilling injury based on Google Earth Engine(GEE) and crop growth model',
                    keywords:'低温冷害;Google Earth Engine(GEE);CROPGRO-Soybean;大豆;减产率;有效积温距平值(CDD);',
                    abstract:'作为中国商品粮的主要生产基地,东北地区频发的低温冷害给中国粮食安全带来了严重的影响,及时、准确和大范围评估低温冷害灾损是降低损失、快速恢复生产的重要前提。本文以鄂伦春为例,提出了一种快速评估低温冷害对大豆生产影响的新方法。首先诊断出该地区典型冷害事件发生的年份为1989年、1995年、2003年、2009年和2018年;然后基于本地化后CROPGRO-Soybean模型设置512组低温冷害和田间管理组合模拟情景;其次构建了1600组包括3个变量(有效积温距平值(CDD)、模拟的叶面积植被指数(LAI)和产量)的冷害脆弱性模型;最后依托Google Earth Engine(GEE)平台逐像元提取大豆关键生育期早晚窗口内最大的宽动态植被指数(WDRVI)及对应的日期(DOY),将WDRVI转化为大豆种植格点的实际LAI,结合构建的冷害脆弱性模型逐像元计算出产量和减产率。'
                }, {
                    title: '基于多时相Landsat影像的中亚地区植被覆盖遥感监测',
                    author: '王华',
                    publisher:'干旱区地理',
                    tertiary_author:'某老师',
                    year:'2020',
                    type:'硕士论文',
                    english_title:'Vegetation coverage monitoring in the Central Asian countries using multi-temporal Landsat images',
                    keywords:'植被覆盖监测;中亚地区;GEE;多时相Landsat影像;归一化植被指数;',
                    abstract:'针对中亚地区的强生态脆弱性、高敏感性特征，有必要开展广域、长期的植被覆盖监测以匹配“绿色丝绸之路”的可持续发展目标。鉴于此，联合Landsat 5和Landsat 8卫星数据集，利用Google Earth Engine（GEE）地理空间数据云计算平台，估算了中亚地区1993—2018年间共12期的植被覆盖度。结果表明：（1）中亚地区植被覆盖总体水平较低，但也具有较为显著的空间异质性。（2）中亚地区1993—2018年间多数区域植被覆盖趋势较为稳定，哈萨克斯坦丘陵、费尔干纳盆地等区域植被覆盖度呈增加趋势，乌拉尔河流域和锡尔河流域等区域植被覆盖趋势为负。（3）植被覆盖度时序特征上，中亚地区1993—2018年间总体植被覆盖度累积增加3%，其中吉尔吉斯斯坦和塔吉克斯坦植被覆盖分别增加3.96%和5.86%。（4）裸土区呈退缩趋势，面积总计减少25.9×104 km2，低植被覆盖区、中植被覆盖区和高植被覆盖区范围在呈现出的振荡式增加。本研究结合遥感大数据和地理云计算对中亚地区进行区域尺度的植被覆盖动态监测，能对中亚地区生态评估和演替分析提供技术支持和定量数据。'
                }, {
                    title: 'GEE云平台支持下的西天山森林遥感监测与时空变化分析',
                    author: '朱长明',
                    publisher:'测绘通报',
                    tertiary_author:'某老师',
                    year:'2020',
                    type:'博士论文',
                    english_title:'Forest survey and spatio-temporal analysis in West Tianshan mountains supported by Google Earth Engine',
                    keywords:'林业遥感;GEE云计算;时空变化;随机森林;西天山;',
                    abstract:'针对区域大尺度森林遥感调查、精确信息提取和时间序列变化监测过程中存在的数据挑选困难、计算效率较低、提取精度不高等问题,本文基于谷歌云计算平台(GEE)强大的海量遥感数据组织、存储和计算功能,根据新疆干旱区森林资源的空间分布特点,结合多源遥感数据和地理要素数据集,首先构建了光谱+纹理+地形等多维分类特征集;然后在地理国情监测森林地面调查样本数据的协助下建立了西天山森林分类样本数据库;进而采用随机森林分类算法实现了对西天山森林1995、2000、2005、2010、2015和2018年6期自动分类;最后通过云端与本地相结合完成了森林资源遥感分类数据编辑检查、制图与分析。研究结果表明:①1995—2018年西天山森林总体呈动态扩张趋势,森林分布面积从1995年的3 953.6 km~2年增加到2018年的4 243.2 km~2,增长速率为12.6 km~2/a;在结构组成上,西天山森林以针叶林为主,阔叶林、灌木林、针阔混交林较少。②在时间变化过程上,西天山森林的扩张态势呈现缓中增强,2005—2018年增长速率要明显高于1995—2005年。③在空间变化特征上,不同森林类型之间的转化很少,新增林地主要来自非林地,2000年以来非林地转林地的面积约为520 km~2。非林地转化为林地区域主要集中在特克斯县分局、尼勒克县分局、昭苏县分局、新源林场、巩留分局、伊宁分局,转入面积分别为111.14、102.19、67.16、56.45、42.76、40.71 km2。'
                }, {
                    title: '基于遥感空间信息的洪水风险识别与动态模拟研究进展',
                    author: '曾子悦',
                    publisher:'水科学进展',
                    tertiary_author:'某老师',
                    year:'2020',
                    type:'硕士论文',
                    english_title:'Advances in flood risk identification and dynamic modelling based on remote sensing spatial information',
                    keywords:'对地观测卫星;遥感;洪水;风险识别;动态模拟;',
                    abstract:'对地观测卫星遥感能够提供广泛可靠的空间信息,是洪水风险识别与动态模拟的重要支撑技术之一。为阐明卫星遥感技术对洪水研究的推动作用,回顾了洪水风险识别与动态模拟研究的发展历程及技术需求,以对地观测卫星遥感三大阶段的发展轨迹为主线,分析了遥感空间信息在洪水研究中的历史性贡献和阶段性效用,讨论总结了危险分区法、水文模型和微波遥感监测等3种洪水研究典型方法的应用进展。提出未来洪水风险识别与动态模拟研究的重点:遥感空间信息与模型算法的深度结合,遥感反演算法与系统的开发及应用,典型洪水研究方法集成系统的开发与应用,大数据方法与手段的应用。以期为提升洪水应急响应能力与灾害风险管理水平提供有效参考。'
                }, {
                    title: '我国西藏地区冰湖溃决灾害综述',
                    author: '刘建康',
                    publisher:'冰川冻土',
                    tertiary_author:'某老师',
                    year:'2019',
                    type:'博士论文',
                    english_title:'An overview of glacial lake outburst flood in Tibet, China',
                    keywords:'冰湖溃决;冰碛湖;冰川阻塞湖;西藏;泥石流;',
                    abstract:'冰湖溃决是我国西藏地区典型的地质灾害类型之一,具有突发性强、规模大、破坏力强和危害范围广等特点,往往造成下游地区遭受惨重的生命财产损失。冰湖溃决成因特征是形成机制、早期识别和危险性评价等冰湖溃决研究的基础,受客观条件限制,我国西藏冰湖溃决的基础调查工作存在资料分散甚至缺失的局限性。为解决这个难题,通过资料收集、遥感解译和野外调查等技术手段,重新梳理了我国西藏地区的冰湖溃决事件及基本特征,共调查出33个冰湖37次溃决事件,其中2个为冰川阻塞湖(简称冰川湖),划定了冰湖溃决高发地带的地理分布位置,分析出冰崩/冰滑坡、埋藏冰融化、冰川融水、强降水、泥石流和上游冰湖溃决洪水6种诱发原因,为我国西藏冰湖溃决研究提供基础调查成果和参考依据。'
                }, {
                    title: '鄱阳湖近五十年变迁遥感监测与分析',
                    author: '朱鹤',
                    publisher:'卫星应用',
                    tertiary_author:'某老师，某老师',
                    year:'2019',
                    type:'博士论文',
                    english_title:'Remote sensing',
                    keywords:'鄱阳湖;遥感;水位-面积关系;开发利用;变迁;',
                    abstract:'鄱阳湖为长江干流重要的调蓄性湖泊,对流域调蓄洪水和生物保护等作用重大,了解鄱阳湖近五十年变迁对指导鄱阳湖及长江流域合理开发利用具有重要意义。本次研究利用近五十年来的遥感影像(20世纪60年代美国侦察卫星、70年代至21世纪初陆地卫星和近年国产高分系列卫星),对近五十年来鄱阳湖自然演变和开发利用变化进行观测,结合水位与面积关系,定量化鄱阳湖水位与水体面积之间关系,分析变化规律和原因,并对环湖围垦、岸线萎缩至退耕还湖等一系列变化进行观测,以期为鄱阳湖流域治理和合理开发利用决策提供参考。'
                }, {
                    title: '分布式水文模型在长江流域的应用研究',
                    author: '许继军',
                    publisher:'清华大学',
                    tertiary_author:'某老师',
                    year:'2007',
                    type:'博士论文',
                    english_title:'Application of a distributed hydrological model to the Yangtze River basin',
                    keywords:'长江流域;分布式水文模型;水资源评价;干旱评估;洪水预报;',
                    abstract:'认识气候和流域下垫面等变化条件下的流域水文响应特征,有效预测和预报流域水资源和洪水的变化,是“维持健康长江、实现人水和谐”的科学基础。传统的基于经验和河道流量观测资料建立起来的水文模型,难以适应变化条件下的降雨径流模拟。本论文采用基于物理机制的分布式水文模型,在模拟流域水文循环全过程的基础上,探讨了分布式水文模型在水资源评价、干旱评估和洪水预报中的应用。论文首先分析了20世纪下半叶长江流域气温、降水和径流的变化趋势。结果发现:流域年均气温升高趋势显著且年际波动幅度增大;降水时空分布有改变的趋势,长江中下游夏季降水增加,而四川盆地秋季降水减少。在流域面积约为100万km2的长江上游,利用DEM及相关遥感和地理信息来表现流域下垫面的空间差异性,构建了基于流域地形地貌特征的大尺度分布式水文模型。模型采用次网格参数化方法来处理大尺度网格内下垫面的非均一性,采用具有物理意义的水流运动方程来描述产汇流过程。'
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
                    ['标题', '作者', '所在单位/学校'],
                    ['并含', '或含', '不含'],
                    ['并且', '或者', '不含']
                ]
            }
        },
        components: {
            pages
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
            //换页
            paginationCurrentChange(val){
                this.currentPage=val
                this.tableData=this.selectAll(this)
                this.$refs.pages.currentPage=this.currentPage
            },
            // 按照输入框内容进行搜索
            searchByName() {
                let tag=this.beforeInput
                let value=this.input

            },
            selectAll(that){
                that.$axios.get(that.$URL.paperAllSelect+'?pageNo='+that.currentPage+'&pageSize='+that.pageSize).then(
                    res=>{
                        if(res.code==200){
                            that.dataLength=res.body.totalCount
                            that.tableData=res.body.result
                            for(let i in that.tableData){
                                if(that.tableData[i].type=="bachelor"){
                                    that.tableData[i].type="学士论文"
                                }
                                else if(that.tableData[i].type=="master"){
                                    that.tableData[i].type="硕士论文"
                                }
                                else{
                                    that.tableData[i].type="博士论文"
                                }
                            }
                        }
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
