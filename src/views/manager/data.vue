<template>
    <el-main>
        <!--    条件选择器-->
        <div>
            <div class="managerSearchMenu">
                <el-date-picker
                        style="width: 500px"
                        v-model="datevalue"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']">
                </el-date-picker>
            </div>

            <div class="managerSearchMenu">
                <el-input v-model="inputvalue" placeholder="请输入数据名称" style="width: 500px"></el-input>
            </div>

            <div class="managerSearchMenu">
                <el-select v-model="typevalue" placeholder="请选择数据类型">
                    <el-option
                            v-for="item in typeoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="managerSearchMenu" style="float: right">
                <el-button type="primary" icon="el-icon-search" @click="searchAll(1)">搜索</el-button>
                <el-button type="primary" icon="el-icon-upload2" @click="dialoguploadVisible = true">上传资源</el-button>
            </div>
        </div>
        <!--数据记录表格-->
        <div style="padding-top: 10px">
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    align="center">
                <el-table-column
                        prop="checkbox"
                        type="selection"
                        label="选择"
                        width="50"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="资源编号"
                        width="350"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="资源名称"
                        width="420"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="资源上传日期"
                        width="200"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="downloadAuthority"
                        label="开放下载"
                        width="140"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="uploader"
                        label="上传用户/作者"
                        width="140"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作"
                        align="center">
                    <el-button type="success" size="mini" @click="getDetails">查看</el-button>
                    <el-button type="danger" size="mini" @click="deleteData">删除</el-button>
                </el-table-column>
            </el-table>

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
        </div>
        <!--上传按钮和批量删除按钮-->

        <!--资源详情弹窗-->
        <div style="text-align:center;">
            <el-dialog
                    title="资源详情"
                    :visible.sync="dialogInfoVisible"
                    width="50%">
                <el-table
                        :data="detailtTableData"
                        stripe
                        style="width: 100%;max-height: 600px;overflow: auto"
                        align="center">
                    <el-table-column
                            prop="nameOfDetails"
                            label="项目名"
                            width="150"
                            align="left">
                    </el-table-column>
                    <el-table-column
                            prop="detailValue"
                            label="项目值"
                            align="center">
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>

        <!--    数据上传弹窗-->
        <el-dialog title="上传数据" :visible.sync="dialoguploadVisible">
            <el-tabs :tab-position="tabPosition" style="min-height:280px;max-height:600px;overflow: auto">
                <el-tab-pane label="空间数据">
                    <addGeoData></addGeoData>
                </el-tab-pane>
                <el-tab-pane label="学位论文">学位论文</el-tab-pane>
                <el-tab-pane label="专业期刊">专业期刊</el-tab-pane>
                <el-tab-pane label="讲座信息">讲座信息</el-tab-pane>
                <el-tab-pane label="常用工具">常用工具</el-tab-pane>
                <el-tab-pane label="地图底图">地图底图</el-tab-pane>
                <el-tab-pane label="教学案例">
                    <teachingCases></teachingCases>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </el-main>
</template>

