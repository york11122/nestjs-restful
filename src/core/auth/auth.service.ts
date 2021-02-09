import { Injectable, Req, Res, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectID, Repository } from 'typeorm'
import { User } from '@core/user/user.entity'
import { AuthTokens } from "@core/auth/auth.dto";
import { comparePassword } from "@utils/password";
import { tradeToken } from "@utils/auth/jwt";
import {
    authenticateLine,
    authenticateFacebook,
    authenticateGoogle
} from '@utils/auth/passport'
import { UnprocessableError } from '../../common/errors/custom.error'
import { ERROR_CODE } from '../../common/constants/index'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    //一般登入
    public async login (account: string, password: string): Promise<AuthTokens> {
        let user = await this.userRepository.findOne({
            where: {
                'local.account': account
            }
        })

        if (user && (await comparePassword(password, user.local.password))) {
            return await tradeToken(user)
        }

        throw new UnprocessableError({ message: 'Login failed', code: ERROR_CODE.LOGIN_FAILED })
    }

    //Line
    public async oauthLine (req: Request, res: Response): Promise<AuthTokens> {

        const { data, info } = await authenticateLine(req, res)
        if (data) {
            const { profile } = data
            let user

            user = await this.userRepository.findOne({
                where: {
                    'line._id': profile.id
                }
            })

            if (!user) {
                // add create User
                user = await this.userRepository.save(
                    new User({
                        line: {
                            _id: profile.id,
                            name: profile.displayName,
                        },
                        name: profile.displayName,
                        avatar: profile.pictureUrl,
                    })
                )
            }
            return await tradeToken(user)
        }

        if (info) {
            const { code } = info
            switch (code) {
                case 'ETIMEDOUT':
                    throw 'Failed to reach Line: Try Again'
                default:
                    throw 'Something went wrong.'
            }
        }
    }

    //facebook
    public async oauthFacebook (req: Request, res: Response): Promise<AuthTokens> {

        const { data, info } = await authenticateFacebook(req, res)
        if (data) {
            const { profile } = data
            let user

            user = await this.userRepository.findOne({
                where: {
                    'facebook._id': profile.id
                }
            })

            if (!user) {
                // add create User
                user = await this.userRepository.save(
                    new User({
                        facebook: {
                            _id: profile.id,
                            name: profile.name.givenName + profile.name.familyName,
                            email: profile.emails[0].value
                        },
                        name: profile.name.givenName + profile.name.familyName,
                        avatar: profile.photos[0].value,
                        email: profile.emails[0].value
                    })
                )
            }
            return await tradeToken(user)
        }

        if (info) {
            const { code } = info
            switch (code) {
                case 'ETIMEDOUT':
                    throw 'Failed to reach Facebook: Try Again'
                default:
                    throw 'Something went wrong.'
            }
        }
    }

    //Google
    public async oauthGoogle (req: Request, res: Response): Promise<AuthTokens> {

        const { data, info } = await authenticateGoogle(req, res)
        if (data) {
            const { profile } = data
            let user

            user = await this.userRepository.findOne({
                where: {
                    'google._id': profile.id
                }
            })
            if (!user) {
                // add create User
                user = await this.userRepository.save(
                    new User({
                        google: {
                            _id: profile.id,
                            name: profile.name.givenName + profile.name.familyName,
                            email: profile.emails[0].value
                        },
                        name: profile.name.givenName + profile.name.familyName,
                        avatar: profile.photos ? profile.photos[0].value : '',
                        email: profile.emails[0].value
                    })
                )
            }
            return await tradeToken(user)
        }

        if (info) {
            const { code } = info
            switch (code) {
                case 'ETIMEDOUT':
                    throw 'Failed to reach Google: Try Again'
                default:
                    throw 'Something went wrong.'
            }
        }
    }
}
