import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GooglePassportGuard } from '../../guards/google.passport.guard';

@Controller('auth')
export class AuthController {
  @Get('login/google')
  @UseGuards(GooglePassportGuard)
  async googleAuth() {
    return { message: 'Google Auth' };
  }
  @Get('login/google/redirect')
  @UseGuards(GooglePassportGuard)
  async googleAuthRedirect() {
    return { message: 'Google Auth Redirect' };
  }
  @Get('login/google/status')
  async googleAuthStatus(@Req() request: any) {
    console.log(request);
    if (request.user) {
      return { message: 'User is logged in', user: request.user };
    }
    return { message: 'User is not logged in' };
  }
}
