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
                <div id="editor"></div>
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
                }, {
                    value: '选项2',
                    label: 'Java'
                }, {
                    value: '选项3',
                    label: 'C'
                }, {
                    value: '选项4',
                    label: 'Cpp'
                }],
                value: 'Python',
                textarea1: '',
                textarea2: ''
            }
        },
        methods: {
            submit() {
                document.querySelector("#output").value = "代码运行中！";
                // let data = editor.getValue();
                let data = editor.innerText;
                global.console.log(document.querySelector("#language-type").value.toUpperCase());

                fetch("http://127.0.0.1:8080/run", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        'Access-Control-Allow-Origin':'*'
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