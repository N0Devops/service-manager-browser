import { ClientCore, IRes } from "@/api/default/client-core";

export class Account extends ClientCore {
  login(account: string, password: string) {
    return this.client.post<IRes<string>, IRes<string>>("/api/login", {
      account, password
    })
  }

  logout() {
    return this.client.get<IRes<null>, IRes<null>>("/api/logout")
  }
}
