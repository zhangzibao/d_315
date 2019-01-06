<template>
    <el-form :model="ruleForm"
             :rules="rules"
             class="demo-ruleForm login-container"
             label-position="left"
             label-width="0px"
             ref="ruleForm"
             @keyup.enter.native="Login()"
    >
        <h3 class="title">宁波工程学院7号楼315寝室费管理系统</h3>
        <el-form-item prop="userName">
            <el-input type="text"
                      v-model="ruleForm.userName"
                      auto-complete="off"
                      placeholder="账号"/>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password"
                      v-model="ruleForm.password"
                      auto-complete="off"
                      placeholder="密码"
            />
        </el-form-item>
        <el-checkbox v-model="checked"
                     checked
                     class="remember">记住密码
        </el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary"
                       style="width:100%;"
                       @click.native.prevent="Login()"
                       :loading="logining">登录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
    import api from '../api';
    import Vue from 'vue';
    import Component from "vue-class-component"

    interface rule_form {
        userName?: string,
        password?: string
    }

    @Component
    export default class MyLogin extends Vue {
        // data
        private logining: boolean = false;
        private ruleForm: rule_form = {
            userName: "",
            password: ""
        };
        private rules: any = {
            userName: [
                {required: true, message: '请输入账号', trigger: 'blur'},
            ],
            password: [
                {required: true, message: '请输入密码', trigger: 'blur'},
            ]
        };
        private checked: boolean = true;
        public $refs!: {
            validate: HTMLFormElement
        };

        // methods
        private Login(): void {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    const loginParams: rule_form = {
                        userName: this.ruleForm.userName,
                        password: this.ruleForm.password
                    };
                    api.login(loginParams).then((data: any) => {
                        if (data === "用户名不存在" || data === "密码错误") {
                            this.$message({
                                message: data,
                                type: 'warning'
                            });
                        } else {
                            this.$store.dispatch("Login", data).then((res) => {
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                this.$router.replace("/record");
                            });
                        }
                    })
                }
            });
        }

    }

</script>

<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        .title {
            margin: 0 auto 40px auto;
            text-align: center;
            color: #505458;
        }

        .remember {
            margin: 0 0 35px 0;
        }
    }
</style>