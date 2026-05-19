import { Elysia } from "elysia";
import openapi from "@elysia/openapi";
import { authController } from "./auth";
import { userController } from "./user";

const app = new Elysia()
    .use(openapi())
    .use(authController)
    .use(userController)
    .listen(3000);
