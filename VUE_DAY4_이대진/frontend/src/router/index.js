import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import Post from '../views/Post'
import List from '../views/List'
import Detail from '../views/Detail'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/post',
    name: 'Post',
    component: Post
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
