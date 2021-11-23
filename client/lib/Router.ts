import { NextRouter, useRouter } from "next/router";

class Router {
  private router: NextRouter;

  constructor() {
    this.router = useRouter();
  }

  public handlePushLink(link: string) {
    this.router.push(link);
  }
}

export default Router;
