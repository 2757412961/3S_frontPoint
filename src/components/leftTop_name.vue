<template>
  <PanelCard :backgroundLineUrl="backgroundImage" className="letftTopCard">
    <div class="main_count">
      <div class="item_3">
        <span class="small_text">卫星</span>
        <span class="big_text">{{satelliteSize}}</span>
        <span class="small_text">颗</span>
      </div>
      <div class="item_4">
        <span class="small_text">元数据</span>
        <span class="big_text">{{sourceDataSize}}</span>
        <span class="small_text">条</span>
      </div>
      <div class="item_1">
        <span class="small_text">存储</span>
        <span class="big_text">{{dataSize}}</span>
        <span class="small_text">PB</span>
      </div>
      <div class="item_2">
        <span class="small_text">源数据</span>
        <span class="big_text">{{sceneSize}}</span>
        <span class="small_text">景</span>
      </div>
    </div>
  </PanelCard>
</template>

<script>
import { getAmount } from '@/api/remote-search'
import topleft from '@/assets/topleft.png'
import PanelCard from '../panelCard/panelCard'

export default {
  name: 'leftTop_name',
  components: {PanelCard},
  data () {
    return {
      backgroundImage: topleft,
      dataSize: null,
      sceneSize: null,
      satelliteSize: null,
      sourceDataSize: null
    }
  },
  mounted () {
    var _this = this
    // 每分钟请求一次请求数据
    _this.initCharts()
    setTimeout(function () { _this.initCharts() }, 1000 * 60)
  },
  methods: {
    initCharts: function () {
      getAmount().then(response => {
        if (response.code === 200) {
          console.log('数据量统计：请求成功')
          const {dataSize, sceneSize, satelliteSize, sourceDataSize} = response.data
          this.dataSize = dataSize
          this.sceneSize = this.handelData.formatNum(sceneSize.toString())
          this.satelliteSize = satelliteSize
          this.sourceDataSize = this.handelData.formatNum(sourceDataSize.toString())
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .main_count{
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns:35% 65%;
    grid-template-rows: 50% 50%;
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
    justify-items:start;
    align-items:center;
    .item_1{
    }
    .item_2{
    }
    .item_3{
      grid-column:1 / 3;
      grid-row: 1;
    }
    .item_4{
      grid-column:2 / 3;
      grid-row: 1;
    }
    .small_text{
      color: #488cdd;
      font-weight: 600;
      font-size: 1.5rem;
    }
    .big_text{
      color: #fada2b;
      font-weight: bold;
      font-size: 3.5rem;
      margin: 0 0.7rem;
    }
  }
  .letftTopCard{
    height: 100%;
    width: 100%;
  }
</style>
