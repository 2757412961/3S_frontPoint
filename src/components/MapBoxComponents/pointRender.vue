 <!--实现点图层大小、颜色的改变；按照属性进行分级渲染，唯一值渲染，热力图展示；使用图案渲染；聚类渲染 -->
 <template>
  <div id="pointRender" :style="{display:displayForm}">
    <el-form label-position="left" label-width="90px" style=" padding:10px;">
      <el-form-item label="渲染方式">
        <el-radio-group v-model="radio" @change="changeModel">
          <el-radio :label="0" style="padding:8px">直接渲染</el-radio>
          <el-radio :label="1" style="padding:8px">分级渲染</el-radio>
          <el-radio :label="2" style="padding:8px">使用图案</el-radio>
          <el-radio :label="3" style="padding:8px">聚类渲染</el-radio>
          <el-radio :label="4" style="padding:8px">唯一值渲染</el-radio>
          <el-radio :label="5" style="padding:8px">热力图</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="渲染字段" v-show="is[1]||is[5]">
        <el-select v-model="field" placeholder="选择渲染字段">
          <el-option v-for="item in fields" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="渲染字段" v-show="is[4]">
        <el-select v-model="sfield" placeholder="选择渲染字段" @change="getStrFieldsNum">
          <el-option v-for="item in strFields" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="my" label="透明度" v-show="!is[5]&&!is[3]">
        <el-slider v-model="opacity" :max="1" :step="0.01" show-input></el-slider>
      </el-form-item>

      <el-form-item class="my" label="半径" v-show="is[0]||is[1]||is[2]||is[4]">
        <el-slider v-model="radius" :max="20" :step="1" show-input></el-slider>
      </el-form-item>

      <el-form-item label="选择颜色" v-show="is[0]">
        <el-color-picker v-model="color"></el-color-picker>
      </el-form-item>

      <el-form-item label="图案样式" v-show="is[2]">
        <el-radio-group v-model="icon0">
          <el-radio v-for="item in icons" :key="item" :value="item" :label="item">
            <el-image :src="imgurl+item+'.png'"></el-image>
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="最小值颜色" v-show="is[1]">
        <el-color-picker v-model="mincolor" @change="showColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="最大值颜色" v-show="is[1]">
        <el-color-picker v-model="maxcolor" @change="showColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="色带预览" v-show="is[1]">
        <canvas id="myCanvas" width="130" height="40" style="border:1px solid #c3c3c3;"></canvas>
      </el-form-item>

      <el-form-item label="单值颜色" v-show="is[4]">
        <el-form-item v-show="is[4]" v-for="(item,key) in this.strFieldVal" v-bind:key="item">
          <el-tag type="info" effect="plain">{{ item }}</el-tag>
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
import axios from "../util/axios";
export default {
  name: "pointRender",
  data() {
    return {
      is: [true, false, false, false, false, false],
      displayForm: "block",
      opacity: 1,
      radio: 0,
      icon0: 0,
      icons: [0, 1, 2],
      imgurl: "http://10.79.231.81/images/summer/map/symbol",
      color: "rgba(0, 0, 0, 1)",
      radius: 3,
      mincolor: "rgba(255, 255, 255, 1)",
      maxcolor: "rgba(0, 0, 0, 1)",
      fields: new Set([]),
      field: "",
      bl: true,
      featurecollections: {},
      strFields: new Set([]), //存放非数值字段
      sfield: '',
      strFieldVal: [], //存放非数值字段属性值
      colori: [
        "rgb(250,0,0)",
        "rgb(0,250,0)",
        "rgb(0,0,250)",
        "rgb(250,250,0)",
        "rgb(250,0,250)",
        "rgb(0,250,250)",
        "rgb(100,0,0)",
        "rgb(0,100,0)",
        "rgb(0,0,100)",
        "rgb(50,200,200)"
      ]
    };
  },
  props: {
    layername: String,
    myMap: Object
  },
  methods: {
    initfields() {
      let map = this.myMap;
      let url = map.getSource(this.layername)._data;
      let filename = url.substr(url.lastIndexOf("/") + 1, url.length);
      if (filename) {
        axios
          .get("http://127.0.0.1:13000/summer/file/temp/" + filename, {
            params: {
              type: 2
            }
          })
          .then(res => {
            let jsonData = res.data.body;
            let feature = null;
            //判别数据类型是否符合要求
            this.featurecollections = jsonData.features;
            if (jsonData.type === "Feature") feature = jsonData;
            else if (jsonData.type === "FeatureCollection") {
              if (jsonData.features.length) feature = jsonData.features[0];
              else
                this.$message({
                  message: "当前图层数据为空",
                  type: "warning"
                });
            }
            if (feature) {
              //滤出值为数字的字段
              for (let i in feature.properties) {
                if (typeof feature.properties[i] === "number")
                  this.fields.add(i);
                else this.strFields.add(i);
              }
            }
            return this.fields;
          });
      }
    },
    changeModel() {
      //改变功能显示
      for (let i = 0; i < 6; i++) {
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
      if (map.hasImage("pointpattern0") === false) {
        for (let i = 0; i < this.icons.length; i++) {
          map.loadImage(this.imgurl + i + ".png", function(err, image) {
            if (err) throw err;
            map.addImage("pointpattern" + i.toString(), image);
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
    startRendering() {
      let map = this.myMap;
      let layer = this.layername;
      let data = map.getSource(layer)._data;
      //删除聚类渲染时的关联图层
      if (sessionStorage.getItem(this.layername)) {
        let layerids = JSON.parse(sessionStorage.getItem(this.layername));
        for (let id in layerids) {
          map.removeLayer(layerids[id]);
        }
        map.removeLayer(layer);
        map.removeSource(layer);
        map.addLayer({
          id: layer,
          type: "circle",
          source: {
            type: "geojson",
            data: data
          },
          paint: {
            "circle-color": this.color,
            "circle-radius": this.radius,
            "circle-opacity": this.opacity
          }
        });
        sessionStorage.removeItem(this.layername);
      }
      //删除热力图的图层
      if (map.getLayer(layer).type === "heatmap") {
        map.removeLayer(layer);
        map.removeSource(layer);
        map.addLayer({
          id: layer,
          type: "circle",
          source: {
            type: "geojson",
            data: data
          },
          paint: {
            "circle-color": this.color,
            "circle-radius": this.radius,
            "circle-opacity": this.opacity
          }
        });
        //更新数据库缓存
        let styleJson = map.getStyle();
        sessionStorage.setItem("mapstyle", JSON.stringify(styleJson));
      }
      //根基勾选框确定渲染方式
      if (this.radio === 0) {
        //直接渲染
        this.directRendering();
      } else if (this.radio === 1) {
        //根据字段分级渲染
        this.classificationRendering();
      } else if (this.radio === 2) {
        //使用图案
        this.iconRendering();
      } else if (this.radio === 3) {
        //聚类渲染
        this.clusterRendering(layer);
      } else if (this.radio === 4) {
        //单值渲染
        this.singleValueRendering();
      } else if (this.radio === 5) {
        //热力图
        this.heatmapRendering();
      }
      let styleJson = this.myMap.getStyle();
      sessionStorage.setItem("mapstyle", JSON.stringify(styleJson));
    },
    directRendering() {
      let map = this.myMap;
      map.setPaintProperty(this.layername, "circle-color", this.color); //设置颜色
      map.setPaintProperty(this.layername, "circle-radius", this.radius); //设置半径
      map.setPaintProperty(this.layername, "circle-opacity", this.opacity);
      this.$message({
        message: "渲染成功",
        type: "success"
      });
    },
    classificationRendering() {
      let map = this.myMap;
      let feature = this.featurecollections;
      if (this.field === "") {
        this.$message({
          message: "请选择渲染字段",
          type: "warning"
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
        map.setPaintProperty(this.layername, "circle-color", [
          "interpolate",
          ["linear"],
          ["get", this.field],
          minvalue,
          this.mincolor,
          maxvalue,
          this.maxcolor
        ]);
        map.setPaintProperty(this.layername, "circle-radius", this.radius); //设置半径
        map.setPaintProperty(this.layername, "circle-opacity", this.opacity);
        this.$message({
          message: "渲染成功",
          type: "success"
        });
      }
    },
    //使用图案进行渲染
    iconRendering() {
      let map = this.myMap;
      let layer = this.layername;
      let data = map.getSource(layer)._data;
      map.removeLayer(layer);
      map.removeSource(layer);
      map.addLayer({
        id: layer,
        type: "symbol",
        source: {
          type: "geojson",
          data: data
        },
        layout: {
          "icon-image": "pointpattern" + this.icon0.toString(),
          "icon-size": 0.01 * this.radius
        },
        paint: {
          "icon-opacity": this.opacity
        }
      });
      //更新数据库缓存
      let styleJson = map.getStyle();
      sessionStorage.setItem("mapstyle", JSON.stringify(styleJson));
      this.$message({
        message: "渲染成功",
        type: "success"
      });
    },
    clusterRendering() {
      let map = this.myMap;
      let data = map.getSource(this.layername)._data;
      map.removeLayer(this.layername);
      map.removeSource(this.layername);
      map.addSource(this.layername, {
        type: "geojson",
        data: data,
        cluster: true
      });
      let layerids = [];
      map.addLayer({
        id: this.layername,
        type: "circle",
        source: this.layername,
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1"
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });

      map.addLayer({
        id: this.layername + "-count",
        type: "symbol",
        source: this.layername,
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12
        },
        glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf"
      });
      //存储图层名称
      layerids.push(this.layername + "-count");

      map.addLayer({
        id: this.layername + "-unclustered-point",
        type: "circle",
        source: this.layername,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 4,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff"
        }
      });
      layerids.push(this.layername + "-unclustered-point");
      //缓存图层名称
      sessionStorage.setItem(this.layername, JSON.stringify(layerids));
    },
    heatmapRendering() {
      if (this.field === "") {
        this.$message({ message: "请选择渲染字段", type: "warning" });
        return;
      }
      let map = this.myMap;
      let data = map.getSource(this.layername)._data;
      map.removeLayer(this.layername);
      map.removeSource(this.layername);
      let feature = this.featurecollections;
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
      map.addLayer({
        id: this.layername,
        type: "heatmap",
        source: {
          type: "geojson",
          data: data
        },
        maxzoom: 9,
        paint: {
          // Increase the heatmap weight based on frequency and property magnitude
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", this.field],
            minvalue,
            0,
            maxvalue,
            1
          ],
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            minvalue,
            1,
            maxvalue,
            3
          ],
          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparancy color
          // to create a blur-like effect.
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgb(209,229,240)",
            0.6,
            "rgb(253,219,199)",
            0.8,
            "rgb(239,138,98)",
            1,
            "rgb(178,24,43)"
          ],
          // Adjust the heatmap radius by zoom level
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
          // Transition from heatmap to circle layer by zoom level
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0]
        }
      });
    },
    //把非数值字段所有属性值存入strFieldVal数组，返回该数组长度
    getStrFieldsNum() {
      let map = this.myMap;
      //非multipoint，警告
      let feature = this.featurecollections;
      if (feature.length === 1) {
        this.$message({
          message: '非multipolygon，无法渲染',
          type: 'warning'
        });
      }
      //multipoint,单值渲染
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
    //单值渲染
    singleValueRendering() {
      let map = this.myMap;
      //匹配属性值和颜色，进行唯一值渲染
      map.setPaintProperty(this.layername, "circle-radius", this.radius);
      map.setPaintProperty(this.layername, "circle-opacity", this.opacity);
      if (this.strFieldVal.length === 0) {
        this.$message({
          message: '该字段无属性值或属性值过多，不建议进行单值渲染！',
          type: 'warning'
        });
      }
      //使用match表达式根据属性值个数的不同分别进行单值渲染
      else if (this.strFieldVal.length === 1) {
        map.setPaintProperty(this.layername, 'circle-color',
                ["match", ["get", this.sfield],
                  this.strFieldVal[0], this.colori[0],
                  'rgb(255,255,255)'
                ]
        )
      } else if (this.strFieldVal.length === 2) {
        map.setPaintProperty(this.layername, 'circle-color',
                ["match", ["get", this.sfield],
                  this.strFieldVal[0], this.colori[0],
                  this.strFieldVal[1], this.colori[1],
                  'rgb(255,255,255)'
                ]
        )
      } else if (this.strFieldVal.length === 3) {
        map.setPaintProperty(this.layername, 'circle-color',
                ["match", ["get", this.sfield],
                  this.strFieldVal[0], this.colori[0],
                  this.strFieldVal[1], this.colori[1],
                  this.strFieldVal[2], this.colori[2],
                  'rgb(255,255,255)'
                ]
        )
      } else if (this.strFieldVal.length === 4) {
        map.setPaintProperty(this.layername, 'circle-color',
                ["match", ["get", this.sfield],
                  this.strFieldVal[0], this.colori[0],
                  this.strFieldVal[1], this.colori[1],
                  this.strFieldVal[2], this.colori[2],
                  this.strFieldVal[3], this.colori[3],
                  'rgb(255,255,255)'
                ]
        )
      } else if (this.strFieldVal.length === 5) {
        map.setPaintProperty(this.layername, 'circle-color',
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
        map.setPaintProperty(this.layername, 'circle-color',
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
        map.setPaintProperty(this.layername, 'circle-color',
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
        map.setPaintProperty(this.layername, 'circle-color',
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
        map.setPaintProperty(this.layername, 'circle-color',
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
  },
  created() {
    let that = this;
    that.initfields();
    //加载图案
    that.loadImage();
  }
};
</script>

<style scoped>
#pointRender {
  background-color: #ffffff;
  width: 294px;
  margin: 0 auto;
  border: 1px solid #d5d5d8;
  border-radius: 5px;
}
.el-form-item {
  padding: 8px 0;
}
.el-image {
  width: 30px;
  height: 30px;
}
.my /deep/ .el-slider__input {
  float: none;
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