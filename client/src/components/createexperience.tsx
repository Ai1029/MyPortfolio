import React, { useState, FC } from "react";
import axios from "axios";
import { SelectProps } from "../../types/types";
import { useRouter } from "next/router";
import { Box, Grid, TextField, Button, MenuItem } from "@mui/material";

const UserExperienceEdit: FC<SelectProps> = ({
  experienceCategory,
  year,
  month,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [experienceCategorys, setExperienceCategorys] =
    useState(experienceCategory);
  const [years, setYears] = useState(year);
  const [months, setMonths] = useState(month);

  const [newExperience, setNewExperience] = useState({
    name: "",
    description: "",
    company: "",
  });
  const [newExperienceCategory, setNewExperienceCategory] = useState(0);
  const [newExperienceDates, setNewExperienceDates] = useState({
    startyearID: 0,
    startmonthID: 0,
    finishyearID: 0,
    finishmonthID: 0,
  });

  const handleExperienceAdd = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "name" | "description" | "company"
  ) => {
    const value = e.target.value;
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      [field]: value,
    }));
  };

  const handleNewExperienceCategory = async (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectValue = Number(e.target.value);
    setNewExperienceCategory(selectValue);
  };

  const handleNewExperienceDates = async (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    field: "startyearID" | "startmonthID" | "finishyearID" | "finishmonthID"
  ) => {
    const selectValue = Number(e.target.value);
    setNewExperienceDates((prevselect) => ({
      ...prevselect,
      [field]: selectValue,
    }));
  };

  const handleNewExperienceSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      // 新しい職業経歴をサーバーにPOST
      const response = await axios.post(`${apiUrl}/api/v1/experience`, {
        experiencecategoryID: newExperienceCategory,
        name: newExperience.name,
        description: newExperience.description,
        company: newExperience.company,
        startyearID: newExperienceDates.startyearID,
        startmonthID: newExperienceDates.startmonthID,
        finishyearID: newExperienceDates.finishyearID,
        finishmonthID: newExperienceDates.finishmonthID,
        userID: Number(id),
      });
      if (response.status === 200) {
        // input要素を空にする
        window.location.reload();
        setNewExperience({
          name: "",
          description: "",
          company: "",
        });
        setNewExperienceCategory(0);
        setNewExperienceDates({
          startyearID: 0,
          startmonthID: 0,
          finishyearID: 0,
          finishmonthID: 0,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f0e6f6" }}>
      <Box
        component="form"
        onSubmit={(e) => handleNewExperienceSubmit(e)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          marginX: "auto", // 左右のマージンを中央に寄せる
          maxWidth: "900px", // ボックスの最大幅を指定
        }}
      >
        <>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <TextField
                select
                defaultValue={0}
                size="small"
                margin="normal"
                required
                label="仕事 or 学び"
                name="experiencecategoryID"
                sx={{ background: "#fff" }}
                onChange={(e) => handleNewExperienceCategory(e)}
                fullWidth
              >
                <MenuItem value={0}>仕事 or 学び を選択</MenuItem>
                {experienceCategorys &&
                  experienceCategorys.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                defaultValue={newExperience.name}
                size="small"
                margin="normal"
                required
                id="name"
                label="職種名 or 学んだ内容"
                name="name"
                autoFocus
                sx={{ background: "#fff" }}
                onChange={(e) => handleExperienceAdd(e, "name")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                defaultValue={newExperience.company}
                size="small"
                margin="normal"
                id="company"
                label="会社名 or 学校名"
                name="company"
                autoFocus
                sx={{ background: "#fff" }}
                onChange={(e) => handleExperienceAdd(e, "company")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                defaultValue={newExperience.description}
                size="small"
                margin="normal"
                id="description"
                label="仕事内容 or 学んだ内容の詳細"
                name="description"
                autoFocus
                sx={{ background: "#fff" }}
                onChange={(e) => handleExperienceAdd(e, "description")}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                defaultValue={0}
                size="small"
                margin="normal"
                required
                label="開始した年"
                name="experienceStartYear"
                sx={{ background: "#fff" }}
                onChange={(e) => handleNewExperienceDates(e, "startyearID")}
                fullWidth
              >
                <MenuItem value={0}>開始年 を選択</MenuItem>
                {years && years.length > 0 ? (
                  years.map((year) => (
                    <MenuItem key={year.id} value={year.id}>
                      {year.year}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>年がありません</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                defaultValue={0}
                size="small"
                margin="normal"
                required
                label="開始した月"
                name="experienceStartMonth"
                sx={{ background: "#fff" }}
                onChange={(e) => handleNewExperienceDates(e, "startmonthID")}
                fullWidth
              >
                <MenuItem value={0}>開始月 を選択</MenuItem>
                {months &&
                  months.map((month) => (
                    <MenuItem key={month.id} value={month.id}>
                      {month.month}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                defaultValue={0}
                size="small"
                margin="normal"
                required
                label="終了した年"
                name="experienceFinishYear"
                sx={{ background: "#fff" }}
                onChange={(e) => handleNewExperienceDates(e, "finishyearID")}
                fullWidth
              >
                <MenuItem value={0}>終了年 を選択</MenuItem>
                {years && years.length > 0 ? (
                  years.map((year) => (
                    <MenuItem key={year.id} value={year.id}>
                      {year.year}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>年がありません</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                defaultValue={0}
                size="small"
                margin="normal"
                required
                label="終了した月"
                name="experienceFinishMonth"
                sx={{ background: "#fff" }}
                onChange={(e) => handleNewExperienceDates(e, "finishmonthID")}
                fullWidth
              >
                <MenuItem value={0}>終了月 を選択</MenuItem>
                {months &&
                  months.map((month) => (
                    <MenuItem key={month.id} value={month.id}>
                      {month.month}
                    </MenuItem>
                  ))}
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
            新規 Experience を追加
          </Button>
        </>
      </Box>
    </Box>
  );
};

export default UserExperienceEdit;
