import express, { Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import path from "path";
import App from "../client/App";

const app = express();
const html = (body: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title></title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="" />
  </head>
  <body>
    <div id="root">${body}</div>
    <script defer src="main.bundle.js"></script>
  </body>
</html>
`;
function handleFrontendRoutes(req: Request, res: Response) {
  const reactCode = renderToString(React.createElement(App));
  res.send(html(reactCode));
}

app.use("/", express.static(path.join(__dirname, "..", "dist")));
app.get("/", handleFrontendRoutes);
app.listen(3000);
