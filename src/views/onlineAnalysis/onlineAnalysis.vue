<template>
    <div style="background-color: #1da1f2">
        <el-container style="margin: auto;width: 70%;background-color: white">
            <el-header style="height: 200px">

                <div class="block">
                    <br>
                    <el-carousel height="150px">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h1 class="small">{{ item }}</h1>
                        </el-carousel-item>
                    </el-carousel>
                    <br>
                </div>
                <div>
                    <img src="../../assets/方框.png" height="20" width="20" style="float: left"/>
                    <h3 style="float: left;padding-left: 5px">最新公告</h3>
                    <p class="microsoft marquee">
                        <a href="https://www.baidu.com/">地理信息科学专业（geographic information science）原名地理信息系统专业（Geographic Information System或Geo－Information system或GIS）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        <a href="https://www.baidu.com/">2012在教育部日前印发的《普通高等学校本科专业目录（2012年）》中，在地理科学类专业中，地理信息系统专业已改为地理信息科学专业。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        <a href="https://www.baidu.com/">研究地理信息采集、分析、存储、显示、管理、传播与应用，及研究地理信息流的产生、传输和转化规律的一门科学。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        <a href="https://www.baidu.com/">地理信息科学是近20年来新兴的一门集地理学、计算机、遥感技术和地图学于一体的边缘学科，&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        <a href="https://www.baidu.com/">主要培养具备地理信息科学与地图学、遥感技术方面的基本理论、基本知识、基本技能，能在科研机构或高等学校从事科学研究或教学工作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    </p>
                </div>
            </el-header>

            <el-main>
                <br>
                <img src="../../assets/方框.png" height="20" width="20" style="float: left"/>
                <h3 style="float: left;padding-left: 5px">平台概述</h3>
                <el-divider style="float: left"></el-divider>

                <div>
                    <el-col :span="16">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;海洋遥感在线分析平台，简称SatCO2平台，面向公众免费分发，目的是突破海洋卫星遥感数据便捷、高效使用的瓶颈，拓展海洋遥感数据应用。</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SatCO2平台可用于海量多源遥感、实测及模式数据的快速在线获取、高效计算和三维球体可视化分析；用户也可使用SatCO2对本地多源遥感和实测数据进行综合交互分析。</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SatCO2将不断推出更新版本。该平台不仅可以服务广大科研群体、海洋工作者、高校学生和社会公众，而且希望联合多学科科研人员和广大用户，逐步建立一个包括使用者、意见反馈者、需求提供者、产品验证者、算法贡献者、数据集贡献者、应用模块开发者等在内的生态圈；SatCO2通过署名、引用和致谢的方式，增加贡献者引用率；不断拓展海洋遥感数据和科研成果的应用能力和价值。</p>
                    </el-col>
                    <el-col :span="8">
                        <div style="text-align: center">
                            <h1>海洋遥感在线分析平台</h1>
                            <h1>(SatCO2-Pro)</h1>
                            <img src="../../assets/地球 (1).png" height="100" width="100"/>
                            <h1>Version 1.02 (2019/10)</h1>
                            <el-button type="primary" icon="el-icon-download" @click="goToBaidu()">下载</el-button>
                        </div>
                    </el-col>
                </div>
                <img src="../../assets/方框.png" height="100" width="100%" style="padding-top: 20px;padding-bottom: 20px"/>
                <div>
                    <el-col :span="12">
                        <h1 style="writing-mode:tb-rl;float: left;background-color: #1da1f2;font-size:25px">
                            新闻动态
                        </h1>
                        <div style="float: left">
                            <ul style="font-size:16px;line-height: 25px">
                                <li><a>近海水环境遥感监测技术与应用暨第四届SatCO2培训班召开2020-10-11</a></li>
                                <li><a> “天眼看海洋、遥测碳通量”科技成果科普发布——记何...2020-08-30</a></li>
                                <li><a>2019 IOCCG 海洋水色遥感高级培训班圆满结业2019-11-07</a></li>
                                <li><a>“海洋水色遥感高级培训班”开班啦！2019-10-29</a></li>
                                <li><a>欢迎报名参加Knut Stamnes教授“辐射传输模型及其在...2019-06-13</a></li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <h1 style="writing-mode:tb-rl;float: left;background-color: #1da1f2;font-size:25px">
                            成果速递
                        </h1>
                        <div style="float: left">
                            <ul style="font-size:16px;line-height: 25px">
                                <li><a>近海水环境遥感监测技术与应用暨第四届SatCO2培训班召开2020-10-11</a></li>
                                <li><a> “天眼看海洋、遥测碳通量”科技成果科普发布——记何...2020-08-30</a></li>
                                <li><a>2019 IOCCG 海洋水色遥感高级培训班圆满结业2019-11-07</a></li>
                                <li><a>“海洋水色遥感高级培训班”开班啦！2019-10-29</a></li>
                                <li><a>欢迎报名参加Knut Stamnes教授“辐射传输模型及其在...2019-06-13</a></li>
                            </ul>
                        </div>
                    </el-col>
                </div>
            </el-main>

        </el-container>
    </div>
</template>

<script>

    import pageFooter from '../pageFooter'

    export default {
        name: "onlionAnalysis",
        data() {
            return {
                input: '',
                activeIndex: '1',
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            goToBaidu(){
                window.open("http://www.baidu.com")
            }
        }
    }

</script>

<style scoped>
    .marquee {
        width: 90%;
        margin: 0 auto;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
        animation: marquee 50s linear infinite;
    }

    .marquee:hover {
        animation-play-state: paused
    }
    /* Make it move */

    @keyframes marquee {
        0% {
            text-indent: 27.5em
        }
        100% {
            text-indent: -105em
        }
    }
    /* Make it pretty */

    .microsoft {
        padding-left: 1.5em;
        position: relative;
        font: 16px 'Segoe UI', Tahoma, Helvetica, Sans-Serif;
        color: rgb(102, 102, 102);
        background: rgb(255, 248, 233) none repeat scroll 0% 0%;
    }
    /* ::before was :before before ::before was ::before - kthx */

    .microsoft:before,
    .microsoft::before {
        z-index: 2;
        content: '';
        position: absolute;
        top: -1em;
        left: -1em;
        width: .5em;
        height: .5em;
        /*box-shadow: 1.0em 1.25em 0 #F65314, 1.6em 1.25em 0 #7CBB00, 1.0em 1.85em 0 #00A1F1, 1.6em 1.85em 0 #FFBB00;*/
        /*background: url(img/horn.png);*/

    }
    .microsoft:after,
    .microsoft::after {
        z-index: 1;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1.4em;
        height: 1.4em;
        /*background: #FFF8E9;*/
        background-size:18px 18px ;

    }

</style>
