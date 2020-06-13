# English Philosophical Texts Online

This is the code for [https://englishphilosophy.org](https://englishphilosophy.org). The site is written in [Deno](https://deno.land) using the [Womble](https://github.com/merivale/womble) web application framework.

Note that this is the code for the web site only; the texts are stored separately in the [English Philosophical Texts](https://github.com/englishphilosophy/english-philosophical-texts) repository. For this site to run, this latter repository needs to be cloned alongside it.

## How to set up this site

1. Install Deno (follow the instructions at [https://deno.land](https://deno.land)).
2. Clone this repository: `git clone https://github.com/englishphilosophy/english-philosophical-texts-online.git`.
3. Clone the sister repository: `git clone https://github.com/englishphilosophy/english-philosophical-texts.git`.
4. Build the texts: `deno run --allow-read --allow-write --unstable english-philosophical-texts/bin/build.ts`.
5. Build the client-side JavaScript: `deno bundle english-philosophical-texts-online/src/client/app.ts english-philosophical-texts-online/build/client/app.js`.
6. Start the application: `deno run --allow-read --allow-net --unstable english-philosophical-texts/bin/server.ts`.
