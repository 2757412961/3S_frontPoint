<template>
  <el-main>
    <!--    条件选择器-->
    <div>
      <div class="managerSearchMenu">
        <el-date-picker
                v-model="datevalue"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']">
        </el-date-picker>
      </div>
      <div class="managerSearchMenu">
        <el-input v-model="inputvalue" placeholder="请输入数据名称"></el-input>
      </div>
      <div class="managerSearchMenu">
        <el-select v-model="typevalue" placeholder="请选择操作类型">
          <el-option
                  v-for="item in typeoptions"
                  :key="item.typevalue"
                  :label="item.label"
                  :value="item.typevalue">
          </el-option>
        </el-select>
      </div>
      <div class="managerSearchMenu" style="float: right">
        <el-button type="primary" icon="el-icon-search" @click="searchAll(1)">搜索</el-button>
      </div>
    </div>
    <!--数据记录表格-->
    <div style="padding-top: 10px">
      <el-table
              :data="tableData"
              stripe
              style="width: 100%">
        <el-table-column
                prop="id"
                label="ID"
                width="350"
                align="center">
        </el-table-column>
        <el-table-column
                prop="TYPE"
                label="操作类型"
                width="120"
                align="center">
        </el-table-column>
        <el-table-column
                prop="dataID"
                label="资源名称"
                width="350"
                align="center">
        </el-table-column>
        <el-table-column
                prop="operateName"
                label="操作人ID"
                width="350"
                align="center">
        </el-table-column>
        <el-table-column
                prop="operateDate"
                label="操作时间"
                align="center">
        </el-table-column>
      </el-table>
    </div>


    <!-- 页码选择器-->
    <div>
      <el-pagination
              :current-page.sync="currentPage1"
              :page-size="12"
              layout="total, prev, pager, next"
              :total="this.totalCount"
              @current-change="ChangePage"
              style="float: right">
      </el-pagination>
    </div>
  </el-main>
</template>

<script>
  export default {
    name: "Log",
    data() {
      return {
        typeoptions: [{
          value: '选项1',
          label: '添加'
        }, {
          value: '选项2',
          label: '修改'
        }, {
          value: '选项3',
          label: '删除'
        }, ],
        tableData:[],
        datevalue: '',
        typevalue:'',
        inputvalue:'',
        totalCount:'',
        currentPage:{},
      };
    },
    mounted() {
      let that=this;
      that.searchAll()
    },
    methods:{
      ChangePage(currentPage)
      {
        let that=this;
        //每次调整页码的时候获取到对应的页码,存入currentPage对象中
        this.currentPage[this.activeName]=currentPage;
        //调用后端接口，传入pagesize，当前页，当前类别，通过refresh函数实现
        that.searchAll(currentPage)
      },

      searchAll(currentPage=1){
        let that=this;
        let pageNo=currentPage
        //searchAllLog
        let needURL=that.$URL.searchAllLog+"?pageNo="+pageNo+"&pageSize=12"
        that.$axios.get(needURL,"").then(
                res => {
                  if (res.code == 1002){
                    that.$message({
                      message: "查询日志失败",
                      type: 'warning'
                    });
                  }
                  else if(res.code == 200){
                    that.$message({
                      message: "查询日志成功",
                      type: 'success'
                    });

                    that.totalCount=res.body.totalCount
                    console.log(that.totalCount)
                    let getlist=res.body.result
                    that.tableData.length=0
                    for (let i = 0; i < getlist.length; i++) {
                      let userInfoJson=getlist[i]
                      console.log(userInfoJson)
                      let userInfo={
                        id: userInfoJson.id,
                        TYPE: userInfoJson.type,
                        dataID: userInfoJson.objectId,
                        operateName:userInfoJson.actId,
                        operateDate:userInfoJson.time,
                      }
                      that.tableData.push(userInfo)
                    }
                  }
                }
        )
      },
    }

  }
</script>

<style scoped>
  .managerSearchMenu{
    float: left;
    padding-left: 40px;
  }

</style>

