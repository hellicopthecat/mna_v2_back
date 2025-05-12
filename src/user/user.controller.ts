import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { AuthDecorator } from 'src/auth/auth-decorator/auth-decorator.decorator';

@Controller('user')
@UseGuards(AuthGuard)
@Serialize(UserDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Get('byUsername/:username')
  findOneByUserName(
    @Param('username') username: string,
    @AuthDecorator() token: string,
  ) {
    return this.userService.findOneByUserName(username, token);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
