<template>
    <div>

        <el-row :gutter="40" type="flex" justify="center" >
            <el-col :span="11"  style="margin-top: 22px;">
                <div class="grid-content ">
                    <el-button type="success" v-on:click="submit()">点击运行</el-button>
                    <el-select v-model="value" placeholder="请选择" id="language-type" onchange="selectLanguage(this)">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="height: 20px"></div>
                <div id="editor">{{codeLS}}</div>
            </el-col>
            <el-col :span="8">
                <div style="height: 60px"></div>

                <div class="grid-content bg-purple-light" style="margin-top: 22px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                    <el-input
                            type="textarea"
                            size="medium"
                            placeholder=""
                            v-model="textarea2"
                            rows="20"
                            id="output">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <div style="height: 12px"></div>


    </div>

</template>

<script>
    export default {
        name: "codeOnline",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: 'Python'
                }
                // , {
                //     value: '选项2',
                //     label: 'Java'
                // }, {
                //     value: '选项3',
                //     label: 'C'
                // }, {
                //     value: '选项4',
                //     label: 'Cpp'
                // }
                ],
                value: 'Python',
                textarea1: '',
                textarea2: '',
                codeLS: "\"\"\"一元函数线性拟合样例\"\"\"\n" +
                    "x = [1, 2, 3, 4, 5, 6, 7];\n" +
                    "y = [0.5, 2.5, 2, 4, 3.5, 6, 5.5]\n" +
                    "def liner_fitting(data_x,data_y):\n" +
                    "      size = len(data_x);\n" +
                    "      i=0\n" +
                    "      sum_xy=0\n" +
                    "      sum_y=0\n" +
                    "      sum_x=0\n" +
                    "      sum_sqare_x=0\n" +
                    "      average_x=0;\n" +
                    "      average_y=0;\n" +
                    "      while i<size:\n" +
                    "          sum_xy+=data_x[i]*data_y[i];\n" +
                    "          sum_y+=data_y[i]\n" +
                    "          sum_x+=data_x[i]\n" +
                    "          sum_sqare_x+=data_x[i]*data_x[i]\n" +
                    "          i+=1\n" +
                    "      average_x=sum_x/size\n" +
                    "      average_y=sum_y/size\n" +
                    "      return_k=(size*sum_xy-sum_x*sum_y)/(size*sum_sqare_x-sum_x*sum_x)\n" +
                    "      return_b=average_y-average_x*return_k\n" +
                    "      return [return_k,return_b]\n" +
                    "parameter = liner_fitting(x,y)\n" +
                    "print('y = ', parameter[0], '* x',' + ',parameter[1]);"
            }
        },
        methods: {
            submit() {
                document.querySelector("#output").value = "代码运行中！";
                // let data = editor.getValue();
                let data = editor.innerText;
                global.console.log(document.querySelector("#language-type").value.toUpperCase());

                url = $URL.baseUrl + '/run';
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        // 'Access-Control-Allow-Origin':'*'
                    },
                    body: JSON.stringify({
                        code: data,
                        type: document.querySelector("#language-type").value.toUpperCase()
                    })

                }).then(response => response.json())
                    .then(json => {
                        console.log(json);
                        document.querySelector("#output").value = json.output;
                    });
            },
            clean() {
                editor.innerText = "";
            },
            selectLanguage(e) {
                let mode = "ace/mode/" + e.value.toLowerCase();
                if (e.value.toLowerCase() === "c" || e.value.toLowerCase() === "cpp") {
                    mode = "ace/mode/c_cpp";
                }
                editor.session.setMode(mode);
            }
        },
        mounted() {
            // eslint-disable-next-line
            ace.require("ace/ext/language_tools");
            let editor = ace.edit('editor')
            editor.session.setMode('ace/mode/python') // 设置语言
            editor.setTheme('ace/theme/tomorrow')// 设置主题
            // enable autocompletion and snippets
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true// 设置自动提示
            })
        }

    }
</script>

<style scoped>
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .el-select {
        display: inline-flex;
        position: relative;
        /*padding-bottom: -20px;*/
    }
    #editor{
        width:100%;
        height:449px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

</style>