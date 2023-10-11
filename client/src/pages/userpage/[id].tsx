import router, { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { getServerSideProps } from "../api/api";
import { Props } from "../../../types/types";
import {
  Toolbar,
  AppBar,
  Button,
  CssBaseline,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import "react-vertical-timeline-component/style.min.css";
import UserpageInfo from "../../components/userpageinfo";
import UserpageSkill from "../../components/userpageskill";
import UserpagePortfolio from "../../components/userpageportfolio";
import UserpageExperience from "../../components/userpageexperience";
import UserpageSns from "../../components/userpagesns";

const Userpage: FC<Props> = ({
  userInfo,
  userImage,
  userSkill,
  userExperience,
  userPortfolio,
  userSns,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // ログイン状態を確認
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // ユーザーがログインしている場合
        setUser(authUser);
      } else {
        // ユーザーがログインしていない場合
        setUser(null);
      }
    });
    return () => {
      // コンポーネントがアンマウントされるときにリスナーを解除
      unsubscribe();
    };
  }, []);

  const signout = () => {
    signOut(auth)
      .then(async () => {
        console.log("ユーザーがサインアウトしました");
        const url = `http://localhost:3000/signin`;
        router.push(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main">
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="sticky"
            sx={{
              background: "linear-gradient(45deg, #CE9FFC 30%, #7367F0 90%)", // グラデーションの設定
            }}
          >
            {user ? (
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  MyPortfolio
                </Typography>
                <Button href={`/edit/${userInfo.id}`} color="inherit">
                  Edit
                </Button>
                <Button type="submit" color="inherit" onClick={signout}>
                  SignOut
                </Button>
              </Toolbar>
            ) : (
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  MyPortfolio
                </Typography>
                <Button href={`/signin`} color="inherit">
                  SignIn
                </Button>
              </Toolbar>
            )}
          </AppBar>
          <UserpageInfo userInfo={userInfo} userImage={userImage} />
          <UserpageSkill userSkill={userSkill} />
          <UserpagePortfolio userPortfolio={userPortfolio} />
          <UserpageExperience userExperience={userExperience} />
          <UserpageSns userSns={userSns} />
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export { getServerSideProps };
export default Userpage;
