import { IsEmail } from 'class-validator'

export class sendMailInput {
    @IsEmail()
    email: string
}
