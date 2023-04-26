import { getMongoConnectionString } from '@project/util/util-core';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('application.dbUser'),
          password: config.get<string>('application.dbPassword'),
          host: config.get<string>('application.dbHost'),
          port: config.get<string>('application.dbPort'),
          authDatabase: config.get<string>('application.dbAuthBase'),
          databaseName: config.get<string>('application.dbName'),
        })
      }
    },
    inject: [ConfigService]
  }
}
