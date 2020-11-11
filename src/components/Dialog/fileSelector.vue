<template>
    <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="36%">
        <div v-if="chosenType==='file'">
            <el-tabs type="border-card" v-model="activeTab">
                <el-tab-pane label="公共数据" style="min-height: 300px" name="publicData">
                    <el-tree @node-click="markNode"
                             :props="props"
                             :load="loadNodeData"
                             lazy>
                    </el-tree>
                </el-tab-pane>
                <el-tab-pane label="个人数据" style="min-height: 300px" name="personalData">
                    <el-tree @node-click="markNode"
                             :props="props"
                             :load="loadNodePerson"
                             lazy>
                    </el-tree>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div v-else>
            <el-form label-width="120px">
                <el-form-item label="选择文件夹">
                    <el-tree @node-click="markNode"
                             :props="props"
                             :load="loadNodePerson"
                             lazy>
                    </el-tree>
                </el-form-item>
                <el-form-item label="输入文件名">
                    <el-input style="width:90%"
                              class="inline-input"
                              v-model="fileName"
                              placeholder=""
                    ></el-input>
                </el-form-item>

            </el-form>

        </div>

        <el-button style="margin-top: 20px" type="primary" @click="Chosen">确定</el-button>
    </el-dialog>
</template>

<script>
    export default {
        name: "fileSelector",
        data(){
            return {
                index:-1,
                dialogVisible:false,
                activeTab:'publicData',
                props: {
                    label: 'name',
                    children: 'leaves',
                    isLeaf: 'isFile'
                },
                pathStr:null,
                foldStr:null,
                fileList:[],
                dataList:[],
                chosenType:'',
                fileName:''
            }
        },
        methods:{
            loadNodePerson(node, resolve) {
                debugger;
                if(node.isLeaf) return;
                if (node.level === 0) {
                    return resolve(this.fileList);
                }
                else
                {
                    let pathStr='';
                    let times=node.level;
                    for (let i = 0; i < times; i++) {
                        pathStr = "/" + node.label + pathStr;
                        node = node.parent;
                    }
                    this.$axios.postAdvanced(this.$URL.getfileList,{'path':pathStr},{
                        headers:{
                            'Content-Type':'text/plain'
                        }}).then(res=>{
                            if(res.body.length===0) return resolve([{'name':'暂无数据','isFile':true}]);
                          return resolve(res.body);
                    });
                }
            },
            loadNodeData(node,resolve)
            {
                if(node.isLeaf) return;
                if (node.level === 0) {
                    return resolve(this.dataList);
                }
                else
                {
                    let pathStr='';
                    let times=node.level;
                    for (let i = 0; i < times; i++) {
                        pathStr = "/" + node.label + pathStr;
                        node = node.parent;
                    }
                    this.$axios.postAdvanced(this.$URL.getpublicdataList,{'path':pathStr},{
                        headers:{
                            'Content-Type':'text/plain'
                        }}).then(res=>{
                        if(res.body.length===0) return resolve([{'name':'暂无数据','isFile':true}]);
                        return resolve(res.body);
                    });
                }
            },
            markNode(data,Node)
            {
                if(Node.label!=='暂无数据')
                {
                    if(Node.isLeaf)
                    {
                        let pathStr='';
                        let times=Node.level;
                        for (let i = 0; i < times; i++) {
                            pathStr = "/" + Node.label + pathStr;
                            Node = Node.parent;
                        }
                        this.pathStr=pathStr;
                    }
                    else
                    {
                        let pathStr='';
                        let times=Node.level;
                        for (let i = 0; i < times; i++) {
                            pathStr = "/" + Node.label + pathStr;
                            Node = Node.parent;
                        }
                        this.foldStr=pathStr;
                    }
                }

            },
            Chosen()
            {
                debugger;
                if(this.chosenType==='file')
                {
                    if(this.pathStr===null)
                    {
                        this.$message.warning('请选择一个文件');
                    }
                    else
                    {
                        if(this.activeTab==='publicData')
                            this.pathStr='publicdata:'+this.pathStr;
                        this.$emit('chosenFile',this.index,this.pathStr);
                        this.dialogVisible=false;
                    }
                }
                else
                {
                    if(this.foldStr===null)
                    {
                        this.$message.warning('请选择一个文件');
                    }
                    else
                    {
                        if(this.fileName==='')
                        {
                            this.$message.warning('文件名不可为空');
                            return;
                        }
                        else
                        {
                            this.$axios.postAdvanced(this.$URL.getfileList,{'path':this.foldStr},{
                                headers:{
                                    'Content-Type':'text/plain'
                                }}).then(res=>{
                                let list=res.body;
                                debugger;
                                for(let i=0;i<list.length;i++)
                                {
                                    if(list[i].name===this.fileName)
                                    {
                                        this.$message.warning('该文件已存在');
                                        return;
                                    }
                                }
                                this.$emit('chosenFile',this.index,this.foldStr+'/'+this.fileName);
                                this.dialogVisible=false;
                            });
                        }

                    }
                }

            }

        },
        created() {
            let that=this;
            this.$Bus.$on('fileSelector',(index,filePaths,dataPaths,type)=>{
                that.index=index;
                that.dialogVisible=true;
                that.fileList=filePaths;
                that.dataList=dataPaths;
                that.pathStr=null;
                that.foldStr=null;
                that.chosenType=type;
            })
        }
    }
</script>

<style scoped>

</style>