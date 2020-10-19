<template>
  <el-row>
    <div>
      <h1 style="margin-top: 30px; color: cadetblue; text-align: center;font-size: 30px;">团队介绍</h1>
      <p style="margin-bottom: 18px; margin-right: auto;margin-left: auto; width: 665px;text-align: left;font-size: 20px; margin-top: 10px;line-height: 1.5em">本平台在张丰老师指导下，目前先后经历了版本1和版本2。以下两幅图片为不同版本的团队成员合影，点击图中不同位置可查看对应成员的详细信息。</p>
    </div>
    <el-col :span="12">
      <el-card :body-style="{padding: '10px'}">
        <el-popover placement="right" title="详细信息" width="300" trigger="manual" v-model="visible1">
          <el-table :data="gridData">
            <el-table-column width="50" property="ID" label="ID"></el-table-column>
            <el-table-column width="100" property="NAME" label="NAME"></el-table-column>
            <el-table-column width="100" property="VERSION" label="VERSION"></el-table-column>
            <el-table-column width="100" property="TEAM" label="TEAM"></el-table-column>
            <el-table-column width="150" property="ROLE" label="ROLE"></el-table-column>
            <el-table-column width="200" property="EMAIL" label="EMAIL"></el-table-column>
          </el-table>
          <el-button type="primary" style="margin-top: 30px;margin-left: 100px" @click="closeClick">关闭按钮</el-button>
          <img v-bind:src="imgUrl" class="image" usemap="#firstmap" slot="reference">
          <map name="firstmap" id="firstmap">
            <!--                    85,220,150,295;170,210,230,280; 240,250,290,310; 330,215,385,270; 450,190,500,250;555,210,610,275 -->
            <area shape="rect" coords="85,220,150,295" @click="handleClickPeople('王既涵')">
            <area shape="rect" coords="170,210,230,280" @click="handleClickPeople('张家瑞')">
            <area shape="rect" coords="240,250,290,310" @click="handleClickPeople('徐嘉樱子')">
            <area shape="rect" coords="330,215,385,270" @click="handleClickPeople('邱洪发')">
            <area shape="rect" coords="450,190,500,250" @click="handleClickPeople('王嘉奇')">
            <area shape="rect" coords="555,210,610,275" @click="handleClickPeople('张思远')">
          </map>
        </el-popover>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card :body-style="{padding: '10px'}">
        <el-popover placement="left" title="详细信息" width="300" trigger="manual" v-model="visible2">
          <el-table :data="gridData">
            <el-table-column width="50" property="ID" label="ID"></el-table-column>
            <el-table-column width="100" property="NAME" label="NAME"></el-table-column>
            <el-table-column width="100" property="VERSION" label="VERSION"></el-table-column>
            <el-table-column width="100" property="TEAM" label="TEAM"></el-table-column>
            <el-table-column width="150" property="ROLE" label="ROLE"></el-table-column>
            <el-table-column width="200" property="EMAIL" label="EMAIL"></el-table-column>
          </el-table>
          <el-button type="primary" style="margin-top: 30px;margin-left: 100px" @click="closeClick">关闭按钮</el-button>
          <img v-bind:src="imgUrl" class="image" usemap="#secondMap" slot="reference">
          <map name="secondMap" id="secondMap">
            <area shape="rect" coords="85,220,150,295" @click="handleClickPeople2('梁舒晨')">
            <area shape="rect" coords="170,210,230,280" @click="handleClickPeople2('姚楠')">
            <area shape="rect" coords="240,250,290,310" @click="handleClickPeople2('孟凡恩')">
            <area shape="rect" coords="330,215,385,270" @click="handleClickPeople2('黄欣雨')">
            <area shape="rect" coords="450,190,500,250" @click="handleClickPeople2('周育全')">
            <area shape="rect" coords="555,210,610,275" @click="handleClickPeople2('张郑良')">
          </map>
        </el-popover>
      </el-card>
    </el-col>
  </el-row>
</template>


<script>
const peopleData1 = [{
  ID: '10',
  NAME: '王既涵',
  VERSION: 'V1.0',
  TEAM: '1',
  ROLE: 'member',
  EMAIL: 'wjhgisrookie@gmail.com',
}, {
  ID: '11',
  NAME: '张家瑞',
  VERSION: 'V1.0',
  TEAM: '2',
  ROLE: 'leader',
  EMAIL: 'jiaruihz@foxmail.com',
},{
  ID: '12',
  NAME: '徐嘉樱子',
  VERSION: 'V1.0',
  TEAM: '2',
  ROLE: 'member',
  EMAIL: 'xujyz1998@zju.edu.cn',
},{
  ID: '13',
  NAME: '邱洪发',
  VERSION: 'V1.0',
  TEAM: '2',
  ROLE: 'member',
  EMAIL: '951142905@qq.com',
},{
  ID: '14',
  NAME: '王嘉奇',
  VERSION: 'V1.0',
  TEAM: '2',
  ROLE: 'member',
  EMAIL: '1021300963@qq.com',
},{
  ID: '15',
  NAME: '张思远',
  VERSION: 'V1.0',
  TEAM: '3',
  ROLE: 'leader',
  EMAIL: 'zsy54203@163.com',
}];

const peopleData2 = [{
  ID: '24',
  NAME: '梁舒晨',
  VERSION: 'V2.0',
  TEAM: '1',
  ROLE: 'leader',
  EMAIL: '',
}, {
  ID: '25',
  NAME: '姚楠',
  VERSION: 'V2.0',
  TEAM: '1',
  ROLE: 'member',
  EMAIL: '',
},{
  ID: '26',
  NAME: '孟凡恩',
  VERSION: 'V2.0',
  TEAM: '1',
  ROLE: 'member',
  EMAIL: '',
},{
  ID: '27',
  NAME: '黄欣雨',
  VERSION: 'V2.0',
  TEAM: '1',
  ROLE: 'member',
  EMAIL: '',
},{
  ID: '28',
  NAME: '周育全',
  VERSION: 'V2.0',
  TEAM: '2',
  ROLE: 'leader',
  EMAIL: '',
},{
  ID: '29',
  NAME: '张郑良',
  VERSION: 'V2.0',
  TEAM: '2',
  ROLE: 'member',
  EMAIL: '',
}];
export default {
  name: "aboutUs",
  data(){
    return{
      visible1:false,
      visible2:false,
      imgUrl: require("../../static/img/photo.jpg"),
      gridData:[]
    };
  },
  methods: {
    handleClickPeople(name){
      // this.visible1=!this.visible1;
      this.visible1=true;
      if(this.visible1){
        this.gridData = peopleData1.filter((item)=> item.NAME === name)
      }
    },
    closeClick(){
      this.visible1=false;
      this.visible2=false;
    },
    handleClickPeople2(name){
      this.visible2=true
      if(this.visible2){
        this.gridData = peopleData2.filter((item)=> item.NAME === name)
      }
    }
  }
}
</script>


<style>
.image{
  height:100%;
  width: 100%;
}

</style>