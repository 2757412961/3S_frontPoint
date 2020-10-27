<!--自定义工程名，通过post方法，保存当前工程至服务器指定路径-->
<template>
    <el-form ref="form" class="savePro" :model="form" :rules="rules" :style="{display:displayForm}">
        <el-form-item label="名称" prop="proName"><!--prop必须有，和data中一致-->
            <el-input v-model="form.proName"></el-input>
        </el-form-item>
        <el-form-item label="简介">
            <el-input type="textarea"
                      :rows="3"
                      placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-button type="primary" @click="saveProject('form')" style="margin-top:15px; float:right">保存</el-button>
    </el-form>
</template>

<script>
    import axios from "../../util/axios";
    import {checkName} from "../../util/validator"
    export default {
        name: "savePro",
        data() {
            return {
                form: {
                    proName: 'pro1'
                },
                myMap:'',
                layerNames:[],
                displayForm:'block',
                rules:{
                    proName:
                        [
                            {validator:checkName,trigger:'blur'}
                        ]
                }
            }
        },
        methods:{
            //存储前端工程到后端，调用后端接口，将工程的json字符串写入后端指定文件中
            saveProject(form) {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            let that=this;
                            let layerNames=this.layerNames;
                            let layers=[];
                            for(let i=0;i<layerNames.length;i++)
                            {
                                let jsonLayer='{\"'+layerNames[i]+'\":[';
                                let relatedLayers=JSON.parse(sessionStorage.getItem(layerNames[i]));
                                if(relatedLayers)
                                {
                                    for (let i = 0; i < relatedLayers.length; i++) {
                                      jsonLayer+='\"'+relatedLayers[i]+'\"';
                                      if(i!=relatedLayers.length-1) jsonLayer+=',';
                                    }
                                }
                                jsonLayer+="]}";
                                layers.push(JSON.parse(jsonLayer));
                            }
                            if(layers)
                            {
                            axios.post(this.$platfromUrl.projectSubmit, {
                                    'layers': JSON.stringify(layers),
                                    'style': JSON.stringify(this.myMap.getStyle())
                                },
                                {
                                    params:
                                        {
                                            //写入后端的文件名
                                            name: this.form.proName + '.json'
                                        },
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                            ).then((
                                this.$message.success(this.form.proName+"工程保存成功")
                            ))
                            .catch(function () { // 请求失败处理
                                    that.$message.error(this.form.proName+"工程保存失败")
                                });
                            }
                        }
                        else {
                            console.log('error submit!');
                            return false;
                        }
                    })
                }


        },
        created() {
            let that=this;
            this.$Bus.$on("savePropara",para=>{
                that.myMap=para.myMap;
                that.layerNames=para.layerNames
            })
        }
    }
</script>

<style scoped>
</style>
