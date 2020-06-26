
<template>
  <div>
    <Header></Header>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first" v-if="getUserLimit=='admin'">
          <UserManager></UserManager>
        </el-tab-pane>
        <el-tab-pane label="板块管理" name="second" v-if="getUserLimit=='admin'">
          <SortManager></SortManager>
        </el-tab-pane>
        <el-tab-pane label="主题管理" name="third">主题管理</el-tab-pane>
        <el-tab-pane label="回复管理" name="fourth">回复管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
import Header from "../Header";
import ArticleManager from "./ArticleManager";
import UserManager from "./UserManager";
import CommentManager from "./CommentManager";
import SortManager from "./SortManager";

export default {
  components: {
    Header,
    UserManager,
    CommentManager,
    SortManager,
    ArticleManager
  },
  computed: {
    getUserLimit() {
      var str = this.$cookies.get("user_info").split("+");
      return str[2];
    }
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
