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
import { getServerSideProps } from "../api/api";
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
import { GetServerSideProps } from "next";
import axios from "axios";

const UserEdit: FC<Props & SelectProps> = ({
  userInfo,
  userImage,
  userSkill,
  skillLevel,
  userExperience,
  experienceCategory,
  year,
  month,
  userPortfolio,
  userSns,
  snsType,
}) => {
  const defaultTheme = createTheme();
  console.log("skillLevel", skillLevel);
  console.log("year", year);

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

          <UserInfoEdit userInfo={userInfo} userImage={userImage} />
          <UserSkillEdit userSkill={userSkill} skillLevel={skillLevel} />
          <UserSkillCreate userSkill={userSkill} skillLevel={skillLevel} />
          <UserPortfolioEdit userPortfolio={userPortfolio} />
          <UserPortfolioCreate userPortfolio={userPortfolio} />
          <UserExperienceEdit
            userExperience={userExperience}
            experienceCategory={experienceCategory}
            year={year}
            month={month}
          />
          <UserExperienceCreate
            userExperience={userExperience}
            experienceCategory={experienceCategory}
            year={year}
            month={month}
          />
          <UserSnsEdit userSns={userSns} snsType={snsType} />
          <UserSnsCreate userSns={userSns} snsType={snsType} />
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export { getServerSideProps };
export default UserEdit;
