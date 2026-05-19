import { AuthModel } from "./model";
import { userTable } from "../db/schema/user";
import { eq, or } from "drizzle-orm";
import { db } from "../db";

export abstract class AuthService {
    static async login({ text, password }: AuthModel["loginInput"]) {
        const one = await db
            .select({
                id: userTable.id,
                password: userTable.password
            })
            .from(userTable)
            .where(
                or(
                    eq(userTable.phone, text),
                    eq(userTable.email, text)
                )
            )
            .limit(1)
            .then(rows => rows[0] ?? null);

        if (!one) return null;

        const ok = await Bun.password.verify(password, one.password, "bcrypt");

        if (!ok) return null;

        return {
            id: one.id.toString()
        };
    }
}
