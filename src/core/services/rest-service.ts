import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class RestService {
  private static backendInstance: RestService;

  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  static get backend(): RestService {
    if (!this.backendInstance) {
      this.backendInstance = new RestService(
        axios.create({
          baseURL: process.env.VUE_APP_BACKEND_URL
        })
      );
    }

    return this.backendInstance;
  }

  async get<R = undefined>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const { data } = await this.axios.get<R>(path, config);
    return data;
  }

  async post<D = undefined, R = undefined>(
    path: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const response = await this.axios.post<R>(path, data, config);
    return response.data;
  }

  async put<D = undefined, R = undefined>(
    path: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const response = await this.axios.put<R>(path, data, config);
    return response.data;
  }

  async patch<D = undefined, R = undefined>(
    path: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const response = await this.axios.patch<R>(path, data, config);
    return response.data;
  }

  async delete<R = undefined>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const { data } = await this.axios.delete<R>(path, config);
    return data;
  }
}
