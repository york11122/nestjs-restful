import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { Expose, Exclude } from 'class-transformer'
import * as uuid from 'uuid'
import * as moment from 'moment'
@Entity()
export class SMS {
    @Expose()
    @ObjectIdColumn()
    _id: string

    @Expose()
    @Column()
    @Exclude()
    code: string

    @Expose()
    @Column()
    isVerified: boolean

    @Expose()
    @Column()
    phone_number: string

    @Expose()
    @Column()
    createdAt: Date

    @Expose()
    @Column()
    updatedAt: Date

    @Expose()
    @Column()
    expiredAt: Date

    constructor(sms: Partial<SMS>) {
        if (sms) {
            Object.assign(this, sms)
            this._id = this._id || uuid.v1()
            this.isVerified = this.isVerified || false
            this.createdAt = this.createdAt || new Date()
            this.updatedAt = new Date()
            this.expiredAt = this.expiredAt || moment(new Date()).add(15, 'm').toDate()
        }
    }
}
