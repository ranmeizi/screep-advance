import axios from './axios'

namespace API {
    export type UploadProps = {
        branch: string
        modules: Record<string, string>
    }
}

export function upload(data: API.UploadProps) {
    return axios.post('/api/user/code', data)
}
