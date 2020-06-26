<template>
  <div>
    <el-table :data="userData" style="width: 100%">
      <el-table-column prop="u_name" label="用户名" width="180"></el-table-column>
      <el-table-column prop="u_passwd" label="密码" width="180"></el-table-column>
      <el-table-column prop="u_email" label="电子邮箱"></el-table-column>
      <el-table-column prop="u_limit" label="用户权限"></el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {

  data() {
    return {
      userData: []
    };
  },
  watch: {},
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      this.axios
        .get("http://localhost:8086/user/getall")
        .then(res => {
          this.userData = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
