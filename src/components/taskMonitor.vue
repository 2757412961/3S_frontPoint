<template>
    <div class="monitorMain">
        <el-table :data="taskList" style="height: 100%;overflow: auto;" id="taskListTable"
                  :row-key='getTableRowKeys'
                  :expand-row-keys="expands"
                  @expand-change="expandChange">
            <el-table-column type="expand" width="25px">
                <template slot-scope="props">
                    <el-table class="jobsTable"
                              :data="jobsList"
                              current-row-key
                              width="100%">
                        <el-table-column
                                prop="rowIndex"
                                type="index"
                                label="子任务"
                                width="70"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="子任务名称"
                                width="160"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="子任务状态"
                                width="120"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="startTime"
                                label="开始时间"
                                :formatter="formatTime"
                                width="170"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="endTime"
                                label="结束时间"
                                :formatter="formatTime"
                                width="170"
                                align="center">
                        </el-table-column>
                        
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="任务名称"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="startTime"
                    label="创建时间"
                    :formatter="formatTime"
                    width="200"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="结束时间"
                    :formatter="formatTime"
                    width="200"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="任务状态"
                    width="150"
                    align="center">
                <template slot-scope="scope">
                    <el-button icon='el-icon-loading'
                               type="primary"
                               v-if="scope.row.status=='running'"
                               circle>
                    </el-button>
                    <el-button icon='el-icon-check'
                               v-else-if="scope.row.status=='success'"
                               type="success"
                               circle>
                    </el-button>
                    <el-button icon='el-icon-close'
                               v-else="scope.row.status=='failed'"
                               type="danger"
                               circle>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column width="fit-content" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button
                            title="刷新子任务状态"
                            icon="el-icon-refresh"
                            @click="refreshWorkFlowJobs(scope.$index,scope.row)"
                            type="text">
                    </el-button>
                    <el-button
                            title="删除"
                            icon="el-icon-delete"
                            @click="deleteWorkflowTask(scope.$index,scope.row)"
                            type="text">
                    </el-button>
                    <el-button
                            title="下载"
                            icon="el-icon-download"
                            @click="downloadResult(scope.$index,scope.row)"
                            type="text">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="height: 4px"></div>
        <div style="height:12%;width: 100%;text-align:center;">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[8, 16, 24, 32]"
                :page-size="pageSize"
                background
                layout="prev, pager, next"
                :total=this.totalCount>
        </el-pagination>
        </div>
        <div style="height: 4px"></div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "taskMonitor",
        data(){
          return{
              getTableRowKeys(row) {
                  return row.runId;
              },
              jobsList: [],
              taskList: [],
              expands: [],
              pageSize: 6,
              pageNo: 1,
              totalCount: 0
          }
        },
        methods: {
            refreshWorkFlowJobs(index, row) {
                let url = this.$platfromUrl.workFlowTask + row.runId + "/jobs";
                let that = this;
                this.$axios.get(url).then(res => {
                    if (res.code === 200) {
                        that.jobsList = res.body;
                    }
                }).catch(function (errer) {

                })
            },
            getWorkflowTable() {
                let that = this;
                let url = this.$platfromUrl.workFlowTaskList + this.pageSize + '&pageNo=' + this.pageNo;
                this.$axios.get(url).then(res => {
                    debugger;
                    if (res.code === 200) {
                        for (let row of res.body.result) {
                            that.taskList = res.body.result;
                            if (row.status === "success" || row.status === "failed") {

                            } else {
                                let superviseTimer = setInterval(function () {
                                    let Monitorurl = that.$platfromUrl.workFlowTask + row.runId;
                                    that.$axios.get(Monitorurl)
                                        .then(function (response) {
                                            if (response.code !== 200) {
                                                clearInterval(superviseTimer);
                                            } else {
                                                if (response.body.status === 'success' || response.body.status === 'failed') {
                                                    clearInterval(superviseTimer);
                                                    if (response.body.status === "failed") {
                                                        //没有成功的话，没有完成时间
                                                        row.status = "FAILED";
                                                        row.endtime = response.body.endtime;
                                                    } else {
                                                        row.status = "success";
                                                        row.endtime = response.body.endtime;
                                                    }
                                                }
                                            }
                                        })
                                }, 3000);
                            }
                        }
                        that.totalCount = parseInt(res.body.totalCount);
                    } else {
                        that.$message({
                            type: 'warning',
                            message: res.message
                        })
                    }
                }).catch(function (error) {
                    console.log(error);
                    that.$message.error('未获取到数据!');
                })
            },
            expandChange(row, expandedRows) {
                debugger;
                let that = this;
                if (expandedRows.length) {
                    that.expands = [];
                    if (row) {
                        that.expands.push(row.runId);
                    }
                } else {
                    that.expands = []
                }
                let url = this.$platfromUrl.workFlowTask + row.runId + "/jobs";
                this.$axios.get(url).then(res => {
                    if (res.code === 200) {
                        debugger;
                        that.jobsList = res.body;
                    }
                }).catch(function (err) {

                })
            },
            downloadResult(index,row){
                console.log(row.name);
                debugger;
                this.$axios.get(this.$platfromUrl.getDagbyName+'zjupanghu').then(res=>{
                    debugger;
                    let style=JSON.parse(res.body.style);
                    let nodesInfo=style.nodesInfo;
                    let outputlist=[];
                    for(let node of nodesInfo)
                    {
                        for(let i=0;i<node.params.length;i++)
                        {
                            if(node.params[i].out!=='')
                            {
                                outputlist.push('/'+node.params[i].value);
                            }
                        }
                    }
                    console.log(outputlist);
                    outputlist=['/data/LCRA.tsv','/result/clipR.tsv'];
                    axios.post(this.$platfromUrl.downloadOutput,{'fileList':outputlist},{
                        headers:{
                            'Content-Type':'text/plain'
                        },
                        responseType:'blob'
                    }).then(res=>{
                        debugger;
                        if(res.status!==200)
                        {
                            this.$message.warning(res.data.message);
                            this.loading=false;
                            return;
                        }
                        debugger;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {

                            let blob = new Blob([res.data], {
                                type: 'application/vnd.ms-excel'
                            })
                            window.navigator.msSaveOrOpenBlob(blob,
                                new Date().getTime() + '.zip')
                        } else {

                            let blob = new Blob([res.data]);
                            let downloadElement = document.createElement('a');
                            let href = window.URL.createObjectURL(blob);
                            downloadElement.href = href;
                            downloadElement.download = new Date().getTime()  + '.zip';
                            document.body.appendChild(downloadElement);
                            downloadElement.click();
                            document.body.removeChild(downloadElement);
                            window.URL.revokeObjectURL(href);
                        }
                    }).catch(err=>{})
                    //请求后端下载输出结果的接口
                    debugger;
                }).catch(err=>{})
            },
            deleteWorkflowTask(index, row) {
                let that = this;
                this.$confirm('是否删除该任务？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = this.$platfromUrl.workFlowTaskDelete + row.runId;
                    this.$axios.remove(url).then(res => {
                        if (res.code === 200) {
                            that.tableData2 = [];
                            that.getWorkflowTable();
                            that.$message.success('删除任务成功！')
                        } else {
                            that.$message({
                                type: 'warning',
                                message: res.message
                            })
                        }
                    }).catch(function (error) {
                        console.log(error);
                        that.$message.error('删除任务失败！')
                    })
                }).catch(function (error) {
                    console.log(error);
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.pageNo = val;
            },
            formatTime(row, column, cellValue) {
                return this.$date.time2FormatStr(cellValue);
            },
        },
        created() {
            this.getWorkflowTable();
        },
        watch: {
            pageSize() {
                this.getWorkflowTable();
            },
            pageNo() {
                this.getWorkflowTable();
            }
        }
    }
</script>

<style scoped>
.monitorMain
{
    width: 90%;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
</style>