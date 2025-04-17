import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  async generateAccessToken(payload: { [key: string]: number | string }) {
    return await this.jwtService.signAsync(payload);
  }
  async generateRefreshToken(payload: { [key: string]: number | string }) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_SECRET,
    });
  }
  async verifiedAccessToken(payload: string): Promise<{ userId: string }> {
    return await this.jwtService.verifyAsync(payload);
  }
  async verifiedRefreshToken(payload: string): Promise<{ userId: string }> {
    try {
      const verifiedToken = await this.jwtService.verifyAsync<{
        userId: string;
      }>(payload, {
        secret: process.env.REFRESH_SECRET,
      });
      return verifiedToken;
    } catch (error) {
      const err = error as Error;
      Logger.error('Refresh Token Verification Error', err.message);
      throw new UnauthorizedException('인증실패');
    }
  }
}
