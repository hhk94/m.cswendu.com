import request from '@/utils/request'
//获取首页banner
export function getHomeBanner(data) {
  return request({
    url: '/app/get_array_cover_img',
    method: 'post',
    data
  })
}

//获取热门老师
export function getHotTeacher(data) {
  return request({
    url: '/app/teacher_hot',
    method: 'post',
    data
  })
}
