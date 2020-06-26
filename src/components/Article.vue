<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <el-button type="danger" @click="goBack">返回</el-button>
          <el-divider direction="vertical"></el-divider>
          <span>详情页面</span>
        </div>
      </el-header>
      <el-main>
        <div>
          <div>
            <h1>{{article.a_name}}</h1>
            <p>作者：{{article.a_author}} 发帖时间：{{article.a_time}} 评论数:{{article.a_comment_num}}</p>
            <el-button type="primary" @click="dialogVisible=true">发表评论</el-button>
          </div>
        </div>
        <el-divider></el-divider>
        <div>
          <mavon-editor
            v-model="content"
            :editable="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :scrollStyle="true"
            :subfield="false"
            ref="md"
            style="min-height: auto"
          />
        </div>
        <el-divider></el-divider>

        <h4>网友评论：</h4>
        <div v-for="item in comments" :key="item.comment_id">
          {{item.comment_user}}:{{item.comment_text}}
        </div>

        <div>
          <el-dialog title="发表评论" :visible.sync="dialogVisible" width="30%">
            <div>
              <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea"></el-input>
            </div>
            <span slot="footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="postComment">确 定</el-button>
            </span>
          </el-dialog>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import uuidv1 from "uuid/v1";

export default {
  components: {
    mavonEditor
  },
  data() {
    return {
      article: {},
      html: "",
      content: "",
      textarea: "",
      dialogVisible: false,
      comment: {},
      comments: []
    };
  },
  created() {
    var that = this;
    this.axios
      .get(
        "http://localhost:8086/articles/getArticle/" +
          that.$route.params.forArticleID
      )
      .then(res => {
        that.article = res.data;
        that.content = res.data.a_content;
        that.getComments();
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    getComments() {
      var that = this;
      this.axios
        .post("http://localhost:8086/comment/getComment", {
          comment_a_id: that.article.a_id
        })
        .then(res => {
          this.comments = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    postComment() {
      this.dialogVisible = false;
      this.comment.comment_id = uuidv1();
      this.comment.comment_a_id = this.article.a_id;
      this.comment.comment_text = this.textarea;
      this.comment.comment_date = "";
      this.comment.comment_user = this.getUserFromCookie();
      var that = this;
      this.axios
        .post("http://localhost:8086/comment/submit", {
          comment_id: that.comment.comment_id,
          comment_a_id: that.comment.comment_a_id,
          comment_text: that.comment.comment_text,
          comment_date: that.comment.comment_date,
          comment_user: that.comment.comment_user
        })
        .then(res => {
          that.$router.go(0);
        });
    },
    getUserFromCookie() {
      var str = this.$cookies.get("user_info");
      if (str != null) {
        str = str.split("+");
        str = str[0];
        return str;
      } else {
        return null;
      }
    }
  }
};
</script>

<style>
.my-border {
  border: 1px solid #b3c0d1;
  border-radius: 2px;
}
</style>

