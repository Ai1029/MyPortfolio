# MyPortfolio

エンジニアを目指す方向けにポートフォリオが公開できるアプリです

## MyPortfolio のスクリーンショット

デプロイしたアプリを[Vercel](https://my-portfolio-psi-swart-91.vercel.app/userpage/6)で確認できます

※ API サーバを render でデプロイしているため立ち上げに時間がかかる可能性（5 〜20 分程度）があります。時間をおいて何度かページを更新してみてください。

![image](https://github.com/Ai1029/MyPortfolio/blob/main/images/desktop2.png?raw=true)
<img src="https://github.com/Ai1029/MyPortfolio/blob/main/images/smartphone.png?raw=true" width="50%">

- [MyPortfolio](#myportfolio)
  - [MyPortfolio のスクリーンショット](#myportfolio-のスクリーンショット)
  - [機能・ページ遷移図](#機能ページ遷移図)
    - [工夫した点](#工夫した点)
  - [設計](#設計)
  - [環境構成](#環境構成)
  - [環境構築](#環境構築)
  - [確認方法](#確認方法)
  - [使用技術](#使用技術)
  - [追加したい機能](#追加したい機能)

## 機能・ページ遷移図

自己紹介、スキル、ポートフォリオ、今までの経験（仕事と学び）、SNS のデータを作成、編集、閲覧、削除することができます。

登録したユーザーは自分のポートフォリオページを作成して、編集、削除、閲覧ができます。

登録していないユーザーは閲覧のみ可能です。

![image](https://github.com/Ai1029/MyPortfolio/blob/main/images/function.png?raw=true)

### 工夫した点

項目が多くなると見づらくなる項目については表示の仕方を工夫しました。

スキルはドーナツチャートで、経験は時間順に並び替えてタイムラインで表示できるようにしています。

全体的に落ち着いた配色で、男女ともに使いやすく、ポートフォリオの画像が映えるよう工夫しました。

## 設計

- [API 設計](https://github.com/Ai1029/MyPortfolio/blob/main/API.md)
- ER 図

![image](https://github.com/Ai1029/MyPortfolio/blob/main/images/ER.png?raw=true)

## 環境構成

| 項目         | 内容                   | ポート |
| ------------ | ---------------------- | ------ |
| データベース | MySQL                  | 3306   |
| API サーバ   | Express （TypeScript） | 3001   |
| └ ORM        | Prisma                 |        |
| フロント     | NEXT.js（TypeScript）  | 3000   |

![image](https://github.com/Ai1029/MyPortfolio/blob/main/images/environment.png?raw=true)

## 環境構築

このアプリをクローンして実行するには、コンピュータに Git と Node.js がインストールされている必要があります。

**ダウンロードとインストールの手順**

1. このリポジトリを git clone します。

```bash
$ git clone https://github.com/Ai1029/MyPortfolio.git
```

2. MyPortfolio に入ります

```bash
$ cd MyPortfolio
```

3. MyPortfolio ディレクトリの直下に`.env` ファイルを作成

```
DB_ROOT_HOST=portfolio_db
DB_NAME=portfolio
DB_USER=（ユーザー名を入れてください）
DB_PASS=（パスワードを入れてください）
TZ=Asia/Tokyo
```

4. Firebase でプロジェクトを作成します。Firebase Authentication の認証機能を有効にします。メールとパスワードの認証を設定します。

5. client ディレクトリの中の firebase ディレクトリの中の firebase.ts ファイルに apiKey などが`.env`ファイルで設定できるようになっています。client ディレクトリの直下に`.env`ファイルを作成して、先ほど作成した Firebase のプロジェクト設定から設定情報をコピーして`.env`ファイルに貼り付けてください。

6. 5 で作成した`.env`ファイルの Firebase の設定情報の下に以下の内容を追記します。

```
NEXT_PUBLIC_API_URL=http://localhost:3001
API_URL_SSR=http://server:3001
NEXT_PUBLIC_APP_SITE_URL=http://localhost:3000
```

7. AWS で S3 のバケットを作成します。

8. 4 で作成した Firebase プロジェクトの設定のサービスアカウントから秘密鍵を生成します。
   秘密鍵を server ディレクトリの直下に置きます。（.gitignore にファイル名を追加してください。）

9. server ディレクトリの直下に`.env`ファイルを作成します。
   DATABASE_URL のユーザー名とパスワードの部分は、先ほど MyPortfolio ディレクトリの直下に作成した`.env`ファイルのユーザー名とパスワードに修正します。
   AWS は アクセスキー、シークレットキー、リージョンとともに、6 で作成した AWS のバケット名を入れてください。
   GOOGLE_APPLICATION_CREDENTIALS には 7 で server ディレクトリの直下に置いた Firebase で作成した json ファイルの名前を入れます。

```
DATABASE_URL="mysql://ユーザー名:パスワード@portfolio_db:3306/portfolio"

AWS_ACCESS_KEY_ID=アクセスキー
AWS_SECRET_ACCESS_KEY=シークレットキー
AWS_REGION=リージョン
AWS_BUCKET_NAME=バケット名

export GOOGLE_APPLICATION_CREDENTIALS="/usr/src/server/7でserverディレクトリの直下に置いたFirebaseで作成したjsonファイル名
```

9. client ディレクトリと server ディレクトリで依存関係をインストールします

```bash
$ cd client
$ npm install
```

```bash
$ cd server
$ npm install
```

10. 以下のコマンドで Docker のコンテナを立ち上げます

```bash
$ docker compose up -d
```

11. 作成したデータベースに Prisma を使用してマイグレーションします。 さらに選択が必要なカテゴリーなどは seed ファイルでデータを入れ込みます。

```bash
$ npx prisma migrate dev
$ npx prisma db seed
```

12. server ディレクトリの bcrypt ライブラリ はコンテナ内で再インストール

```bash
$ docker compose exec -it server /bin/bash
$ npm uninstall bcrypt
$ npm install bcrypt
```

## 確認方法

http://localhost:3000 をブラウザで開き、表示を確認します。

## 使用技術

- Vercel（Next.js 13.3.1） 　※フロントエンド
- TypeScript 5.0.4
- Material UI ^5.14.10
- render（Express ~4.16.1） 　※バックエンド
- PlanetScale（MySQL 5.7）
- Firebase ^9.21.0 　※認証
- S3 　※画像の保管

## 追加したい機能

- [ ] パスワード、email を変更したい場合には確認メールなどを送って二段階認証ができるようにしたい
- [ ] firebase のエラーや database のエラーなどが起きた際に console ではなく、ユーザーがわかりやすいように表示したい
