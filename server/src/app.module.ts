import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/controllers/auth/auth.module';
import { ProfileModule } from './infrastructure/controllers/profile/profile.module';
import { UsersModule } from './infrastructure/controllers/users/users.module';
import { ChatModule } from './infrastructure/tcp/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    AuthModule,
    ProfileModule,
    ChatModule,
    UsersModule
  ],
})
export class AppModule { };
