import serve from '@/utils/request'
import qs from 'qs'

export const getData = (url, params) => {
    return serve.get(url, { params })
}

export const postData = (url, params, isFile = false, onUploadProgress = () => { }) => {
    let data = null
    if (isFile) {
        data = new FormData()
        for (let key in params) {
            data.append(key, params[key])
        }
    } else {
        data = qs.stringify(params)
    }
    return serve({ method:"post", url, data, onUploadProgress })
}