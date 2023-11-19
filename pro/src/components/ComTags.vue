<template>
    <div>
        <el-tag :key="tag.name" v-for="(tag, index) in dynamicTags" closable size="small"
            :closable="tag.name == 'home' ? false : true" :effect="$route.name == tag.name ? 'dark' : 'light'"
            @close="handleClose(tag, index)" @click="handleClick(tag)">
            {{ tag.label }}
        </el-tag>


    </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {

        };
    },
    methods: {
        ...mapMutations(['deleteMenu']),
        handleClose(tag, index) {
            //调用store中的mountions方法
            // this.$store.commit('deleteMenu',tag);
            this.deleteMenu(tag)
            const len = this.dynamicTags.length;
       
        
            if (tag.name !== this.$route.name) {
                return
            }
            //如果删除的是最后一个
            if (index === len) {
                this.$router.push({
                    name: this.dynamicTags[index-1].name
                })
            } else {
                this.$router.push({
                    name: this.dynamicTags[index].name
                })
            }

        },
        handleClick(tag) {
            // this.$router.push(tag.path);
            this.$router.push({
                name: tag.name
            })

        }

    },
    computed: {
        ...mapState({
            dynamicTags: state => state.tab.tabsList
        })
    }
}
</script>

<style>
.el-tag{
    margin-left: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}
</style>