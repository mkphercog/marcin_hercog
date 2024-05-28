import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { HomeView, EditView, NotFoundView } from './views'

export enum RouteNamesEnum {
  HOME = 'home',
  EDIT_MODE = 'editMode',
  NOT_FOUND = 'notFound'
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
  },
  {
    name: RouteNamesEnum.NOT_FOUND,
    path: '/:pathMatch(.*)*',
    component: NotFoundView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
