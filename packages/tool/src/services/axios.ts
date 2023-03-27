import axios from 'axios'
import cfg from '../../../../cfg.json'

const instance = axios.create({
    baseURL:"https://screeps.com",
    headers: { 'X-Token': cfg.token }
})

export default instance