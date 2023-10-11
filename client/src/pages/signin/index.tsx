import React, { useState } from "react";
import { NextPage } from "next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import router, { useRouter } from "next/router";
import axios from "axios";
import { SingInInput } from "../../../types/types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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

const SignIn: NextPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const ENDPOINT_URL_SIGNIN = apiUrl + "signin";
  const router = useRouter();

  const [input, setInput] = useState<SingInInput>({
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
              "url(https://my-portfolio-images-s3.s3.ap-northeast-1.amazonaws.com/background/daniele-levis-pelusi--ZjNje5zg0I-unsplash.jpg)",
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              My Portfolio Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={onSignIn} sx={{ mt: 1 }}>
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"アカウントをお持ちでない方はこちら Sign Up"}
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

export default SignIn;
