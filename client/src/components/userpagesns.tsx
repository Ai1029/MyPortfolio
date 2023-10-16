import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { Props, sns } from "../../types/types";
import { Link, Box, Typography, Card, CardContent } from "@mui/material";

import "react-vertical-timeline-component/style.min.css";
import axios from "axios";

const UserpageSns: FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [userSns, setUserSns] = useState<sns[]>([]);
  useEffect(() => {
    //APIからuserのPortfolioデータを取得する関数を定義
    const fetchAllSns = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/sns/${id}`);
        console.log("res", res);
        setUserSns(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllSns();
  }, []);

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

export default UserpageSns;
