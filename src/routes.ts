import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { HomeView, EditView } from './views'

export enum RouteNamesEnum {
  HOME = 'home',
  EDIT_MODE = 'editMode'
}

const routes: RouteRecordRaw[] = [
  {
    name: RouteNamesEnum.HOME,
    path: '/',
    component: HomeView
  },
  {
    name: RouteNamesEnum.EDIT_MODE,
    path: '/edit',
    component: EditView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
