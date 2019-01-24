import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'api'
axios.defaults.withCredentials = true

function get (api) {
  return body => axios.get(api, {params: body})
}

function post (api) {
  return body => axios.post(api, qs.stringify(body))
}

export const HomeApi = {
  GetUserInfo: get('/Members/GetUserInfo'),
  GetMyPopularity: post('/Event/GetMyPopularity'),
  SaveView: get('/ViewTemplate/SaveView')
}
