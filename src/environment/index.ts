import * as dotenv from 'dotenv'
dotenv.config()

const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || '#87e8de'
// author
const AUTHOR: string = process.env.AUTHOR || 'yorkchen'

// bcrypt
const BCRYPT_SALT: number = +process.env.BCRYPT_SALT || 10

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development'

// application
const DOMAIN: string = process.env.DOMAIN || 'localhost'
const PORT: number = +process.env.PORT || 14047
const END_POINT: string = process.env.END_POINT || 'graphql'
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000
const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 3

// mlab
const MLAB_URL = process.env.MLAB_URL

const STATIC: string = process.env.STATIC || 'static'


//jsonwebtoken
const ISSUER: string = process.env.ISSUER || 'yorkchen'
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'access-token'
const ACCESS_TOKEN_SECRET: string =
    process.env.ACCESS_TOKEN_SECRET || 'access-token-key'
const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN || 'refresh-token'
const REFRESH_TOKEN_SECRET: string =
    process.env.REFRESH_TOKEN_SECRET || 'refresh-token-key'
const EMAIL_TOKEN: string = process.env.EMAIL_TOKEN || 'email-token'
const EMAIL_TOKEN_SECRET: string =
    process.env.EMAIL_TOKEN_SECRET || 'email-token-key'
const RESETPASS_TOKEN: string = process.env.RESETPASS_TOKEN || 'resetpass-token'
const RESETPASS_TOKEN_SECRET: string =
    process.env.RESETPASS_TOKEN_SECRET || 'resetpass-token-key'

// nodemailer
const NODEMAILER_USER: string = process.env.NODEMAILER_USER || 'xxx'
const NODEMAILER_PASS: string = process.env.NODEMAILER_PASS || 'xxx'

// // cloudinary
const CLOUDINARY_NAME: string = process.env.CLOUDINARY_NAME || ''
const CLOUDINARY_API_KEY: string =
    process.env.CLOUDINARY_API_KEY || ''
const CLOUDINARY_API_SECRET: string =
    process.env.CLOUDINARY_API_SECRET || ''


// // pubsub
// const NOTIFICATION_SUBSCRIPTION: string = 'newNotification'
// const USER_SUBSCRIPTION: string = 'newUser'
// const MESSAGES_SUBSCRIPTION: string = 'newMessages'

// passport
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || 'xxx'
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || 'xxx'
const GOOGLE_CALLBACK_URL: string =
    process.env.GOOGLE_CALLBACK_URL || 'auth/google/callback'

const FACEBOOK_APP_ID: string = process.env.FACEBOOK_APP_ID || 'xxx'
const FACEBOOK_APP_SECRET: string = process.env.FACEBOOK_APP_SECRET || 'xxx'
const FACEBOOK_CALLBACK_URL: string =
    process.env.FACEBOOK_CALLBACK_URL || 'auth/facebook/callback'

const LINE_CHANNEL_ID: string = process.env.LINE_CHANNEL_ID || 'xxx'
const LINE_CHANNEL_SECRET: string = process.env.LINE_CHANNEL_SECRET || 'xxx'
const LINE_CALLBACK_URL: string =
    process.env.LINE_CALLBACK_URL || 'auth/line/callback'

export {
    NODE_ENV,
    DOMAIN,
    PORT,
    END_POINT,
    RATE_LIMIT_MAX,
    GRAPHQL_DEPTH_LIMIT,
    MLAB_URL,
    STATIC,
    PRIMARY_COLOR,
    BCRYPT_SALT,
    ISSUER,
    ACCESS_TOKEN,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN,
    REFRESH_TOKEN_SECRET,
    EMAIL_TOKEN,
    EMAIL_TOKEN_SECRET,
    RESETPASS_TOKEN,
    RESETPASS_TOKEN_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    LINE_CHANNEL_ID,
    LINE_CHANNEL_SECRET,
    NODEMAILER_PASS,
    NODEMAILER_USER,
    AUTHOR,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME
}
