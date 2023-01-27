import { ComponentType, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

type EngineOptions = {
  doctype?: string;
};

type EngineFunc = (
  path: string,
  options: object,
  callback: (e: any, rendered?: string) => void
) => void;

// see: https://qiita.com/foooomio/items/c62b1e5280209b8ff8ae
export function jsxViewEngine({
  doctype = "<!DOCTYPE html>",
}: EngineOptions = {}): EngineFunc {
  return (path, options, callback) => {
    try {
      const component = require(path).default as ComponentType<unknown>;
      const markup = renderToStaticMarkup(createElement(component, options));
      return callback(null, doctype + markup);
    } catch (err) {
      return callback(err, "");
    }
  };
}

export function getJSXExtension(): string {
  return Object.keys(require.cache).some((path) => path.includes("/tsx/"))
    ? "tsx"
    : "js";
}
