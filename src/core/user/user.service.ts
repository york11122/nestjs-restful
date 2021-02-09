import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectID, Repository } from 'typeorm'
import { User } from './user.entity'
import { hashPassword } from '@utils/password'
import { uploadFile } from '@utils/upload'
import { UnprocessableError } from '../../common/errors/custom.error'
import { ERROR_CODE } from '../../common/constants/index'
import { Mail } from '@core/mail/mail.entity'
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Mail) private readonly mailRepository: Repository<Mail>) { }

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
        const mail = await this.mailRepository.findOne({ where: { _id: mailId } })
        if (!mail) {
            throw new UnprocessableError({ message: 'Email not exist.', code: ERROR_CODE.EMAIL_NONE_EXISTED })
        }
        if (mail.expiredAt <= new Date()) {
            throw new UnprocessableError({ message: 'Email expired.', code: ERROR_CODE.EMAIL_EXPIRED })
        }
        const user = await this.userRepository.findOne({ where: { _id: mail.userId } })
        if (!user) {
            throw new UnprocessableError({ message: 'User not exist.', code: ERROR_CODE.USER_NOT_EXIST })
        }
        if (user.isVerified) {
            throw new UnprocessableError({ message: 'Your email has been verified', code: ERROR_CODE.ALREADY_VERIFED })
        }
        return await this.userRepository.save(new User({ ...user, isVerified: true, email: mail.email }))
    }

}