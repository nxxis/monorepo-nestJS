import { Module } from '@nestjs/common';
import { join } from 'path';
import { AuthenticationModule } from '@app/authentication';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigProvider } from './providers/config.provider';
import { DatabaseProvider } from './providers/database.provider';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    /** this is a provider to extract environment variables */
    ConfigProvider,
    DatabaseProvider,

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      inrospection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    AuthenticationModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
