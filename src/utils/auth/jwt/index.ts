import { sign, verify } from 'jsonwebtoken'
import { User } from '@/core/user/user.entity'
import { AuthTokens } from '@/core/auth/auth.dto'
import { UnauthenticatedError } from '@/common/errors/custom.error'
import {
    ISSUER,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    EMAIL_TOKEN_SECRET,
    RESETPASS_TOKEN_SECRET,
} from '@/environment'

type TokenType =
    | 'accessToken'
    | 'refreshToken'
    | 'emailToken'
    | 'resetPassToken'

const common = {
    accessToken: {
        privateKey: ACCESS_TOKEN_SECRET!,
        signOptions: {
            expiresIn: '30d' // 15m
        }
    },
    refreshToken: {
        privateKey: REFRESH_TOKEN_SECRET!,
        signOptions: {
            expiresIn: '7d' // 7d
        }
    },
    emailToken: {
        privateKey: EMAIL_TOKEN_SECRET!,
        signOptions: {
            expiresIn: '1d' // 1d
        }
    },
    resetPassToken: {
        privateKey: RESETPASS_TOKEN_SECRET!,
        signOptions: {
            expiresIn: '1d' // 1d
        }
    }
}

export const generateToken = async (
    user: User,
    type: TokenType
): Promise<string> => {
    return await sign(
        {
            _id: user._id
        },
        common[type].privateKey,
        {
            issuer: ISSUER!,
            subject: user._id.toString(),
            algorithm: 'HS256',
            expiresIn: common[type].signOptions.expiresIn // 15m
        }
    )
}

export const verifyToken = async (
    token: string,
    type: TokenType
): Promise<any> => {
    return await verify(token, common[type].privateKey, async (err, data) => {
        if (err) {
            return [err, null]
        }
        return [null, data]
    })
}

export const tradeToken = async (user: User): Promise<AuthTokens> => {
    // if (!user.isVerified) {
    //     throw new ForbiddenError('Please verify your email.')
    // }

    // if (!user.isActive) {
    //     throw new ForbiddenError('User already doesn\'t exist.')
    // }

    // if (user.isLocked) {
    //     throw new ForbiddenError('Your email has been locked.')
    // }

    const accessToken = await generateToken(user, 'accessToken')
    const refreshToken = await generateToken(user, 'refreshToken')
    return { accessToken, refreshToken }
}