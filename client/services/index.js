import APIService from './client/index'
import sessionService from './session.service'

export default {
    API : APIService,
    session : sessionService
}

export const API = APIService
export const session = sessionService