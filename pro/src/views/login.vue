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
          <el-form-item class='content'> 
            <el-button type="primary" @click="onSubmit" style="width: 100%;">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/index";
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
      if (this.form.username == "admin" && this.form.password == "123456") {
        this.$router.push("/home");
      } else {
        this.$message({
          message: "用户名或密码错误",
          type: "error",
        });
      }
    },
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
      /deep/.content{
        margin:0px
      }
    }
  }
}
</style>
