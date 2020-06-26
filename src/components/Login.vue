<template>
  <div>
    <el-dialog title="用户登陆" :visible.sync="$store.state.loginDialogVisible" width="30%" center>
      <el-form :model="login_form" :rules="rules" ref="login_form" label-position="left">
        <el-form-item label="账号" :label-width="formLabelWidth" prop="u_name">
          <el-input
            v-model="login_form.u_name"
            placeholder="请输入用户名"
            autocomplete="off"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="u_passwd">
          <el-input v-model="login_form.u_passwd" placeholder="请输入密码" size="large" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-dialog
        center
        width="30%"
        title="提示："
        :visible.sync="login_innerVisible"
        append-to-body
        @closed="backToHome"
      >{{ login_msg }}</el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('login_form')">登陆</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      login_form: {
        u_name: "",
        u_passwd: ""
      },
      login_innerVisible: false,
      login_msg: "",
      formLabelWidth: "80px",
      rules: {
        u_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 16, message: "长度小于16个字符", trigger: "blur" }
        ],
        u_passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 16, message: "长度小于16个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.user_login();
        }
      });
    },
    user_login() {
      var that = this;
      this.axios
        .post("http://localhost:8086/user/login", {
          u_name: this.login_form.u_name,
          u_passwd: this.login_form.u_passwd
        })
        .then(res => {
          var limit = res.data;
          if (res.data != 'no') {
            that.login_msg = "登陆成功！正在跳转...";
            that.$cookies.set(
              "user_info",
              that.login_form.u_passwd + "+" + that.login_form.u_passwd + "+" + limit
            );
            clearTimeout(that.timer);
            that.timer = setTimeout(() => {
              that.$router.go(0);
            }, 1000);
          } else {
            that.login_msg = "登陆失败，请检查用户名和密码！";
          }
          that.login_innerVisible = true;
        });
    },
    backToHome() {
      this.$router.go("/");
    }
  }
};
</script>