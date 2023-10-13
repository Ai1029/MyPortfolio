import React, { useState } from "react";
import { NextPage } from "next";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useRouter } from "next/router";
import axios from "axios";
import { SignUpInput } from "../../../types/types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        My Portfolio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const SignUp: NextPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [input, setInput] = useState<SignUpInput>({
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
        await axios.post(`${apiUrl}/api/v1/user`, createUser);
        // IDトークンを取得する
        const idToken = await user.getIdToken();
        console.log("トークンの取得できた");

        // 発行したIDトークンを使ってサインインする（認証情報のためheaderにidTokenを入れてAPIサーバでチェック）
        const response = await axios.post(
          `${apiUrl}/signin`,
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

          //　データの取得が完了してからルート遷移を行う
          await router.push(`/userpage/${userData.id}`);
        } else {
          console.log("ログイン失敗");
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://my-portfolio-images-s3.s3.ap-northeast-1.amazonaws.com/background/hisu-lee-V4Pn7QeYdPQ-unsplash.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#c678f5" }}>
              <AssignmentIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              My Portfolio Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={onSignUp} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {"すでにアカウントをお持ちの方はこちら Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUp;
