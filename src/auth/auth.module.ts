import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
// import { UserRepository } from './users.repository';
// import { DataSource } from 'typeorm/data-source';
// import { UserRepository } from './users.repository';
// import { UserRepository } from './users.repository';



// import { Repository } from 'typeorm';

@Module({
  // private dataSource: DataSource,
  //passportjs is module for verying jwt tokens
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      // secret: 'topSecret51',
      // signOptions: {
      //   expiresIn: 3600,
      // },
    }),
    TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtStategy],
  exports: [JwtStategy, PassportModule],
})
export class AuthModule {}
