import React, { useState } from "react";
import { NextPage } from "next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import router, { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

type Input = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const ENDPOINT_URL_SIGNIN = apiUrl + "signin";
  const router = useRouter();

  const [input, setInput] = useState<Input>({
    email: "",
    password: "",
  });

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Firebaseでユーザー認証を行う
      const userCredential = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      const user = userCredential.user;
      console.log("認証成功");
      console.log("user", user);

      try {
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

        // サインインが成功したことを確認するため、サーバーからの応答をチェック
        if (response.status === 200) {
          console.log("サインイン成功");
          const userData = response.data; // ユーザーデータを取得
          console.log(userData);
          console.log(userData.id);

          //　データの取得が完了してからルート遷移を行う
          await router.push(`/userpage/${userData.id}`);
        } else {
          console.log("サインイン失敗");
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

      <form onSubmit={onSignIn}>
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
          <button type="submit">サインイン</button>
          <p>
            まだアカウントをお持ちでない方はこちら
            <Link href="/signup">ユーザー新規登録</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
