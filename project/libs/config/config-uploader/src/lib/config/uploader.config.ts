import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { UploaderEnvironment } from '../uploader-environment';
import { plainToInstance } from 'class-transformer';

const DEFAULT_PORT = 3000;

export interface UploaderConfig {
  environment: string;
  uploadDirectory: string;
  port: number;
}

export default registerAs('uploader', (): UploaderConfig => {
  const config: UploaderConfig = {
    environment: process.env.NODE_ENV,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    port: parseInt(process.env.POR || DEFAULT_PORT.toString(), 10),
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
