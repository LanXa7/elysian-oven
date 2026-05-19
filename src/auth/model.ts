import { type } from "arktype";
import { UnwrapSchema } from "elysia";


export const AuthModel = {
    loginInput: type({
        text: "string.email | /^1\\d{10}$/",
        password: "string"
    }),
    loginResponse: type({
        id: "string",
        token: "string"
    })
} as const

export type AuthModel = {
    [k in keyof typeof AuthModel]: UnwrapSchema<typeof AuthModel[k]>
}