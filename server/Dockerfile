FROM node:lts
ENV NODE_ENV=production

WORKDIR /usr/src/server

COPY package*.json .

RUN npm install aws-sdk
RUN npm install -g prisma
RUN npm install --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]