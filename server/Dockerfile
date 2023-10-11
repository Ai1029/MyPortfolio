FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# AWS SDKをインストール
RUN npm install aws-sdk

COPY . .

EXPOSE 3001
EXPOSE 9229

# CMD ["bash", "-c", "export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} && export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} && export AWS_REGION=${AWS_REGION} && npm start"]
CMD ["npm", "start"]