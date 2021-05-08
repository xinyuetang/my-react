import {Redirect} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashoardLayout'
import LoginView from './views/LoginView';
import ResetPasswordView from "./views/ResetPasswordView";
import UpdateUserInfoView from "./views/updateUserInfo/UpdateUserInfoView";
import NotFoundView from './views/NotFoundView';
import SeminarView from './views/seminar/SeminarView';
import RecorderView from './views/recorder/RecorderView';
import UserManagementView from './views/userManagemet/UserManagementView';
import EssayRecommendationView from "./views/essayRecommendation/EssayRecommendationView";
import EssaysView from "./views/essayRecommendation/essays";
import ClassesView from "./views/essayRecommendation/classes";
import ArticleView from './views/ArticleView';
import ArticleEditView from './views/ArticleEditView'
import TrainingSchemeView from './views/trainingScheme/TrainingSchemeView';
import StudyPlanView from "./views/studyPlan";
import StudyPlanEditView from "./views/studyPlan/edit";
import StudyPlanDetailView from "./views/studyPlan/detail";
import BulletinManagementView from './views/bulletin/BulletinManagementView';
import BulletinListView from './views/bulletin/BulletinListView';
import DeviceView from './views/device/DeviceView';
       
const routes = [
  {
    path: "/main",
    component: MainLayout,
    routes: [
      { path: "/main/login", component: LoginView },
      { path: "/main/reset", component: ResetPasswordView },
    ],
  },
  {
    path: "/app",
    component: DashboardLayout,
    auth: true,
    routes: [
      { path: "/app/updateUserInfo/:id", component: UpdateUserInfoView }, //更新用户信息
      { path: "/app/article/:id", component: ArticleView }, //查看文章
      { path: "/app/articleEdit/:id", component: ArticleEditView }, //编辑文章
      { path: "/app/seminar", component: SeminarView }, //演讲安排
      { path: "/app/recorder", component: RecorderView }, //辅读安排
      { path: "/app/userManagement", component: UserManagementView }, //用户管理
      { path: "/app/essayRecommendation/essays", component: EssaysView }, //推荐论文列表
      {
        path: "/app/essayRecommendation/classes",
        component: ClassesView,
      }, //推荐论文分类
      { path: "/app/essayRecommendation", component: EssayRecommendationView }, //推荐论文
      { path: "/app/studyPlan/detail", component: StudyPlanDetailView }, //培养计划详情
      { path: "/app/studyPlan/edit/:id", component: StudyPlanEditView }, //编辑培养计划
      { path: "/app/studyPlan", component: StudyPlanView }, //培养计划列表
      { path: "/app/trainingScheme", component: TrainingSchemeView }, //培养方案
      { path: "/app/bulletinManagement", component: BulletinManagementView }, // 通告管理
      { path: "/app/bulletinList", component: BulletinListView }, //通知列表
      { path: "/app/device", component: DeviceView }, //IT资源管理
      { path: "*", component: NotFoundView },
    ],
  },
  {
    path: "/",
    component: MainLayout,
    routes: [
      { path: "/404", component: NotFoundView },
      { path: "/*", component: LoginView },
    ],
  },
];

export default routes;