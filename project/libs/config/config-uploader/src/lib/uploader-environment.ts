import { IsNumber, IsString, Max, Min } from 'class-validator';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum UploaderValidationMessage {
  UploadPortRequired = 'Upload port is required',
  UploadDirectoryRequired = 'UploadDirectory is required',
  UploadEnvironmentRequired = 'Environment is required'
}

export class UploaderEnvironment {

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
}
