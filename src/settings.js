export const RoleName = {
  0: "普通用户",
  10: "系统管理员",
  20: "讨论班管理员",
  30: "Lab管理员",
  40: "推荐论文管理员",
  50: "培养方案管理员",
  60: "通知管理员",
};

//本地开发环境
// export const BASE_URL = 'http://localhost:8080';
//部署开发环境
// export const BASE_URL ='http://10.176.36.7:8088';
// 解决跨域问题临时使用
// export const BASE_URL = "http://fd.foxbank.cn";
export const BASE_URL = "http://fd.foxzz.cn";

/**
 * MNG_: 管理员
 * U_: 普通用户
 */

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

//推荐论文
export const GET_ALL_CLASS_URL = BASE_URL + "/article/category/list";
export const ADD_CLASS_URL = BASE_URL + "/article/category/add";
export const DELETE_CLASS_URL = BASE_URL + "/article/category/delete";

export const GET_ALL_ARTICLE_URL = BASE_URL + "/article/paging";
export const GET_ARTICLE_URL = BASE_URL + "/article/";
export const ADD_ARTICLE_URL = BASE_URL + "/article/add";
export const EDIT_ARTICLE_URL = BASE_URL + "/article/edit";
export const DELETE_ARTICLE_URL = BASE_URL + "/article/delete";

//培养计划 管理员
export const MNG_GET_ALL_PLAN_URL = BASE_URL + "/mng/study/plan/paging";
export const MNG_ADD_PLAN_URL = BASE_URL + "/mng/study/plan/add";
export const MNG_UPDATE_PLAN_URL = BASE_URL + "/mng/study/plan/update";
export const MNG_DELETE_PLAN_URL = BASE_URL + "/mng/study/plan/delete";
export const MNG_GET_PLAN_DETAIL_URL = BASE_URL + "/mng/study/plan/overview";
export const MNG_ADD_WORK_URL = BASE_URL + "/mng/study/plan/work/add";
export const MNG_UPDATE_WORK_URL = BASE_URL + "/mng/study/plan/work/update";
export const MNG_DELETE_WORK_URL = BASE_URL + "/mng/study/plan/work/delete";
export const MNG_ADD_STAGE_URL = BASE_URL + "/mng/study/plan/stage/add";
export const MNG_UPDATE_STAGE_URL = BASE_URL + "/mng/study/plan/stage/update";
export const MNG_DELETE_STAGE_URL = BASE_URL + "/mng/study/plan/stage/delete";
export const MNG_GET_ALLOCATION_URL =
  BASE_URL + "/mng/study/plan/allocation/info/list";
export const MNG_ASSGIN_STUDY = BASE_URL + "/mng/study/plan/assign";
export const MNG_DELETE_ALLOCATION = BASE_URL + "/mng/study/plan/allocation/delete";
// export const MNG_GET_ALLOCATION_INfO = BASE_URL + "/mng/study/plan/allocation/info";
export const MNG_GET_ALLOCATION_INfO =
  BASE_URL + "/mng/study/plan/allocation/overview";
export const MNG_EDIT_ALLOCATION= BASE_URL + "/mng/study/plan/allocation/edit";

//培养计划 普通用户
export const U_GET_ALL_PLAN_URL = BASE_URL + "/u/study/plan/allocation/list";
export const U_GET_PLAN_DETAIL_URL = BASE_URL + "/u/study/plan/allocation/overview";
export const U_EDIT_ALLOCATION = BASE_URL + "/u/study/plan/allocation/edit";

//通告管理
export const ADD_BULLETIN_URL = BASE_URL + "/bulletin/add";
export const GET_ALL_BULLETIN_URL = BASE_URL + "/bulletin/paging";
export const GET_NEW_BULLETIN_NUMBER_URL =
  BASE_URL + "/bulletin/newBulletinNumber";
export const MARK_AS_READ_URL = BASE_URL + "/bulletin/markAsRead";

//设备管理 
export const MNG_ADD_DEVICE_URL = BASE_URL + "/mng/device/add";
export const MNG_UPDATE_DEVICE_URL = BASE_URL + "/mng/device/update";
export const U_GET_ALL_DEVICE_URL = BASE_URL + "/u/device/paging";
export const MNG_GET_ALL_DEVICE_URL = BASE_URL + "/mng/device/paging";
export const MNG_DELETE_DEVICE_URL = BASE_URL + "/mng/device/delete";
export const U_APPLY_DEVICE_URL = BASE_URL + "/u/device/allocation/apply";
export const U_RETURN_DEVICE_URL = BASE_URL + "/u/device/allocation/return";
export const MNG_RETURN_DEVICE_URL = BASE_URL + "/mng/device/allocation/return";
export const U_DEVICE_USAGE_URL = BASE_URL + "/u/device/usage/paging";
export const MNG_DEVICE_USAGE_URL = BASE_URL + "/mng/device/usage/paging";
export const U_DEVICE_ALLOCATION_URL = BASE_URL + "/u/device/allocation/paging";
export const MNG_DEVICE_ALLOCATION_URL = BASE_URL + "/mng/device/allocation/paging";
