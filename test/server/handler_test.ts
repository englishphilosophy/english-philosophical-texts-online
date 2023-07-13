import { assert, assertEquals } from "testing";
import { Status } from "http";
import * as handler from "../../src/server/handler.tsx";
import * as read from "../../src/server/read.ts";

Deno.test({
  name: "server/handler:favicon",
  async fn() {
    const request = new Request("https://localhost/favicon.ico", {
      method: "GET",
    });
    const url = new URL(request.url);
    const urlPattern = new URLPattern({ pathname: "/favicon.ico" });
    const urlPatternResult = urlPattern.exec(url)!;
    const response = await handler.favicon({ urlPatternResult, request });
    assert(response instanceof Response);
    assertEquals(response.status, Status.OK);
    assertEquals(response.headers.get("content-type"), "image/ico");
  },
});

Deno.test({
  name: "server/handler:css",
  async fn() {
    // TODO
  },
});

Deno.test({
  name: "server/handler:javascript",
  async fn() {
    // TODO
  },
});

Deno.test({
  name: "server/handler:home",
  async fn() {
    const request = new Request("https://localhost/", { method: "GET" });
    const url = new URL(request.url);
    const urlPattern = new URLPattern({ pathname: "/" });
    const urlPatternResult = urlPattern.exec(url)!;
    const response = await handler.home({ urlPatternResult, request });
    assert(response instanceof Response);
    assertEquals(response.status, Status.OK);
    assertEquals(response.headers.get("content-type"), "text/html");
  },
});

Deno.test({
  name: "server/handler:search",
  async fn() {
    // TODO
  },
});

for (const author of await read.authors()) {
  Deno.test({
    name: `server/handler:author:${author.id}`,
    async fn() {
      const path = author.id.toLowerCase();
      const request = new Request(`https://localhost/texts/${path}`, {
        method: "GET",
      });
      const url = new URL(request.url);
      const urlPattern = new URLPattern({ pathname: `/texts/${author.id}` });
      const urlPatternResult = urlPattern.exec(url)!;
      const response = await handler.author({ urlPatternResult, request });
      assert(response instanceof Response);
      assertEquals(response.status, Status.OK);
      assertEquals(response.headers.get("content-type"), "text/html");
    },
  });
}

for (const author of await read.authors()) {
  for (const text of author.texts) {
    Deno.test({
      name: `server/handler:text:${text.id}`,
      async fn() {
        const path = text.id.toLowerCase().replace(/\./g, "/");
        const request = new Request(`https://localhost/texts/${path}`, {
          method: "GET",
        });
        const url = new URL(request.url);
        const urlPattern = new URLPattern({ pathname: `/texts/${path}` });
        const urlPatternResult = urlPattern.exec(url)!;
        const response = await handler.text({ urlPatternResult, request });
        assert(response instanceof Response);
        assertEquals(response.status, Status.OK);
        assertEquals(response.headers.get("content-type"), "text/html");
      },
    });
  }
}

Deno.test({
  name: "server/handler:research",
  async fn() {
    // TODO
  },
});

Deno.test({
  name: "server/handler:about",
  async fn() {
    // TODO
  },
});

Deno.test({
  name: "server/handler:error",
  async fn() {
    // TODO
  },
});
