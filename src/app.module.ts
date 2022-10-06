import { Module } from '@nestjs/common';
import { LibroModule } from './libro/libro.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './libro/entities/libro.entity';
import { AutorModule } from './autor/autor.module';
import { CategoriaModule } from './categoria/categoria.module';
import { Autor } from './autor/entities/autor.entity';
import { Categoria } from './categoria/entities/categoria.entity';

@Module({
  imports: [ 
    LibroModule,
    AutorModule,
    CategoriaModule,
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'database.training.cstechlab.com',
      port: 1433,
      username: 'sqlserver',
      password: 'Y"8l)[HC&uje7[mh',
      database: 'BIBLIOTECA',
      synchronize: true,
      extra: {
        trustServerCertificate: true

      },
      entities: [
        Libro,
        Autor,
        Categoria
      ]
    }),

  ],
})
export class AppModule { }
