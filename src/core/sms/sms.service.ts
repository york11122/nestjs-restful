import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SMS } from './sms.entity'
import { ERROR_CODE } from '@/common/constants/index'
import { UnprocessableError } from '@/common/errors/custom.error'


@Injectable()
export class SmsService {
    constructor(@InjectRepository(SMS) private readonly smsRepository: Repository<SMS>) { }

    public async sendVerifySMS (phone_number: string): Promise<SMS> {
        const code = Math.random().toString().substr(2, 5)
        // send sms login here
        return await this.smsRepository.save(new SMS({ phone_number, code }))
    }

    public async VerifySMS (id: string, code: string): Promise<SMS> {
        const sms = await this.smsRepository.findOne({ where: { _id: id } })
        if (!sms) {
            throw new UnprocessableError({ message: 'SMS not exist.', code: ERROR_CODE.SMS_NONE_EXISTED })
        }
        if (sms.expiredAt <= new Date()) {
            throw new UnprocessableError({ message: 'SMS expired.', code: ERROR_CODE.SMS_EXPIRED })
        }
        if (sms.code !== code) {
            throw new UnprocessableError({ message: 'SMS verify failed', code: ERROR_CODE.SMS_VERIFY_FAILED })
        }
        return await this.smsRepository.save(new SMS({ ...sms, isVerified: true }))
    }
}
