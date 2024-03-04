import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { AuthenticationModule } from '@app/authentication';

@Module({
  imports: [UserModule, AuthenticationModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
