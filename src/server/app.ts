import { Status } from "http";
import { HttpError } from "womble";
import * as handler from "./handler.ts";

/** The web application. */
export default async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  // favicon
  if (url.pathname === "/favicon.ico") {
    return handler.favicon();
  }

  // home page
  if (url.pathname === "/") {
    return handler.home();
  }

  // search api
  if (url.pathname === "/search") {
    if (request.method !== "POST") {
      throw new HttpError(
        Status.MethodNotAllowed,
        "Search requests must be sent with the POST method."
      );
    }
    return handler.search(await request.formData());
  }

  // author pages
  const authorTest = url.pathname.match(/^\/texts\/([a-z]+)$/);
  if (authorTest) {
    return handler.author(authorTest[1]);
  }

  // text pages
  const textTest = url.pathname.match(/^\/texts\/([a-z0-9/]+)$/);
  if (textTest) {
    return handler.text(textTest[1]);
  }

  // research pages
  if (url.pathname === "/research") {
    return handler.research("research");
  }
  if (url.pathname === "/research/similarity") {
    return handler.research("similarity");
  }
  if (url.pathname === "/research/topics") {
    return handler.research("topics");
  }

  // about pages
  if (url.pathname === "/about") {
    return handler.about("about");
  }
  if (url.pathname === "/about/corpus") {
    return handler.about("corpus");
  }
  if (url.pathname === "/about/principles") {
    return handler.about("principles");
  }
  if (url.pathname === "/about/permissions") {
    return handler.about("permissions");
  }
  if (url.pathname === "/about/contact") {
    return handler.about("contact");
  }
  if (url.pathname === "/about/support") {
    return handler.about("support");
  }

  // javascript files
  const javascriptTest = url.pathname.match(/^\/js\/([a-z/]+\.js)$/);
  if (javascriptTest) {
    return handler.javascript(javascriptTest[1]);
  }

  // no matching path
  throw new HttpError(Status.NotFound, "Page not found.");
};
