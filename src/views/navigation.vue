<template>
    <div>
        <div :style="{width: '100%', height: ($window.height-60)+'px'}">
            <el-carousel style="height:100%;" :interval="4000" arrow="always">
                <el-carousel-item :style="{width: '100%', height: ($window.height-60)+'px'}" v-for="item in newsPics" :key="item.img">
                    <div @click="imgLink(item.link)" style="width: 100%; height: 100%;padding: 2px;">
                        <el-image :title="item.title" :src="item.img" :fit="imgFitType"
                                  style="width: 100%; height: 100%;">
                            <h3>hhhhh</h3>
                        </el-image>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div style="width:100%; height: 100px; backgroud-color: 'black'">
            <span>Hello fch</span>
        </div>
        <div style="width:100%; height: 100px; backgroud-color: 'red'">
            <span>Fll</span>
        </div>
    </div>

</template>
<script>

    export default {
        components:{
        },
        data() {
            //TODO 初始化Nginx指定图片服务路径下的资源
            return {
                newsPics: [
                    {title: "", img: "../../static/img/carousel-paper.jpg", link: "What's new paper."},
                    {title: "", img: "../../static/img/carousel-journal.jpg", link: "What's new journal."},
                    {title: "", img: "../../static/img/carousel-lecture.jpg", link: "What's new lecture."},
                ],
                imgFitType: "fill"
            }
        },
        methods: {
            //TODO 首页图片跑马灯跳转至详情页
            imgLink(link) {
                console.log("link to " + link);
            }
        },
        computed: {},
        mounted() {
        }
    }
</script>

<style>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
