// import React, { useState, FC } from "react";
// import axios from "axios";
// import { Props } from "../../types/types";
// import {
//   Box,
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// const UserPortfolioEdit: FC<Props> = ({ userInfo }) => {
//   const [editUserPortfolio, setEditUserPortfolio] = useState(
//     userInfo.portfolio
//   );
//   const [editfile, setEditFile] = useState<Record<number, File | null>>({}); // portfolioIDをキーする
//   const [open, setOpen] = useState(false);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   // 編集画像の選択
//   const handleEditImageSelect = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     id: number
//   ) => {
//     const selectedFile = e.target.files?.[0] ?? null;
//     if (selectedFile) {
//       setEditFile((prevEditFiles) => ({
//         ...prevEditFiles,
//         [id]: selectedFile, // portfolioIDをキーとしてファイルを関連付ける
//       }));
//     }
//   };

//   //　編集した項目をセットする
//   const handlePortfolioEdit = async (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: "name" | "description" | "url",
//     id: number
//   ) => {
//     const value = e.target.value;

//     setEditUserPortfolio((prevPortfolioData) => {
//       const updatedElements = prevPortfolioData.map((element) => {
//         if (element.id === id) {
//           return {
//             ...element,
//             [field]: value,
//           };
//         }
//         return element;
//       });
//       return updatedElements;
//     });
//   };

//   //　編集した項目をpatchする
//   const handlePortfolioSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await Promise.all(
//         // portfolioのテキストをpatchする
//         editUserPortfolio.map(async (portfolio) => {
//           const updatedUserPortfolio = {
//             name: portfolio.name,
//             description: portfolio.description,
//             url: portfolio.url,
//             userID: portfolio.userID,
//           };

//           const response = await axios.patch(
//             `${apiUrl}/api/v1/portfolio/${portfolio.id}`,
//             updatedUserPortfolio
//           );

//           const portfolioID = response.data.id;
//           const selectedFile = editfile[portfolioID];

//           // 新しい画像をformDataに変換
//           if (selectedFile) {
//             const formData = new FormData();
//             formData.append("image", selectedFile);
//             formData.append("portfolioID", portfolioID);

//             try {
//               //　既存の画像があるか確認する
//               const imageGetResponse = await axios.get(
//                 `${apiUrl}/api/v1/portfolioimg/${portfolioID}`
//               );

//               if (imageGetResponse.status === 200) {
//                 // 既存画像を削除
//                 const imageDeleteResponse = await axios.delete(
//                   `${apiUrl}/api/v1/portfolioimg/${portfolioID}`
//                 );

//                 //　更新する画像をpost
//                 const imagePostResponse = await axios.post(
//                   `${apiUrl}/api/v1/portfolioimg/${portfolioID}`,
//                   formData,
//                   {
//                     headers: {
//                       "Content-Type": "multipart/form-data",
//                     },
//                   }
//                 );
//                 if (imagePostResponse.status === 200) {
//                   window.location.reload();
//                 }
//               }
//             } catch (error: any) {
//               if (error && error.response && error.response.status === 404) {
//                 // 既存の画像が存在しない場合、そのまま新しい画像をポスト

//                 const imagePostResponse = await axios.post(
//                   `${apiUrl}/api/v1/portfolioimg/${portfolioID}`,
//                   formData,
//                   {
//                     headers: {
//                       "Content-Type": "multipart/form-data",
//                     },
//                   }
//                 );
//                 if (imagePostResponse.status === 200) {
//                   window.location.reload();
//                 }
//               } else {
//                 console.log("エラーが発生しました", error);
//               }
//             }
//           }
//         })
//       );
//       // 更新が完了したらSnackbarを表示
//       setOpen(true);
//       console.log("ポートフォリオの情報の更新が完了しました");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   // ポートフォリオとポートフォリオの画像を削除する
//   const handlePortfolioDelete = async (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     id: number
//   ) => {
//     try {
//       await axios.delete(`${apiUrl}/api/v1/portfolio/${id}`);
//       console.log("ポートフォリオとポートフォリオの画像が削除されました");

//       window.location.reload();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Box>
//       <Box
//         component="form"
//         onSubmit={(e) => handlePortfolioSubmit(e)}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: 2,
//           marginX: "auto", // 左右のマージンを中央に寄せる
//           maxWidth: "900px", // ボックスの最大幅を指定
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: "bold" }} marginY={3}>
//           Portfolio
//         </Typography>

//         {editUserPortfolio.length > 0 &&
//           editUserPortfolio.map((portfolio) => (
//             <>
//               <Grid container spacing={1} key={portfolio.id}>
//                 <Grid item xs={12} md={8}>
//                   <Grid container spacing={1}>
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         defaultValue={portfolio.name}
//                         size="small"
//                         margin="normal"
//                         required
//                         id="name"
//                         label="アプリ名"
//                         name="name"
//                         autoFocus
//                         sx={{ background: "#fff" }}
//                         onChange={(e) =>
//                           handlePortfolioEdit(e, "name", portfolio.id)
//                         }
//                         fullWidth
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         defaultValue={portfolio.url}
//                         size="small"
//                         margin="normal"
//                         id="description"
//                         label="アプリURL"
//                         name="description"
//                         autoFocus
//                         sx={{ background: "#fff" }}
//                         onChange={(e) =>
//                           handlePortfolioEdit(e, "url", portfolio.id)
//                         }
//                         fullWidth
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={12}>
//                       <TextField
//                         defaultValue={portfolio.description}
//                         size="small"
//                         margin="normal"
//                         id="description"
//                         label="アプリ詳細"
//                         name="description"
//                         autoFocus
//                         multiline
//                         rows={4}
//                         sx={{ background: "#fff" }}
//                         onChange={(e) =>
//                           handlePortfolioEdit(e, "description", portfolio.id)
//                         }
//                         fullWidth
//                       />
//                     </Grid>
//                   </Grid>
//                 </Grid>

//                 <Grid item xs={12} md={4} marginTop={2}>
//                   <input
//                     type="file"
//                     onChange={(e) => handleEditImageSelect(e, portfolio.id)}
//                   />
//                   {portfolio.image && (
//                     <img
//                       src={portfolio.image.url}
//                       width={270}
//                       style={{
//                         marginTop: "5px",
//                         objectFit: "cover",
//                         height: "150px",
//                       }}
//                     />
//                   )}
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 variant="outlined"
//                 onClick={(e) => handlePortfolioDelete(e, portfolio.id)}
//                 sx={{ mt: 2, mb: 2 }}
//                 fullWidth
//               >
//                 アプリを削除
//               </Button>

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mb: 2,
//                 }}
//               >
//                 Portfolio 編集を保存
//               </Button>
//             </>
//           ))}

//         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//           <Alert onClose={handleClose} severity="success">
//             Portfolio 情報の更新が完了しました
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Box>
//   );
// };

// export default UserPortfolioEdit;
