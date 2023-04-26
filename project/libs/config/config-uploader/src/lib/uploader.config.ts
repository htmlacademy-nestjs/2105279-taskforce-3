import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { UploaderEnvironment } from './uploader-environment';
import { plainToInstance } from 'class-transformer';

const DEFAULT_PORT = 3000;
const DEFAULT_MONGO_PORT = 27017;

export interface UploaderConfig {
  serveRoot: string;
  environment: string;
  uploadDirectory: string;
  port: number;

  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbName: string;
  dbPassword: string;
  dbAuthBase: string;
}

export default registerAs('uploader', (): UploaderConfig => {
  const config: UploaderConfig = {
    serveRoot: process.env.SERVE_ROOT,
    environment: process.env.NODE_ENV,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    port: parseInt(process.env.POR || DEFAULT_PORT.toString(), 10),

    dbHost: process.env.MONGO_HOST,
    dbPort: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
    dbName: process.env.MONGO_DB,
    dbUser: process.env.MONGO_USER,
    dbPassword: process.env.MONGO_PASSWORD,
    dbAuthBase: process.env.MONGO_AUTH_BASE,

  };

  const uploaderEnvironment = plainToInstance(
    UploaderEnvironment,
    config,
    { enableImplicitConversion: true }
  );

  const errors = validateSync(
    uploaderEnvironment, {
    skipMissingProperties: false
  }
  );

  if (errors.length > 0) {
    throw new Error(
      `[Uploader Config]: Environments validation failed. Please check .env file.
       Error message: ${errors.toString()}`,
    );
  }

  return config;
});
