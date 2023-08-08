// import { Logger } from '@nestjs/common';
// import { join } from 'path';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dbConfig = () => ({
  type: 'mysql',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.MYSQL_HOST, 10) || 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  // ssl: process.env.POSTGRES_SSL === 'true',
  // entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  // We are using migrations, synchronize should be set to false.
  // synchronize: false,
  // dropSchema: false,
  // // Run migrations automatically,
  // // you can disable this if you prefer running migration manually.
  // migrationsRun: false,
  // logging: false,
  // migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
  // cli: {
  //   migrationsDir: join(__dirname, '../migrations'),
  //   entitiesDir: join(__dirname, '../**/*.entity{.ts,.js}'),
  // },
});

// if (process.env.NODE_ENV === 'development') {
//   Logger.debug(dbConfig());
// }

export default dbConfig();
