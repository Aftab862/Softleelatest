import axios from 'axios'
import { API } from '../actions/default.actions'
import { SERVER_URL } from './api.config'
// import notify from '@src/common/toasts/toasts'

const request =
  ({ dispatch }) =>
    (next) =>
      (action) => {
        next(action)
        if (action.type !== API) return

        const { path, method, data, onSuccess, label, contentType, onStart, onError, customHeaders, baseUrl, token } = action.payload
        const url = `${baseUrl ? baseUrl : SERVER_URL}/${path}`

        axios.defaults.headers.common['Content-Type'] = contentType
          ? contentType
          : 'application/json'
        if (JSON.parse(localStorage.getItem("softliUserData"))) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token ? token :
            JSON.parse(localStorage.getItem("softliUserData"))?.token
            }`
        }

        axios.defaults.headers.common["currency"] = "USD"

        if (customHeaders && customHeaders?.length !== 0) {
          customHeaders.map((header) => (axios.defaults.headers.common[header?.name] = header?.value))
        }
        if (label) {
          dispatch(onStart({ ld: true }))
        }

        axios
          .request({
            url,
            method,
            data,
          })
          .then(({ data }) => {

            // localStorage.userData = JSON.stringify(data.user)

            // localStorage.setItem('userInfo', JSON.stringify(data.user))

            // localStorage.getItem("userInfo")

            // 
            dispatch(onSuccess({ dt: data }))
          })
          .catch((error) => {
            // if (
            //   localStorage.getItem('userData') &&
            //   error.response?.status === 401
            // ) {
            //   ls.remove('userData')
            //   window.location.href = '/login'
            // } else {
            const errorMessage = error.response
              ?
              error.response.data
                ? error.response.data.data &&
                  error.response.data.data.length !== 0 &&
                  typeof error.response.data.data === 'object' &&
                  error.response.data.data !== null &&
                  Object.keys(error.response.data.data).length !== 0
                  ? error.response.data.data.errorMessage
                  : error.response.data.message
                : error.response.statusText
              : error.message
            // if(!data?.hideErrorMessage){
            //   notify({
            //     type: 'DANGER',
            //     message: errorMessage,
            //   })
            // }


            dispatch(onError({ er: errorMessage }))
            // }
          })
      }

export default request
