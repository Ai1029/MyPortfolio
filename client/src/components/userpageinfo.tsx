import { useRouter } from "next/router";
import React, { FC } from "react";
import { getServerSideProps } from "../pages/api/api";
import { UserProps } from "../../types/types";
import { Avatar, Stack, Box, Typography } from "@mui/material";
import "react-vertical-timeline-component/style.min.css";

const UserpageInfo: FC<UserProps> = ({ userInfo, userImage }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        marginX: "auto",
        padding: 2,
        maxWidth: "700px",
        minWidth: "300px",
      }}
    >
      {userImage && (
        <Stack direction="row" spacing={2} marginBottom={3}>
          <Avatar
            alt="自分の写真"
            src={userImage.url}
            sx={{ width: 170, height: 170 }}
          />
        </Stack>
      )}
      {userInfo && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold" }} marginBottom={3}>
            {userInfo.name}
          </Typography>
          {userInfo.introduction &&
            userInfo.introduction.split("\n").map((text, index) => (
              <Typography key={userInfo.id} variant="body2">
                {text}
                <br />
              </Typography>
            ))}

          {userInfo.hobby && (
            <Typography variant="body2" marginTop={3}>
              趣味： {userInfo.hobby}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export { getServerSideProps };
export default UserpageInfo;
