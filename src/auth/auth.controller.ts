import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthDecorator } from './auth-decorator/auth-decorator.decorator';
import { UserDto } from 'src/user/dto/user.dto';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { LogOutDto } from './dto/log-out.dto';
import { CompanyDto } from 'src/company/dto/company.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/join')
  async join(@Body() createAuthDto: CreateUserDto) {
    const { userId, accessToken, refreshToken } =
      await this.authService.create(createAuthDto);
    return { userId, accessToken, refreshToken };
  }

  @Post('/login')
  async login(@Body() logInDto: LogInDto) {
    const { userId, accessToken, refreshToken } =
      await this.authService.logIn(logInDto);
    return { userId, accessToken, refreshToken };
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  async logOut(@Body() logOutDto: LogOutDto) {
    return await this.authService.logOut(Number(logOutDto.userId));
  }

  @Get('/myprofile')
  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  async getMyProfile(@AuthDecorator() userToken: string) {
    return await this.authService.getMyProfile(userToken);
  }
  @Get('/myCompany')
  @UseGuards(AuthGuard)
  @Serialize(CompanyDto)
  async getMyCompany(@AuthDecorator() userToken: string) {
    return await this.authService.getMyCompany(userToken);
  }
}
