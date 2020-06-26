
<template>
  <div>
    <h1>{{$route.params.forArticleID}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: ""
    };
  },
  computed: {
    articleID() {
      return this.$route.params.forArticleID;
    }
  },
  created() {
    var that = this;
    this.axios.get("http://localhost:8086/articles/getArticle/"+ that.articleID)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err); 
    });
  },
  methods: {}
};
</script>