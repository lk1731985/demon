<template>
  <div class="page-container">
    <div class="wrap">
      <div class="left-box">
        <img src="../assets/55.jpg" alt="" />
      </div>

      <el-card class="logon-box">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          size="large"
        >
          <h2>登录</h2>
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item class="content">
            <el-button type="primary" @click="onSubmit" style="width: 100%"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import Mock from "mockjs";
import cookie from "js-cookie";
import { getMenu } from "@/api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //登录
    onSubmit() {
      //校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then((res) => {
            //账号密码正确
            if (res.data.code === 200) {
              // console.log(res);
              //token存入cookie，用于不同页面的通信
              let seconds = 60*60*2;
              let expires = new Date(new Date() * 1 + seconds * 1000);//2小时失效
              cookie.set("token", res.data.token,{ expires: expires });
              // cookie.set("token", res.data.token);
              //store存入menu
              this.$store.commit("setMenu", res.data.menu);
              // console.log(this.$store.state.menu)

              //动态注册路由
              this.$store.commit("addMenu", this.$router);

              //跳转到首页
              this.$router.push("/home");
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          });
        }
      });

      //跳转到首页
      // this.$router.push("/home");
    },
  },
  mounted() {
    //获取菜单
  },
};
</script>
<style lang="less" scoped>
.page-container {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url("../assets/33.gif") no-repeat;
  background-size: 100% 100%;
  .wrap {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    height: 580px;
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
    position: absolute;
    top: 50%;
    margin-top: -290px;
    left: 50%;
    margin-left: -500px;
    .left-box {
      width: 50%;
      float: left;
      height: 100%;
      img {
        width: auto;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .logon-box {
      width: 50%;
      height: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      /deep/.content {
        margin: 0px;
      }
    }
  }
}
</style>
