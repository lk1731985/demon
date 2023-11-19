<template>
    <div>
        <!--组件内容-->
        <el-container>
            <el-aside width="auto">
                <ComAside />
            </el-aside>
            <el-container>
                <el-header>
                    <ComHeader/>
                </el-header>
                <el-main>
                    <ComTags/>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import ComAside from '../components/ComAside.vue';
import ComHeader from  '../components/ComHeader.vue';
import ComTags from '@/components/ComTags.vue';
export default {
    data() {
        return {
            
        }
    },
    components: {
        ComAside,
        ComHeader,
        ComTags
    }
}



</script>

<style>
/*组件样式*/
.el-header {
    padding : 0;
}
</style>