import { getMongoConnectionString } from '@project/util/util-core';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('uploader.dbUser'),
          password: config.get<string>('uploader.dbPassword'),
          host: config.get<string>('uploader.dbHost'),
          port: config.get<string>('uploader.dbPort'),
          authDatabase: config.get<string>('uploader.dbAuthBase'),
          databaseName: config.get<string>('uploader.dbName'),
        })
      }
    },
    inject: [ConfigService]
  }
}
