<template>
  <div>
    <el-table :data="userData" style="width: 100%">
      <el-table-column prop="u_name" label="用户名" width="180"></el-table-column>
      <el-table-column prop="u_passwd" label="密码" width="180"></el-table-column>
      <el-table-column prop="u_email" label="电子邮箱"></el-table-column>
      <el-table-column prop="u_limit" label="用户权限"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input clearable :placeholder="form.u_name" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form2.passwd" :placeholder="form.u_passwd" @input="change1"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth">
          <el-input v-model="form2.email" :placeholder="form.u_email" @input="change2"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" :label-width="formLabelWidth">
          <el-select v-model="form2.limit" @input="change3" :placeholder="form.u_limit">
            <el-option label="游客" value="look"></el-option>
            <el-option label="论坛管理员" value="admin"></el-option>
            <el-option
              v-for="sort in sorts"
              :key="sort.sort_id"
              :label="sort.sort_name+'-版主'"
              :value="sort.sort_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {},
      form2:{},
      sorts: []
    };
  },
  created() {
    this.getUserData();
    this.getSortData();
  },
  methods: {
    getSortData() {
      var that = this;
      this.axios.get("http://localhost:8086/sort/getall").then(res => {
        that.sorts = res.data;
      });
    },
    getUserData() {
      this.axios.get("http://localhost:8086/user/getall").then(res => {
        this.userData = res.data;
      });
    },

    handleEdit(index, row) {
      this.form.u_name = row.u_name;
      this.form.u_passwd = row.u_passwd;
      this.form.u_email = row.u_email;
      this.form.u_limit = row.u_limit;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    submitUpdate() {
      this.dialogFormVisible = false;
      this.axios.post("http://localhost:8086/user/update", {
        u_name: this.form.name,
        u_passwd: this.form.passwd,
        u_email: this.form.email,
        u_limit: this.form.limit
      });
      this.$router.go(0);
    }
  }
};
</script>
