import {Redirect} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashoardLayout'
import LoginView from './views/LoginView';
import NotFoundView from './views/NotFoundView';
import SeminarView from './views/seminar/SeminarView';
import RecorderView from './views/recorder/RecorderView';
import UserManagementView from './views/userManagemet/UserManagementView';
import EssayRecommendationView from './views/essayRecommendation/EssayRecommendationView';
import ArticleView from './views/ArticleView';
import ArticleEditView from './views/ArticleEditView'
import TrainingSchemeView from './views/trainingScheme/TrainingSchemeView';
import BulletinManagementView from './views/bulletin/BulletinManagementView';
import BulletinListView from './views/bulletin/BulletinListView';
import DeviceManagementView from './views/deviceManagement/DeviceManagementView';
       
const routes = [
  {
    path: '/app',
    component: DashboardLayout,
    auth:true,
    routes: [
      { path: '/app/article/:id',  component:ArticleView },//查看文章
      { path: '/app/articleEdit/:id',  component:ArticleEditView},//编辑文章
      { path: '/app/seminar',  component:SeminarView }, //演讲安排
      { path: '/app/recorder',  component:RecorderView},//辅读安排
      { path: '/app/userManagement',  component: UserManagementView },//用户管理
      { path: '/app/essayRecommendation',  component: EssayRecommendationView },//推荐论文
      { path: '/app/trainingScheme',  component:TrainingSchemeView},//培养方案
      { path: '/app/bulletinManagement',  component:BulletinManagementView},// 通告管理
      { path: '/app/bulletinList', component:BulletinListView},//通知列表
      { path: '/app/device',  component:DeviceManagementView}, //IT资源管理
      { path: '*', component: NotFoundView }
    ]
  },
  {
  path:'/',
  component: MainLayout,
  routes:[
      {path:'/login', component:LoginView},
      {path: '/404',  component: NotFoundView},
      {path: '/*', component: LoginView },
      
  ]
}
]

export default routes;