<template>
  <div>
    <h4 style="margin-left: 10px">用户管理</h4>
    <el-table :data="userData" style="width: 100%" border>
      <el-table-column prop="u_name" label="用户名" width="120"></el-table-column>
      <el-table-column prop="u_passwd" label="密码" width="120"></el-table-column>
      <el-table-column prop="u_email" label="电子邮箱"></el-table-column>
      <el-table-column prop="u_limit" label="用户权限" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button slot="reference" size="mini" type="danger" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改用户权限" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input clearable :placeholder="form.u_name" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" :label-width="formLabelWidth">
          <el-select v-model="limitValue" @change="changeLimit" placeholder="请选择">
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
        formLabelWidth: "80px",
        form: {},
        limitValue: "",
        sorts: []
      };
    },
    created() {
      this.getUserData();
      this.getSortData();
    },
    methods: {
      changeLimit() {
        this.form.u_limit = this.limitValue;
      },
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
        const that = this;
        this.axios.post("http://localhost:8086/user/del",{
          u_name:row.u_name,
        })
      },
      submitUpdate() {
        const that = this;
        this.axios.post("http://localhost:8086/user/update", {
          u_name: that.form.u_name,
          u_passwd: that.form.u_passwd,
          u_email: that.form.u_email,
          u_limit: that.form.u_limit
        });
        this.$router.go(0);
      }
    }
  };
</script>
