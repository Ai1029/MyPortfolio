# API 概要

| ホスト                | バージョン | データ形式 |
| --------------------- | ---------- | ---------- |
| http://localhost:3001 | v1         | JSON       |

## ユーザー

### 新規ユーザー情報を登録

```
Post / http://localhost:3001/api/v1/user
```

リクエスト内容（Json）

```
{
    "name" : "Ai Ishiwata",
    "introduction" : "エンジニアを目指しています",
    "hobby" : "映画",
    "email": "ai@yahoo.com",
    "password": "ishiwata"
}

```

レスポンスサンプル（json）

```
{
    "id" : 1,
    "name" : "Ai Ishiwata",
    "introduction" : "エンジニアを目指しています",
    "hobby" : "映画",
    "email": "ai@yahoo.com",
    "password": "ishiwata"（ハッシュ化したパスワード）
}
```

### 全てのユーザー情報を取得する

```
Get / http://localhost:3001/api/v1/user

```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル（Json）

```
[
    {
        "id" : "1",
        "name" : "Ai Ishiwata",
        "introduction" : "エンジニアを目指しています",
        "hobby" : "映画",
        "email": "ai@yahoo.com",
        "password": "ishiwata"（ハッシュ化したパスワード）
    }
]
```

### ユーザー情報を更新する

```
Patch / http://localhost:3001/api/v1/user/:id
```

リクエスト内容（Json）

```
{
    "id" : "1",
    "name" : "Ai Ishiwata",
    "introduction" : "フロントエンドエンジニアを目指しています",
    "hobby" : "映画",
    "email": "ai@yahoo.com",
    "password": "ishiwata"
}
```

レスポンスサンプル（Json）

```
{
    "id" : "1",
    "name" : "Ai Ishiwata",
    "introduction" : "フロントエンドエンジニアを目指しています",
    "hobby" : "映画",
    "email": "ai@yahoo.com",
    "password": "ishiwata"（ハッシュ化したパスワード）
}
```

### ユーザー情報を削除する

```
Delete / http://localhost:3001/api/v1/user/:id
```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル(json)

```
result 削除しました
```

## スキル

### 新規スキルを登録

```
Post / http://localhost:3001/api/v1/skill
```

リクエスト内容（Json）

```
{
    "name" : "JavaScript",
    "description" : "BootCampで習得",
    "skilllevelID" : 2,
    "userID" : 1
}

```

レスポンスサンプル（json）

```
{
    "id" : 1,
    "name" : "JavaScript",
    "description" : "BootCampで習得",
    "skilllevelID" : 2,
    "userID" : 1,
}
```

### 全てのスキルを取得する

```
Get / http://localhost:3001/api/v1/skill

```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル（Json）

```
[
    {
        "id" : 1,
        "name" : "JavaScript",
        "description" : "BootCampで習得",
        "skilllevelID" : 2,
        "userID" : 1
    }
]
```

### スキルを更新する

```
Patch / http://localhost:3001/api/v1/skill/:id
```

リクエスト内容（Json）

```
{
    "id" : 1,
    "name" : "JavaScript",
    "description" : "BootCampで習得後、学び続けています",
    "skilllevelID" : 2,
    "userID" : 1
}
```

レスポンスサンプル（Json）

```
{
    "id" : 1,
    "name" : "JavaScript",
    "description" : "BootCampで習得後、学び続けています",
    "skilllevelID" : 2,
    "userID" : 1
}
```

### スキルを削除する

```
Delete / http://localhost:3001/api/v1/skill/:id
```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル(json)

```
result 削除しました
```

## 今までの経験

### 新規経験を登録

```
Post / http://localhost:3001/api/v1/experience
```

リクエスト内容（Json）

```
{
    "name" : "職種",
    "description" : "仕事の具体的な内容",
    "company" : "会社の名前",
    "experiencecategoryID" :　1,
    "startyearID" : 2,
    "startmonthID" : 5,
    "finishyearID" : 3,
    "finishmonthID" : 6,
    "userID" : 1
}

```

レスポンスサンプル（json）

```
{
    "id" : 1,
    "name" : "職種",
    "description" : "仕事の具体的な内容",
    "company" : "会社の名前",
    "experiencecategoryID" :　1,
    "startyearID" : 2,
    "startmonthID" : 5,
    "finishyearID" : 3,
    "finishmonthID" : 6,
    "userID" : 1
}
```

