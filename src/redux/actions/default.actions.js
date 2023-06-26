export const API_START = 'API_START'
export const API_ERROR = 'API_ERROR'
export const API = 'API'

export const apiStart = ({ label, data }) => ({
  type: API_START,
  payload: label,
  data,
})

export const apiError = ({ label, error, data }) => ({
  type: API_ERROR,
  payload: label,
  data,
  error,
})

export function apiAction({
  path = '',
  method = 'GET',
  data = false,
  contentType = false,
  label = '',
  customHeaders = [],
  baseUrl = false,
  token = false,
}) {
  return {
    type: API,
    payload: {
      path,
      method,
      data,
      contentType,
      label,
      customHeaders,
      baseUrl,
      token,
      onStart: (response) => {
        return {
          type: label,
          response,
          data,
        }
      },

      onError: (response) => {
        return {
          type: label,
          response,
          data,
        }
      },

      onSuccess: (response) => {
        return {
          type: label,
          response,
          data,
        }
      },
    },
  }
}