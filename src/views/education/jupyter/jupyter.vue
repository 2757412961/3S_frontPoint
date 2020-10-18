<template>
<div>
    <iframe sandbox="allow-scripts allow-forms allow-same-origin"
            :src="filePath"
            height="800px" width="100%" align="center">
    </iframe>
    <el-button @click="Back">返回</el-button>
</div>

</template>

<script>
    export default {
        name: "jupyter",
        data(){
            return {
                visible:false,
                filePath:"",
                // http://10.79.231.81:8888/notebooks/MetallogenicPred/Metallogenic%20Prediction.ipynb
                picPath:""
            }
        },
        mounted() {
           // console.log('jupyter');

        },
        methods:{
            Back()
            {
                this.$emit('backto');
            }
        },
        created() {
            let that = this;
            this.$Bus.$on('teachModelInfoJP',params=>{

                that.filePath = params.filePath;
                // that.picPath = params.picPath;


            })
        }
    }
</script>

<style scoped>

</style>