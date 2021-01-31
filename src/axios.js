import axios from "axios"
import Element from "element-ui"
import router from './router'
import store from './store'

axios.defaults.baseURL= 'http://localhost:8081'

axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(response => {
        let res = response.data
/*        console.log("=====")
        console.log(res)
        console.log("=====")*/

        if (res.code === 200) {
            return response
        } else {
            Element.Message.error(res.message, {
                duration: 3 * 1000
            })

            return Promise.reject(res.message)
        }
    },
    error => {
        console.log(error)
        if (error.response.data) {
            error.message = error.response.data.message
        }

        if (error.response.status === 401) {
            store.commit("remove_info")
            router.push('/login')
        }

        Element.Message.error(error.message, {
            duration: 3 * 1000
        })
        return Promise.reject(error.message)
    }
)