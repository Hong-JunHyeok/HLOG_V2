import { NextRouter, useRouter } from "next/router";

class Router {
  private router: NextRouter;

  constructor() {
    this.router = useRouter();
  }

  public handlePushLink(link: string) {
    this.router.push(link);
  }

  public getCurrentParam(): string {
    return this.router.pathname;
  }
}

export default Router;
