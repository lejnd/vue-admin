<template lang="html">
    <div class="wrapper">
        <gz-header :title="title" :userInfo="userInfo" @signOut="logout"></gz-header>
        <div class="sidebar">
            <gz-sidebar :menus="menus"></gz-sidebar>
        </div>
        <div class="main">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="item in breadcrumbs" :to="{ path: item.to }">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Breadcrumb } from 'element-ui';
import Header from '../components/biz/header';
import Sidebar from '../components/biz/sidebar';

export default {
    data() {
        return {
            title: '管理系统',
        };
    },
    components: {
        [Header.name]: Header,
        [Sidebar.name]: Sidebar,
        [Breadcrumb.name]: Breadcrumb,
    },
    computed: {
        ...mapGetters([
            'token',
            'userDisplayName',
            'breadcrumbs',
            'authorities',
            'menus',
        ]),
        userInfo() {
            return {
                userDisplayName: this.userDisplayName,
            };
        },
    },
    methods: {
        ...mapActions([
            'getAuthorities',
            'signOut',
            'setBreadcrumbs',
        ]),
        logout() {
            this.signOut()
            .then(() => {
                this.$router.replace('/login');
            });
        },
    },
    mounted() {
        if (this.token) {
            this.getAuthorities();
        }
    },
};
</script>

<style lang="less">
html, body {
     height: 100%;
     font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB","Microsoft Yahei",sans-serif;
}
.wrapper {
    min-height: 100%;
    position: relative;
}
.el-breadcrumb {
    padding: 20px 10px;
}
.page-content {
    padding: 20px;
}
.pagination-bar {
    margin-top: 20px;
    text-align: center;
}
a {
    text-decoration: none;
    color: inherit
}
.sidebar{
    width: 260px;
    position: absolute;
    top:70px;
    left:0px;
    bottom:0px;
    background-color:#eff2f7;
}
.main {
    margin-left: 260px;
    padding: 0 5px 5px 5px;
}
.date-separator .el-form-item__label {
    text-align: center;
}
</style>
