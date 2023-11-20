<template>
  <div class="content">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="small"
        @click="handleisCollapse"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb style="padding-left: 20px">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.name"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../assets/user.jpg" alt="" class="u-img" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userhome">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import jsCookie from "js-cookie";
import { mapState } from "vuex";
import cookie from "js-cookie";
export default {
  data() {
    return {};
  },
  methods: {
    handleisCollapse() {
      this.$store.commit("collapseMenu");
    },
    handleCommand(command) {
      //如果是退出
      if (command == "logout") {
        //清除cookie
        cookie.remove("token");
        //清除menu
        cookie.remove("menu");
        this.$router.push("/login");
      }
      if (command == "userhome") {
        this.$router.push("/user");
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
.content {
  background-color: #99a9bf;
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
  .l-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
      font-weight: normal;
      .el-breadcrumb__inner {
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #ffffff;
        }
      }
    }
  }

  .r-content {
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;

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