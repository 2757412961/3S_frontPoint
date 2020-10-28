<!--根据面图层颜色，渲染字段，是否使用图案或者3d显示完成对面图层的渲染，对于multipolygon，可以根据字段值进行分级渲染 -->
<template>
  <div id="polygonRender" :style="{display:displayForm}">
    <el-form label-position="left" label-width="90px" style=" padding:10px;" >

      <el-form-item label="渲染方式">
        <el-radio-group v-model="radio"  @change="changeModel">
          <el-radio :label="0" style="padding:8px">直接渲染</el-radio>
          <el-radio :label="1" style="padding:8px">分级渲染</el-radio>
          <el-radio :label="2" style="padding:8px">使用图案</el-radio>
          <el-radio :label="3" style="padding:8px">使用3D效果</el-radio>
          <el-radio :label="4" style="padding:8px">唯一值渲染</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="渲染字段" v-show="is[1]||is[3]">
        <el-select v-model="field" placeholder="选择渲染字段">
          <el-option
                  v-for="item in fields"
                  :key="item"
                  :label="item"
                  :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="渲染字段" v-show="is[4]">
        <el-select v-model="sfield" placeholder="选择渲染字段" @change="getStrFieldsNum">
          <el-option
                  v-for="item in strFields"
                  :key="item"
                  :label="item"
                  :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="my" label="透明度">
        <el-slider  v-model="opacity" :max="1" :step="0.01"  show-input ></el-slider>
      </el-form-item>

      <el-form-item label="选择颜色" v-show="is[0]||is[3]">
        <el-color-picker v-model="color" ></el-color-picker>
      </el-form-item>

      <el-form-item label="图案样式" v-show="is[2]">
        <el-radio-group v-model="icon0" >
          <el-radio v-for="item in icons" :key="item" :value="item" :label="item">
            <el-image :src="imgurl+item+'.png'"></el-image>
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="最小值颜色" v-show="is[1]" >
        <el-color-picker v-model="mincolor" @change="showColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="最大值颜色" v-show="is[1]" >
        <el-color-picker v-model="maxcolor" @change="showColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="色带预览" v-show="is[1]"  >
        <canvas id="myCanvas" width="130" height="40" style="border:1px solid #c3c3c3;"></canvas>
      </el-form-item>

      <el-form-item label="单值颜色" v-show="is[4]">
        <el-form-item v-show="is[4]" v-for="(item,key) in this.strFieldVal" v-bind:key="item">
          <el-tag type="info" effect="plain">
            {{ item }}
          </el-tag>
          <el-color-picker v-model="colori[key]" size="mini"></el-color-picker>
        </el-form-item>
      </el-form-item>

      <el-form-item label="选择事件">
        <el-button type="primary" @click="startRendering">开始渲染</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import axios from "../../util/axios"
  export default {
    name: "polygonRender",
    data() {
      return {
        is: [true, false, false, false, false],
        displayForm: 'block',
        opacity: 1,
        radio: 0,
        icons: [0, 1, 2, 3],
        icon0: 0,
        imgurl: 'http://10.79.231.81/images/summer/map/icon',
        color: 'rgba(0, 0, 0, 1)',
        mincolor: 'rgba(255, 255, 255, 1)',
        maxcolor: 'rgba(0, 0, 0, 1)',
        fields: new Set([]),
        field: '',
        bl: true,
        featurecollections: {},
        strFields: new Set([]),//存放非数值字段
        sfield: '',
        strFieldVal: [],//存放非数值字段属性值
        colori: [
          'rgb(250,0,0)',
          'rgb(0,250,0)',
          'rgb(0,0,250)',
          'rgb(250,250,0)',
          'rgb(250,0,250)',
          'rgb(0,250,250)',
          'rgb(100,0,0)',
          'rgb(0,100,0)',
          'rgb(0,0,100)',
          'rgb(50,200,200)'
        ],
      }
    },
    props: {
      layername: String,
      myMap: Object
    },
    created() {
      let that = this;
      that.initfields();
      //加载图案
      that.loadImage();
    },
    computed: {},
    mounted() {
    },
    methods: {
      initfields() {
        let map = this.myMap;
        let url = map.getSource(this.layername)._data;
        let filename = url.substr(url.lastIndexOf('/') + 1, url.length);
        if (filename) {
          axios.get(this.$platfromUrl.readProjectFile + filename, {
            params: {
              type: 2
            }
          }).then(res => {
            let jsonData = res.data.body;
            let feature = null;
            //判别数据类型是否符合要求
            this.featurecollections = jsonData.features;
            if (jsonData.type === 'Feature') feature = jsonData;
            else if (jsonData.type === 'FeatureCollection') {
              if (jsonData.features.length) feature = jsonData.features[0];
              else this.$message({
                message: '当前图层数据为空',
                type: 'warning'
              });
            }
            if (feature) {
              //滤出值为数字的字段
              for (let i in feature.properties) {
                if (typeof (feature.properties[i]) === "number")
                  this.fields.add(i);
                else
                  this.strFields.add(i);
              }
            }
            return this.fields;
          })
        }
      },
      changeModel() {
        //改变功能显示
        for (let i = 0; i < 5; i++) {
          if (i === this.radio) {
            //为是否显示数组赋值
            this.$set(this.is, i, true);
          } else this.$set(this.is, i, false);
        }
        //初始化色带
        this.showColor();
      },
      loadImage() {
        let map = this.myMap;
        //读取图案
        if (map.hasImage('pattern0') === false) {
          for (let i = 0; i < this.icons.length; i++) {
            map.loadImage(this.imgurl + i + '.png', function (err, image) {
              if (err) throw err;
              map.addImage('pattern' + i.toString(), image);
            });
          }
        }
      },
      showColor() {
        //改变两端颜色时，刷新色带
        let c = document.getElementById("myCanvas");
        let cxt = c.getContext("2d");
        let grd = cxt.createLinearGradient(0, 0, 200, 40);
        grd.addColorStop(0, this.mincolor);
        grd.addColorStop(1, this.maxcolor);
        cxt.fillStyle = grd;
        cxt.fillRect(0, 0, 200, 40);
      },
      //根据所选颜色，直接渲染
      directRendering() {
        let map = this.myMap;
        map.setPaintProperty(this.layername, 'fill-pattern', undefined);
        map.setPaintProperty(this.layername, 'fill-opacity', this.opacity);
        map.setPaintProperty(this.layername, 'fill-color', this.color);
        this.$message({
          message: '渲染成功',
          type: 'success'
        });
      },
      //使用图案进行渲染
      iconRendering() {
        let map = this.myMap;
        map.setPaintProperty(this.layername, 'fill-pattern', undefined);
        map.setPaintProperty(this.layername, 'fill-opacity', this.opacity);
        map.setPaintProperty(this.layername, 'fill-pattern', 'pattern' + this.icon0.toString());
        this.$message({
          message: '渲染成功',
          type: 'success'
        });
      },
      //使用3d效果进行渲染
      threedDendering(layer) {
        let map = this.myMap;
        let data = map.getSource(layer)._data;
        if (this.field === '') {
          this.$message({
            message: '请选择作为height的字段',
            type: 'warning'
          });
        } else {
          map.removeLayer(layer);
          map.removeSource(layer);
          //添加新的fill-extrusion图层用于3d
          map.addLayer({
            "id": layer,
            "type": "fill-extrusion",
            "source": {
              'type': 'geojson',
              'data': data
            },
            "paint": {
              'fill-extrusion-color': this.color,
              'fill-extrusion-height': ['get', this.field],
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': this.opacity
            }
          })
          //更新数据库缓存
          let styleJson = map.getStyle();
          sessionStorage.setItem('mapstyle', JSON.stringify(styleJson));
          map.setPitch(15);
          this.$message({
            message: '渲染成功',
            type: 'success'
          });
        }
      },
      //根据字段分级渲染
      classificationRendering() {
        let map = this.myMap;
        //非multipolygon，警告
        let feature = this.featurecollections;
        if (feature.length === 1) {
          this.$message({
            message: '非multipolygon，无法分级渲染',
            type: 'warning'
          });
        }
        //multipolygon,分级渲染
        else {
          //未选择字段
          if (this.field === '') {
            this.$message({
              message: '请选择渲染字段',
              type: 'warning'
            });
          } else {
            //获取目标feature中field的最大最小值
            //用于分级渲染的上下限
            let maxvalue = feature[0].properties[this.field];
            let minvalue = feature[0].properties[this.field];
            for (let i in feature) {
              if (feature[i].properties[this.field] > maxvalue)
                maxvalue = feature[i].properties[this.field];
              if (feature[i].properties[this.field] < minvalue)
                minvalue = feature[i].properties[this.field];
            }
            map.setPaintProperty(this.layername, 'fill-pattern', undefined);
            map.setPaintProperty(this.layername, 'fill-opacity', this.opacity);
            map.setPaintProperty(this.layername, 'fill-color',
                    [
                      //插值渲染，选择线性
                      "interpolate",
                      ["linear"],
                      ["get", this.field],
                      minvalue, this.mincolor,
                      maxvalue, this.maxcolor,
                    ],
            );
            this.$message({
              message: '渲染成功',
              type: 'success'
            });
          }
        }
      },
      //单值渲染
      singleValueRendering() {
        let map = this.myMap;
        //匹配属性值和颜色，进行唯一值渲染
        map.setPaintProperty(this.layername, 'fill-pattern', undefined);
        map.setPaintProperty(this.layername, 'fill-opacity', this.opacity);
        if (this.strFieldVal.length === 0) {
          this.$message({
            message: '该字段无属性值或属性值过多，不建议进行单值渲染！',
            type: 'warning'
          });
        }
        //使用match表达式根据属性值个数的不同分别进行单值渲染
        else if (this.strFieldVal.length === 1) {
          map.setPaintProperty(this.layername, 'fill-color',
                  ["match", ["get", this.sfield],
                    this.strFieldVal[0], this.colori[0],
                    'rgb(255,255,255)'
                  ]
          )
        } else if (this.strFieldVal.length === 2) {
          map.setPaintProperty(this.layername, 'fill-color',
                  ["match", ["get", this.sfield],
                    this.strFieldVal[0], this.colori[0],
                    this.strFieldVal[1], this.colori[1],
                    'rgb(255,255,255)'
                  ]
          )
        } else if (this.strFieldVal.length === 3) {
          map.setPaintProperty(this.layername, 'fill-color',
                  ["match", ["get", this.sfield],
                    this.strFieldVal[0], this.colori[0],
                    this.strFieldVal[1], this.colori[1],
                    this.strFieldVal[2], this.colori[2],
                    'rgb(255,255,255)'
                  ]
          )
        } else if (this.strFieldVal.length === 4) {
          map.setPaintProperty(this.layername, 'fill-color',
                  ["match", ["get", this.sfield],
                    this.strFieldVal[0], this.colori[0],
                    this.strFieldVal[1], this.colori[1],
                    this.strFieldVal[2], this.colori[2],
                    this.strFieldVal[3], this.colori[3],
                    'rgb(255,255,255)'
                  ]
          )
        } else if (this.strFieldVal.length === 5) {
          map.setPaintProperty(this.layername, 'fill-color',
                  ["match", ["get", this.sfield],
                    this.strFieldVal[0], this.colori[0],
                    this.strFieldVal[1], this.colori[1],
                    this.strFieldVal[2], this.colori[2],
                    this.strFieldVal[3], this.colori[3],
                    this.strFieldVal[4], this.colori[4],
                    'rgb(255,255,255)'
                  ]
          )
        } else if (this.strFieldVal.length === 6) {
          map.setPaintProperty(this.layername, 'fill-color',
                  ["match", ["get", this.sfield],
                    this.strFieldVal[0], this.colori[0],
                    this.strFieldVal[1], this.colori[1],
                    this.strFieldVal[2], this.colori[2],
                    this.strFieldVal[3], this.colori[3],
                    this.strFieldVal[4], this.colori[4],
                    this.strFieldVal[5], this.colori[5],
                    'rgb(255,255,255)'
                  ]
          )
        } else if (this.strFieldVal.length === 7) {
          map.setPaintProperty(this.layername, 'fill-color',
                  ["match", ["get", this.sfield],
                    this.strFieldVal[0], this.colori[0],
                    this.strFieldVal[1], this.colori[1],
                    this.strFieldVal[2], this.colori[2],
                    this.strFieldVal[3], this.colori[3],
                    this.strFieldVal[4], this.colori[4],
                    this.strFieldVal[5], this.colori[5],
                    this.strFieldVal[6], this.colori[6],
                    'rgb(255,255,255)'
                  ]
          )
        } else if (this.strFieldVal.length === 8) {
          map.setPaintProperty(this.layername, 'fill-color',
                  ["match", ["get", this.sfield],
                    this.strFieldVal[0], this.colori[0],
                    this.strFieldVal[1], this.colori[1],
                    this.strFieldVal[2], this.colori[2],
                    this.strFieldVal[3], this.colori[3],
                    this.strFieldVal[4], this.colori[4],
                    this.strFieldVal[5], this.colori[5],
                    this.strFieldVal[6], this.colori[6],
                    this.strFieldVal[7], this.colori[7],
                    'rgb(255,255,255)'
                  ]
          )
        } else if (this.strFieldVal.length === 9) {
          map.setPaintProperty(this.layername, 'fill-color',
                  ["match", ["get", this.sfield],
                    this.strFieldVal[0], this.colori[0],
                    this.strFieldVal[1], this.colori[1],
                    this.strFieldVal[2], this.colori[2],
                    this.strFieldVal[3], this.colori[3],
                    this.strFieldVal[4], this.colori[4],
                    this.strFieldVal[5], this.colori[5],
                    this.strFieldVal[6], this.colori[6],
                    this.strFieldVal[7], this.colori[7],
                    this.strFieldVal[8], this.colori[8],
                    'rgb(255,255,255)'
                  ]
          )
        } else if (this.strFieldVal.length > 9) {
          this.$message({
            message: '该字段不建议进行单值渲染',
            type: 'warning'
          });
        }
      },
      //把非数值字段所有属性值存入strFieldVal数组，返回该数组长度
      getStrFieldsNum() {
        let map = this.myMap;
        //非multipolygon，警告
        let feature = this.featurecollections;
        if (feature.length === 1) {
          this.$message({
            message: '非multipolygon，无法渲染',
            type: 'warning'
          });
        }
        //multipolygon,单值渲染
        else {
          //未选择字段
          if (this.sfield === '') {
            this.$message({
              message: '请选择渲染字段',
              type: 'warning'
            });
          } else {
            //读取目标图层sfield属性的所有值到strFieldVal数组中
            this.strFieldVal = [];//清空原有属性值
            let count = 0;//记录属性值重复的个数
            let skip = false;
            for (let i = 0; i < feature.length; i++) {
              skip = false;
              for (let j = 0; j <= this.strFieldVal.length - 1; j++) {
                //已存在该属性值，则跳过
                if (feature[i].properties[this.sfield] === this.strFieldVal[j]) {
                  count++;
                  skip = true;
                  break;
                }
              }
              if (skip === false) {
                this.strFieldVal[i - count] = feature[i].properties[this.sfield];
              }
              //属性值过多，不进行单值渲染
              if(this.strFieldVal.length>=10){
                this.strFieldVal = [];
                this.$message({
                  message: '属性值过多，不建议进行单值渲染！',
                  type: 'warning'
                });
                break;
              }
            }
            return this.strFieldVal.length;
          }
        }
      },
      //开始渲染
      startRendering() {
        let map = this.myMap;
        let layer = this.layername;
        //3D图层转变为面图层
        if (map.getLayer(layer).type === 'fill-extrusion') {
          let data = map.getSource(layer)._data;
          map.removeLayer(layer);
          map.removeSource(layer);
          map.addLayer({
            "id": layer,
            "type": "fill",
            "source": {
              'type': 'geojson',
              'data': data
            },
            "paint": {
              'fill-color': this.color,
              'fill-opacity': this.opacity
            }
          });
          //更新数据库缓存
          let styleJson = map.getStyle();
          sessionStorage.setItem('mapstyle', JSON.stringify(styleJson));
        }
        //根基勾选框确定渲染方式
        if (this.radio === 0) {
          //直接渲染
          this.directRendering();
        } else if (this.radio === 2) {
          //使用图案
          this.iconRendering();
        } else if (this.radio === 3) {
          //使用3d
          this.threedDendering(layer);
        } else if (this.radio === 1) {
          //根据字段分级渲染
          this.classificationRendering();
        } else {
          //单值渲染
          this.singleValueRendering();
        }
        let styleJson = this.myMap.getStyle();
        sessionStorage.setItem('mapstyle', JSON.stringify(styleJson));
      }
    }
  }


</script>

<style scoped>
  #polygonRender{
    background-color: #ffffff;
    width:294px;
    margin:0 auto;
    border:1px solid #d5d5d8;
    border-radius: 5px;
  }
  .el-form-item {
    padding: 4px 0;
  }
  .el-image{
    width:50px;
    height:50px;
  }
  .el-radio{
    padding: 4px;
  }
  .my /deep/ .el-slider__input{
    float:none;
  }
  .my /deep/ .el-slider__runway {
    width: 120px;
  }
  .el-tag{
    width:100px;
    height: 28px;
    text-align: center;
    vertical-align: top;
  }

</style>
