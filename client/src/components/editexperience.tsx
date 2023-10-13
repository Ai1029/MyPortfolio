import React, { useState, FC } from "react";
import axios from "axios";
import { getServerSideProps } from "../pages/api/api";
import { ExperienceProps } from "../../types/types";
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

const UserExperienceEdit: FC<ExperienceProps> = ({
  userExperience,
  experienceCategory,
  year,
  month,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const [editUserExperience, setEditUserExperience] = useState(userExperience);
  const [editExperienceCategory, setEditExperienceCategory] =
    useState(experienceCategory);
  const [editYear, setEditYear] = useState(year);
  const [editMonth, setEditMonth] = useState(month);
  const [open, setOpen] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleExperienceEdit = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "name" | "description" | "company",
    id: number
  ) => {
    const value = e.target.value;

    setEditUserExperience((prevExperience) => {
      if (!prevExperience) {
        console.error("experienceデータがありません");
        return;
      }
      const updatedElements = prevExperience.map((element) => {
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

  const handleExperienceCategoryEdit = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const selectValue = Number(e.target.value);
    setEditUserExperience((prevExperience) => {
      if (!prevExperience) {
        console.error("experienceデータがありません");
        return;
      }
      const updatedElements = prevExperience.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            experiencecategoryID: selectValue,
          };
        }
        return element;
      });
      return updatedElements;
    });
  };

  const handleExperienceYear = async (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    field: "startyearID" | "finishyearID",
    id: number
  ) => {
    const selectValue = Number(e.target.value);
    setEditUserExperience((prevExperience) => {
      if (!prevExperience) {
        console.error("experienceデータがありません");
        return;
      }
      const updatedElements = prevExperience.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            [field]: selectValue,
          };
        }
        return element;
      });
      console.log("updatedElements", updatedElements);
      return updatedElements;
    });
  };

  const handleExperienceMonth = async (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    field: "startmonthID" | "finishmonthID",
    id: number
  ) => {
    const selectValue = Number(e.target.value);
    setEditUserExperience((prevExperience) => {
      if (!prevExperience) {
        console.error("experienceデータがありません");
        return;
      }
      const updatedElements = prevExperience.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            [field]: selectValue,
          };
        }
        return element;
      });
      console.log("updatedElements", updatedElements);
      return updatedElements;
    });
  };

  const handleExperienceSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!editUserExperience) {
      console.error("experienceデータがありません");
      return;
    }
    try {
      await Promise.all(
        editUserExperience.map(async (experience) => {
          const updatedUserExperience = {
            name: experience.name,
            description: experience.description,
            company: experience.company,
            experiencecategoryID: experience.experiencecategoryID,
            startyearID: experience.startyearID,
            startmonthID: experience.startmonthID,
            finishyearID: experience.finishyearID,
            finishmonthID: experience.finishmonthID,
            userID: experience.userID,
          };
          await axios.patch(
            `${apiUrl}/api/v1/experience/${experience.id}`,
            updatedUserExperience
          );
        })
      );
      // 更新が完了したらSnackbarを表示
      setOpen(true);
      console.log("職務・学習経歴の情報の更新が完了しました");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExperienceDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    try {
      await axios.delete(`${apiUrl}/api/v1/experience/${id}`),
        console.log("職務・学習経歴が削除されました");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f0e6f6" }}>
      <Box
        component="form"
        onSubmit={(e) => handleExperienceSubmit(e)}
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
          Experience
        </Typography>
        {editUserExperience &&
          editUserExperience.length > 0 &&
          editUserExperience.map((experience) => (
            <>
              <Grid container spacing={1} key={experience.id}>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    defaultValue={experience.experiencecategoryID}
                    size="small"
                    margin="normal"
                    required
                    label="仕事 or 学び"
                    name="experiencecategoryID"
                    sx={{ background: "#fff" }}
                    onChange={(e) =>
                      handleExperienceCategoryEdit(e, experience.id)
                    }
                    fullWidth
                  >
                    <MenuItem value={0}>仕事 or 学び を選択</MenuItem>
                    {editExperienceCategory &&
                      editExperienceCategory.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    defaultValue={experience.name}
                    size="small"
                    margin="normal"
                    required
                    id="name"
                    label="職種名 or 学んだ内容"
                    name="name"
                    autoFocus
                    sx={{ background: "#fff" }}
                    onChange={(e) =>
                      handleExperienceEdit(e, "name", experience.id)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    defaultValue={experience.company}
                    size="small"
                    margin="normal"
                    id="company"
                    label="会社名 or 学校名"
                    name="company"
                    autoFocus
                    sx={{ background: "#fff" }}
                    onChange={(e) =>
                      handleExperienceEdit(e, "company", experience.id)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    defaultValue={experience.description}
                    size="small"
                    margin="normal"
                    id="description"
                    label="仕事内容 or 学んだ内容の詳細"
                    name="description"
                    autoFocus
                    sx={{ background: "#fff" }}
                    onChange={(e) =>
                      handleExperienceEdit(e, "description", experience.id)
                    }
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    defaultValue={experience.experienceStartYear.id}
                    size="small"
                    margin="normal"
                    required
                    label="開始した年"
                    name="experienceStartYear"
                    sx={{ background: "#fff" }}
                    onChange={(e) =>
                      handleExperienceYear(e, "startyearID", experience.id)
                    }
                    fullWidth
                  >
                    <MenuItem value={0}>開始年 を選択</MenuItem>
                    {editYear &&
                      editYear.map((year) => (
                        <MenuItem key={year.id} value={year.id}>
                          {year.year}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    defaultValue={experience.experienceStartMonth.id}
                    size="small"
                    margin="normal"
                    required
                    label="開始した月"
                    name="experienceStartMonth"
                    sx={{ background: "#fff" }}
                    onChange={(e) =>
                      handleExperienceMonth(e, "startmonthID", experience.id)
                    }
                    fullWidth
                  >
                    <MenuItem value={0}>開始月 を選択</MenuItem>
                    {editMonth &&
                      editMonth.map((month) => (
                        <MenuItem key={month.id} value={month.id}>
                          {month.month}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    defaultValue={experience.experienceFinishYear.id}
                    size="small"
                    margin="normal"
                    required
                    label="終了した年"
                    name="experienceFinishYear"
                    sx={{ background: "#fff" }}
                    onChange={(e) =>
                      handleExperienceYear(e, "finishyearID", experience.id)
                    }
                    fullWidth
                  >
                    <MenuItem value={0}>終了年 を選択</MenuItem>
                    {editYear &&
                      editYear.map((year) => (
                        <MenuItem key={year.id} value={year.id}>
                          {year.year}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    defaultValue={experience.experienceFinishMonth.id}
                    size="small"
                    margin="normal"
                    required
                    label="終了した月"
                    name="experienceFinishMonth"
                    sx={{ background: "#fff" }}
                    onChange={(e) =>
                      handleExperienceMonth(e, "finishmonthID", experience.id)
                    }
                    fullWidth
                  >
                    <MenuItem value={0}>終了月 を選択</MenuItem>
                    {editMonth &&
                      editMonth.map((month) => (
                        <MenuItem key={month.id} value={month.id}>
                          {month.month}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Button
                    type="submit"
                    variant="outlined"
                    onClick={(e) => handleExperienceDelete(e, experience.id)}
                    sx={{ mt: 2, mb: 2 }}
                    fullWidth
                  >
                    仕事 or 学びの経歴を削除
                  </Button>
                </Grid>
              </Grid>
            </>
          ))}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
          }}
        >
          Experience 編集を保存
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Experience 情報の更新が完了しました
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export { getServerSideProps };
export default UserExperienceEdit;
