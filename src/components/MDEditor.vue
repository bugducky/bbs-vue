<template>
  <div>
    <div style="margin: 20px auto">
      <span>标题</span>
      <el-input v-model="article.a_name" placeholder="请输入标题" style="width: 400px"></el-input>
      <el-button type="primary" @click="submit" style="margin-left: 40px">
        <i class="el-icon-check"></i> 提交
      </el-button>
      <el-button type="primary" @click="clear">
        <i class="el-icon-delete"></i> 清空
      </el-button>
    </div>

    <el-select v-model="article.a_sort_id" placeholder="请选择板块">
      <el-option
        v-for="item in options"
        :key="item.sort_name"
        :label="item.sort_name"
        :value="item.sort_id"
      ></el-option>
    </el-select>

    <div class="container">
      <mavon-editor
        v-model="article.a_content"
        ref="md"
        @change="change"
        style="min-height: 600px"
      />
    </div>
  </div>
</template>


<script>

import uuidv1 from 'uuid/v1';

export default {
  components: {

  },
  computed: {
    uuid() {
      return uuidv1();
    }
  },
  data() {
    return {
      options: [],
      value: "",
      html: "",
      title: "",
      article: {
        a_id:"",
        a_name: "",
        a_author: "",
        a_time: "",
        a_content: "",
        a_sort_id: ""
      }
    };
  },
  created() {
    this.axios.get("http://localhost:8086/sort/getall").then(res => {
      this.options = res.data;
    });
  },
  methods: {
    clear() {
      this.article.a_content = "";
    },
    getUserFromCookie: function() {
      var str = this.$cookies.get("user_info");
      if (str != null) {
        str = str.split("+");
        str = str[0];
        return str;
      } else {
        return null;
      }
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    submit() {
      if (this.getUserFromCookie() == "" || this.getUserFromCookie() == null) {
        alert("请先登陆！");
        return;
      }
      this.article.a_id = uuidv1();
      var that = this;
      this.axios
        .post("http://localhost:8086/article/post", {
          a_id: that.article.a_id,
          a_name: that.article.a_name,
          a_author: that.getUserFromCookie(),
          a_content: that.article.a_content,
          a_sort_id: that.article.a_sort_id
        })
        .then(res => {
          clearTimeout(that.timer);
          that.timer = setTimeout(() => {
            that.$router.push("/article/" + that.article.a_id);
          }, 1000);
        });
    }
  },
  mounted() {}
};
</script>
