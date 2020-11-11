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
                        <span v-if="item.in!==''" style="margin-left: 10px"><i @click="chooseFile(index,'file')" class="el-icon-tickets"></i></span>
                        <div v-else-if="item.out!==''">
                            <el-autocomplete v-model="item.value"
                                             :fetch-suggestions="querySearch"
                                             placeholder=""
                                             style="width:90%"
                            ></el-autocomplete>
                            <span style="margin-left: 10px"><i @click="chooseFile(index,'folder')" class="el-icon-tickets"></i></span>
                        </div>
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
                        <el-button size="small" type="plain" @click="modelInfos">模型说明</el-button>
                    </el-form-item>
                </el-form>

        </el-dialog>
        <file-selector @chosenFile="chosenFile(arguments)"></file-selector>
        <model-info v-if="dialogVisible"></model-info>
    </div>

</template>

<script>
    import fileSelector from "./fileSelector";
    import modelInfo from "./modelInfo";
    //此组件中参数输入完成后，需要返回到父组件中，修改NodesInfo
    export default {
        name: "modelParams",
        data(){
            return{
                dialogVisible:false,
                formData:[],
                outputList:[],
                filePath:'',
                modelName:''
            }
        },
        components:{
            fileSelector,
            modelInfo
        },
        methods: {
            modelInfos()
            {
                debugger;
                this.$axios.get(this.$platfromUrl.getModelbyId+this.modelName).then(res=>{
                    debugger;
                let temp=res.body;
                let re={};
                // let params=temp.params;
                //  console.log(JSON.parse(params));
                re['模型名']=temp.artifactId;
                re['用途']=temp.usages;
                re['关键词']=temp.keywords;
                re['描述']=temp.description;
                if(temp.isPublic) re['权限']='公有';
                else re['权限']='私有';
                for(let key in re)
                {
                    if(re[key]==='') re[key]='暂无信息';
                }
                this.$Bus.$emit('modelInfo',{
                    dialogVisible:true,
                    formData:re
                })
            }).catch(err=>{})

            },
            chosenFile(args)
            {
                debugger
                this.formData[args[0]].value=args[1]
            },
            chooseFile(index,str)
            {
                let that=this;
                this.$axios.postAdvanced(this.$URL.getfileList,{'path':'/'},{
                    headers:{
                        'Content-Type':'text/plain'
                    }}).then(res1=>{
                    that.$axios.postAdvanced(that.$URL.getpublicdataList,{'path':'/'},{
                            headers:{
                                'Content-Type':'text/plain'
                            }}).then(res2=>{
                                debugger;
                            that.$Bus.$emit('fileSelector',index,res1.body,res2.body,str);
                        }).catch(err=>{})

                });
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
                debugger;
                that.dialogVisible=params.dialogVisible;
                that.formData=params.formData;
                that.modelName=params.modelName;
                that.outputList=params.outputList
            })
        }
    }
</script>

<style scoped>

</style>