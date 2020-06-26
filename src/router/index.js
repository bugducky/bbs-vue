import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Test from '../components/Test.vue'
import Article from '../components/Article.vue'
import PostArticle from '../components/PostArticle.vue'
import Backstage from '../components/Backstage.vue'


Vue.use(Router)

export default new Router({
  base:'/BBS',
  mode:"history",
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/article/:forArticleID',
      name: 'Article',
      component: Article
    },
    {
      path: '/post',
      name: 'PostArticle',
      component: PostArticle
    },
    {
      path: '/backstage',
      name: 'Backstage',
      component: Backstage
    },
  ]
})
