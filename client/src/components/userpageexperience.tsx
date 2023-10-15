import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import styles from "../pages/styles/Home.module.css";
import { Props, experience } from "../../types/types";
import { Box, Typography } from "@mui/material";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";

const UserpageExperience: FC<Props> = ({ userInfo }) => {
  const router = useRouter();
  // const id = router.query.id;
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // const [userExperience, setUserExperience] = useState<experience[]>([]);
  // useEffect(() => {
  //   //APIからuserのPortfolioデータを取得する関数を定義
  //   const fetchAllExperiences = async () => {
  //     try {
  //       const res = await axios.get(`${apiUrl}/api/v1/experience/${id}`);
  //       console.log("res", res);
  //       setUserExperience(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchAllExperiences();
  // }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
        backgroundColor: "#f0e6f6",
        padding: 3,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }} marginBottom={3}>
        Experience
      </Typography>

      {userInfo.experience ? (
        <VerticalTimeline>
          {userInfo.experience.map((experience) => (
            <VerticalTimelineElement
              key={experience.id}
              style={{
                width: "80%",
                margin: "0 auto",
                marginTop: "0",
                marginBottom: "15px",
              }}
              className="vertical-timeline-element--work"
              contentStyle={{
                boxShadow: "none",
              }}
              date={
                experience.experienceStartYear.year +
                experience.experienceStartMonth.month +
                "〜" +
                experience.experienceFinishYear.year +
                experience.experienceFinishMonth.month
              }
              dateClassName={styles["vertical-timeline-element-date"]}
              iconStyle={{
                background:
                  experience.experiencecategoryID === 1 ? "#958df2" : "#dcb6f2",
                color: "#fff",
                boxShadow: "none",
              }}
              icon={
                experience.experiencecategoryID === 1 ? (
                  <WorkIcon />
                ) : (
                  <SchoolIcon />
                )
              }
            >
              <Typography
                variant="h6"
                className="vertical-timeline-element-title"
                sx={{
                  fontWeight: "bold",
                  color:
                    experience.experiencecategoryID === 1
                      ? "#958df2"
                      : "#dcb6f2",
                }}
              >
                {experience.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
                className="vertical-timeline-element-subtitle"
              >
                {experience.company}
              </Typography>

              {experience.description &&
                experience.description.split("\n").map((text, index) => (
                  <Typography
                    key={experience.id}
                    variant="body2"
                    color="text.secondary"
                    style={{ fontSize: "14px" }}
                  >
                    {text}
                    <br />
                  </Typography>
                ))}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      ) : (
        <p>仕事・学びの経歴は準備中です</p>
      )}
    </Box>
  );
};

export default UserpageExperience;
