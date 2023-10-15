import React, { FC } from "react";
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
import { Props } from "../../../types/types";
import UserInfoEdit from "../../components/edituser";
import UserSkillEdit from "../../components/editskill";
import UserSkillCreate from "../../components/createskill";
import UserExperienceEdit from "../../components/editexperience";
import UserExperienceCreate from "../../components/createexperience";
import UserPortfolioEdit from "../../components/editeportfolio";
import UserPortfolioCreate from "../../components/createportfolio";
import UserSnsEdit from "../../components/editesns";
import UserSnsCreate from "../../components/createsns";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";

const UserEdit: FC<Props> = ({ userInfo }) => {
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
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                MyPortfolio
              </Typography>
              <Button href={`/userpage/${userInfo.id}`} color="inherit">
                UserPage
              </Button>
            </Toolbar>
          </AppBar>

          <UserInfoEdit userInfo={userInfo} />
          <UserSkillEdit />
          <UserSkillCreate />
          <UserPortfolioEdit />
          <UserPortfolioCreate />
          <UserExperienceEdit />
          <UserExperienceCreate />
          <UserSnsEdit />
          <UserSnsCreate />
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default UserEdit;

// ユーザー情報を取得する;
export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const apiURL = process.env.API_URL_SSR;

  try {
    if (!params?.id) {
      console.error("ユーザー情報がありません");
      return {
        props: {
          userInfo: null,
        },
      };
    }

    const [userRes] = await Promise.all([
      axios.get(`${apiURL}/api/v1/user/${params.id}`),
    ]);

    return {
      props: {
        userInfo: userRes.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        userInfo: null,
      },
    };
  }
};
