// export const RoleName = ["系统管理员","讨论班管理员","Lab管理员",
// "推荐论文管理员","培养方案管理员","通知管理员","普通用户"];
export const RoleName = {
  0: "普通用户",
  10: "系统管理员",
  20: "讨论班管理员",
  30: "Lab管理员",
  40: "推荐论文管理员",
  50: "培养方案管理员",
  60: "通知管理员",
};

//分别对应的roleID是0123456
//本地开发环境
// export const BASE_URL = 'http://localhost:8080';
//部署开发环境
// export const BASE_URL ='http://10.176.36.7:8088';
// 解决跨域问题临时使用
export const BASE_URL = "http://fd.foxbank.cn";

//登录、用户管理
export const USER_INFO = BASE_URL + "/user/info";
export const LOGIN_URL = BASE_URL + "/user/login";
export const RESET_PASSWORD_URL = BASE_URL + "/user/reset";
export const ADD_USER_URL = BASE_URL + "/user/add";
export const UPDATE_USER_URL = BASE_URL + "/user/update";
export const DELETE_USER_URL = BASE_URL + "/user/delete";
export const GET_ALL_USER_URL = BASE_URL + "/user/paging";
export const GET_USER_DETAIL = BASE_URL + "/user/detail";

//会议安排
export const ADD_SEMINAR_URL = BASE_URL + "/seminar/add";
export const UPDATE_SEMINAR_URL = BASE_URL + "/seminar/update";
export const DELETE_SEMINAR_URL = BASE_URL + "/seminar/delete";
export const GET_ALL_SEMINAR_URL = BASE_URL + "/seminar/paging";
export const ADD_SEMINAR_LINK_URL = BASE_URL + "/seminar/addlink";

//辅读安排
export const ADD_RECORDER_URL = BASE_URL + "/recorder/add";
export const GET_ALL_RECORDER_URL = BASE_URL + "/recorder/paging";
export const DELETE_RECORDER_URL = BASE_URL + "/recorder/delete";

export const UPLOAD_RECORDER_URL = BASE_URL + "/recorder/upload";

export const UPLOAD_RECORDER1_URL = BASE_URL + "/recorder/uploadRecorder1";
export const UPLOAD_RECORDER2_URL = BASE_URL + "/recorder/uploadRecorder2";
export const UPLOAD_SUMMARY_URL = BASE_URL + "/recorder/uploadSummary";
export const DOWNLOAD_RECORDER1_URL = BASE_URL + "/recorder/downloadRecorder1";
export const DOWNLOAD_RECORDER2_URL = BASE_URL + "/recorder/downloadRecorder2";
export const DOWNLOAD_SUMMARY_URL = BASE_URL + "/recorder/downloadSummary";

//推荐论文+培养方案
export const GET_ALL_CLASS_URL = BASE_URL + "/class/paging";
export const ADD_CLASS_URL = BASE_URL + "/class/add";
export const DELETE_CLASS_URL = BASE_URL + "/class/delete";

export const GET_ARTICLE_URL = BASE_URL + "/article";
export const ADD_ARTICLE_URL = BASE_URL + "/article/add";
export const EDIT_ARTICLE_URL = BASE_URL + "/article/edit";
export const DELETE_ARTICLE_URL = BASE_URL + "/article/delete";

//通告管理
export const ADD_BULLETIN_URL = BASE_URL + "/bulletin/add";
export const GET_ALL_BULLETIN_URL = BASE_URL + "/bulletin/paging";
export const GET_NEW_BULLETIN_NUMBER_URL =
  BASE_URL + "/bulletin/newBulletinNumber";
export const MARK_AS_READ_URL = BASE_URL + "/bulletin/markAsRead";

//设备管理
export const ADD_DEVICE_URL = BASE_URL + "/device/add";
export const GET_ALL_DEVICE_URL = BASE_URL + "/device/paging";
export const DELETE_DEVICE_URL = BASE_URL + "/device/delete";
