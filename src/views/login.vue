<template>
  <body id="login-page">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      class="login-container"
      label-position="left"
      label-width="0px"
      @keyup.enter.native="login"
    >
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="loginName">
      <el-input
        type="text"
        v-model="loginForm.loginName"
        auto-complete="off"
        placeholder="账号"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="密码"
      ></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button
        type="primary"
        style="width: 100%; border: none"
        @click="login"
      >登录
      </el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
import Cookies from "js-cookie";
import {login} from '@/api/user.js'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginName: "",
        password: "",
      },
      rules: {
        loginName: [
          {required: true, message: "请输入账号", trigger: "blur"},
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;

        login({
          username: this.loginForm.loginName,
          password: this.loginForm.password,
        }).then((successResponse) => {
          if (successResponse.code === 1) {
            const data = successResponse.data;
            Cookies.set("token", data.token);
            this.$store.commit('SET_TOKEN', data.token);
            this.$store.commit('SET_USER', data.user);
            const path = this.$route.query.redirect;
            this.$router.replace({path: path === '/' || path === undefined ? '/' : path});
          } else {
            this.$message.error(successResponse.msg || '登录失败，请检查用户名和密码');
          }
        });
      });
    },
  },
};
</script>

<style scoped>
#login-page {
  background: url("../assets/logo.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>


