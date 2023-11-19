<template>
    <div class="content">
        <div class="l-content">
            <el-button icon="el-icon-menu" size="small" @click="handleisCollapse"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb  style="padding-left: 20px;">
                <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
                
                
            </el-breadcrumb>
        </div>
        <div class="r-content">

            <el-dropdown>
                <span class="el-dropdown-link">
                    <img src="../assets/user.jpg" alt="" class="u-img">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {

        };
    },
    methods: {
        handleisCollapse() {
            this.$store.commit('collapseMenu');
        }
    },
    computed: {
       ...mapState({
            tags: state => state.tab.tabsList
        })
    }
    
}
</script>

<style lang="less" scoped>
.content {
    background-color: #99A9BF;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .text {
        color: aliceblue;
        font-size: 14px;
        margin-left: 10px;
    }
    .l-content{
        display: flex;
        align-items: center;
        /deep/.el-breadcrumb__item{
            font-weight: normal;
            .el-breadcrumb__inner {
                &.is-link{
                        color: #666;
                }
            }
            &:last-child{
                .el-breadcrumb__inner {
                color: #ffffff;
                }
            }
        }
    }


    .r-content {

        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;

            .u-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }

    }
}
</style>