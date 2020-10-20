<template>
    <div class="workMain" :style="{height: '100%'}">
        <el-tabs type="border-card" v-model="AnalysisControl"  class="ListControl">
            <el-tab-pane label="模型" name="first">
                <el-form>
                    <!--                    搜索工具-->
                    <el-form-item>
                        <el-button icon="el-icon-search" circle @click="searchModel()"></el-button>
                        <el-input v-model="inputModel" placeholder="" style="width:120px"></el-input>
                    </el-form-item>

                    <div style="margin: 10px"></div>
                    <div v-if="searchmdDis">
                        <div><span>以下为您显示"{{searchInfo}}"的搜索结果</span></div>
                        <div class="el-tree-node__content" style="padding-left: 0px;" v-for="model in modelList" :key="model.id">
                            <!--将span加一个div调整为块状元素用于拖动-->
                            <div><span  class="el-tree-node__label" :style="{'padding-left': '42px',color:'#606266'}" :id="model.name" :draggable="true" @dragstart="drag($event)">{{model.name}}</span></div>
                        </div>
                    </div>
                    <!--                    遍历模型列表，分类别显示完整的模型列表-->
                    <!--                    样式参照elementui的树状图样式，但是由于elementui的树状图节点不可拖动，
                                            因而需要自行写一个树状图的结构-->
                    <div v-if="!searchmdDis" v-for="usage in usageList" :key="usage.id" :title=usage.name :name="usage.name">
                        <div class="el-tree-node__content" style="padding-left: 0px;" @click="handleOpen($event,usage.name,usage.id,usageList)">
                            <span :id="usage.name" class="el-tree-node__expand-icon el-icon-caret-right" :draggable="false"></span>
                            <span class="el-tree-node__label" :style="{color:'#606266'}" :draggable="false">{{usage.name}}</span>
                        </div>
                        <div v-if="usage.arrow" >
                            <div class="el-tree-node__content" style="padding-left: 0px;" v-for="model in modelList" :key="model.id">
                                <!--将span加一个div调整为块状元素方便拖动-->
                                <div><span  class="el-tree-node__label" :style="{'padding-left': '42px',color:'#606266'}"
                                            :id="model.name" :draggable="true" @dragstart="drag($event)">{{model.name}}</span></div>
                            </div>
                        </div>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="工作流" name="second">
                <el-form>
                    <!--                    搜索工具-->
                    <el-form-item>
                        <el-button @click="searchWf" icon="el-icon-search" circle></el-button>
                        <el-input v-model="inputWorkflow" placeholder="" style="width:120px"></el-input>
                    </el-form-item>
                    <div style="margin: 10px"></div>
                        <div v-if="searchwfDis"><span>以下为您显示"{{inputWorkflow}}"的搜索结果</span></div>
                    <!--                    遍历工作流列表，显示模型列表-->

                        <div class="el-tree-node__content" v-for="item in workflowList" :key="item.name">
                            <span @click="loadDag(item.name)" class="el-tree-node__label" :style="{'margin-left': '28px',width:'100px',color:'#606266'}">{{item.name}}</span>
                            <i @click="deleteDag(item.name)" class="el-icon-remove"></i>
                            <i @click="moreInfo(item.name)" class="el-icon-info"></i>
                        </div>

                </el-form>
            </el-tab-pane>
        </el-tabs>
            <!--工作流绘制区-->
        <div id="WorkSpace" ref="workPaint" @dragover="allowDrop($event)" @drop="drop($event)"
                 :style="{height:'100%',width:'72%'}">
            </div>
        <div class="WorkEvent" :style="{height: '100%'}">
            <el-button plain @click="deleteState" icon="el-icon-remove-outline" class="WorkButton"
                       :style="{'color':deleColor}">删除</el-button>
            <el-button plain @click="addState" icon="el-icon-circle-plus-outline" class="WorkButton"
                       :style="{'color':addColor}">参数</el-button>
            <el-button plain @click="Run" icon="el-icon-video-play" class="WorkButton"
                       :style="{'color':defaultColor}">运行</el-button>
            <el-button plain @click="Save" icon="el-icon-upload" class="WorkButton"
                       :style="{'color':defaultColor}">保存</el-button>
            <el-button plain @click="DownLoad" icon="el-icon-download" class="WorkButton"
                       :style="{'color':defaultColor}">下载</el-button>
            <el-button plain @click="Clear" icon="el-icon-delete" class="WorkButton"
                       :style="{'color':defaultColor}">清空</el-button>
        </div>
        <modelParams></modelParams>
        <dagSave @refreshDags="refreshWfs" @dagSaveback="saveDagback(arguments)"></dagSave>
        <workflowInfo></workflowInfo>

    </div>
