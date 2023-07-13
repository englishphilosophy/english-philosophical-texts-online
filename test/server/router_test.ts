import { assertEquals, assertRejects } from "testing";
import { HttpError } from "womble";
import router from "../../src/server/router.ts";
import * as handler from "../../src/server/handler.tsx";
import * as read from "../../src/server/read.ts";

Deno.test({
  name: "router /favicon.ico",
  async fn() {
    const request = new Request("https://localhost/favicon.ico", {
      method: "GET",
    });
    const url = new URL(request.url);
    const urlPattern = new URLPattern({ pathname: "/favicon.ico" });
    const urlPatternResult = urlPattern.exec(url)!;
    const response = await router(request);
    await assertResponseEquals(
      response,
      await handler.favicon({ urlPatternResult, request })
    );
  },
});

Deno.test({
  name: "router /css",
  async fn() {
    // TODO
  },
});

Deno.test({
  name: "router /js",
  async fn() {
    const request = new Request("https://localhost/js/client/app.js", {
      method: "GET",
    });
    const url = new URL(request.url);
    const urlPattern = new URLPattern({ pathname: "/client/app.js" });
    const urlPatternResult = urlPattern.exec(url)!;
    const response = await router(request);
    assertResponseEquals(
      response,
      await handler.javascript({ urlPatternResult, request })
    );

    assertRejects(
      async () => {
        const request = new Request("https://localhost/js/foo/bar/baz.js", {
          method: "GET",
        });
        await router(request);
      },
      HttpError,
      "Javascript file not found."
    );
  },
});

Deno.test({
  name: "router /",
  async fn() {
    const request = new Request("https://localhost/", { method: "GET" });
    const url = new URL(request.url);
    const urlPattern = new URLPattern({ pathname: "/" });
    const urlPatternResult = urlPattern.exec(url)!;
    const response = await router(request);
    assertResponseEquals(
      response,
      await handler.home({ urlPatternResult, request })
    );
  },
});

Deno.test({
  name: "router /search",
  fn() {
    assertRejects(
      async () => {
        const request = new Request("https://localhost/search", {
          method: "GET",
        });
        await router(request);
      },
      HttpError,
      "Search requests must be sent with the POST method."
    );
    // TODO post request test
  },
});

for (const author of await read.authors()) {
  Deno.test({
    name: `router /texts/${author.id}`,
    async fn() {
      const path = author.id.toLowerCase();
      const request = new Request(`https://localhost/texts/${path}`, {
        method: "GET",
      });
      const url = new URL(request.url);
      const urlPattern = new URLPattern({ pathname: `/texts/${author.id}` });
      const urlPatternResult = urlPattern.exec(url)!;
      const response = await router(request);
      assertResponseEquals(
        response,
        await handler.author({ urlPatternResult, request })
      );
    },
  });
}

for (const author of await read.authors()) {
  for (const text of author.texts) {
    Deno.test({
      name: `router /texts/${author.id}/${text.id}`,
      async fn() {
        const path = text.id.toLowerCase().replace(/\./g, "/");
        const request = new Request(`https://localhost/texts/${path}`, {
          method: "GET",
        });
        const url = new URL(request.url);
        const urlPattern = new URLPattern({ pathname: `/texts/${path}` });
        const urlPatternResult = urlPattern.exec(url)!;
        const response = await router(request);
        assertResponseEquals(
          response,
          await handler.text({ urlPatternResult, request })
        );
      },
    });
  }
}

Deno.test({
  name: "router /research",
  async fn() {
    // TODO
    // const request1 = new Request("https://localhost/research", {
    //   method: "GET",
    // });
    // const response1 = await router(request1);
    // assertResponseEquals(response1, handler.research("research"));
    // const request2 = new Request("https://localhost/research/similarity", {
    //   method: "GET",
    // });
    // const response2 = await router(request2);
    // assertResponseEquals(response2, handler.research("similarity"));
    // const request3 = new Request("https://localhost/research/topics", {
    //   method: "GET",
    // });
    // const response3 = await router(request3);
    // assertResponseEquals(response3, handler.research("topics"));
  },
});

Deno.test({
  name: "router /about",
  async fn() {
    // TODO
    // const request1 = new Request("https://localhost/about", { method: "GET" });
    // const response1 = await router(request1);
    // assertResponseEquals(response1, await handler.about("about"));
    // const request2 = new Request("https://localhost/about/corpus", {
    //   method: "GET",
    // });
    // const response2 = await router(request2);
    // assertResponseEquals(response2, await handler.about("corpus"));
    // const request3 = new Request("https://localhost/about/principles", {
    //   method: "GET",
    // });
    // const response3 = await router(request3);
    // assertResponseEquals(response3, await handler.about("principles"));
    // const request4 = new Request("https://localhost/about/permissions", {
    //   method: "GET",
    // });
    // const response4 = await router(request4);
    // assertResponseEquals(response4, await handler.about("permissions"));
    // const request5 = new Request("https://localhost/about/contact", {
    //   method: "GET",
    // });
    // const response5 = await router(request5);
    // assertResponseEquals(response5, await handler.about("contact"));
    // const request6 = new Request("https://localhost/about/support", {
    //   method: "GET",
    // });
    // const response6 = await router(request6);
    // assertResponseEquals(response6, await handler.about("support"));
  },
});

Deno.test({
  name: "router 404",
  fn() {
    assertRejects(
      async () => {
        const request = new Request("https://localhost/foo/bar/baz", {
          method: "GET",
        });
        await router(request);
      },
      HttpError,
      "Page not found."
    );
  },
});

const assertResponseEquals = async (
  actual: Response,
  expected: Response
): Promise<void> => {
  actual.headers.delete("date");
  expected.headers.delete("date");
  assertEquals(actual.headers, expected.headers);
  assertEquals(actual.status, expected.status);
  assertEquals((await actual.blob()).size, (await expected.blob()).size);
};
