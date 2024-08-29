import { Elysia } from "elysia";
import { briefs } from "./briefs";

const app = new Elysia({ prefix: "/api" }).use(briefs).listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
