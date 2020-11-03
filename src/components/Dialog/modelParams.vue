<template>
    <div>
        <el-dialog
                title=""
                :visible.sync="dialogVisible"
                width="48%">
            <!--显示模型的信息，并且提供下载的功能-->
                <el-form label-width="125px" label-position="left">
                    <el-form-item v-for="(item,index) in formData" :key="index" :label="item.label" style="margin-bottom: 20px">
                        <el-autocomplete v-if="item.in!==''"
                                         v-model="item.value"
                                         :fetch-suggestions="querySearch"
                                         placeholder=""
                                         style="width:90%"
                        ></el-autocomplete>
                        <span v-if="item.in!==''" style="margin-left: 10px"><i @click="chooseFile(index)" class="el-icon-tickets"></i></span>
                        <el-select v-else-if="item.option.length" v-model="item.value" placeholder="请选择" style="width:90%">
                            <el-option
                                    v-for="item in item.option"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        <el-input v-else style="width:90%"
                                  class="inline-input"
                                  v-model="item.value"
                                  placeholder=""
                        ></el-input>

                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="submitParams">提交参数</el-button>
                    </el-form-item>
                </el-form>

        </el-dialog>
        <file-selector></file-selector>
    </div>

</template>

<script>
    import fileSelector from "./fileSelector";
    //此组件中参数输入完成后，需要返回到父组件中，修改NodesInfo
    export default {
        name: "modelParams",
        data(){
            return{
                dialogVisible:false,
                formData:[],
                outputList:[]
            }
        },
        components:{
            fileSelector
        },
        methods: {
            chooseFile(index)
            {
                this.$Bus.$emit('fileSelector',index)
              //   axios.post(this.$platfromUrl.getAllFiles,'{}',{
              //       headers:{
              //           'Content-Type':'text/plain'
              //       }
              //   }).then(res=>{
              //     debugger;
              //     let fileList=res.data.body;
              //     for(let item of fileList)
              //     {
              //         this.outputList.push({'value':item});
              //     }
              // }).catch(err=>{});
            },
            submitParams()
            {
                this.$message.success("参数提交成功");
            },
            querySearch(queryString, cb) {
                debugger;
                let outputList = this.outputList;
                let results = queryString ? outputList.filter(this.createFilter(queryString)) : outputList;
                // 调用 callback 返回建议列表的数据
                console.log(results);
                cb(results);
            },
            createFilter(queryString) {
                return (output) => {
                    return (output.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
        },
        created() {
            let that=this;
            debugger;
            this.$Bus.$on('modelParams',params=>{
                that.dialogVisible=params.dialogVisible;
                that.formData=params.formData;
                that.outputList=params.outputList
            })
        }
    }
</script>

<style scoped>

</style>