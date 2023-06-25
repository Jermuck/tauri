# Stack Tech
  PostgreSQL
  MYSQL
  TYPEORM 
  JEST 
  PRISMA
  Docker
  Docker-compose
  NestJs
  Git
  Unit-Test
  Swagger

# Env example
  PORT = 4444
  SECRET_KEY = SECRET
  TIME_ACCESS = 416000
  TIME_REFRESH = 6480000
  POSTGRES_USER = postgres
  POSTGRES_PASSWORD = postgres
  POSTGRES_DB = nest
  DB_PORT = 5432
  DATABASE_URL = postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${DB_PORT}/${POSTGRES_DB}
  
# Local start
  1. touch .env
  2. configurate .env
  3. npm run migration:push
  4. npm run start:dev

# Docker-compose start
  1. touch .env
  2. configurate .env and change 'localhost' in 'postgres'
  3. docker-compose up --build or make run if you have Make

# Swagger - http://localhost:4444/api#

# Prisma studio - npm run studio
