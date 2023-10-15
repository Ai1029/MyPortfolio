// import React, { useState, FC } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { Box, Grid, TextField, Button } from "@mui/material";

// const UserPortfolioCreate: FC = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const [newPortfolio, setNewPortfolio] = useState({
//     name: "",
//     description: "",
//     url: "",
//   });
//   const [addfile, setAddFile] = useState<File | null>(null);

//   // 新規画像の選択
//   const handleAddImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] ?? null;
//     if (selectedFile) {
//       setAddFile(selectedFile);
//     } else {
//       setAddFile(null);
//     }
//   };

//   // 新しい項目をセットする
//   const handlePortfolioAdd = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: "name" | "description" | "url"
//   ) => {
//     const value = e.target.value;
//     setNewPortfolio((prevPortfolio) => ({
//       ...prevPortfolio,
//       [field]: value,
//     }));
//   };

//   // 新しい項目をpostする
//   const handleNewPortfolioSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     try {
//       // 新しいポートフォリオをサーバーにPOST
//       const response = await axios.post(`${apiUrl}/api/v1/portfolio`, {
//         name: newPortfolio.name,
//         description: newPortfolio.description,
//         url: newPortfolio.url,
//         userID: Number(id),
//       });
//       // POSTが成功して、画像が選択されていた場合
//       if (response.status === 200) {
//         // ポートフォリオのPOSTが成功後、ポートフォリオのIDを取得
//         const portfolioID = response.data.id;

//         if (addfile) {
//           const formData = new FormData();
//           formData.append("image", addfile);
//           formData.append("portfolioID", portfolioID);
//           const imageResponse = await axios.post(
//             `${apiUrl}/api/v1/portfolioimg`,
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
//           if (imageResponse.status === 200) {
//             // 画像がアップロードされたらページをリロード
//             window.location.reload();
//           }
//         } else {
//           // 画像が選択されていなくてもページをリロード
//           window.location.reload();
//         }
//         // input要素を空にする
//         setNewPortfolio({ name: "", description: "", url: "" });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Box>
//       <Box
//         component="form"
//         onSubmit={(e) => handleNewPortfolioSubmit(e)}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: 2,
//           marginX: "auto", // 左右のマージンを中央に寄せる
//           maxWidth: "900px", // ボックスの最大幅を指定
//         }}
//       >
//         <Grid container spacing={1}>
//           <Grid item xs={12} md={8}>
//             <Grid container spacing={1}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   defaultValue={newPortfolio.name}
//                   size="small"
//                   margin="normal"
//                   required
//                   id="name"
//                   label="アプリ名"
//                   name="name"
//                   autoFocus
//                   sx={{ background: "#fff" }}
//                   onChange={(e) => handlePortfolioAdd(e, "name")}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   defaultValue={newPortfolio.url}
//                   size="small"
//                   margin="normal"
//                   id="url"
//                   label="アプリURL"
//                   name="url"
//                   autoFocus
//                   sx={{ background: "#fff" }}
//                   onChange={(e) => handlePortfolioAdd(e, "url")}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={12}>
//                 <TextField
//                   defaultValue={newPortfolio.description}
//                   size="small"
//                   margin="normal"
//                   id="description"
//                   label="アプリ詳細"
//                   name="description"
//                   autoFocus
//                   multiline
//                   rows={4}
//                   sx={{ background: "#fff" }}
//                   onChange={(e) => handlePortfolioAdd(e, "description")}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12} md={4} marginTop={2}>
//             <input type="file" onChange={(e) => handleAddImageSelect(e)} />
//           </Grid>
//         </Grid>
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{
//             mt: 2,
//             mb: 2,
//           }}
//         >
//           新規 Portfolio を追加
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default UserPortfolioCreate;
