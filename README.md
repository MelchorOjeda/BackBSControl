## Archivo .env
DATABASE_URL="mysql://root:12345678@localhost:3306/bscontrol"

# Dependencias
npm install
npm install @nestjs/config @nestjs/swagger @nestjs/mapped-types
npm install --save-dev @types/swagger-jsdoc
npm install class-validator class-transformer
npm install bcrypt
npm install @types/bcrypt --save-dev


# Prisma
npm install @prisma/client
npm install --save-dev prisma
npx prisma init
npx prisma migrate dev --name init

