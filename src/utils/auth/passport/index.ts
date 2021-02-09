import * as passport from 'passport'
import * as GooglePlusTokenStrategy from 'passport-google-plus-token'
import * as FacebookTokenStrategy from 'passport-facebook-token'
import * as LineTokenStrategy from 'passport-line-token'
import { Strategy as GoogleTokenStrategy } from 'passport-google-token'

import {
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    LINE_CHANNEL_ID,
    LINE_CHANNEL_SECRET
} from '@environment'

interface OAuthResponse {
    readonly data: any
    readonly info: any
}

// GOOGLE PLUS STRATEGY
const googlePlusTokenStrategyCallback = async (
    accessToken,
    refreshToken,
    profile,
    done
) =>
    done(null, {
        accessToken,
        refreshToken,
        profile
    })

passport.use(
    new GooglePlusTokenStrategy(
        {
            clientID: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!
        },
        googlePlusTokenStrategyCallback
    )
)

// FACEBOOK STRATEGY
const facebookTokenStrategyCallback = (
    accessToken,
    refreshToken,
    profile,
    done
) =>
    done(null, {
        accessToken,
        refreshToken,
        profile
    })

passport.use(
    new FacebookTokenStrategy(
        {
            clientID: FACEBOOK_APP_ID!,
            clientSecret: FACEBOOK_APP_SECRET!
        },
        facebookTokenStrategyCallback
    )
)

// GOOGLE STRATEGY
const googleTokenStrategyCallback = async (
    accessToken,
    refreshToken,
    profile,
    done
) =>
    done(null, {
        accessToken,
        refreshToken,
        profile
    })

passport.use(
    new GoogleTokenStrategy(
        {
            clientID: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!
        },
        googleTokenStrategyCallback
    )
)

// LINE STRATEGY
const lineTokenStrategyCallback = async (
    accessToken,
    refreshToken,
    profile,
    done
) =>
    done(null, {
        accessToken,
        refreshToken,
        profile
    })

passport.use(
    new LineTokenStrategy(
        {
            clientID: LINE_CHANNEL_ID!,
            clientSecret: LINE_CHANNEL_SECRET!
        },
        lineTokenStrategyCallback
    )
)

export const authenticateGooglePlus = (req, res): Promise<OAuthResponse> =>
    new Promise((resolve, reject) => {
        passport.authenticate(
            'google-plus-token',
            { session: false },
            (err, data, info) => {
                if (err) {
                    reject(err)
                }
                resolve({ data, info })
            }
        )(req, res)
    })


export const authenticateFacebook = (req, res): Promise<OAuthResponse> =>
    new Promise((resolve, reject) => {
        passport.authenticate(
            'facebook-token',
            { session: false },
            (err, data, info) => {
                if (err) {
                    reject(err)
                }
                resolve({ data, info })
            }
        )(req, res)
    })

export const authenticateGoogle = (req, res): Promise<OAuthResponse> =>
    new Promise((resolve, reject) => {
        passport.authenticate(
            'google-token',
            { session: false },
            (err, data, info) => {
                if (err) {
                    reject(err)
                }
                resolve({ data, info })
            }
        )(req, res)
    })

export const authenticateLine = (req, res): Promise<OAuthResponse> =>
    new Promise((resolve, reject) => {
        passport.authenticate(
            'line-token',
            { session: false },
            (err, data, info) => {
                if (err) {
                    reject(err)
                }
                resolve({ data, info })
            }
        )(req, res)
    })
