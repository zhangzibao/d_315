<template>
    <el-col type="flex">
        <el-row type="flex"
                style="border-bottom: 1px solid #d0d0d0 ;padding-bottom: 20px;margin-bottom: 20px"
                justify="start"
        >
            <el-row :span="4"
                    type="flex"
            >
                <el-input v-model="user_id" type="number" placeholder="请输入用户id"/>
            </el-row>
            <el-row type="flex"
                    style="margin-right: 20px"
            >
                <el-button type="primary"
                           icon="el-icon-search"
                           @click="gotoUser()">
                    搜索
                </el-button>
            </el-row>
            <el-row type="flex">
                <el-button type="success"
                           @click="dialogVisible = true"
                           icon="el-icon-plus"
                           v-if="$store.state.myself.isAdmin"
                >添加用户
                </el-button>
            </el-row>
        </el-row>
        <el-row type="flex">
            <el-table v-loading="loading"
                      style="width: 800px;min-height: 426px;"
                      :data="UserList.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
                <el-table-column prop="id" label="id" width="180"/>
                <el-table-column prop="chineseName" label="姓名" width="180"/>
                <el-table-column prop="userName" label="用户名"/>
            </el-table>
        </el-row>
        <el-row type="flex"
                justify="center"
                align="middle"
                style="margin:20px"
        >
            <el-pagination background :page-size="pageSize" layout="prev, pager, next" :total="itemTotal"
                           @current-change="current_change"/>
        </el-row>
        <!--弹出对话框-->
        <el-dialog :visible.sync="dialogVisible"
                   style="max-width: 800px;padding:10px 20px;margin: 0 auto"
                   :modal-append-to-body="false"
                   :append-to-body="true">
            <el-row slot="title" type="flex" justify="center" align="middle">
                <el-col :span="5">添加用户</el-col>
            </el-row>
            <el-form :model="form" label-position="left" label-width="80px">
                <el-form-item prop="userName" label="用户名:">
                    <el-input v-model="form.userName"/>
                </el-form-item>
                <el-form-item prop="chineseName" label="中文名:">
                    <el-input v-model="form.chineseName"/>
                </el-form-item>
                <el-form-item prop="password" label="密码:">
                    <el-input type="password" v-model="form.password"/>
                </el-form-item>
                <el-form-item prop="isAdmin" label="管理员:">
                    <el-row>
                        <el-col :span="1">
                            <el-checkbox v-model="form.isAdmin"/>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <el-row type="flex" justify="end">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">保存</el-button>
            </el-row>
        </el-dialog>
    </el-col>
</template>

<script lang="ts">
    import api from '../../api';
    import Vue from "vue";
    import {User} from '@/model';
    import Component from "vue-class-component"

    interface Form {
        userName: string,
        chineseName: string,
        password: string,
        isAdmin: boolean
    }

    @Component
    export default class MyUser extends Vue {
        // data
        private UserList: Array<User> = [];
        private loading: boolean = true;
        private dialogVisible: boolean = false;
        private user_id: string = '';
        private currentPage: number = 1;
        private pageSize: number = 8;
        private itemTotal: number = 0;
        private form: Form = {
            userName: '',
            chineseName: '',
            password: '',
            isAdmin: false
        };

        // methods

        private addUser(): void {
            const new_user: User = {
                'chineseName': this.form.chineseName,
                'isAdmin': this.form.isAdmin === true ? 1 : 0,
                'userName': this.form.userName,
                'password': this.form.password
            };
            api.addUser(new_user).then((data: any) => {
                // console.log(data);
                this.dialogVisible = false;
                this.getAllUser()
            })
        }

        private gotoUser(): void {
            api.getUser(this.user_id).then((data: any) => {
                // console.log(data)
                this.UserList.splice(0);
                this.UserList.push(data);
                this.itemTotal = this.UserList.length;
                this.currentPage = 1;
                // if (this.UserList.length === 0) {
                // console.log('用户不存在');
                // }
            })
        }

        private current_change(currentPage: number): void {
            this.currentPage = currentPage
        }

        private getAllUser(): void {
            api.getUser().then((data: any) => {
                // console.log(res)
                this.UserList = data;
                this.itemTotal = data.length;
                this.loading = false;
            })
        }

        // created
        private created(): void {
            this.getAllUser()
        }

        //beforeCreate
        private beforeCreate(): void {
            if (!this.$store.state.isLogin) {
                this.$router.replace('/login')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .col-title {
        text-align: left;
        margin-bottom: 10px;
    }

    .title {
        font-size: 14px;
        font-weight: bolder;
    }
</style>
