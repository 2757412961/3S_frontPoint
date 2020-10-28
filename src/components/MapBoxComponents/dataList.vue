<!--获取后端数据库中的样例数据列表，显示在窗口中
当点击加载，向后端请求对应数据，
判别数据的类型，加载数据至地图中-->
<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="35%">
        <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                height="250"
                :row-style="{height:'20px'}"
                :cell-style="{padding:'0px'}"
                :show-header=false>
            <el-table-column
                    fixed="left"
                    prop="data"
                    width="220px">
            </el-table-column>

            <el-table-column
                    fixed="left"
                    width="80px">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">加载</el-button>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

</template>

<script>
    import axios from "../../util/axios"
    export default {
        name: "dataList",
        data(){
            return {
                title:'',
                tableData:[],
                dialogVisible:false
            }
        },
        mounted() {},
        methods:{
            handleClick(row){
                let that=this;
                //axios get(http://127.0.0.1:13000/summer/file/temp/dataJson/)
                // 返回的对象是JsonElement
                // 网页打开对应url直接读取可以读取到
                // 但axios会跳转到error

                axios.get(this.$platfromUrl.readProjectFile+row.data,{
                    params:{
                        type:2
                    }
                })
                .then(res=>{

                    //确定当前数据为FeatureCollection或Feature否则不符合规范，根据geojson的数据规范，获取到数据类型
                    //Point, LineString, Polygon, MultiPoint, MultiLineString, and MultiPolygon
                    let jsonData=res.data.body;
                    let type='';
                    if(jsonData.type=="FeatureCollection")
                    {
                        type=jsonData.features[0].geometry.type;
                    }
                    else if(jsonData.type=="Feature")
                    {
                        type=jsonData.geometry.type;
                    }
                    else {
                        this.$message({
                            message: '数据不符合要求',
                            type: 'error'
                        });
                        return;
                    }
                    let layername=row.data.substr(0,row.data.lastIndexOf('.'));
                    if(that.$parent.myMap.getLayer(layername))
                    {
                        this.$message({
                            message: '同名同层已存在',
                            type: 'error'
                        });
                        return ;
                    }
                    if(type=="Point"||type=='MultiPoint')
                    that.$parent.myMap.addLayer({
                        'id':layername,
                        'type':'circle',
                        'source': {
                            'type': 'geojson',
                            'data': this.$platfromUrl.readDataFile+row.data
                        },
                        'paint':{
                            'circle-color':'#4682B4'
                        }
                    });

                    else if(type=="LineString"||type=='MultiLineString')
                        that.$parent.myMap.addLayer({
                            'id': layername,
                            'type':'line',
                            'source': {
                                'type': 'geojson',
                                'data': this.$platfromUrl.readDataFile+row.data
                            },
                            'paint':{
                                'line-color':'#4682B4'
                            }
                        });

                    else if(type=="Polygon"||type=='MultiPolygon')
                        that.$parent.myMap.addLayer({
                            'id': layername,
                            'type':'fill',
                            'source': {
                                'type': 'geojson',
                                'data': this.$platfromUrl.readDataFile+row.data
                            },
                            'paint': {
                                'fill-color': '#4682B4',
                                'fill-opacity': 0.5,
                                'fill-outline-color':'#0e2944'
                            }

                        });
                    else {
                        this.$message({
                            message: '数据不符合要求',
                            type: 'error'
                        });
                        return;
                    }
                    //更新图层列表以及数据库缓存
                    that.$parent.addLayerid(layername);
                })
                .catch(err=>{
                    this.$message.error("数据加载失败");
                    console.log(err);
                })
            }
        },
        created() {
            let that=this;
            this.$Bus.$on("dataListpara",para=>{
                that.dialogVisible=para.dialogVisible,
                that.tableData=para.tableData,
                that.title=para.title
            })
        }

    }
</script>

<style scoped>

</style>
