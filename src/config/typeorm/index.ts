import { Injectable, Logger } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import {
    getMetadataArgsStorage,
} from 'typeorm'
import { MLAB_URL } from '@environment'

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
    async createTypeOrmOptions (): Promise<TypeOrmModuleOptions> {
        const options = {
            url: MLAB_URL,
            type: 'mongodb' as 'mongodb',
            entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
            synchronize: true,
            autoLoadEntities: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepConnectionAlive: true,
            logging: true,
            extra: { ssl: true, authSource: "admin" }

        }
        return options
    }
}
