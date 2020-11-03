<template>
    <div>
        <el-row>
            <div>
                <el-col span="5">
                    <p style="margin-top: 60px;margin-left: 180px;font-size: 30px">教师</p>
                    <el-tag color="steelblue" effect="dark" style="margin-left: 180px; width: 120px;height: 50px;font-size: 17px;text-align: center;line-height:50px">指导老师</el-tag>
                </el-col>
            </div>
            <div style="display: table-cell">
                <el-col span="19" v-for="member in mymemberLists2" :key="member.id" style="width:13%;height: 10%; margin-top: 115px;margin-left: 70px">
                    <el-popover placement="left" title="详细信息" width="300" trigger="hover" :content="data" >
                        <el-table
                                :data="member"
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
                        <el-card :body-style="{ padding: '0px' }" slot="reference">
                            <img :src="member[5].detailValue"
                                 :style="{position:'relative',left:'15px',top:'5px', width:'85%',height:'160px'}"
                                 class="image">
                            <div style="text-align: center;padding-bottom: 15px">
                                <div style="text-align: center;font-size:25px;margin-top: 15px" >{{member.name}}</div>
                            </div>
                        </el-card>
                    </el-popover>
                </el-col>
            </div>
        </el-row>
        <hr style="margin-left: 180px;margin-top: 30px">
        <!--v1.0版-->
        <el-row>
            <div>
                <el-col span="5">
                    <p style="margin-top: 30px;margin-left: 180px;font-size: 30px">学生</p>
                    <el-tag color="steelblue" effect="dark" style="margin-left: 180px; width: 120px;height: 50px;font-size: 17px;text-align: center;line-height:50px">V1.0版</el-tag><br>
                </el-col>
            </div>
            <div style="display: table-cell">
                <el-col span="19" v-for="student1 in mystudent1Lists2" :key="student1.id" style="width:13%;height: 10%; margin-top: 85px;margin-left: 70px">
                    <el-popover placement="left" title="详细信息" width="300" trigger="hover" :content="data">
                        <el-table
                                :data="student1"
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
                        <el-card :body-style="{ padding: '0px' }" slot="reference">
                            <img :src="student1[5].detailValue"
                                 :style="{position:'relative',left:'15px',top:'5px', width:'85%',height:'160px'}"
                                 class="image">
                            <div style="text-align: center;padding-bottom: 15px">
                                <div style="text-align: center;font-size:25px;margin-top: 15px" >{{student1.name}}</div>
                            </div>
                        </el-card>
                    </el-popover>
                </el-col>
            </div>
        </el-row>
        <hr style="margin-left: 180px;margin-top: 30px">
        <!--v2.0版-->
        <el-row>
            <div>
                <el-col span="5">
                    <el-tag color="steelblue" effect="dark" style="margin-left: 180px; margin-top: 30px; width: 120px;height: 50px;font-size: 17px;text-align: center;line-height:50px">V2.0版</el-tag>
                </el-col>
            </div>
            <div style="display: table-cell">
                <el-col span="19" v-for="student2 in mystudent2Lists2" :key="student2.id" style="width:13%;height: 10%; margin-top: 25px;margin-left: 70px;margin-bottom: 60px">
                    <el-popover placement="left" title="详细信息" width="300" trigger="hover" :content="data">
                        <el-table
                                :data="student2"
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
<!--                        student2.name + student2.version +student2.team + student2.role + student2.email-->
                        <el-card :body-style="{ padding: '0px' }" slot="reference">
                            <img :src="student2[5].detailValue"
                                 :style="{position:'relative',left:'15px',top:'5px', width:'85%',height:'160px'}"
                                 class="image">
                            <div style="text-align: center;padding-bottom: 15px">
                                <div style="text-align: center;font-size:25px;margin-top: 15px" >{{student2.name}}</div>
                            </div>
                        </el-card>
                    </el-popover>
                </el-col>
            </div>
        </el-row>
    </div>
</template>


<script>

    export default {
        name: "teamInfo",
        mounted() {
            this.getTeacherInfo()
            this.getV1StudentInfo()
            this.getV2StudentInfo()
        },
        data(){
            return{
                mymemberLists:[],
                mymemberLists2:[],
                mystudent1Lists:[],
                mystudent1Lists2:[],
                mystudent2Lists:[],
                mystudent2Lists2:[],
                detailtTableData:[],

            }
        },
        methods:{
            getTeacherInfo(){
                let that=this
                this.$axios.get(this.$URL.getteamInfo+"?pageSize=100").then(res=>{
                    this.mymember=res.body.totalCount;
                    this.mymemberLists=res.body.result;
                    let dataInfo
                    let getlist
                    getlist=res.body.result
                    that.detailtTableData.length=0
                    for (let num in getlist)
                    {
                        let templateInfo=[]
                        for(let key in getlist[num]){
                            dataInfo={
                                nameOfDetails: key,
                                detailValue: getlist[num][key],
                            }
                            templateInfo.push(dataInfo)
                        }
                        that.mymemberLists2.push(templateInfo)
                    }
                }).catch(err=>{});
            },

            getV1StudentInfo(){
                let that=this
                this.$axios.get(this.$URL.getstudentInfo+"?version=v1.0").then(res=>{
                    this.mystudent1=res.body.totalCount;
                    this.mystudent1Lists=res.body.result;
                    let dataInfo
                    let getlist
                    getlist=res.body.result
                    that.detailtTableData.length=0
                    for (let num in getlist)
                    {
                        console.log('result-111')
                        let templateInfo=[]
                        for(let key in getlist[num]){
                            dataInfo={
                                nameOfDetails: key,
                                detailValue: getlist[num][key],
                            }
                            templateInfo.push(dataInfo)
                        }
                        that.mystudent1Lists2.push(templateInfo)
                    }
                }).catch(err=>{});
            },

            getV2StudentInfo(){
                let that=this
                this.$axios.get(this.$URL.getstudentInfo+"?version=v2.0").then(res=>{
                    this.mystudent2=res.body.totalCount;
                    this.mystudent2Lists=res.body.result;
                    let dataInfo
                    let getlist
                    getlist=res.body.result
                    that.detailtTableData.length=0
                    for (let num in getlist)
                    {
                        console.log('result-111')
                        let templateInfo=[]
                        for(let key in getlist[num]){
                            dataInfo={
                                nameOfDetails: key,
                                detailValue: getlist[num][key],
                            }
                            templateInfo.push(dataInfo)
                        }
                        that.mystudent2Lists2.push(templateInfo)
                    }
                }).catch(err=>{});
            },

        }
    }
</script>


<style>

</style>



