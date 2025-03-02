import { Controller, Post, Body, Session, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthDecorator } from './auth-decorator/auth-decorator.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/join')
  async join(
    @Body() createAuthDto: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    const userId = await this.authService.create(createAuthDto);
    session.uid = userId;
    return userId;
  }
  @Post('/login')
  async login(
    @Body() logInDto: LogInDto,
    @Session() session: Record<string, any>,
  ) {
    const userId = await this.authService.logIn(logInDto);
    session.uid = userId;
    return userId;
  }
  @Post('/logout')
  logOut(@Session() session: Record<string, any>) {
    session.uid = null;
    if (!session.uid) {
      return {
        ok: true,
      };
    }
  }
  @Get('/myprofile')
  async getMyProfile(@AuthDecorator() userId: string) {
    return await this.authService.getMyProfile(Number(userId));
  }
}
