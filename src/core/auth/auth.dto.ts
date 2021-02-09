import { MinLength, MaxLength } from 'class-validator'
export class loginUserInput {
    @MinLength(10)
    account: string
    password: string
}

export class AuthTokens {
    accessToken: string
    refreshToken: string
}