<script>
    import addGeoData from "../../components/personalCenter/addGeoData";
    import teachingCases from "../../components/personalCenter/teachingCases";


    export default {
        components: {
            addGeoData,
            teachingCases

        },

        name: "Data",
        data() {
            return {
                dialogInfoVisible:false,
                dialoguploadVisible:false,
                totalCount:'',
                currentPage:{},
                datevalue:'',
                inputvalue:'',
                tabPosition:'left',
                typevalue:'0',
                typeoptions: [{
                    value: '0',
                    label: '空间数据'
                }, {
                    value: '1',
                    label: '学位论文'
                }, {
                    value: '2',
                    label: '专业期刊'
                }, {
                    value: '3',
                    label: '讲座信息'
                }, {
                    value: '4',
                    label: '常用工具'
                }, {
                    value: '5',
                    label: '地图集市'
                }, ],
                tableData:[

                ],
                detailtTableData:[

                ],
            };
        },
        mounted() {
            let that=this;
            that.searchAll()
        },

        methods:{

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },

            handlePreview(file) {
                console.log(file);
            },
            ChangePage(currentPage)
            {
                let that=this;
                //每次调整页码的时候获取到对应的页码,存入currentPage对象中
                this.currentPage[this.activeName]=currentPage;
                //调用后端接口，传入pagesize，当前页，当前类别，通过refresh函数实现
                that.searchAll(currentPage)
            },
            deleteData(){
                let that=this;
                let deleteDataURLlist=[that.$URL.deleteGeoDataById,that.$URL.deleteStudentPaperById,
                    that.$URL.deleteAcademicPaperById,that.$URL.deleteLectureById,
                    that.$URL.deleteOnlineToolsById,that.$URL.deleteMapServiceById]
                let dataId=event.target.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText
                let dataName=event.target.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.innerText
                let needURL=deleteDataURLlist[that.typevalue]+dataId
                that.$axios.remove(needURL,"").then(
                    res => {
                        if (res.code == 1002){
                            that.$message({
                                message: "删除失败",
                                type: 'warning'
                            });
                        }
                        else if(res.code == 200){
                            that.$message({
                                message: "删除成功",
                                type: 'success'
                            })
                            that.tableData.length=0
                            that.searchAll()
                        }
                    }
                )

                let timestamp = (new Date()).getTime();
                let timelist=that.transferTime(timestamp)

                console.log(timelist)
                let logParams = {actId:this.$store.getters.username,role:this.$store.getters.role,time:timelist,tableName:that.typevalue,objectId:dataName,type:'删除'};
                console.log(logParams)
                that.$axios.put(that.$URL.addLog,logParams).then(
                    res => {
                        if (res.code == 9002){
                            that.$message({
                                message: "写入失败",
                                type: 'warning'
                            });
                        }
                        else if(res.code == 200){
                            that.$message({
                                message: "写入成功",
                                type: 'success'
                            })
                        }
                    }
                )
            },
            getDetails(){
                let that=this;
                let DetailsURLlist=[that.$URL.searchGeoDataById,that.$URL.searchStudentPaperById,
                    that.$URL.searchAcademicPaperById,that.$URL.searchLectureById,
                    that.$URL.searchOnlineToolsById,that.$URL.searchMapServiceById]
                let dataId=event.target.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText
                let needURL=DetailsURLlist[that.typevalue]+dataId
                console.log(needURL)
                let getlist
                let dataInfo
                that.$axios.get(needURL,"").then(
                    res => {
                        if (res.code == 1002){
                            that.$message({
                                message: "查询详情失败",
                                type: 'warning'
                            });
                        }
                        else if(res.code == 200){
                            that.$message({
                                message: "查询详情成功",
                                type: 'success'
                            });
                            that.dialogInfoVisible = true
                            getlist=res.body
                            console.log(getlist)
                            that.detailtTableData.length=0
                            for (let key in getlist)
                            {
                                dataInfo={
                                    nameOfDetails: key,
                                    detailValue: getlist[key],
                                }
                                that.detailtTableData.push(dataInfo)
                            }
                        }
                    }
                )
            },

            // 检索数据
            searchAll(currentPage=1){
                let that=this;
                // searchAllGeoData:"/geodata/allselect",
                // searchAllStudentPaper:"/studentpaper/allselect",
                // searchAllAcademicPaper:"/academicpaper/allselect",
                // searchAllLecture:"/lecture/allselect",
                // searchAllOnlineTools:"/onlinetools/allselect",
                // searchAllMapService:"/mapservice/allselect",
                let URLlist=[that.$URL.searchAllGeoData,that.$URL.searchAllStudentPaper,
                    that.$URL.searchAllAcademicPaper,that.$URL.searchAllLecture,
                    that.$URL.searchAllOnlineTools,that.$URL.searchAllMapService]
                let pageNo=currentPage
                let needURL=URLlist[that.typevalue]+"?pageNo="+pageNo+"&pageSize=12"
                // 空间数据专业期刊讲座信息学位论文常用工具地图集市
                that.$axios.get(needURL,"").then(
                    res => {
                        if (res.code == 1002){
                            that.$message({
                                message: "查询失败",
                                type: 'warning'
                            });
                        }
                        else if(res.code == 200){
                            that.$message({
                                message: "查询成功",
                                type: 'success'
                            });

                            this.totalCount=res.body.totalCount

                            let getlist=res.body.result
                            console.log(getlist)
                            console.log(that.tableData)
                            that.tableData.length=0
                            for (let i = 0; i < getlist.length; i++) {
                                let dataInfoJson=getlist[i]
                                let dataInfo
                                if(that.typevalue==0){
                                    dataInfo={
                                        id: dataInfoJson.id,
                                        name: dataInfoJson.title,
                                        time: dataInfoJson.time,
                                        downloadAuthority:dataInfoJson.downloadAuthority,
                                        uploader:dataInfoJson.uploader,
                                    }
                                }
                                else if(that.typevalue==1)
                                {
                                    dataInfo={
                                        id: dataInfoJson.id,
                                        name: dataInfoJson.title,
                                        time: dataInfoJson.year,
                                        downloadAuthority:dataInfoJson.downloadAuthority,
                                        uploader:dataInfoJson.author,
                                    }
                                }
                                else if(that.typevalue==2)
                                {
                                    dataInfo={
                                        id: dataInfoJson.id,
                                        name: dataInfoJson.title,
                                        time: dataInfoJson.year,
                                        downloadAuthority:dataInfoJson.downloadAuthority,
                                        uploader:dataInfoJson.author,
                                    }
                                }
                                else if(that.typevalue==3)
                                {
                                    dataInfo={
                                        id: dataInfoJson.id,
                                        name: dataInfoJson.name,
                                        time: dataInfoJson.year,
                                        downloadAuthority:dataInfoJson.downloadAuthority,
                                        uploader:dataInfoJson.spaker,
                                    }
                                }
                                else if(that.typevalue==4)
                                {
                                    dataInfo={
                                        id: dataInfoJson.id,
                                        name: dataInfoJson.NAME,
                                        time: dataInfoJson.year,
                                        downloadAuthority:dataInfoJson.downloadAuthority,
                                        uploader:dataInfoJson.spaker,
                                    }
                                }
                                else if(that.typevalue==5)
                                {
                                    dataInfo={
                                        id: dataInfoJson.id,
                                        name: dataInfoJson.NAME,
                                        time: dataInfoJson.year,
                                        downloadAuthority:dataInfoJson.downloadAuthority,
                                        uploader:dataInfoJson.COMPANY,
                                    }
                                }
                                that.tableData.push(dataInfo)

                            }
                        }
                    }
                )
            },
            transferTime(cTime) {

                var jsonDate = new Date(parseInt(cTime));
                Date.prototype.format = function (format){
                    var  o = {
                        "y+": this.getFullYear(),
                        "M+": this.getMonth()+1,
                        "d+": this.getDate(),
                        "h+": this.getHours(),
                        "m+": this.getMinutes(),
                        "s+": this.getSeconds()

                    };

                    if(/(y+)/.test(format)){
                        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                    }

                    for(var k in o){
                        if(new RegExp("("+k+")").test(format)){
                            format = format.replace(RegExp.$1, o[k].toString().length == 2?o[k] : ("0" + o[k]).substr("" + o[k].length));
                        }
                    }
                    return format;
                };
                var newDate = jsonDate.format("yyyy-MM-dd hh:mm:ss");
                console.log('newDate',newDate)
                return newDate;
            },
        }
    }
</script>

<style scoped>
    .managerSearchMenu{
        float: left;
        padding-left: 40px;
    }
    .dataInfo{
        padding-right: 20%;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
    }

</style>
