FROM node:18.16-alpine

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

RUN npm run prisma:start

RUN npm run build

EXPOSE 4444

CMD ["npm", "run", "deploy"]


