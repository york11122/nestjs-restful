import * as nodemailer from 'nodemailer'
import * as handlebars from 'handlebars'
import * as fs from 'fs'
import { User } from '@/core/user/user.entity'

import {
    AUTHOR,
    ISSUER,
    NODEMAILER_USER,
    NODEMAILER_PASS
} from '@/environment'

export const sendMail = async (
    user: User,
    param: any,
    template: string
): Promise<any> => {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        secure: false, // true
        host: 'smtp.gmail.com',
        port: 587, // 465
        auth: {
            user: NODEMAILER_USER!,
            pass: NODEMAILER_PASS!
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const readHTMLFile = (path, callback) => {
        fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
            if (err) {
                callback(err)
            } else {
                callback(null, html)
            }
        })
    }

    readHTMLFile(`./src/assets/templates/${template}`, (err, html) => {
        const template = handlebars.compile(html)

        const common = {
            author: AUTHOR!,
            issuer: ISSUER!,
            to: user.name,
            tracking: param.tracking
        }

        const Param = {
            ...param,
            ...common
        }

        const htmlToSend = template(Param)

        const mailOptions = {
            from: NODEMAILER_USER, // sender address
            to: param.email, // list of receivers
            subject: param.subject,
            html: htmlToSend,
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                throw err
            }
        })

        transporter.close()
    })
}
