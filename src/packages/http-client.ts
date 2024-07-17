import axios, { AxiosError, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";

export function HttpClient(config?: CreateAxiosDefaults) {
  const client = axios.create(config)

  const onRequestFulfilled = (value: InternalAxiosRequestConfig<any>) => {
    const token = window.localStorage.getItem("token") || ""
    value.headers.setAuthorization(token)
    return Promise.resolve(value)
  }

  const onRequestRejected = (error: AxiosError) => {
    return Promise.reject(error)
  }

  const onResponseFulfilled = (value: AxiosResponse) => {
    const { data, status } = value
    if (status > 400) {
      throw data
    }
    return Promise.resolve(data)
  }

  const onResponseRejected = (error: AxiosError) => {
    return Promise.reject(error)
  }

  client.interceptors.request.use(onRequestFulfilled, onRequestRejected)
  client.interceptors.response.use(onResponseFulfilled, onResponseRejected)

  return client
}
