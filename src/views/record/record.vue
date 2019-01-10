<template>
    <el-col type="flex">
        <el-row type="flex"
                style="border-bottom: 1px solid #d0d0d0 ;padding-bottom: 20px;margin-bottom: 20px"
                justify="start"
        >
            <el-row :span="4"
                    type="flex"
            >
                <el-input v-model="record_id" type="number" placeholder="请输入记录id"/>
            </el-row>
            <el-row type="flex"
                    style="margin-right: 20px"
            >
                <el-button type="primary"
                           icon="el-icon-search"
                           @click="gotoRecord()">
                    搜索
                </el-button>
            </el-row>
            <el-row type="flex">
                <el-button @click="dialogVisible = true"
                           icon="el-icon-plus"
                           type="success"
                           v-if="$store.state.myself.isAdmin"
                >添加记录
                </el-button>
            </el-row>
        </el-row>
        <el-row type="flex">
            <el-table v-loading="loading"
                      style="width: 800px;min-height: 426px;"
                      stripe
                      :data="RecordList.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
                <el-table-column prop="id" label="id" width="60"/>
                <el-table-column prop="endBalance" label="当前余额（元）" width="120"/>
                <el-table-column prop="changeValue" label="消费金额（元）" width="120"/>
                <el-table-column prop="changeReason" label="消费原因"/>
                <el-table-column prop="addTime" label="消费时间" width="360"/>
            </el-table>
        </el-row>
        <el-row type="flex"
                justify="center"
                align="middle"
                style="margin:20px"
        >
            <el-pagination background
                           :page-size="pageSize"
                           layout="prev, pager, next"
                           :total="itemTotal"
                           @current-change="current_change"/>
        </el-row>
        <!--弹出对话框-->
        <el-dialog :visible.sync="dialogVisible"
                   style="max-width: 800px;padding:10px 20px;margin: 0 auto"
                   :modal-append-to-body="false"
                   :append-to-body="true">
            <el-row slot="title" type="flex" justify="center" align="middle">
                <el-col :span="5">添加记录</el-col>
            </el-row>
            <el-form :model="form" label-position="left" label-width="80px">
                <el-row type="flex"
                        justify="start"
                        align="middle"
                >
                    <el-form-item prop="changeValue" label="消费金额:">
                        <el-input type="number"
                                  v-model="form.changeValue"
                                  aria-placeholder="单位为元"
                        />
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-form-item prop="changeReason" label="消费原因:">
                        <el-input type="textarea"
                                  autosize
                                  v-model="form.changeReason"
                        />
                    </el-form-item>
                </el-row>
            </el-form>
            <el-row type="flex" justify="end">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addRecord()">保存</el-button>
            </el-row>
        </el-dialog>
    </el-col>
</template>

<script lang="ts">
    import api from '../../api';
    import Vue from 'vue';
    import {Record} from '@/model';
    import Component from "vue-class-component"

    interface Form {
        changeValue?: any,
        changeReason?: any,
    }

    @Component
    export default class MyRecord extends Vue {
        // data
        private RecordList: Array<Record> = [];
        private loading: boolean = true;
        private dialogVisible: boolean = false;
        private currentPage: number = 1;
        private pageSize: number = 8;
        private record_id: string = '';
        private itemTotal: number = 0;
        private form: Form = {
            changeValue: 0,
            changeReason: '',
        };

        // methods
        private addRecord(): void {
            const record: Record = {
                'changeValue': this.form.changeValue,
                'changeReason': this.form.changeReason
            };
            api.addRecord(record).then((data: any) => {
                this.dialogVisible = false;
                this.getAllRecord();
            });
        }

        private gotoRecord(): void {
            api.getRecord(this.record_id).then((data: any) => {
                this.RecordList = [];
                this.RecordList.push(data);
                this.itemTotal = this.RecordList.length;
                this.currentPage = 1;
                if (this.RecordList.length === 0) {
                    console.log('消费记录不存在');
                }
            })
        }

        private current_change(currentPage: number): void {
            this.currentPage = currentPage;
        }

        private getAllRecord(): void {
            api.getRecord().then((data: any) => {
                // console.log(data)
                this.RecordList = data;
                this.itemTotal = data.length;
                this.loading = false
            })
        }

        // created
        private created(): void {
            this.getAllRecord();

        }

        //beforeCreate
        private beforeCreate(): void {
            if (!this.$store.state.isLogin) {
                this.$router.replace('/login')
            }
        }

    };
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