### 全ての経験を取得する

```
Get / http://localhost:3001/api/v1/experience

```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル（Json）

```
[
    {
        "id" : 1,
        "name" : "職種",
        "description" : "仕事の具体的な内容",
        "company" : "会社の名前",
        "experiencecategoryID" :　1,
        "startyearID" : 2,
        "startmonthID" : 5,
        "finishyearID" : 3,
        "finishmonthID" : 6,
        "userID" : 1
    }
]
```

### 経験を更新する

```
Patch / http://localhost:3001/api/v1/experience/:id
```

リクエスト内容（Json）

```
{
    "id" : 1,
    "name" : "職種",
    "description" : "仕事の具体的な内容を記載します",
    "company" : "会社の名前",
    "experiencecategoryID" :　1,
    "startyearID" : 2,
    "startmonthID" : 5,
    "finishyearID" : 3,
    "finishmonthID" : 6,
    "userID" : 1
}
```

レスポンスサンプル（Json）

```
{
    "id" : 1,
    "name" : "職種",
    "description" : "仕事の具体的な内容を記載します",
    "company" : "会社の名前",
    "experiencecategoryID" :　1,
    "startyearID" : 2,
    "startmonthID" : 5,
    "finishyearID" : 3,
    "finishmonthID" : 6,
    "userID" : 1
}
```

### 経験を削除する

```
Delete / http://localhost:3001/api/v1/experience/:id
```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル(json)

```
result 削除しました
```

## ポートフォリオ

### 新規ポートフォリオを登録

```
Post / http://localhost:3001/api/v1/portfolio
```

リクエスト内容（Json）

```
{
    "name" : "アプリの名前",
    "description" : "アプリの具体的な内容",
    "url" : "アプリのURL",
    "userID" : 1
}

```

レスポンスサンプル（json）

```
{
    "id" : 1,
    "name" : "アプリの名前",
    "description" : "アプリの具体的な内容",
    "url" : "アプリのURL",
    "userID" : 1
}
```

### 全てのポートフォリオを取得する

```
Get / http://localhost:3001/api/v1/portfolio

```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル（Json）

```
[
    {
        "id" : 1,
        "name" : "アプリの名前",
        "description" : "アプリの具体的な内容",
        "url" : "アプリのURL",
        "userID" : 1
    }
]
```

### ポートフォリオを更新する

```
Patch / http://localhost:3001/api/v1/portfolio/:id
```

リクエスト内容（Json）

```
{
    "id" : 1,
    "name" : "アプリの名前",
    "description" : "アプリの具体的な内容を記載します",
    "url" : "アプリのURL",
    "userID" : 1
}
```

レスポンスサンプル（Json）

```
{
    "id" : 1,
    "name" : "アプリの名前",
    "description" : "アプリの具体的な内容を記載します",
    "url" : "アプリのURL",
    "userID" : 1
}
```

### ポートフォリオを削除する

```
Delete / http://localhost:3001/api/v1/portfolio/:id
```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル(json)

```
result 削除しました
```

## SNS

### 新規 SNS を登録

```
Post / http://localhost:3001/api/v1/sns
```

リクエスト内容（Json）

```
{
    "typeofSNSID" : 3,
    "url" : "SNSのURL",
    "userID" : 1
}

```

レスポンスサンプル（json）

```
{
    "id" : 1,
    "typeofSNSID" : 3,
    "url" : "SNSのURL",
    "userID" : 1
}
```

### 全ての SNS を取得する

```
Get / http://localhost:3001/api/v1/sns

```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル（Json）

```
[
    {
        "id" : 1,
        "typeofSNSID" : 3,
        "url" : "SNSのURL",
        "userID" : 1
    }
]
```

### SNS を更新する

```
Patch / http://localhost:3001/api/v1/sns/:id
```

リクエスト内容（Json）

```
{
    "id" : 1,
    "typeofSNSID" : 3,
    "url" : "SNSのURLを修正",
    "userID" : 1
}
```

レスポンスサンプル（Json）

```
{
    "id" : 1,
    "typeofSNSID" : 3,
    "url" : "SNSのURLを修正",
    "userID" : 1
}
```

### SNS を削除する

```
Delete / http://localhost:3001/api/v1/sns/:id
```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル(json)

```
result 削除しました
```
