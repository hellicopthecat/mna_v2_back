import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  async generateAccessToken(payload: { [key: string]: number | string }) {
    return await this.jwtService.signAsync(
      { ...payload, createdAt: new Date() },
      {
        secret: process.env.ACCESS_SECRET,
        expiresIn: '1d',
      },
    );
  }
  async generateRefreshToken(payload: { [key: string]: number | string }) {
    return await this.jwtService.signAsync(
      { ...payload, createdAt: new Date() },
      {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      },
    );
  }

  async verifiedAccessToken(
    payload: string,
  ): Promise<{ userId: string; createdAt: Date }> {
    return await this.jwtService.verifyAsync<{
      userId: string;
      createdAt: Date;
    }>(payload, {
      secret: process.env.ACCESS_SECRET,
    });
  }

  async verifiedRefreshToken(
    payload: string,
  ): Promise<{ userId: string; createdAt: Date }> {
    try {
      const verifiedToken = await this.jwtService.verifyAsync<{
        userId: string;
        createdAt: Date;
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
