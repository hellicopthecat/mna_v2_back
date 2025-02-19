import { Controller, Post, Body, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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
    return;
  }
  @Post('/login')
  async login(
    @Body() logInDto: LogInDto,
    @Session() session: Record<string, any>,
  ) {
    const userId = await this.authService.logIn(logInDto);
    session.uid = userId;
    return;
  }
}
