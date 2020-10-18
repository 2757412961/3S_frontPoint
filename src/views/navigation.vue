<template>
    <div>
        <div :style="{width: '100%', height: ($window.height-60)+'px'}">
            <el-carousel style="height:100%;" :interval="4000">
                <el-carousel-item :style="{width: '100%', height: ($window.height-60)+'px'}" v-for="item in newsPics" :key="item.img">
                    <div @click="imgLink(item.link)" style="width: 100%; height: 100%;">
                        <el-image :title="item.title" :src="item.img" :fit="imgFitType"
                                  style="width: 100%; height: 100%;">
                          <h3 class="small">{{ item.text }}</h3>
                        </el-image>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
      <div>
        <div style="margin: 20px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card style="height: 470px">
                <div slot="header" class="clearfix">
                  <span>最新论文</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="showPaperDetail">查看更多</el-button>
                </div>
                <div v-for="newPaper in newPapers" :key="newPaper" class="text item">
                  {{ newPaper.title }}
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card style="height: 470px">
                <div slot="header" class="clearfix">
                  <span>最新期刊</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="showJournalDetail">查看更多</el-button>
                </div>
                <div v-for="newJounal in newJournals" :key="newJournal" class="text item">
                  {{ newJounal.title }}
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card style="height: 470px">
                <div slot="header" class="clearfix">
                  <span>最新讲座</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="showLectureDetail">查看更多</el-button>
                </div>
                <div v-for="newLecture in newLectures" :key="newLecture" class="text item">
                  {{ newLecture.name }}
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card style="height: 470px">
                <div slot="header" class="clearfix">
                  <span>热点数据</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="showGeoDetail">查看更多</el-button>
                </div>
                <div v-for="geoData in geoDatas" :key="geoData" class="text item">
                  {{ geoData.title }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
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
                    {title: "", img: "../../static/img/carousel-paper.jpg", link: "/academia/paper", text: "丰富的论文资源"},
                    {title: "", img: "../../static/img/carousel-journal.jpg", link: "/academia/journal", text: "丰富的期刊资源"},
                    {title: "", img: "../../static/img/carousel-lecture.jpg", link: "/academia/lecture", text: "最新的讲座信息"},
                ],
                imgFitType: "fill",
                geoDatas: [],
                newPapers: [],
                newJournals: [],
                newLectures: [],
            }
        },
        methods: {
            //TODO 首页图片跑马灯跳转至详情页
            imgLink(link) {
              this.$router.push(link);
            },
            showPaperDetail() {
                this.$router.push('/academia/paper');
            },
            showJournalDetail() {
                this.$router.push('/academia/journal');
            },
            showLectureDetail() {
                this.$router.push('/academia/lecture');
            },
            showGeoDetail() {
                this.$router.push('/spaceData');
            },
        },
        computed: {},
        mounted() {
            this.$axios.get(this.$URL.getGeoPopular).then(
                res => {
                    this.geoDatas=res.body;
                }).catch(err => {
                }
            );
            this.$axios.get(this.$URL.getPaperNew).then(
                res => {
                    this.newPapers=res.body;
                }).catch(err => {
                }
            );
            this.$axios.get(this.$URL.getJournalNew).then(
                res => {
                  this.newJournals=res.body;
                }).catch(err => {
                }
            );
            this.$axios.get(this.$URL.getLectureNew).then(
                res => {
                  this.newLectures=res.body;
                }).catch(err => {
                }
            );
        }
    }
</script>

<style scoped>
.el-carousel__item h3 {
  color: white;
  font-size: 14px;
}

.el-carousel__container {
  position: relative;
  height: 100% !important;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
