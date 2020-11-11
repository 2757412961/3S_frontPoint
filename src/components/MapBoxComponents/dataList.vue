<!--获取后端数据库中的样例数据列表，显示在窗口中
当点击加载，向后端请求对应数据，
判别数据的类型，加载数据至地图中-->
<template>
    <div>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="35%">
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
            <span slot="footer" class="dialog-footer">
                <el-form>
                   <el-form-item label="如需上图，请输入几何字段">
                       <el-popover
                               placement="top-start"
                               title="说明"
                               trigger="hover"
                               content="请输入数据中符合wkt的空间列序号">
                       <span slot="reference"><i class="el-icon-info"></i></span>
                        </el-popover>
                       <el-input v-model="geomIndex"></el-input>
                   </el-form-item>
                </el-form>
    <el-button type="primary" @click="preview">预 览</el-button>
    <el-button type="success" @click="addtoMap">上 图</el-button>
  </span>
        </el-dialog>
        <table-preview></table-preview>
    </div>

</template>

<script>
    import axios from "../../util/axios"
    import tablePreview from "../tableData/tablePreview"
    export default {
        name: "dataList",
        components:{
            tablePreview
        },
        data(){
            return {
                title:'',
                tableData:[],
                dialogVisible:false,
                activeTab:'publicData',
                props: {
                    label: 'name',
                    children: 'leaves',
                    isLeaf: 'isFile'
                },
                geomIndex:0,
                pathStr:null,
                fileList:[],
                dataList:[],

                // 判斷是否是公共数据
                ispublic:null,

            }
        },
        mounted() {},
        methods:{
            preview()
            {
                if(this.pathStr===null)
                {
                    this.$message.warning('请选择一个文件');
                }
                else
                {
                    this.$axios.postAdvanced(this.$URL.previewData('table'),{'path':this.pathStr,size:10},{
                        headers:{
                            'Content-Type':'text/plain'
                        }
                    }).then(res=>{
                        debugger;
                        console.log(JSON.parse(res.body.structuredData).table);
                        let table=JSON.parse(res.body.structuredData).table;
                        if(table.length)
                        {
                            this.$Bus.$emit('tablePreview',table,table[0])
                        }
                        else
                        {
                            this.$message.warning('暂无表格数据');
                        }
                    }).catch(err=>{})
                }
            },
            addtoMap()
            {
                if(this.pathStr===null)
                {
                    this.$message.warning('请选择一个文件');
                }
                else
                {
                    // 判斷是否是公共数据
                    let params = {'path':this.pathStr,'geomIndex':parseInt(this.geomIndex),'offset':1};
                    if (this.ispublic===true){
                        params = {
                            'path':"public:"+this.pathStr,
                            'geomIndex':parseInt(this.geomIndex),
                            'offset':1
                        };
                    }

                    debugger;
                    this.$axios.postAdvanced(this.$URL.previewData('map'),params,{
                        headers:{
                            'Content-Type':'text/plain'
                        }
                    }).then(res=>{
                        debugger;
                        let layername=this.pathStr.substr(this.pathStr.lastIndexOf('/')+1,this.pathStr.length);
                        if(res.code!=200)
                        {
                            this.$message.warning('上图失败');
                            return;
                        }
                        if(res.body.geomType.lastIndexOf('Polygon')!==-1)
                        {
                            if(!this.$parent.addLayerid(layername))
                            {
                                this.$message.warning('该图层已存在');
                                return;
                            }
                            this.$globalConstant.map.addLayer({
                                'id': layername,
                                'type':'fill',
                                'source': {
                                    'type': 'geojson',
                                    'data': JSON.parse(res.body.geomData)
                                },
                                'paint': {
                                    'fill-color': '#4682B4',
                                    'fill-opacity': 0.5,
                                    'fill-outline-color':'#0e2944'
                                }

                            });
                            this.$globalConstant.map.fitBounds(res.body.bbox);
                        }
                        else if(res.body.geomType.lastIndexOf('Point')!==-1)
                        {
                            if(!this.$parent.addLayerid(layername))
                            {
                                this.$message.warning('该图层已存在');
                                return;
                            }
                            this.$globalConstant.map.addLayer({
                                'id':layername,
                                'type':'circle',
                                'source': {
                                    'type': 'geojson',
                                    'data': JSON.parse(res.body.geomData)
                                },
                                'paint':{
                                    'circle-color':'#4682B4'
                                }
                            });
                            this.$globalConstant.map.fitBounds(res.body.bbox);
                        }
                        else if(res.body.geomType.lastIndexOf('LineString')!==-1)
                        {
                            if(!this.$parent.addLayerid(layername))
                            {
                                this.$message.warning('该图层已存在');
                                return;
                            }
                            this.$globalConstant.map.addLayer({
                                'id': layername,
                                'type':'line',
                                'source': {
                                    'type': 'geojson',
                                    'data': JSON.parse(res.body.geomData)
                                },
                                'paint':{
                                    'line-color':'#4682B4'
                                }
                            });
                            this.$globalConstant.map.fitBounds(res.body.bbox);
                        }
                        else
                        {
                            this.$message.warning('类型不符合');
                            return;
                        }
                    }).catch(err=>{})
                }
            },
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
                if(Node.isLeaf&&Node.label!=='暂无数据')
                {
                    let pathStr='';
                    let times=Node.level;
                    for (let i = 0; i < times; i++) {
                        pathStr = "/" + Node.label + pathStr;
                        Node = Node.parent;
                    }
                    this.pathStr=pathStr;
                }
            }
        },
        created() {
            let that=this;
            this.$Bus.$on("dataListpara",(filePaths,dataPaths)=>{
                that.dialogVisible=true;
                that.fileList=filePaths;
                that.dataList=dataPaths;
                that.pathStr=null
            })
        }

    }
</script>

<style scoped>

</style>
