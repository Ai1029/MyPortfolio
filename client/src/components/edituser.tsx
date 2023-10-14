import React, { useState, FC } from "react";
import axios from "axios";
import UserImageUpload from "./userimage";
import { Props } from "../../types/types";
import {
  Avatar,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { updateEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const UserInfoEdit: FC<Props> = ({ userInfo }) => {
  const [editUserInfo, setEditUserInfo] = useState(userInfo);
  const [open, setOpen] = useState(false);
  const user = auth.currentUser; //　現在のユーザー
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleUserEdit = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "name" | "email" | "introduction" | "hobby",
    id: number
  ) => {
    const value = e.target.value;

    setEditUserInfo((prevData) => {
      if (!prevData) {
        console.error("ユーザーデータがありません");
        return prevData;
      }
      return {
        ...prevData,
        [field]: value,
      };
    });
  };

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEmail = editUserInfo?.email || "";
    if (!userInfo) {
      console.error("ユーザー情報がありません");
      return;
    }
    try {
      await axios.patch(`${apiUrl}/api/v1/user/${userInfo.id}`, editUserInfo);
      //　firebaseの方のemailを修正
      if (user) {
        updateEmail(user, newEmail)
          .then(() => {
            console.log("firebaseのメールアドレスが更新されました");
          })
          .catch((error) => {
            console.error("メールアドレスの更新に失敗しました", error);
          });
      }
      // 更新が完了したらSnackbarを表示
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        marginX: "auto", // 左右のマージンを中央に寄せる
        maxWidth: "900px", // ボックスの最大幅を指定
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginX: "auto", // 左右のマージンを中央に寄せる
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }} marginY={3}>
            User Information
          </Typography>
        </Box>
        <Box>
          {editUserInfo && (
            <form id="user_data" onSubmit={(e) => handleUserSubmit(e)}>
              <TextField
                defaultValue={editUserInfo.name}
                size="small"
                margin="normal"
                required
                fullWidth
                id="name"
                label="名前"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => handleUserEdit(e, "name", editUserInfo.id)}
              />
              <TextField
                defaultValue={editUserInfo.email}
                size="small"
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => handleUserEdit(e, "email", editUserInfo.id)}
              />
              <TextField
                defaultValue={editUserInfo.introduction}
                margin="normal"
                fullWidth
                maxRows={4}
                id="introduction"
                label="自己紹介"
                name="introduction"
                autoComplete="introduction"
                autoFocus
                multiline
                rows={4}
                onChange={(e) =>
                  handleUserEdit(e, "introduction", editUserInfo.id)
                }
              />
              <TextField
                defaultValue={editUserInfo.hobby}
                size="small"
                margin="normal"
                fullWidth
                id="hobby"
                label="趣味"
                name="hobby"
                autoComplete="hobby"
                autoFocus
                multiline
                rows={3}
                onChange={(e) => handleUserEdit(e, "hobby", editUserInfo.id)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                }}
              >
                User Information 編集を保存
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  User 情報の更新が完了しました
                </Alert>
              </Snackbar>
            </form>
          )}
        </Box>
        <Box>
          <h4>アイコンの画像を選択</h4>
          <UserImageUpload />
          {userInfo.image && (
            <Stack direction="row" spacing={2} marginBottom={3}>
              <Avatar
                alt="自分の写真"
                src={userInfo.image.url}
                sx={{ width: 170, height: 170 }}
              />
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfoEdit;
