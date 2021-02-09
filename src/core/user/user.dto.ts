import { MinLength, MaxLength, IsNotEmpty } from 'class-validator'

export class createUserInput {
    @MinLength(10)
    account: string
    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    name: string
}