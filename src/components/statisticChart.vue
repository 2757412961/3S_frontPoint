<template>
  <v-container>

    <div ref="chart" style="width:100%;height: 300px"></div>
  </v-container>
</template>

<script>
export default {
  name: "statisticChart",
  mounted () {
    // 实例化echarts
    let myChart = this.$echarts.init(this.$refs.chart)
    this.initCharts(myChart)
  },
  methods: {
    initCharts: function (myChart) {
      // this.$axios.get(this.$URL.statisticData).then(
      //     res => {
      //         that.$message({
      //           message: "删除成功",
      //           type: 'success'
      //         })
      //     }
      // )
      let data = [{
        name: '亚洲',
        value: 70
      }, {
        name: '非洲',
        value: 68
      }, {
        name: '欧洲',
        value: 48
      }, {
        name: '北美洲',
        value: 40
      }, {
        name: '大洋洲',
        value: 32
      }, {
        name: '南美洲',
        value: 27
      }, {
        name: '北极州',
        value: 18
      }];
      let option = {
        series: [{
          type: 'pie',
          radius: '25%',
          center: ['50%', '50%'],
          data: data,
          animation: false,
          label: {
            position: 'outer',
            alignTo: 'labelLine',
            bleedMargin: 5
          },
          top: 0,
          bottom: 0
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>