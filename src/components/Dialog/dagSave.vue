<template>
    <el-dialog
            title="保存工作流"
            :visible.sync="dialogVisible"
            width="48%">
        <el-form label-width="80px">
            <el-form-item label="名称" style="margin-bottom: 20px">
                <el-input class="inline-input"
                          v-model="dagName"
                          placeholder="请输入内容"
                ></el-input>
            </el-form-item>
            <el-form-item label="描述" style="margin-bottom: 20px">
                <el-input type="textarea"
                          :rows="8"
                          placeholder="请输入内容"
                          v-model="dagDescription"
                ></el-input>
            </el-form-item>
            <el-form-item label="" style="margin-bottom: 20px">
                <el-button @click="saveDag" type="primary">保存</el-button>
            </el-form-item>

        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        name: "dagSave",
        data(){
            return{
                dialogVisible:false,
                dagName:'',
                dagDescription:'',
                nodes:[],
                links:[],
                style:''
            }
        },
        methods:{
          saveDag()
          {
              debugger;
              this.$axios.post(this.$platfromUrl.saveDagUrl,{
                  name:this.dagName,
                  description:this.dagDescription,
                  connections:this.links,
                  nodes:this.nodes,
                  style:this.style
              }).then(res=>{
                  debugger;
                  console.log(res);
                  if(res.code===200)
                  {
                      this.$message.success(res.message);
                      this.$emit('refreshDags')
                  }
                  else
                  {
                      this.$message.warning('保存失败');
                  }
              }).catch(err=>{})
          }
        },
        created() {
            let that=this;
            this.$Bus.$on('dagSave',params=>{
                that.dialogVisible=params.dialogVisible;
                that.nodes=params.nodes;
                that.links=params.links;
                that.style=params.style
            })
        }
    }
</script>

<style scoped>

</style>