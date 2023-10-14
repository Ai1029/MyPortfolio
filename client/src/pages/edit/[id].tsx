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
import { Props, SelectProps } from "../../../types/types";
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

const UserEdit: FC<Props & SelectProps> = ({
  userInfo,
  // userImage,
  // userSkill,
  // skillLevel,
  // userExperience,
  // experienceCategory,
  // year,
  // month,
  // userPortfolio,
  // userSns,
  // snsType,
}) => {
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
          <UserSkillEdit userInfo={userInfo} />
          <UserSkillCreate />
          <UserPortfolioEdit userInfo={userInfo} />
          <UserPortfolioCreate />
          <UserExperienceEdit userInfo={userInfo} />
          <UserExperienceCreate />
          <UserSnsEdit userInfo={userInfo} />
          <UserSnsCreate />
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

// export { getServerSideProps };
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
          // userImage: null,
          // userSkill: null,
          // skillLevel: null,
          // userExperience: null,
          // experienceCategory: null,
          // year: null,
          // month: null,
          // userPortfolio: null,
          // userSns: null,
          // snsType: null,
        },
      };
    }

    const [
      userRes,
      // userImageRes,
      // skillRes,
      // skilllevelRes,
      // experienceRes,
      // experienceCategoryRes,
      // yearRes,
      // monthRes,
      // portfolioRes,
      // snsRes,
      // snstypeRes,
    ] = await Promise.all([
      axios.get(`${apiURL}/api/v1/user/${params.id}`),
      // axios.get(`${apiURL}/api/v1/userimg/${params.id}`),
      // axios.get(`${apiURL}/api/v1/skill/${params.id}`),
      // axios.get(`${apiURL}/api/v1/skilllevel`),
      // axios.get(`${apiURL}/api/v1/experience/${params.id}`),
      // axios.get(`${apiURL}/api/v1/experiencecategory`),
      // axios.get(`${apiURL}/api/v1/year`),
      // axios.get(`${apiURL}/api/v1/month`),
      // axios.get(`${apiURL}/api/v1/portfolio/${params.id}`),
      // axios.get(`${apiURL}/api/v1/sns/${params.id}`),
      // axios.get(`${apiURL}/api/v1/typeofsns`),
    ]);

    return {
      props: {
        userInfo: userRes.data,
        // userImage: userImageRes.data,
        // userSkill: skillRes.data,
        // skillLevel: skilllevelRes.data,
        // userExperience: experienceRes.data,
        // experienceCategory: experienceCategoryRes.data,
        // year: yearRes.data,
        // month: monthRes.data,
        // userPortfolio: portfolioRes.data,
        // userSns: snsRes.data,
        // snsType: snstypeRes.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        userInfo: null,
        // userImage: null,
        // userSkill: null,
        // skillLevel: null,
        // userExperience: null,
        // experienceCategory: null,
        // year: null,
        // month: null,
        // userPortfolio: null,
        // userSns: null,
        // snsType: null,
      },
    };
  }
};
