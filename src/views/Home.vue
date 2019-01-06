<template>
    <!--全局化最大屏幕-->
    <el-col style="min-width: 1200px" type="flex">
        <el-row class="header"
                :gutter="20"
                type="flex"
                justify="space-between"
                style="margin-bottom: 20px;padding:0 20px"
        >
            <el-col
                    :span="8"
                    type="flex"
                    justify="center"
                    align="middle"
                    style="font-weight: bold;"
            >
                宁波工程学院7号楼315
            </el-col>
            <el-col class="userinfo" type="flex">
                <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner">
                            {{$store.state.myself.chineseName}}
                            <img src="../assets/logo.png" alt=""/>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
        <el-row type="flex" justify="start" :gutter="20">
            <el-col type="flex"
                    style="max-width:260px;padding-left:20px;height:100%"
            >
                <el-menu
                        :router="true"
                        class="el-menu-vertical-demo"
                        :default-active="activeNav"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>寝室管理</span>
                        </template>
                        <el-menu-item index="user">寝室成员</el-menu-item>
                        <el-menu-item index="record">寝室费消费纪录</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>设置</span>
                        </template>
                        <!--<el-menu-item index="setting">高级设置</el-menu-item>-->
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col type="flex" style="max-width: 1000px">
                <transition name="fade"
                            mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </el-col>
        </el-row>
    </el-col>
</template>
<script lang="ts">

    import Vue from 'vue';
    import Component from "vue-class-component"


    @Component
    export default class MyHome extends Vue {
        private activeNav:string = "record";
        private name: string = "home";

        //methods
        private logout():void {
            this.$store.commit("loginStatus");
            this.$router.push("/login");
        }
        // created
        created():void{
            this.activeNav = this.$route.path.substr(1)
        }
    }
</script>
<style lang="scss">
    @import '../assets/scss/vars.scss';

    body {
        background: aliceblue;
    }

    .header {
        height: 60px;
        line-height: 60px;
        background: $color-primary;
        color: #fff;

        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;

            .userinfo-inner {
                cursor: pointer;
                color: #fff;

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0 10px 10px;
                    float: right;
                }
            }
        }

        .logo {
            //width:230px;
            height: 60px;
            font-size: 22px;
            padding-left: 20px;
            padding-right: 20px;
            border-color: rgba(238, 241, 146, 0.3);
            border-right-width: 1px;
            border-right-style: solid;

            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }

            .txt {
                color: #fff;
            }
        }

        .logo-width {
            width: 230px;
        }

        .logo-collapse-width {
            width: 60px
        }

        .tools {
            padding: 0 23px;
            width: 14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
</style>
