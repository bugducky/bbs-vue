<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <h1 @click="goHome">论坛</h1>
      </el-col>
      <el-col :span="12" class="loginbutton" v-if="!hasCookie">
        <el-button type="primary" @click="openRegister">注册</el-button>
        <el-button type="primary" @click="openLogin">登陆</el-button>
        <Login></Login>
        <Register></Register>
      </el-col>
      <el-col :span="12" class="welcome-info" v-if="hasCookie">
        <span>
          欢迎您，<el-link type="primary">{{ getUserFromCookie }}</el-link>！
          <el-button type="info" v-if="getUserLimit=='admin'" @click="goBackstage">后台管理</el-button>
          <el-button type="danger" @click="logout">退出登陆</el-button>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Register from "./Register";
import Login from "./Login";

export default {
  computed: {
    getUserFromCookie: function() {
      var str = this.$cookies.get("user_info");
      str = str.split("+");
      str = str[0];
      return str;
    },
    hasCookie: function() {
      return this.$cookies.get("user_info") != null;
    },
    getUserLimit() {
      var str = this.$cookies.get("user_info").split("+");
      return str[2];
    }
  },
  components: {
    Register,
    Login
  },
  data: function() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    openRegister() {
      this.$store.commit("openRegisterDialog");
    },
    openLogin() {
      this.$store.commit("openLoginDialog");
    },
    logout() {
      this.$cookies.remove("user_info");
      this.$router.go("/");
    },
    goBackstage() {
      this.$router.push("/backstage")
    }
  }
};
</script>

<style>
.welcome-info {
  text-align: center;
}
</style>