import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GooglePassportGuard } from '../../guards/google.passport.guard';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('login/google')
  @UseGuards(GooglePassportGuard)
  async googleAuth() {
    return { message: 'Google Auth' };
  }

  @Get('login/google/redirect')
  @UseGuards(GooglePassportGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);
    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.redirect(`http://localhost:40757`);
  }
}
