import { IsNumber, IsString, Max, Min } from 'class-validator';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum UploaderValidationMessage {
  ServeRootRequired = 'ServeRoot is required',
  UploadPortRequired = 'Upload port is required',
  UploadDirectoryRequired = 'UploadDirectory is required',
  UploadEnvironmentRequired = 'Environment is required',
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
}

export class UploaderEnvironment {
  @IsString({
    message: UploaderValidationMessage.ServeRootRequired
  })
  serveRoot: string;

  @IsString({
    message: UploaderValidationMessage.UploadEnvironmentRequired
  })
  environment: string;

  @IsString({
    message: UploaderValidationMessage.UploadDirectoryRequired
  })
  uploadDirectory: string;

  @IsNumber({}, {
    message: UploaderValidationMessage.UploadPortRequired
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsString({
    message: UploaderValidationMessage.DBHostRequired
  })
  dbHost: string;

  @IsNumber({}, {
    message: UploaderValidationMessage.DBPortRequired
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  dbPort: number;

  @IsString({
    message: UploaderValidationMessage.DBUserRequired
  })
  dbUser: string;

  @IsString({
    message: UploaderValidationMessage.DBNameRequired
  })
  dbName: string;

  @IsString({
    message: UploaderValidationMessage.DBPasswordRequired
  })
  dbPassword: string;

  @IsString({
    message: UploaderValidationMessage.DBBaseAuthRequired
  })
  dbAuthBase: string;
}
