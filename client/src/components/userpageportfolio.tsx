import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { Props, portfolio } from "../../types/types";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import "react-vertical-timeline-component/style.min.css";
import LinkIcon from "@mui/icons-material/Link";
import axios from "axios";

const UserpagePortfolio: FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [userPortfolio, setUserPortfolio] = useState<portfolio[]>([]);
  useEffect(() => {
    //APIからuserのPortfolioデータを取得する関数を定義
    const fetchAllPortfolios = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/portfolio/${id}`);
        console.log("res", res);
        setUserPortfolio(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPortfolios();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
        margin: "auto",
        padding: 3,
        maxWidth: "900px",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }} marginBottom={3}>
        Portfolio
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center", // カードを中央に配置
        }}
      >
        {userPortfolio ? (
          userPortfolio.map((portfolio) => (
            <>
              <Card
                key={portfolio.id}
                sx={{
                  flex: 1,
                  maxWidth: "calc(33.33% - 16px)",
                  minWidth: "200px",
                  margin: "5px",
                }}
              >
                <CardActionArea>
                  {portfolio.image ? (
                    <CardMedia
                      component="img"
                      height="140"
                      image={portfolio.image.url}
                      alt="portfolio image"
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        "https://my-portfolio-images-s3.s3.ap-northeast-1.amazonaws.com/portfolioimg/default.png"
                      }
                      alt="portfolio default image"
                    />
                  )}
                  <CardContent>
                    <Typography
                      variant="body1"
                      fontSize="20px"
                      sx={{ fontWeight: "bold" }}
                    >
                      {portfolio.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{
                        height: "140px",
                        overflowY: "auto", // 縦方向のスクロールを追加
                      }}
                    >
                      {portfolio.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button href={portfolio.url} size="small" color="primary">
                  <LinkIcon />
                </Button>
              </Card>
            </>
          ))
        ) : (
          <p>portfolioは準備中です</p>
        )}
      </Box>
    </Box>
  );
};

export default UserpagePortfolio;
