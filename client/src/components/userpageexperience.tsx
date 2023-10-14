import { useRouter } from "next/router";
import React, { FC } from "react";

import styles from "../pages/styles/Home.module.css";
import { ExperienceProps } from "../../types/types";
import { Box, Typography } from "@mui/material";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";

const UserpageExperience: FC<ExperienceProps> = ({ userExperience }) => {
  const router = useRouter();

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

      {userExperience && userExperience.length > 0 ? (
        <VerticalTimeline>
          {userExperience.map((experience) => (
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
