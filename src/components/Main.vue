<template>
  <div>
    <el-button type="primary" @click="postArticle">发表新主题</el-button>
    <el-collapse v-model="activeName" accordion @change="getArticleFromSort">
      <el-collapse-item
        v-for="sort in sorts"
        :key="sort.sort_id"
        :title="sort.sort_name"
        :name="sort.sort_id"
      >
        <div>
          
          <el-table :data="articles" style="width: 100%">
            <el-table-column prop="a_time" label="日期" width="180"></el-table-column>
            <el-table-column prop="a_name" label="标题" width="auto"></el-table-column>
            <el-table-column prop="a_author" label="作者" width="100"></el-table-column>
            <el-table-column prop label="操作" width="auto">
              <template slot-scope="scope">
                <el-button type="primary" @click="goArticle(articles[scope.$index].a_id)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  created() {
    this.axios.get("http://localhost:8086/sort/getall").then(res => {
      this.sorts = res.data;
    });
  },
  data() {
    return {
      activeName: "",
      sorts: [],
      articles: [],
      forArticleID: "",
      goWhere: ""
    };
  },
  methods: {
    getArticleFromSort() {
      if (this.activeName != "") {
        var that = this;
        this.axios
          .get("http://localhost:8086/article/sortid/props/" + this.activeName)
          .then(res => {
            that.articles = res.data;
          });
      }
    },
    lookdetiles(value) {
      this.goWhere = "/article/" + value;
    },
    goArticle(value) {
      this.$router.push("/article/" + value);
    },
    postArticle() {
      this.$router.push("/post");
    }
  }
};
</script>