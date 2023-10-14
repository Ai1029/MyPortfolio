// import React, { useState, FC } from "react";
// import axios from "axios";
// import { Props, SelectProps } from "../../types/types";
// import { useRouter } from "next/router";
// import {
//   Box,
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// const UserSnsEdit: FC<Props & SelectProps> = ({ userInfo, snsType }) => {
//   const router = useRouter();
//   const { id } = router.query; //ユーザーID
//   const [editUserSns, setEditUserSns] = useState(userInfo.sns);
//   const [snsTypes, setSnsTypes] = useState(snsType);
//   const [open, setOpen] = useState(false);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   const handleSnsEdit = async (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: "url",
//     id: number
//   ) => {
//     const value = e.target.value;

//     setEditUserSns((prevSnsData) => {
//       if (!prevSnsData) {
//         console.error("Snsのデータがありません");
//         return prevSnsData;
//       }
//       const updatedElements = prevSnsData.map((element) => {
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

//   const handleSnsTypeEdit = async (
//     e:
//       | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//       | React.ChangeEvent<HTMLSelectElement>,
//     id: number
//   ) => {
//     const selectValue = Number(e.target.value);
//     setEditUserSns((prevSnsType) => {
//       if (!prevSnsType) {
//         console.error("snstypeのデータがありません");
//         return prevSnsType;
//       }
//       const updatedElements = prevSnsType.map((element) => {
//         if (element.id === id) {
//           return {
//             ...element,
//             typeofSNSID: selectValue,
//           };
//         }
//         return element;
//       });
//       return updatedElements;
//     });
//   };

//   const handleSnsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!editUserSns) {
//       console.error("Snsのデータがありません");
//       return;
//     }
//     try {
//       await Promise.all(
//         editUserSns.map(async (sns) => {
//           const updatedUserSns = {
//             url: sns.url,
//             userID: sns.userID,
//             typeofSNSID: sns.typeofSNSID,
//           };
//           await axios.patch(`${apiUrl}/api/v1/sns/${sns.id}`, updatedUserSns);
//         })
//       );
//       // 更新が完了したらSnackbarを表示
//       setOpen(true);
//       console.log("SNSの情報の更新が完了しました");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSnsDelete = async (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     id: number
//   ) => {
//     try {
//       await axios.delete(`${apiUrl}/api/v1/sns/${id}`),
//         console.log("SNSが削除されました");
//       window.location.reload();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Box>
//       <Box
//         component="form"
//         onSubmit={(e) => handleSnsSubmit(e)}
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
//           SNS
//         </Typography>
//         {editUserSns &&
//           editUserSns.length > 0 &&
//           editUserSns.map((sns) => (
//             <>
//               <Grid container spacing={1} key={sns.id}>
//                 <Grid item xs={12} md={4}>
//                   <TextField
//                     select
//                     value={sns.typeofSNSID}
//                     size="small"
//                     margin="normal"
//                     required
//                     label="SNSの種類"
//                     name="typeofSNSID"
//                     sx={{ background: "#fff" }}
//                     onChange={(e) => handleSnsTypeEdit(e, sns.id)}
//                     fullWidth
//                   >
//                     <MenuItem value={0}>SNSの種類 を選択</MenuItem>
//                     {snsTypes &&
//                       snsTypes.map((type) => (
//                         <MenuItem key={type.id} value={type.id}>
//                           {type.typeofSNS}
//                         </MenuItem>
//                       ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     defaultValue={sns.url}
//                     size="small"
//                     margin="normal"
//                     required
//                     id="url"
//                     label="SNSのURL"
//                     name="url"
//                     autoFocus
//                     sx={{ background: "#fff" }}
//                     onChange={(e) => handleSnsEdit(e, "url", sns.id)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={2}>
//                   <Button
//                     type="submit"
//                     variant="outlined"
//                     onClick={(e) => handleSnsDelete(e, sns.id)}
//                     sx={{ mt: 2, mb: 2 }}
//                     fullWidth
//                   >
//                     SNSを削除
//                   </Button>
//                 </Grid>
//               </Grid>

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 2,
//                   mb: 2,
//                 }}
//               >
//                 SNS 編集を保存
//               </Button>
//             </>
//           ))}

//         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//           <Alert onClose={handleClose} severity="success">
//             SNS 情報の更新が完了しました
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Box>
//   );
// };

// export default UserSnsEdit;
