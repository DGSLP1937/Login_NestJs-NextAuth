import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/User.entity';
import { ProfileEntity } from './entities/Profile.entity';
import { UserModule } from './components/users/UserModule';
import { ProfileModule } from './components/profile/ProfileModule';
import { AuthModule } from './auth/AuthModule';
import { GatoModule } from './components/gatos/GatoModule';
import { RazaModule } from './components/raza/RazaModule';
import { GatoEntity } from './entities/Gato.entity';
import { RazaEntity } from './entities/Raza.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'logindb',
      entities: [
        UserEntity,
        ProfileEntity,
        GatoEntity,
        RazaEntity
      ],
      synchronize: true,
  }), //Modules
  UserModule,
  ProfileModule,
  AuthModule,
  GatoModule,
  RazaModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
