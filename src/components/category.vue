<template>
    <div class="cateContainer">
        <h4>{{headTitle}}</h4>
        <div class="subContainer" v-if="isCreate">
            <div v-for="(data,index) in getdata" :key="index">
                <el-button v-if="data.name" type="text" @click="handleClick(data)">
                    {{data.name}} ({{data.num}})
                </el-button>
            </div>

            <div class="countControl" v-if="catalog.length > 5">
                <el-button class="showMore" v-if="cataLength < catalog.length" type="text" @click="showMore">更多...
                </el-button>
                <el-button class="showLess" v-if="cataLength > 5" type="text" @click="showLess">更少...</el-button>
            </div>
        </div>
        <el-tag v-else closable disable-transitions @close="handleClose()">
            {{chosen.name}} ({{chosen.num}})
        </el-tag>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isCreate: true,
                chosen: {
                    name: '',
                    num: ''
                },
                cataLength: 5
            }
        },
        props: ['filed', 'headTitle', 'catalog'],
        methods: {
            handleClick(data) {
                this.isCreate = false
                this.chosen.name = data.name
                this.chosen.num = data.num
                this.$emit("clickChosen", {
                    filed: this.filed,
                    val: data.name
                })
            },
            handleClose() {
                this.chosen = []
                this.isCreate = true
                this.$emit("clickChosen", {
                    filed: this.filed,
                    val: ''
                })
            },
            showLess() {
                this.cataLength -= 5
            },
            showMore() {
                this.cataLength += 5
            }
        },
        computed: {
            getdata() {
                return this.catalog.slice(0, this.cataLength)
            }
        }
    }

</script>

<style lang="less" scoped>
    .cateContainer {
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;

        .headTitle {
            margin: 5px;
            font-weight: bold;
        }

        .subContainer {
            .el-button {
                display: block;
                margin: 10px 5px;
                padding: 0;
                white-space: normal;
                text-align: left;
            }

            .countControl {
                justify-content: space-between;
                display: flex;

                .showLess {
                    display: inline-block;
                }

                .showMore {
                    display: inline-block;
                }
            }

        }

        .el-tag {
            margin: 5px;
            font-weight: bold;
            white-space: normal;
            text-align: left;
        }
    }

</style>
