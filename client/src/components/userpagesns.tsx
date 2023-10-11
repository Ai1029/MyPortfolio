import { useRouter } from "next/router";
import React, { FC } from "react";
import { getServerSideProps } from "../pages/api/api";
import { SnsProps } from "../../types/types";
import { Link, Box, Typography, Card, CardContent } from "@mui/material";

import "react-vertical-timeline-component/style.min.css";

const UserpageSns: FC<SnsProps> = ({ userSns }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
        padding: 3,
        marginBottom: 15,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }} marginBottom={3}>
        Socials & Links
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center", // カードを中央に配置
        }}
      >
        {userSns && userSns.length > 0 ? (
          userSns.map((sns, index) => (
            <>
              <Link href={sns.url} variant="body2" underline="none">
                <Card
                  key={sns.id}
                  sx={{
                    flex: 1,
                    maxWidth: "calc(33.33% - 16px)",
                    minWidth: "200px",
                    margin: "5px",
                    bgcolor: index % 2 === 0 ? "#dcb6f2" : "#958df2",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      bgcolor: index % 2 === 0 ? "#d49ef2" : "#8a7def", // ホバー時の背景色を指定
                    },
                    color: "white",
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {sns.typeofSNS.typeofSNS}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </>
          ))
        ) : (
          <p>SNSは準備中です</p>
        )}
      </Box>
    </Box>
  );
};

export { getServerSideProps };
export default UserpageSns;
