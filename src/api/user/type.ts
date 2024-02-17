//登陆接口
export interface loginForm {
  username: string
  password: string
}
export interface responseData {
  code: number
  ok: boolean
  message: string
}
export interface loginResponseData extends responseData {
  data: string
}
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  button: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

//服务器返回用户信息相关的数据类型
export interface userResponseData {
  code: number
  data: user
}
