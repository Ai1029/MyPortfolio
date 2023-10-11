import React, { useState } from "react";
import { NextPage } from "next";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import router, { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

type Input = {
  name: string;
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const ENDPOINT_URL_USER = apiUrl + "api/v1/user";
  const ENDPOINT_URL_SIGNIN = apiUrl + "signin";
  // const ENDPOINT_URL_SESSION = apiUrl + "check-session";
  const router = useRouter();

  const [input, setInput] = useState<Input>({
    name: "",
    email: "",
    password: "",
  });

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // firebaseで新しいユーザーを登録する
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      const user = userCredential.user;
      console.log("新規作成できた");
      console.log("user", user);

      const createUser = {
        name: input.name,
        email: input.email,
        password: input.password,
        uid: user.uid,
        introduction: "",
        hobby: "",
      };

      try {
        // ユーザー情報をAPIサーバに送ってMySQLに登録
        await axios.post(ENDPOINT_URL_USER, createUser);
        // IDトークンを取得する
        const idToken = await user.getIdToken();
        console.log("トークンの取得できた");
        console.log("idToken", idToken);

        // 発行したIDトークンを使ってサインインする（認証情報のためheaderにidTokenを入れてAPIサーバでチェック）
        const response = await axios.post(
          ENDPOINT_URL_SIGNIN,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        // ログインが成功したことを確認するため、サーバーからの応答をチェック
        if (response.status === 200) {
          console.log("ログイン成功");
          const userData = response.data; // ユーザーデータを取得
          console.log(userData);
          console.log(userData.id);

          //　データの取得が完了してからルート遷移を行う
          await router.push(`/userpage/${userData.id}`);
        } else {
          console.log("ログイン失敗");
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>MyPortfolio</h2>
      <p>新規ユーザーアカウントを作成</p>
      <form onSubmit={onSignUp}>
        <div>
          <label htmlFor="name">名前</label>
          <br></br>
          <input
            type="text"
            name="name"
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <br></br>
          <input
            type="text"
            name="email"
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <br></br>
          <input
            type="password"
            name="password"
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <button type="submit">ユーザー新規登録</button>
          <p>
            すでにアカウントをお持ちの方はこちら
            <Link href="/signin">サインイン</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
