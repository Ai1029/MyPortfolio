# MyPortfolio

エンジニアを目指す方に向けにポートフォリオが公開できるアプリです

## MyPortfolio のスクリーンショット

デプロイしたアプリを[Vercel](https://my-portfolio-psi-swart-91.vercel.app/userpage/7)で確認できます

※ API サーバを render でデプロイしているため立ち上げに時間がかかる可能性（5 〜20 分程度）があります。時間をおいて何度かページを更新してみてください。

![image](https://github.com/Ai1029/MyPortfolio/blob/main/images/desktop.png?raw=true)
<img src="https://github.com/Ai1029/MyPortfolio/blob/main/images/smartphone.png?raw=true" width="50%">

- [MyPortfolio](#myportfolio)
  - [MyPortfolio のスクリーンショット](#myportfolio-のスクリーンショット)
  - [機能](#機能)
    - [工夫した点](#工夫した点)
  - [設計（ER 図、API 設計）](#設計er-図api-設計)
  - [環境構成](#環境構成)
  - [環境構築](#環境構築)
  - [確認方法](#確認方法)
  - [使用技術](#使用技術)
  - [追加したい機能](#追加したい機能)

## 機能

自己紹介、スキル、ポートフォリオ、今までの経験（仕事と学び）、SNS のデータを作成、編集、閲覧、削除することができます。

### 工夫した点

項目が多くなると見づらくなる項目については表示の仕方を工夫しました。
スキルはドーナツチャートで、経験は時間順に並び替えてタイムラインで表示できるようにしています。
全体的に落ち着いた配色で、男女ともに使いやすく、ポートフォリオの画像が映えるよう工夫しました。

## 設計（ER 図、API 設計）

## 環境構成

| 項目         | 内容                   | ポート |
| ------------ | ---------------------- | ------ |
| データベース | MySQL                  | 3306   |
| API サーバ   | Express （TypeScript） | 3001   |
| └ ORM        | Prisma                 |        |
| フロント     | NEXT.js（TypeScript）  | 3000   |

![image](https://github.com/Ai1029/MyPortfolio/blob/main/images/desktop.png?raw=true)

## 環境構築

このアプリをクローンして実行するには、コンピュータに Git と Node.js がインストールされている必要があります。

**ダウンロードとインストールの手順**

1. このリポジトリを git clone します。

```bash
$ git clone https://github.com/Ai1029/MyPortfolio.git
```

2. Go into the repository

```bash
$ cd myportfolio
```

3.　.env ファイルを作成

4. Install dependencies

```bash
$ docker compose up -d
```

5. Install dependencies

```bash
$ npm install
```

6. Create database, Run migrations and set up the database

```bash
$ npx prisma migrate dev
```

7. カテゴリーなど select データをデータベースに入れる

```bash
$ npx prisma db seed
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
