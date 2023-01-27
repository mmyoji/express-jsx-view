import { join } from "node:path";

import express from "express";

import { getJSXExtension, jsxViewEngine } from "./jsx-view-engine";

import type { IndexPageProps } from "./views/index";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const jsx = getJSXExtension();

// Access in other Router through {req,res}.app.locals.jsxExtension
app.locals.jsxExtension = jsx;

app.set("views", [
  // directory for pug
  join(__dirname, "/../views"),
  // directory for jsx (transpile is required)
  join(__dirname, "/views"),
]);

app.set("view engine", "pug");
app.set("view engine", jsx);
app.engine(jsx, jsxViewEngine());

app.get("/", (_req, res) => {
  const props: IndexPageProps = {
    title: `Hey`,
    message: `Hello world!`,
  };

  res.render(`index.${jsx}`, props);
});

app.get("/pug", (_req, res) => {
  res.render(`index.pug`, {
    title: `Hey`,
    message: `Hello, world!`,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
