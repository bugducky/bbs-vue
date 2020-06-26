
<template>
  <div>
    <Header></Header>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first" v-if="getUserLimit=='admin'">
          <el-table :data="userData" style="width: 100%">
            <el-table-column prop="u_name" label="用户名" width="180"></el-table-column>
            <el-table-column prop="u_passwd" label="密码" width="180"></el-table-column>
            <el-table-column prop="u_email" label="电子邮箱"></el-table-column>
            <el-table-column prop="u_limit" label="用户权限"></el-table-column>
            <el-table-column label="操作">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="板块管理" name="second" v-if="getUserLimit=='admin'">板块管理</el-tab-pane>
        <el-tab-pane label="主题管理" name="third">主题管理</el-tab-pane>
        <el-tab-pane label="回复管理" name="fourth">回复管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
import Header from "./Header";

export default {
  components: {
    Header
  },
  computed: {
    getUserLimit() {
      var str = this.$cookies.get("user_info").split("+");
      return str[2];
    }
  },
  data() {
    return {
      activeName: "first",
      userData: []
    };
  },
  watch: {
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      this.axios.get('http://localhost:8086/user/getall')
      .then(res => {
        this.userData = res.data;
      })
      .catch(err => {
        console.error(err); 
      })
    },
    getArticleData() {

    },
    getSortData(){},
    getCommentData(){},
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
