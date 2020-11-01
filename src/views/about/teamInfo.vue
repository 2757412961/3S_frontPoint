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
                <el-col span="19" v-for="member in mymemberLists" :key="member.id" style="width:13%;height: 10%; margin-top: 115px;margin-left: 70px">
                    <el-popover placement="top" title="详细信息" width="230" trigger="hover" :content="data">
                        <el-table :data="[member]">
                            <el-table-column width="100" property="name" label="Name"></el-table-column>
                            <el-table-column width="100" property="version" label="Version"></el-table-column>
                            <el-table-column width="100" property="team" label="Team"></el-table-column>
                            <el-table-column width="150" property="role" label="Role"></el-table-column>
                            <el-table-column width="200" property="email" label="Email"></el-table-column>
                        </el-table>
                        <el-card :body-style="{ padding: '0px' }" slot="reference">
                            <img :src="member.photo"
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
                <el-col span="19" v-for="student1 in mystudent1Lists" :key="student1.id" style="width:13%;height: 10%; margin-top: 85px;margin-left: 70px">
                    <el-popover placement="top" title="详细信息" width="230" trigger="hover" :content="data">
                        <el-table :data="[student1]">
                            <el-table-column width="100" property="name" label="Name"></el-table-column>
                            <el-table-column width="100" property="version" label="Version"></el-table-column>
                            <el-table-column width="100" property="team" label="Team"></el-table-column>
                            <el-table-column width="150" property="role" label="Role"></el-table-column>
                            <el-table-column width="200" property="email" label="Email"></el-table-column>
                        </el-table>
                        <el-card :body-style="{ padding: '0px' }" slot="reference">
                            <img :src="student1.photo"
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
                <el-col span="19" v-for="student2 in mystudent2Lists" :key="student2.id" style="width:13%;height: 10%; margin-top: 25px;margin-left: 70px;margin-bottom: 60px">
                    <el-popover placement="top" title="详细信息" width="230" trigger="hover" :content="data">
                        <el-table :data="[student2]">
                            <el-table-column width="100" property="name" label="Name"></el-table-column>
                            <el-table-column width="100" property="version" label="Version"></el-table-column>
                            <el-table-column width="100" property="team" label="Team"></el-table-column>
                            <el-table-column width="150" property="role" label="Role"></el-table-column>
                            <el-table-column width="200" property="email" label="Email"></el-table-column>
                        </el-table>
<!--                        student2.name + student2.version +student2.team + student2.role + student2.email-->
                        <el-card :body-style="{ padding: '0px' }" slot="reference">
                            <img :src="student2.photo"
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
            this.$axios.get(this.$URL.getteamInfo+"?pageSize=100").then(res=>{
                debugger;
                this.mymember=res.body.totalCount;
                this.mymemberLists=res.body.result;
            }).catch(err=>{});

            this.$axios.get(this.$URL.getstudentInfo+"?version=v1.0").then(res=>{
                debugger;
                this.mystudent1=res.body.totalCount;
                this.mystudent1Lists=res.body.result;
            }).catch(err=>{});

            this.$axios.get(this.$URL.getstudentInfo+"?version=v2.0").then(res=>{
                debugger;
                this.mystudent2=res.body.totalCount;
                this.mystudent2Lists=res.body.result;
                console.log()
            }).catch(err=>{})


        },
        data(){
            return{
                mymemberLists:[],
                mystudent1Lists:[],
                mystudent2Lists:[],
            }
        },
    }
</script>


<style>

</style>



