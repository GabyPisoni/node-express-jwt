import morgan from "morgan";

export function logMorganMiddleware() {
  return morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens["response-time"](req, res) + "ms",
    ].join(" ");
  });
}
