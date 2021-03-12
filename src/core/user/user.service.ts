import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectID, Repository } from 'typeorm'
import { User } from './user.entity'
import { hashPassword } from '@/utils/password'
import { uploadFile } from '@/utils/upload'
import { UnprocessableError } from '@/common/errors/custom.error'
import { ERROR_CODE } from '@/common/constants/index'
import { MailService } from '@/core/mail/mail.service'
import { SmsService } from '@/core/sms/sms.service'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly mailService: MailService,
        private readonly smsService: SmsService
    ) { }

    public async findUserByID (id: string) {
        return await this.userRepository.findOne({ where: { _id: id } })
    }

    //建立帳號
    public async createUser (account: string, password: string, name: string): Promise<User> {

        //檢查帳號是否重複
        let existedUser = await this.userRepository.findOne({
            where: {
                'local.account': account
            }
        })

        if (existedUser) {
            throw new UnprocessableError({ message: 'User already exists.', code: ERROR_CODE.USER_ALREADY_EXISTED })
        }

        //新增user
        return await this.userRepository.save(new User({ local: { account, password: await hashPassword(password) }, name }))
    }

    //上傳頭像
    public async uploadAvatar (file: any, user: User): Promise<User> {
        const avatarUrl = await uploadFile(file, 'Avatar', user._id)
        return this.userRepository.save(new User({ ...user, avatar: avatarUrl }))
    }


    public async verifyEmail (mailId: string): Promise<User> {
        const mail = await this.mailService.verifyMail(mailId)
        const user = await this.userRepository.findOne({ where: { _id: mail.userId } })
        if (!user) {
            throw new UnprocessableError({ message: 'User not exist.', code: ERROR_CODE.USER_NOT_EXIST })
        }
        return await this.userRepository.save(new User({ ...user, isVerified: true, email: mail.email }))
    }


    public async verifySMS (smsId: string, verify_code: string, user: User): Promise<User> {
        const sms = await this.smsService.VerifySMS(smsId, verify_code)
        return await this.userRepository.save(new User({ ...user, phone_number: sms.phone_number }))
    }

}