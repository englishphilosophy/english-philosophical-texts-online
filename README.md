# English Philosophical Texts Online

To set up this web site:

1. Copy the `build` directory from
   [english-philosophical-texts](https://github.com/englishphilosophy/english-philosophical-texts)
   into the `data` directory here.
2. Run `deno --allow-read --allow-write bin/enrich_data.ts`, which will add some
   additional derived data to the `data` directory.
3. Run `deno bundle client/index.js client/index.bundle.js` to bundle the client-side JavaScript into a
   usable module.
4. Run `deno --allow-net --allow-read bin/server.ts` to start the server
   application.
