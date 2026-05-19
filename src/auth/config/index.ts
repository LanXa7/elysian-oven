export type PublicRoute = {
    method: string;
    path: string;
    match?: "exact" | "prefix";
};

export const publicRoutes: PublicRoute[] = [
    { method: "POST", path: "/auth/login", match: "exact" }
];

export const isPublicRoute = (method: string, path: string) =>
    publicRoutes.some(route => {
        if (route.method !== method) return false;

        if (route.match === "prefix") {
            return path.startsWith(route.path);
        }

        return path === route.path;
    });
