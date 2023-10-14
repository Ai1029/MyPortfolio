import React, { useState, FC, useEffect } from "react";
import axios from "axios";
import { Props, SelectProps, skilllevel } from "../../types/types";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

const UserSkillEdit: FC<Props> = ({ userInfo }) => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { id } = router.query; // ユーザーID
  const [editUserSkill, setEditUserSkill] = useState(userInfo.skill);
  const [open, setOpen] = useState(false);
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

  const handleSkillEdit = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "name" | "description",
    id: number
  ) => {
    const value = e.target.value;

    setEditUserSkill((prevSkillData) => {
      if (!prevSkillData) {
        console.error("スキルデータがありません");
        return prevSkillData;
      }
      const updatedElements = prevSkillData.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            [field]: value,
          };
        }
        return element;
      });
      return updatedElements;
    });
  };

  const handleSkillLevelEdit = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const selectValue = Number(e.target.value);
    setEditUserSkill((prevSkill) => {
      if (!prevSkill) {
        console.error("スキルデータがありません");
        return prevSkill;
      }
      const updatedElements = prevSkill.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            skilllevelID: selectValue,
          };
        }
        return element;
      });
      return updatedElements;
    });
  };

  const handleSkillSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editUserSkill) {
      console.error("スキルデータがありません");
      return;
    }
    try {
      await Promise.all(
        editUserSkill.map(async (skill) => {
          const updatedUserSkill = {
            name: skill.name,
            description: skill.description,
            userID: skill.userID,
            skilllevelID: skill.skilllevelID,
          };
          await axios.patch(
            `${apiUrl}/api/v1/skill/${skill.id}`,
            updatedUserSkill
          );
        })
      );
      // 更新が完了したらSnackbarを表示
      setOpen(true);
      console.log("スキル情報の更新が完了しました");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSkillDelete = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLInputElement, MouseEvent>,
    id: number
  ) => {
    try {
      await axios.delete(`${apiUrl}/api/v1/skill/${id}`),
        console.log("スキルが削除されました");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f0e6f6" }}>
      <Box
        component="form"
        onSubmit={(e) => handleSkillSubmit(e)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          marginX: "auto", // 左右のマージンを中央に寄せる
          maxWidth: "900px", // ボックスの最大幅を指定
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }} marginY={3}>
          Skill
        </Typography>
        {editUserSkill &&
          editUserSkill.length > 0 &&
          editUserSkill.map((skill) => (
            <>
              <Grid container spacing={1} key={skill.id}>
                <Grid item xs={12} md={3}>
                  <TextField
                    defaultValue={skill.name}
                    size="small"
                    margin="normal"
                    required
                    id="name"
                    label="スキル名"
                    name="name"
                    autoFocus
                    sx={{ background: "#fff" }}
                    onChange={(e) => handleSkillEdit(e, "name", skill.id)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    defaultValue={skill.description}
                    size="small"
                    margin="normal"
                    id="description"
                    label="スキル経験の詳細"
                    name="description"
                    autoFocus
                    sx={{ background: "#fff" }}
                    onChange={(e) =>
                      handleSkillEdit(e, "description", skill.id)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    value={skill.skilllevelID}
                    size="small"
                    margin="normal"
                    required
                    label="スキルレベル"
                    name="skilllevelID"
                    sx={{ background: "#fff" }}
                    onChange={(e) => handleSkillLevelEdit(e, skill.id)}
                    fullWidth
                  >
                    <MenuItem value={0}>スキルレベルを選択</MenuItem>
                    {skillLevels && skillLevels.length > 0 ? (
                      skillLevels.map((level) => (
                        <MenuItem key={level.id} value={level.id}>
                          {level && level.level
                            ? level.level
                            : "スキルレベルがありません"}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>スキルレベルがありません</MenuItem>
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    type="submit"
                    variant="outlined"
                    onClick={(e) => handleSkillDelete(e, skill.id)}
                    sx={{ mt: 2, mb: 2 }}
                    fullWidth
                  >
                    スキルを削除
                  </Button>
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
                Skill 編集を保存
              </Button>
            </>
          ))}

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Skill 情報の更新が完了しました
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default UserSkillEdit;
