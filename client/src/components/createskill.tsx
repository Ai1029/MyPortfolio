import React, { useState, FC, useEffect } from "react";
import axios from "axios";
import { skilllevel } from "../../types/types";
import { useRouter } from "next/router";
import { Box, Grid, TextField, Button, MenuItem } from "@mui/material";

const UserSkillEdit: FC = () => {
  const router = useRouter();
  const { id } = router.query; // ユーザーID
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [newSkill, setNewSkill] = useState({
    name: "",
    description: "",
  });
  const [newSkillLevel, setNewSkillLevel] = useState(0);
  const [skillLevels, setSkillLevels] = useState<skilllevel[]>([]);

  useEffect(() => {
    //APIからSkillLevelデータを取得する関数を定義
    const fetchAllSkillLevels = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/list`);
        console.log("res", res);
        setSkillLevels(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllSkillLevels();
  }, []);

  const handleSkillAdd = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "name" | "description"
  ) => {
    const value = e.target.value;
    setNewSkill((prevSkill) => ({
      ...prevSkill,
      [field]: value,
    }));
  };

  const handleNewSkillLevel = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const selectValue = Number(e.target.value);
    setNewSkillLevel(selectValue);
  };

  const handleNewSkillSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 新しいスキルをサーバーにPOST
      const response = await axios.post(`${apiUrl}/api/v1/skill`, {
        name: newSkill.name,
        description: newSkill.description,
        userID: Number(id),
        skilllevelID: newSkillLevel,
      });

      if (response.status === 200) {
        window.location.reload();
        // input要素を空にする
        setNewSkill({ name: "", description: "" });
        setNewSkillLevel(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f0e6f6" }}>
      <Box
        component="form"
        onSubmit={(e) => handleNewSkillSubmit(e)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          marginX: "auto", // 左右のマージンを中央に寄せる
          maxWidth: "900px", // ボックスの最大幅を指定
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <TextField
              defaultValue={newSkill.name}
              size="small"
              margin="normal"
              required
              id="name"
              label="スキル名"
              name="name"
              autoFocus
              sx={{ background: "#fff" }}
              onChange={(e) => handleSkillAdd(e, "name")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              defaultValue={newSkill.description}
              size="small"
              margin="normal"
              id="description"
              label="スキル経験の詳細"
              name="description"
              autoFocus
              sx={{ background: "#fff" }}
              onChange={(e) => handleSkillAdd(e, "description")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              defaultValue={0}
              size="small"
              margin="normal"
              required
              label="スキルレベル"
              name="level"
              sx={{ background: "#fff" }}
              onChange={(e) => handleNewSkillLevel(e)}
              fullWidth
            >
              <MenuItem value={0}>スキルレベルを選択</MenuItem>
              {skillLevels && skillLevels.length > 0 ? (
                skillLevels.map((level) => (
                  <MenuItem key={level.id} value={level.id}>
                    {level.level}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>スキルレベルがありません</MenuItem>
              )}
            </TextField>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
          }}
        >
          新規 Skill を追加
        </Button>
      </Box>
    </Box>
  );
};

export default UserSkillEdit;
