import { Injectable } from '@nestjs/common';
import { TokenPayload } from '@project/shared/app-types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,

  ) { }

  /* Извлечение из токена */
  public async getPayload(token: string): Promise<TokenPayload> {
    return this.jwtService.decode(token) as unknown as TokenPayload;
  }
}
