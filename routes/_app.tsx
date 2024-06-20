import { PageProps } from "$fresh/server.ts";

export default ({ Component }: PageProps) => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>english-philosophical-texts-online</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
};
