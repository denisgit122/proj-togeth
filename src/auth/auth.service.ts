import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';
import { AdminService } from '../admin';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const admin: Admin = await this.adminService.getAdminByIdOrEmail(
      loginDto.email,
    );

    if (!admin) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      admin.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const accessToken = await this.jwtService.sign(
      { id: admin.id, strategy: 'access' },
      {
        expiresIn: '10m',
        secret: process.env.SECRET_ACCESS_WORD,
      },
    );

    const refreshToken = await this.jwtService.sign(
      { id: admin.id, strategy: 'refresh' },
      {
        expiresIn: '20m',
        secret: process.env.SECRET_REFRESH_WORD,
      },
    );

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  }

  async refresh(id: string) {
    const accessToken = await this.jwtService.sign(
      { id, strategy: 'access' },
      {
        expiresIn: '10m',
        secret: process.env.SECRET_ACCESS_WORD,
      },
    );

    const refreshToken = await this.jwtService.sign(
      { id, strategy: 'refresh' },
      {
        expiresIn: '20m',
        secret: process.env.SECRET_REFRESH_WORD,
      },
    );

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  }
}
