<template>
    <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="36%">
        <el-tabs type="border-card" v-model="activeTab">
            <el-tab-pane label="公共数据" style="min-height: 300px" name="publicData">
                <el-tree @node-click="markNode"
                        :props="props"
                        :load="loadNode"
                        lazy>
                </el-tree>
            </el-tab-pane>
            <el-tab-pane label="个人数据" style="min-height: 300px" name="personalData">
            </el-tab-pane>
        </el-tabs>
        <el-button style="margin-top: 20px" type="primary">确定</el-button>
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
                    isLeaf: 'leaf'
                }
            }
        },
        methods:{
            loadNode(node, resolve) {
                debugger;
                console.log(node,resolve);
                if (node.level === 0) {
                    return resolve([{ name: 'region' }]);
                }
                if (node.level > 1) return resolve([]);

                setTimeout(() => {
                    const data = [{
                        name: 'leaf',
                        leaf: true
                    }, {
                        name: 'zone'
                    }];

                    resolve(data);
                }, 500);
            },
            markNode(data,Node)
            {
                debugger;
                console.log(data,Node);
            }
        },
        created() {
            let that=this;
            this.$Bus.$on('fileSelector',index=>{
                that.index=index;
                that.dialogVisible=true;
            })
        }
    }
</script>

<style scoped>

</style>