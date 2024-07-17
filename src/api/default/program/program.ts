import { ClientCore, IRes } from "@/api/default/client-core";

export interface IProgram {
  name: string
  description: string
  config: {
    [key: string]: string
  }
  operation: {
    start?: string
    stop?: string
    restart?: string
    status?: string
  }
}

export class Program extends ClientCore {
  programs() {
    return this.client.get<IRes<IProgram[]>, IRes<IProgram[]>>("/api/program")
  }

  start(name: string) {
    return this.client.get<IRes<string>, IRes<string>>("/api/program/start", {
      params: {
        name: name
      }
    })
  }

  stop(name: string) {
    return this.client.get<IRes<string>, IRes<string>>("/api/program/stop", {
      params: {
        name: name
      }
    })
  }

  restart(name: string) {
    return this.client.get<IRes<string>, IRes<string>>("/api/program/restart", {
      params: {
        name: name
      }
    })
  }

  status(name: string) {
    return this.client.get<IRes<string>, IRes<string>>("/api/program/status", {
      params: {
        name: name
      }
    })
  }

  getConfig(name: string, conf: string) {
    return this.client.get<IRes<string>, IRes<string>>("/api/program/config", {
      params: { name, conf },
    })
  }

  config(name: string, conf: string, data: string) {
    return this.client.post<IRes<string>, IRes<string>>("/api/program/config", {
      data
    }, {
      params: {
        name,
        conf,
      }
    })
  }
}
