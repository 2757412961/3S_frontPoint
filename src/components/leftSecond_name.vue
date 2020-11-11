<template>
  <PanelCard :backgroundLineUrl="backgroundImage" className="leftSecondCard">
    <div ref="chart" class="leftSecondEchart"></div>
  </PanelCard>
</template>

<script>
import { satelliteInfo } from '@/api/remote-search'
import PanelCard from '../panelCard/panelCard'
import secondLeft from '@/assets/secondLeft.png'

export default {
  name: 'leftSecond_name',
  components: {PanelCard},

  mounted () {
    // 实例化echarts
    let myChart = this.$echarts.init(this.$refs.chart)
    this.initCharts(myChart)
  },
  data () {
    return {
      backgroundImage: secondLeft
    }
  },
  methods: {
    initCharts: function (myChart) {
      let echartData = []
      satelliteInfo().then(
        response => {
          if (response.code === 200) {
            response.data.map((item) => {
              let echartItem = { name: item.satellite,
                value: item.percent}
              echartData.push(echartItem)
            })
            var colorList = ['#E60000', '#9CBF31', '#91368C', '#00A9CD', '#4401CC', '#2E2EE6', '#0166FF', '#BF9926',
              '#e62fc4', '#98bf49', '#7f6a91', '#6ca8cd', '#4466CC', '#3E2BE6', '#6166FF', '#BFF926']
            let option = {
              tooltip: {
                trigger: 'item',
                borderColor: 'rgba(255,255,255,.3)',
                backgroundColor: 'rgba(13,5,30,.6)',
                borderWidth: 1,
                padding: 5,
                formatter: function (parms) {
                  var str = parms.marker + '' + parms.data.name + '</br>' +
                    '占比：' + parms.percent + '%'
                  return str
                }
              },
              series: [{
                type: 'pie',
                z: 3,
                radius: ['20%', '30%'],
                clockwise: true,
                avoidLabelOverlap: true,
                hoverOffset: 15,
                itemStyle: {
                  normal: {
                    color: function (params) {
                      return colorList[params.dataIndex]
                    }
                  }
                },
                label: {
                  show: true,
                  position: 'outside',
                  formatter: '{white|{b}}',
                  fontSize: 23,
                  rich: {
                    white: {
                      align: 'center',
                      fontSize: 22
                    },
                    d: {
                      fontSize: 50,
                      lineHeight: 33
                    }
                  }
                },
                labelLine: {
                  normal: {
                    // length: 60,
                    // length2: 30,
                    lineStyle: {
                      width: 3
                    }
                  }
                },
                data: echartData
              }, {
                name: '第一层环',
                type: 'pie',
                z: 2,
                tooltip: {
                  show: false
                },
                radius: ['30%', '35%'],
                hoverAnimation: false,
                clockWise: false,
                itemStyle: {
                  normal: {
                    shadowBlur: 1,
                    shadowColor: 'rgba(53,139,255,.3)',
                    color: 'rgba(1,15,80,.95)'
                  },
                  emphasis: {
                    color: 'rgba(1,15,80,.95)'
                  }
                },
                label: {
                  show: false
                },
                data: [100]
              }, {
                name: '第二层环',
                type: 'pie',
                z: 1,
                tooltip: {
                  show: false
                },
                center: ['50%', '50%'],
                radius: ['35%', '45%'],
                hoverAnimation: false,
                clockWise: false,
                itemStyle: {
                  normal: {
                    shadowBlur: 1,
                    shadowColor: 'rgba(53,139,255,.3)',
                    color: 'rgba(0,15,69,.95)'
                  },
                  emphasis: {
                    color: 'rgba(0,15,69,.95)'
                  }
                },
                label: {
                  show: false
                },
                data: [100]
              }]
            }
            myChart.setOption(option)
          }
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.leftSecondEchart{
  height: 100%;
  width: 100%;
}
.leftSecondCard{
  height: 100%;
  width: 100%;
}
</style>
