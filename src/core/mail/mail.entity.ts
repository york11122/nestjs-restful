import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { Expose, Exclude } from 'class-transformer'
import * as uuid from 'uuid'
import * as moment from 'moment'

export enum MailType {
    FORGOT_PASSWORD,
    VERIFY_MAIL
}

@Entity()
export class Mail {
    @Expose()
    @ObjectIdColumn()
    _id: string

    @Expose()
    @Column()
    userId: string

    @Expose()
    @Column()
    type: MailType

    @Expose()
    @Column()
    isOpened: boolean

    @Expose()
    @Column()
    email: string

    @Expose()
    @Column()
    createdAt: Date
    @Expose()
    @Column()
    updatedAt: Date

    @Expose()
    @Column()
    expiredAt: Date

    constructor(mail: Partial<Mail>) {
        if (mail) {
            Object.assign(this, mail)
            this._id = this._id || uuid.v1()
            this.isOpened = this.isOpened || false
            this.createdAt = this.createdAt || new Date()
            this.updatedAt = new Date()
            this.expiredAt = this.expiredAt || moment(new Date()).add(1, 'd').toDate()
        }
    }
}
