FROM node:18.12

WORKDIR /usr/src/app


# ローカル環境のパッケージファイルをコピー
COPY package*.json ./

# 依存パッケージをインストール
RUN npm install && npm install -g ts-node

# Next.jsアプリケーションをビルド
COPY . .

EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "run","dev:ts"]