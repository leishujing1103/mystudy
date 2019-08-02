// axios封装

import Vue from 'vue'
import axios from 'axios'
const vue = new Vue()

// axios配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://localhost:3000'

// 返回状态判断 封装axios
axios.interceptors.response.use((res) => {
  if (res.data.code != 200) {
    // $toast和$hideLoading不是vue的api,是在别的地方把$toast挂载vue的原型链上定义的
    vue.$toast('网络异常')
    vue.$hideLoading()
    return Promise.reject(res)
  }
  return res
}, (error) => {
    vue.$toast('网络异常')
    vue.$hideLoading()
    return Promise.reject(error)
})

// 相当于axios.get
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    // 给接口传参一定要用param包裹
    axios.get(url, {
      params: param
    })
    .then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export default {
  // 用户登录
  Login(params) {
    return fetchGet('/login', params) //http://localhost:3000/login
  },
// 封装方法
  BannerList() {
    return fetchGet('/banner') //http://localhost:3000/banner
  },
  // 歌单
  DiscLists(params) {
    return fetchGet('/top/playlist', params) //http://localhost:3000/top/playlist
  },
  // 歌单详情
  SongList(params) {
    return fetchGet('/playlist/detail', params)
  },
  // 歌曲搜索
  MusicSearch (params) {
    return fetchGet('/search', params)
  },
  // 热门搜索
  HotSearchKey () {
    return fetchGet('/search/hot')
  },
  // 获取歌词
  MusicLyric (id) {
    return fetchGet('/lyric', {
      id
    })
  },
  MusicUrl (id) {
    return fetchGet('/song/url', {
      id
    })
  }
}