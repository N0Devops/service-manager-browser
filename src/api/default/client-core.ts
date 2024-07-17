import { AxiosInstance } from "axios";

export class ClientCore {
  protected client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }
}

export interface IRes<T> {
  code: number
  data: T
  err?: string
}
