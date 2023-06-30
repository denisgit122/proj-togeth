import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule, OrderController, OrderService } from './orders';
import {
  MailModule,
  MailService,
  PasswordModule,
  PasswordService,
  PrismaModule,
  PrismaService,
  TokenModule, TokenService
} from "./core";
import {
  AccessStrategy,
  ActivateStrategy,
  AuthController,
  AuthModule,
  AuthService, ForgotStrategy,
  RefreshStrategy,
} from './auth';
import { JwtModule } from '@nestjs/jwt';
import { AdminController, AdminModule, AdminService } from './admin';
import { PassportModule } from '@nestjs/passport';
import {
  ManagerController,
  ManagerModule,
  ManagerService,
} from './managers';

@Module({
  imports: [
    OrderModule,
    PrismaModule,
    AuthModule,
    PassportModule,
    ManagerModule,
    PasswordModule,
    JwtModule.register({
      secret: process.env.SECRET_ACCESS_WORD,
      signOptions: {
        expiresIn: '10m',
      },
    }),
    JwtModule.register({
      secret: process.env.SECRET_REFRESH_WORD,
      signOptions: {
        expiresIn: '20m',
      },
    }),
    JwtModule.register({
      secret: process.env.SECRET_ACTIVATE_WORD,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    JwtModule.register({
      secret: process.env.SECRET_FORGOT_PASSWORD_WORD,
      signOptions: {
        expiresIn: '30m',
      },
    }),
    AdminModule,
    TokenModule,
    MailModule,
  ],
  controllers: [
    AppController,
    OrderController,
    AuthController,
    AdminController,
    ManagerController,
  ],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    AdminService,
    AccessStrategy,
    RefreshStrategy,
    ManagerService,
    OrderService,
    MailService,
    PasswordService,
    ActivateStrategy,
    TokenService,
    ForgotStrategy
  ],
})
export class AppModule {}
