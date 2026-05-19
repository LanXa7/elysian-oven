import { Elysia, status } from "elysia";
import { isPublicRoute } from "../config";
import { authJwtPlugin } from "../jwt";

const getBearerToken = (authorization?: string) => {
    if (!authorization?.startsWith("Bearer ")) return null;

    return authorization.slice(7);
};

export const authPlugin = new Elysia()
    .use(authJwtPlugin)
    .resolve({ as: "global" }, async ({ authJwt, path, request }) => {
        if (isPublicRoute(request.method, path)) {
            return {
                currentUser: null
            };
        }

        const token = getBearerToken(request.headers.get("authorization") ?? undefined);

        if (!token) {
            return status(401, "Unauthorized");
        }

        const payload = await authJwt.verify(token);

        if (!payload || typeof payload.id !== "string") {
            return status(401, "Unauthorized");
        }

        return {
            currentUser: {
                id: payload.id
            }
        };
    });
