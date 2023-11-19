export default {
    state: {
        isCollapse: false, //控制菜单收起
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ]//面包屑数据
    },
    mutations: {
        //修改菜单收起状态
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
     
        //添加菜单
        selectMenu(state,val){
            
            //不是首页,并且不存在 增加内容
            if(val.name!=='home' ){
                if(state.tabsList.findIndex(item=>item.name===val.name)==-1){
                state.tabsList.push(val);
                }
            }
            
        },
           //删除菜单
           deleteMenu(state,val){
            let index=state.tabsList.findIndex(item=>item.name===val.name);
            state.tabsList.splice(index,1);
        },
    }
}