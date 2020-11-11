<template>
    <el-dialog :visible.sync="visible">
        <el-table :data="data">
            <el-table-column v-for="(value,index) in columns" :key="index" :label="index" :prop="index">
<!--                <template scope="slot">-->

<!--                </template>-->
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
    export default {
        name: "tablePreview",
        data(){
            return {
                data:[],
                columns:{},
                visible:false,
            }
        },
        created() {
            let that=this;
            that.$Bus.$on('tablePreview',(data,columns)=>{
                debugger;
                that.data=data;
                that.columns=columns;
                that.visible=true;
            })
        }
    }
</script>

<style scoped>

</style>