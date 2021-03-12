import { IsEmail, IsNotEmpty } from 'class-validator'


export class sendSMSInput {
    @IsNotEmpty()
    phone_number: string
}

export class verifySMSInput {
    @IsNotEmpty()
    id: string
    @IsNotEmpty()
    code: string
}

