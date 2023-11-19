<template>
    <div>

        <el-menu default-active="home" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b">
            <h3>{{ isCollapse ? '后台' : 'xxx后台管理系统' }}</h3>
            <el-menu-item :index="item.name" v-for="item in noChidren" :key="item.name" @click="handleClick(item)">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu :index="item.label" v-for="item in hasChidren" :key="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="item in item.children">

                    <el-menu-item :index="item.path" @click="handleClick(item)"><i :class="`el-icon-${item.icon}`"></i>
                    {{ item.label }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
// const menu = require('../assets/menu.js');
import menu from '../assets/menu.js';
export default {
    data() {
        return {
            menu,
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClick(item) {
            this.$router.push(item.path);
            this.$store.commit('selectMenu',item)
            
        }

    },
    computed: {
        //计算属性
        //没有子菜单
        noChidren() {
            return this.menu.filter(item => !item.children)
        },
        //有子菜单
        hasChidren() {
            return this.menu.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse;
        }
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 400px;
}

.el-menu {
    border-right: none;
    height: 100vh;

    h3 {
        color: aliceblue;
        text-align: left;
        font-size: 16px;
        line-height: 48px;
        padding-left: 20px;
    }
}
</style>