<template>
  <div>
    <el-dialog title="用户注册" :visible.sync="$store.state.registerDialogVisible" width="30%" center>
      <el-form :model="register_form" label-position="left" :reles="rules" ref="register_form">
        <el-form-item label="账号" :label-width="formLabelWidth" prop="u_name">
          <el-input
            v-model="register_form.u_name"
            placeholder="请输入用户名"
            autocomplete="off"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="u_passwd">
          <el-input v-model="register_form.u_passwd" placeholder="请输入密码" size="large" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="u_email">
          <el-input v-model="register_form.u_email" placeholder="请输入电子邮箱" size="large"></el-input>
        </el-form-item>
      </el-form>
      <el-dialog
        center
        width="30%"
        title="提示："
        :visible.sync="register_innerVisible"
        append-to-body
      >{{ register_msg }}</el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('register_form')">注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      register_form: {
        u_name: "",
        u_passwd: "",
        u_email: ""
      },
      register_innerVisible: false,
      register_msg: "",
      formLabelWidth: "80px",
      rules: {
        u_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 16, message: "长度小于16个字符", trigger: "blur" }
        ],
        u_passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 16, message: "长度小于16个字符", trigger: "blur" }
        ],
        u_email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 1, max: 16, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.user_register();
        }
      });
    },
    user_register() {
      var that = this;
      this.axios
        .post("http://localhost:8086/user/register", {
          u_name: this.register_form.u_name,
          u_passwd: this.register_form.u_passwd,
          u_email: this.register_form.u_email
        })
        .then(res => {
          console.log(res.data);
          if (res.data) {
            that.register_msg = "注册成功！正在返回主页...";
            clearTimeout(that.timer);
            that.timer = setTimeout(() => {
              that.$router.go(0);
            }, 2000);
          } else {
            that.register_msg = "注册失败，换一个用户名试试！";
          }
          that.register_innerVisible = true;
        });
    }
  }
};
</script>