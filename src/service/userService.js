import cookie from 'react-cookies'

//设置cookie，第三个参数的意思是所有页面都能用这个cookie

// 加载名为cookieName的cookie信息
// cookie.load(cookieName)
// // 删除名为cookieName的cookie信息
// cookie.remove(cookieName)
import { RoleName, GET_ALL_USER_URL, USER_INFO } from 'src/settings'
// export const getAllUser = (setUsers) => {
//   return fetch(GET_ALL_USER_URL, {
//       method: 'GET', 
//     //   headers: new Headers({
//     //       'token': cookie.load("userInfo").token
//     //   })
//       });
// }

export const getAllUser = async () => {
  try {
    let response = await fetch(`${GET_ALL_USER_URL}?limit=1999`);
    return await response.json()
  } catch (error) {
    console.log('Request Failed', error);
  }
}

export const getUserInfo = async () => {
  try {
    let response = await fetch(USER_INFO)
    return await response.json()
  } catch (error) {
    console.log('Request Failed', error);
  }
}