</template>

<script>
    import axios from "../util/axios"
    import modelParams from "./Dialog/modelParams";
    import dagSave from "./Dialog/dagSave";
    import workflowInfo from "./Dialog/workflowInfo";
    let grey = "#303133";
    let blue = "#409eff";
    let lightgrey='#ddd';
    function onPointDragging(dataIndex,that,myChart) {
        // this.position将当前拖动点的位置信息传入
        //限制移动的边界，避免出现拖动出
        let temp = myChart.convertFromPixel('grid', this.position);
        if(temp[0]>100) {temp[0]=100;}
        if(temp[0]<0) temp[0]=0;

        if(temp[1]>100) temp[1]=100;
        if(temp[1]<0) temp[1]=0;
        this.position=myChart.convertToPixel('grid',temp);

        temp.push(that.Nodes[dataIndex][2]);
        that.Nodes[dataIndex]=temp;


        // 用更新后的 data，重绘折线图。
        myChart.setOption({
            series: [{
                id: 'a',
                data: that.Nodes
            }]
        });
    }
    function onPointClick(dataIndex,that,myChart){
        if(that.addMode)
        {
            let outputlist=[];
            for(let i=0;i<that.Links.length;i++)
            {
                if(that.Links[i].target===dataIndex)
                {
                    //遍历找出output
                    let params=that.NodesInfo[that.Links[i].source].params;
                    console.log(params);
                    for(let item of params)
                    {
                        if(item.out!=='') outputlist.push({'value':item.value});
                    }
                }
            }
            console.log(outputlist);
            //获取上游节点的输出参数，作为当前in值存在的标签的输入列表
            that.$Bus.$emit('modelParams',{
                dialogVisible:true,
                formData:that.NodesInfo[dataIndex].params,
                outputList:outputlist
            })
        }
        else if(that.deleteMode)
        {
            for(let i=0;i<that.Links.length;i++)
            {
                if(that.Links[i].target===dataIndex||
                    that.Links[i].source===dataIndex)
                {
                    that.$message.error('您仅可删除孤立节点');
                    return;

                }
            }
            //删除原来添加的graphic
            myChart.setOption({
                graphic:that.$echarts.util.map(that.Nodes, function () {
                    return {
                        $action: 'remove'
                    };
                })
            });
            that.Nodes.splice(dataIndex,1);
            that.NodesInfo.splice(dataIndex,1);
            that.NodesLink.splice(dataIndex,1);
            //dataIndex对应的节点发生了变化
            //更新边
            for(let i=0;i<that.Links.length;i++)
            {
                if(that.Links[i].target>dataIndex) that.Links[i].target-=1;
                if(that.Links[i].source>dataIndex) that.Links[i].source-=1;
            }
            console.log(that.NodesLink);
            //由于Nodes数组发生变化，需要更新shadow层，即graphic当中的内容，以实现dataIndex的一致
            myChart.setOption({
                series: [{
                    id: 'a',
                    data: that.Nodes,
                    links:that.Links
                }],
                 graphic:that.$echarts.util.map(that.Nodes, function (item, dataIndex) {
                     return {
                        type: 'circle',
                        position: myChart.convertToPixel('grid', item),
                        shape: {
                            r: 40
                        },
                        //不可视设置为true即可产生拖动图上元素的效果
                        invisible: true,
                        draggable: true,
                        ondrag: that.$echarts.util.curry(onPointDragging,dataIndex,that,myChart),
                        onclick:that.$echarts.util.curry(onPointClick,dataIndex,that,myChart),
                        z: 100
                    };
                })
             })

        }
        else
        {
            //当前处于添加Line的状态
            // 点击后查看是否存在当前激活的点 activeNode
            //若有则连线
            //若无则激活点
            if(that.activeNode===-1)
            {
                that.activeNode=dataIndex;
                //改变当前点的样式，显示其为激活状态
                myChart.setOption({
                    series: [{
                        id: 'a',
                        symbolSize: function(data,params){
                            if(params.dataIndex===dataIndex) return that.ActiveSize;
                            else return that.NormalSize;
                        },
                        itemStyle:{
                            color:function (params) {
                                if(params.dataIndex===dataIndex) return that.ActiveColor;
                                else return that.NormalColor;
                            }
                        }
                    }]
                })
            }

            else {
                if(that.activeNode===dataIndex)
                {
                    //用户连续点击了同一个点
                }
                else{

                    //检查当前的线是否已存在
                    for(let i=0;i<that.Links.length;i++)
                    {
                        if(that.Links[i].source===that.activeNode&&
                            that.Links[i].target===dataIndex)
                        {
                            that.$message.error('当前边已存在，请勿重新绘制');
                            return;
                        }
                    }

                    if(that.NodesLink[that.activeNode].out+1>that.NodesInfo[that.activeNode].out||that.NodesLink[dataIndex].in+1>that.NodesInfo[dataIndex].in)
                    {
                        that.$message.warning('连线超出限制');
                        return;
                    }

                    that.NodesLink[that.activeNode].out++;
                    that.NodesLink[dataIndex].in++;
                    that.Links.push({'source': that.activeNode, 'target': dataIndex});
                    console.log(that.NodesLink);


                }
                //将激活点的样式还原
                myChart.setOption({
                    series: [{
                        id: 'a',
                        links: that.Links,
                        symbolSize: that.NormalSize,
                        itemStyle:{
                            color: that.NormalColor
                        }
                    }]
                });
                that.activeNode=-1;
            }
        }

    }
    export default {
        name: "workFlow",
        props:{},
        components:{
            modelParams,
            dagSave,
            workflowInfo
        },
        data() {
            return {
                dagName:'',
                dagDescription: '',
                searchInfo:'',
                usageList:[],
                modelList:[],
                workflowList:[],
                //用于检验，当前用户拖动的是否是模型节点
                modelSet:new Set(),
                AnalysisControl:'first',
                NormalColor:'rgb(47,69,84)',
                ActiveColor:'rgb(47,69,114)',
                labelColor:'rgb(256,256,256)',
                NormalSize:[80,80],
                ActiveSize:[100,100],
                borderC:lightgrey,
                deleColor:grey,
                addColor:grey,
                defaultColor:grey,
                inputModel:'',
                inputWorkflow:'',
                searchmdDis:false,
                searchwfDis:false,
                deleteMode:false,
                addMode:false,
                activeNode:-1,
                nodeID : 0,
                //WorkSpace窗口的高度
                Nodes:[
                    //此数组存储节点坐标 Nodes[nodeID]=[x,y,name]
                ],
                NodesInfo:[
                    //此数组存储节点连接信息(in和out的限制)、参数的值
                ],
                NodesLink:[
                    //此数组存储当前每个节点的in和out情况
                    /*{ in:number1,
                        out:number2}*/
                ],
                Links:[
                    //此数组元素为json对象 存储边信息数据
                    /*{ source:nodeID,
                        target:nodeID}*/
                ]
            }
        },
        mounted()
        {
            console.log('mounted');
            this.$axios.get(this.$platfromUrl.getAllUsagesUrl).then(res=>{
                debugger;
                let ulist=res.body;
                for(let i=0;i<ulist.length;i++)
                {
                    this.usageList.push({'id':i,'name':ulist[i].name,'arrow':false})
                }
                this.usageList.push({'id':ulist.length,'name':'我的模型','arrow':false});
                return this.usageList;
            }).catch(err=>{});
            this.refreshWfs();
        },
        methods: {
            saveDagback(args)
            {
                debugger;
                 this.dagName=args[0];
                 this.dagDescription=args[1];
            },
            Run()
            {
                console.log(JSON.stringify({
                    name:this.dagName,
                        description:this.dagDescription,
                    connections:this.Links,
                    nodes:this.NodesInfo,
                    style:JSON.stringify({
                    'nodes':this.Nodes,
                    'nodesLink':this.NodesLink,
                    'nodesInfo':this.NodesInfo
                })
                }));
                 if(this.dagName==='') this.$message.warning('请先保存当前工作流');
                 else
                 {
                     this.$axios.post(this.$platfromUrl.saveDagUrl,{
                         name:this.dagName,
                         description:this.dagDescription,
                         connections:this.links,
                         nodes:this.nodes,
                         style:JSON.stringify({
                             'nodes':this.Nodes,
                             'nodesLink':this.NodesLink,
                             'nodesInfo':this.NodesInfo
                         })
                     }).then(res=>{
                         debugger;
                         console.log(res);
                         if(res.code===200)
                         {

                             this.$axios.post(this.$platfromUrl.runDag,{
                                 name:this.dagName,
                                 description:this.dagDescription,
                                 connections:this.Links,
                                 nodes:this.NodesInfo,
                                 style:JSON.stringify({
                                     'nodes':this.Nodes,
                                     'nodesLink':this.NodesLink,
                                     'nodesInfo':this.NodesInfo
                                 })
                             }).then(res=>{
                                 this.$message.success('为您运行当前工作流');
                                 debugger;
                             }).catch(err=>{})
                         }
                         else
                         {
                             this.$message.warning('保存失败');
                         }
                     }).catch(err=>{})
                 }
            },
            searchWf()
            {
                 let that=this;
                 let keys=this.inputWorkflow;
                 if(keys)
                 {
                     this.searchwfDis=true;
                     this.$axios.get(this.$platfromUrl.searchDagbyName+keys).then(res=>{
                         console.log(res);
                         let totalc=res.body.totalCount;
                         that.$axios.get(that.$platfromUrl.searchDagbyName+keys,{
                             pageNo:1,pageSize:totalc
                         }).then(res=>{
                             that.workflowList=res.body.result;
                         }).catch(err=>{})
                     }).catch(err=>{})
                 }
                 else
                 {
                     this.searchwfDis=false;
                     this.refreshWfs();
                 }

            },
            loadDag(dagName)
            {
                let that=this;
                this.$axios.get(this.$platfromUrl.getDagbyName+dagName).then(res=>{
                      debugger;
                      if(res.code===200)
                      {
                          this.dagName=res.body.name;
                          this.dagDescription=res.body.description;
                          let styleJson=JSON.parse(res.body.style);
                          that.Nodes=styleJson.nodes;
                          that.NodesInfo=styleJson.nodesInfo;
                          that.NodesLink=styleJson.nodesLink;
                          let con=JSON.parse(res.body.connections);
                          for(let item of con)
                          {
                              item.target=parseInt(item.target);
                              item.source=parseInt(item.source);
                          }
                          that.Links=con;
                          let myChart=that.initChart();
                          that.addse(myChart,that);
                      }
                }).then(err=>{})
            },
            moreInfo(dagName)
            {
                this.$axios.get(this.$platfromUrl.getDagbyName+dagName).then(res=>{
                    debugger;
                    console.log(res);
                    if(res.code===200)
                    {
                        let tlist=res.body;
                        let re={'名称':tlist.name,'描述':tlist.description,
                            '建立时间':tlist.createdTime, '上次修改时间':tlist.lastModifyTime};
                        this.$Bus.$emit('workflowInfo',{
                            dialogVisible:true,
                            formData:re
                        })
                    }
                }).catch(err=>{})
            },
            deleteDag(dagName)
            {
                this.$axios.remove(this.$platfromUrl.deleteDagbyName+dagName).then(res=>{
                    debugger;
                    if(res.code===200)
                    {
                        this.refreshWfs();
                        this.$message.success(res.message);
                    }
                    else
                    {
                        this.$message.warning('工作流删除失败');
                    }
                }).catch(err=>{})
            },
            refreshWfs()
            {
                debugger;
                this.$axios.get(this.$platfromUrl.getAllDagUrl).then(res=>{
                    let totalc=res.body.totalCount;
                    debugger;
                    this.$axios.get(this.$platfromUrl.getAllDagUrl,{pageNo:1,pageSize:totalc}).then(res=>{
                        debugger;
                        this.workflowList=res.body.result;
                    }).catch(err=>{})
                }).catch(err=>{})
            },
            searchModel()
            {
                //搜索模型，输入为空时显示所有的类别
                let one=this.inputModel;
                this.searchInfo=one;
                if(one==='')
                {
                    this.searchmdDis=false;
                    while(this.modelList.length) this.modelList.pop();
                }
                else
                {
                    //更新modelList和modelSet
                    this.searchmdDis=true;
                    let that=this;
                    this.$axios.get(this.$platfromUrl.searchModelUrl,{keywords:this.inputModel}).then(res=>{
                        debugger;
                        let totalc=res.body.totalCount;
                        that.$axios.get(this.$platfromUrl.searchModelUrl,{
                            keywords:this.inputModel,
                            pageNo:1,
                            pageSize:totalc
                        }).then(res=>{
                            let mlist=res.body.result;
                            while(this.modelList.length) this.modelList.pop();
                            this.modelSet.clear();
                            for(let i=0;i<mlist.length;i++)
                            {
                                this.modelList.push({'id':i,'name':mlist[i].artifactId});
                                this.modelSet.add(mlist[i].artifactId);
                            }
                            this.$forceUpdate();}).catch(err=>{})
                    }).catch(err=>{})
                }
            },
            handleOpen(e,id,index,usagelist)
            {
                //树形控件点击打开的操作
                //为了控制逻辑，提高效率，单次只打开一个类别，不允许同时打开两个类别
                let cl=document.getElementById(id);
                for(let i=0;i<usagelist.length;i++)
                {
                    if(usagelist[i].arrow&&i!==index){
                        let ct=document.getElementById(usagelist[i].name);
                        ct.classList.remove('el-icon-caret-bottom');
                        ct.classList.add('el-icon-caret-right');
                        usagelist[i].arrow=false;
                    }
                }
                if(cl.classList[1]==='el-icon-caret-right')
                {
                    cl.classList.remove('el-icon-caret-right');
                    cl.classList.add('el-icon-caret-bottom');
                    while(this.modelList.length) this.modelList.pop();
                    this.modelSet.clear();
                    usagelist[index].arrow=true;
                    if(usagelist[index].arrow)
                    {
                        if(id==='我的模型')
                        {

                            //查询当前用户对应的模型列表
                            axios.get(this.$platfromUrl.getModelbyUserUrl).then(res=>{
                                let mlist=res.data.body.result;
                                for(let i=0;i<mlist.length;i++)
                                {
                                    this.modelList.push({'id':i,'name':mlist[i].artifactId});
                                    this.modelSet.add(mlist[i].artifactId);
                                }
                            }).catch(err=>{})
                        }
                        else
                        {
                            //id为对应的类别，当点击展开后，通过axios获取得到当前类别的模型名列表
                            axios.get(this.$platfromUrl.getModelbyTypeUrl+id).then(res=>{
                                debugger;
                                //获取到当前类别的模型条目总数
                                let c=res.data.body.totalCount;
                                axios.get(this.$platfromUrl.getModelbyTypeUrl+id,{
                                    params:{
                                        pageNo:1,
                                        pageSize:c
                                    }
                                }).then(res=>{
                                    let mlist=res.data.body.result;
                                    for(let i=0;i<mlist.length;i++)
                                    {
                                        this.modelList.push({'id':i,'name':mlist[i].artifactId});
                                        this.modelSet.add(mlist[i].artifactId);
                                    }
                                }).catch(err=>{})
                            }).catch(err=>{})
                        }

                    }
                    this.$forceUpdate();
                }
                else
                {
                    cl.classList.remove('el-icon-caret-bottom');
                    cl.classList.add('el-icon-caret-right');
                    usagelist[index].arrow=false;
                    while(this.modelList.length) this.modelList.pop();
                    this.modelSet.clear();
                    this.$forceUpdate();
                }
            },
            Save()
            {
                //将工作流保存，上传至服务器，用户下次可用
                // this.Links;
                // this.Nodes;
                // this.NodesInfo;
                // this.NodesLink;

                let that=this;
                this.$Bus.$emit('dagSave',{
                    dialogVisible:true,
                    nodes:that.NodesInfo,
                    links:that.Links,
                    style:JSON.stringify({
                        'nodes':that.Nodes,
                        'nodesLink':that.NodesLink,
                        'nodesInfo':that.NodesInfo
                    })
                })
            },
            DownLoad()
            {
                //将工作流保存到本地，提供下载的功能
                //保存为图片 (可以看看怎么加这个功能)
                let e=document.getElementById('WorkSpace');
                let myChart = this.$echarts.getInstanceByDom(document.getElementById('WorkSpace'));
                if(!myChart) {
                    this.$message.error('您还未绘制任何内容');
                    return;
                }
                let canvas=e.childNodes[0].childNodes[0];
                let oA = document.createElement("a");
                oA.download = '我的工作流';// 设置下载的文件名，默认是'下载'
                oA.href = canvas.toDataURL("image/png");
                document.body.appendChild(oA);
                oA.click();
                oA.remove(); // 下载之后把创建的元素删除
            },
            Clear()
            {
                //将按钮状态回归到未激活的状态
                //也就是当前不可删除或者添加
                this.deleteMode=false;
                this.addMode=false;
                this.deleColor=grey;
                this.addColor=grey;
                let myChart = this.$echarts.getInstanceByDom(document.getElementById('WorkSpace'));
                let that=this;
                if(myChart)
                {
                    myChart.setOption({
                        series:[{
                            id:'a',
                            animation:!that.deleteMode
                        }],
                        graphic:that.$echarts.util.map(that.Nodes, function () {
                            return {
                                $action: 'remove'
                            };
                        })
                    });
                    //清空当前绘制的工作流
                    while(this.Nodes.length)
                    {
                        this.Nodes.pop();
                        this.NodesLink.pop();
                    }
                    while(this.Links.length)
                    {
                        this.Links.pop();
                    }
                    myChart.setOption({
                        series: [{
                            id: 'a',
                            data: this.Nodes,
                            links:this.Links
                        }]
                    });
                    this.$message.success('成功删除');
                }
                else {
                    this.$message.success('成功删除');
                }
            },
            deleteState()
            {
                let myChart = this.$echarts.getInstanceByDom(document.getElementById('WorkSpace'));
                //开启删除状态
                //此状态下，可以通过点击，删除点或者线
                if(this.deleColor===grey)
                {

                    this.deleteMode=true;
                    this.addMode=false;
                    this.deleColor=blue;
                    this.addColor=grey;
                    if(myChart)
                        myChart.setOption({
                            series:[{
                                id:'a',
                                animation:!this.deleteMode
                            }]
                        })
                }
                else
                {

                    this.deleteMode=false;
                    this.addMode=false;
                    this.deleColor=grey;
                    if(myChart)
                        myChart.setOption({
                            series:[{
                                id:'a',
                                animation:!this.deleteMode
                            }]
                        })
                }
            },
            addState()
            {
                let myChart = this.$echarts.getInstanceByDom(document.getElementById('WorkSpace'));
                if(this.addColor===grey)
                {
                    this.deleteMode=false;
                    this.addMode=true;
                    this.addColor=blue;
                    this.deleColor=grey;
                    if(myChart)
                        myChart.setOption({
                            series:[{
                                id:'a',
                                animation:!this.deleteMode
                            }]
                        })
                }
                else
                {
                    this.deleteMode=false;
                    this.addMode=false;
                    this.addColor=grey;
                }
            },
            drag(e)
            {
                //判断当前点是不是在WorkFlow的窗口内
                //console.log(e.target);
                //console.log(e.target.id);

                e.dataTransfer.setData("Text",e.target.id);
            },
            allowDrop(e)
            {
                e.preventDefault();
            },
            initChart()
            {

                let myChart = this.$echarts.getInstanceByDom(document.getElementById('WorkSpace'));
                if(myChart)
                {
                    myChart.setOption({
                        series: [{
                            data: this.Nodes,
                            links: this.Links
                        }]
                    })
                }
                else {
                    console.log('init');
                    // 绘制图表
                    myChart=
                        this.$echarts.init(document.getElementById('WorkSpace'));
                    myChart.setOption({
                        title: {text: ''},
                        xAxis: {
                            id:'myx',
                            show:true,
                            min: 0,
                            max: 100,
                            type: 'value',
                            axisLine: {onZero: false}
                        },
                        //同上
                        yAxis: {
                            id:'myy',
                            show:true,
                            min: 0,
                            max: 100,
                            type: 'value',
                            axisLine: {onZero: false}
                        },
                        grid: {
                            //让表格平铺占满整个div
                            top: "0px",
                            left: "0px",
                            right: "0px",
                            bottom: "0px",
                            z: 10
                        },
                        series: [{
                            id:'a',
                            type: 'graph',
                            layout: 'none',
                            coordinateSystem: 'cartesian2d',
                            label: {
                                show: true,
                                color:this.labelColor,
                                textBorderColor: '#666',
                                textBorderWidth: 2,
                                formatter: function (p) {
                                    return p.data[2];
                                }
                            },
                            //关系图节点标记的图形
                            symbol:'circle',
                            //关闭鼠标悬浮时候的节点放大效果
                            hoverAnimation:false,
                            itemStyle: {
                                normal:{
                                    color:this.NormalColor
                                }
                            },
                            symbolSize:this.NormalSize,
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [4, 10],
                            roam: false,
                            center: ['100%', '100%'],
                            data: this.Nodes,
                            links: this.Links
                        }]
                    });
                }
                return myChart;
            },
            //添加用于移动的shadow和一些事件
            addse(myChart,that)
            {
                //myCharts中的节点本身不能够触发移动点击事件，在其上增加一个shadow用于实现移动点击功能
                myChart.setOption({
                    graphic: this.$echarts.util.map(that.Nodes, function (item, dataIndex) {
                        return {
                            type: 'circle',
                            position: myChart.convertToPixel('grid', item),
                            shape: {
                                r: 40
                            },
                            //不可视设置为true即可产生拖动图上元素的效果
                            invisible: true,
                            draggable: true,
                            ondrag: that.$echarts.util.curry(onPointDragging, dataIndex,that,myChart),
                            onclick:that.$echarts.util.curry(onPointClick,dataIndex,that,myChart),
                            z: 100
                        };
                    })
                });
                // 当鼠标连续点击两个点后，绘制两个节点之间的连接线
                // 当Links当中最后一个元素已经包括头尾时，点击向其中添加source
                // 当Links当中最后一个元素只包括头，则添加target
                // 通过setOption更新图的边信息

                //为myChart缩放以及窗口尺寸变化添加监听事件，更新graphic点的位置
                //之所以需要更新graphic点，因为graphic点是像素点，而不是根据图表的坐标轴绘制的
                window.addEventListener('resize', updatePosition);
                myChart.on('dataZoom', updatePosition);
                function updatePosition() {
                    myChart.resize();
                    myChart.setOption({
                        graphic: that.$echarts.util.map(that.Nodes, function (item) {
                            return {
                                position: myChart.convertToPixel('grid', item)
                            };
                        })
                    });
                }
                myChart.off('click');
                //为myChart添加点击事件，实现点击删除线的效果
                myChart.on('click',function (para) {
                    if(para.dataType=='edge'&&that.deleteMode) {
                        that.NodesLink[that.Links[para.dataIndex].source].out--;
                        that.NodesLink[that.Links[para.dataIndex].target].in--;
                        that.Links.splice(para.dataIndex, 1);
                        myChart.setOption({
                            series: [{
                                id: 'a',
                                links: that.Links
                            }]
                        })
                    }
                })
            },
            drop(e)
            {
                e.preventDefault();
                let data=e.dataTransfer.getData("Text");
                if(!this.modelSet.has(data))
                {
                    //判断当前拖动的元素是否是模型，考虑到效率这个判断放后端做比较好
                    //查询当前模型列表中是否存在名为data的数据
                    this.$message.warning('请拖动模型标签');
                    return;
                }
                else
                {
                    let that=this;
                    //将当前的拓扑关系通过echarts组件表现出来 如果已存在图表则获取到原来的图表
                    //若无则新建
                    let myChart=this.initChart();
                    let position=[];
                    //position.push(e.offsetX,this.workhei-e.offsetY);
                    //将像素坐标转换为笛卡尔坐标系中的坐标
                    let temp=myChart.convertFromPixel('grid',[e.offsetX,e.offsetY]);
                    position.push(temp[0],temp[1]);
                    //释放区域为div的class为WorkFlow,id为WorkSpace
                    //每次将模型标签拖动进工作区域后，向图中添加节点
                    e.preventDefault();
                    position.push(data);
                    this.Nodes.push(position);
                    this.NodesLink.push({'name':data,'in':0,'out':0});
                    if(data)
                    {
                        this.$axios.get(this.$platfromUrl.getModelbyId+data).then(res=>{
                            debugger;
                            console.log(res);
                            let p=res.body.parameters;
                            let params=[];
                            if(p==="") ;
                            else
                            {
                                params=JSON.parse(p);
                            }
                            //解析参数
                            let modelin=-1;
                            let modelout=-1;
                            let myparams=[];
                            for(let item of params)
                            {
                                if(item.in)
                                {
                                    item.in=parseInt(item.in);
                                    modelin=modelin<item.in?item.in:modelin;
                                }
                                else
                                {
                                    item.in='';
                                }
                                if(item.out)
                                {
                                    item.out=parseInt(item.out);
                                    modelout=modelout<item.out?item.out:modelout;
                                }
                                else
                                {
                                    item.out='';
                                }
                                myparams.push({'label':item.name,'value':item.default,
                                    'in':item.in,'out':item.out,'option':item.option?item.option.split(','):''})
                            }
                            console.log(myparams);
                            this.NodesInfo.push({'taskName':data+'Task','modelId':data,'in':modelin+1,'out':modelout+1,'params':myparams});
                            console.log(this.NodesInfo);
                            console.log(that.NodesLink);
                            myChart.setOption({
                                series: [{
                                    id: 'a',
                                    data: this.Nodes,
                                }]
                            });
                            this.addse(myChart,that);
                        }).catch(err=>{})
                    }

                }



            }
        }
    }
</script>

<style scoped>
    .workMain
    {
        position:relative;
        width: 90%;
        margin-left: 10px;
    }
    .ListControl {
        position:absolute;
        width: 20%;
        height: 100%;
        overflow-y:scroll;
    }
    .itemName{
        float:left;
        margin-left: 20px;
        width:200px;
        top:10px;
        color: #5a5e66;
        text-align:left;
    }
    #WorkSpace
    {
        position: absolute;
        left:20%;
        border: 1px solid #ddd;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    }
    .WorkEvent
    {
        position:absolute;
        right: 0%;
        width: 8%;
        border: 1px solid #ddd;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        z-index: 2;
    }
    .WorkButton
    {
          position: relative;
          border-width:0px;
          left:10%;
          padding-left:0;
          padding-right:0;
          margin:0
    }
</style>