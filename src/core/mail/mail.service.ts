import { Injectable } from '@nestjs/common';
import { User } from '@core/user/user.entity'
import { Mail, MailType } from '@core/mail/mail.entity'
import { sendMail } from '@utils/mail'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectID, Repository } from 'typeorm'
import { UnprocessableError } from '../../common/errors/custom.error'
import { ERROR_CODE } from '../../common/constants/index'
import {
    DOMAIN,
    PORT
} from '@environment'

@Injectable()
export class MailService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>
        , @InjectRepository(Mail) private readonly mailRepository: Repository<Mail>) { }

    public async sendVerifyEmail (email: string, user: User): Promise<Mail> {
        const existedUser = await this.userRepository.findOne({ where: { email, isVerified: true } })
        if (existedUser) {
            throw new UnprocessableError({ message: 'Email already existed.', code: ERROR_CODE.EMAIL_ALREADY_EXISTED })
        }
        const mail = await this.mailRepository.save(new Mail({ userId: user._id, type: MailType.VERIFY_MAIL, email: email }))
        const emailParam = {
            email: email,
            tracking: `http://${DOMAIN}:${PORT}/mail/track/${mail._id}`,
            verifyLink: `http://${DOMAIN}:${PORT}/user/verify/${mail._id}`,
            subject: "Verify Email",
        }
        await sendMail(user, emailParam, "verifyEmail.html")
        return mail
    }

    public async sendForgetPasswordEmail (email: string): Promise<Mail> {
        const existedUser = await this.userRepository.findOne({ where: { email, isVerified: true } })
        if (!existedUser) {
            throw new UnprocessableError({ message: 'Email is not binding any account', code: ERROR_CODE.EMAIL_NONE_EXISTED })

        }
        const mail = await this.mailRepository.save(new Mail({ userId: existedUser._id, type: MailType.FORGOT_PASSWORD, email: existedUser.email }))
        const emailParam = {
            tracking: `http://${DOMAIN}/${PORT}/mail/track/${mail._id}`,
            verifyLink: `http://${DOMAIN}/${PORT}/user/verify/${mail._id}`,
            subject: "Reset Password",
        }
        await sendMail(existedUser, emailParam, "udacity-index.html")
        return mail
    }


    public async setMailOpened (mailId: string): Promise<Mail> {
        const mail = await this.mailRepository.findOne({ where: { _id: mailId } })
        if (!mail) {
            throw new UnprocessableError({ message: 'Email not exist.', code: ERROR_CODE.EMAIL_NONE_EXISTED })
        }
        return await this.mailRepository.save(new Mail({ ...mail, isOpened: true }))
    }

}
