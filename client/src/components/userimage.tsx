import { ChangeEventHandler, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const UserImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const userID = router.query.id as string; // クエリパラメーターからユーザーIDを取得

  // 画像の選択
  const handleImageSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  //　画像のアップロード
  const handleUpload = async () => {
    if (!userID) {
      console.error("ユーザーIDがありません");
    }

    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      formData.append("userID", userID);
      try {
        const response = await axios.patch(
          "http://localhost:3001/api/v1/userimg",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          console.log("画像がアップロードされました");
          // 画像がアップロードされたらページをリロード
          window.location.reload();
        } else {
          console.error("画像のアップロードに失敗しました");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    }
  };

  return (
    <>
      <input type="file" onChange={handleImageSelect} />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleUpload}
        sx={{ mt: 2, mb: 2 }}
      >
        写真をアップロード
      </Button>
    </>
  );
};

export default UserImageUpload;
