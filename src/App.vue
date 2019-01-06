<template>
    <transition name="fade"
                mode="out-in">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </transition>
</template>
<script lang="ts">

    import Vue from 'vue';
    import Component from "vue-class-component"


    @Component
    export default class MyApp extends Vue {
        private name: string = "app";
    }
</script>
<style lang="scss">

    body {
        background: aliceblue;
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
