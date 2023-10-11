import router, { useRouter } from "next/router";
import React, { FC, useState, useEffect } from "react";
import { getServerSideProps } from "../pages/api/api";
import { SkillProps } from "../../types/types";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { PieChart, Pie, Cell, Label } from "recharts";
import "react-vertical-timeline-component/style.min.css";
import dynamic from "next/dynamic";

const UserpageSkill: FC<SkillProps> = ({ userSkill }) => {
  const router = useRouter();

  // このコードでprevent hydration warningsを回避できる
  const PieChart = dynamic(
    () => import("recharts").then((recharts) => recharts.PieChart),
    { ssr: false }
  );

  return (
    <Box
      sx={{
        backgroundColor: "#f0e6f6",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 5,
          margin: "auto",
          padding: 3,
          maxWidth: "1000px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }} marginBottom={3}>
          Skill
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center", // カードを中央に配置
          }}
        >
          {userSkill && userSkill.length > 0 ? (
            userSkill.map((skill) => (
              <>
                <Card
                  key={skill.id}
                  sx={{
                    flex: 1,
                    maxWidth: "calc(25% - 16px)",
                    minWidth: "200px",
                    margin: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // 子要素を水平方向に中央揃え
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {skill.name}
                    </Typography>

                    <div
                      style={{
                        position: "relative",
                        // width: "130px",
                        height: "130px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center", // 水平方向の中央揃え
                      }}
                    >
                      <PieChart width={150} height={150}>
                        <Pie
                          key={`${skill.id}`}
                          data={[
                            {
                              name: skill.skilllevel.level,
                              value: skill.skilllevel.levelper,
                            },
                            {
                              name: "remaining",
                              value: skill.skilllevel.levelperleft,
                            },
                          ]}
                          cx={70}
                          cy={70}
                          innerRadius={40}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                          startAngle={90} // 開始角度を90度に設定
                          endAngle={-270} // 終了角度を-270度に設定 (一番上の位置)
                        >
                          {/* Completeのセル */}
                          <Cell key={`cell-completed`} fill="#958df2" />
                          {/* Remaining のセル */}
                          <Cell key={`cell-remaining`} fill="#ccc" />{" "}
                          <Label
                            key={`${skill.id}`}
                            value={skill.skilllevel.level} // ラベルの内容を表示する関数を設定
                            position="center"
                            fill="black"
                            style={{
                              fontSize: "12px",
                              fontWeight: "normal",
                              fontFamily: "Roboto",
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </div>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center" }}
                    >
                      {skill.description}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            ))
          ) : (
            <p>スキルは準備中です</p>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export { getServerSideProps };
export default UserpageSkill;
