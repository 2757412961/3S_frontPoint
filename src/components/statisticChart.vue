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
      this.$axios.get(this.$URL.statisticData).then(
          res => {
            let data = [];
            for (let i = 0; i < res.body.length-1; i++) {
              let datainfo={
                name:res.body[i].country,
                value:res.body[i].count
              }
              data.push(datainfo)
            }
            let option = {
              series: [{
                type: 'pie',
                radius: '70%',
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
      )

    }
  }
}
</script>

<style scoped>

</style>