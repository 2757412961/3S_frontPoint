<template>
    <div class="main_count">
        <div class="item_3">
            <span class="small_text">用户</span>
            <span class="big_text">1</span>
            <span class="small_text">位</span>
        </div>
        <div class="item_4">
            <span class="small_text">数据</span>
            <span class="big_text">2</span>
            <span class="small_text">条</span>
        </div>
        <div class="item_1">
            <span class="small_text">存储</span>
            <span class="big_text">3</span>
            <span class="small_text">PB</span>
        </div>
        <div ref="chart"></div>
    </div>
</template>

<script>
    export default {
        name: "statisticalData",
        mounted () {
            // 实例化echarts
            let myChart = this.$echarts.init(this.$refs.chart)
            this.initCharts(myChart)
        },
        methods: {
            initCharts: function (myChart) {
                let echartData = []
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ]
                        }
                    ]

                }
                myChart.setOption(option)
            }
        }
    }
</script>

<style scoped>
    .small_text{
        color: #488cdd;
        font-weight: 600;
        font-size: 0.5rem;
    }
    .big_text{
        color: #fada2b;
        font-weight: bold;
        font-size: 1.5rem;
        margin: 0 0.7rem;
    }
</style>
