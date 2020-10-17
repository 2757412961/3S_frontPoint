<template>
    <div
         style="width:90%; height:230px; background-color: #F2F6FC; border-top: 1px solid #DCDFE6;">
        <el-row style="height: 85%; margin-bottom: 0;">
            <el-col :span="11" :offset="1">
                <div style="width: 100%; height: 100%; padding: 1px;">
                    <el-image src="../../static/img/foot-logo.png" alt="" fit="cover"
                              style="margin-top:7%;margin-left: 5%"></el-image>
                </div>
            </el-col>
            <el-col :span="7">
                <!--<div style="width: 100%; height: 100%;padding: 1px;">-->
                <!--TEL-->
                <!--</div>-->
                <el-form>
                    <el-form-item :label="$t('menuName.contact')" id="item1">
                    </el-form-item>
                    <el-form-item :label="$t('menuName.add')" class="item2">
                        <p>{{$t("menuName.address")}}</p>
                    </el-form-item>
                    <el-form-item :label="$t('menuName.postcode')" class="item2">
                        <p>310027</p>
                    </el-form-item>
                    <el-form-item :label="$t('menuName.tel')" class="item2">
                        <p>+86-571-87952453</p>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="4">
                <div style="width: 100%; height: 100%; padding: 1px;">
                    <el-select v-model="value" :placeholder="$t('menuName.links')" style="margin-top: 10%">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row style="height: 10%; margin-bottom: 0;text-align: center">
            <p style="color: #313133; margin-bottom: 0;display: inline-block">版权所有Copyright © 浙江大学地球科学学院</p>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value:'',
                options: [{
                    value: '选项1',
                    label: '浙江大学主页'
                }, {
                    value: '选项2',
                    label: '浙江大学办公网'
                }, {
                    value: '选项3',
                    label: '浙江大学理学院'
                }]
            }
        }
    }
</script>

<style scoped>
    .el-form-item {
        margin-bottom: 0px;
    }
    p {
        margin-bottom: 0px;
    }
    .el-row > *
    {
        color:#000000 !important;
    }
</style>