// import React, { useState, FC } from "react";
// import axios from "axios";
// import { SelectProps } from "../../types/types";
// import { useRouter } from "next/router";
// import { Box, Grid, TextField, Button, MenuItem } from "@mui/material";

// const UserSnsEdit: FC<SelectProps> = ({ snsType }) => {
//   const router = useRouter();
//   const { id } = router.query; //ユーザーID
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   const [snsTypes, setSnsTypes] = useState(snsType);
//   const [newSns, setNewSns] = useState({
//     url: "",
//   });
//   const [newSnsType, setNewSnsType] = useState(0);

//   const handleSnsAdd = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: "url"
//   ) => {
//     const value = e.target.value;
//     setNewSns((prevSns) => ({
//       ...prevSns,
//       [field]: value,
//     }));
//   };

//   const handleNewSnsType = async (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const selectValue = Number(e.target.value);
//     setNewSnsType(selectValue);
//   };

//   const handleNewSnsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       // 新しいポートフォリオをサーバーにPOST
//       const response = await axios.post(`${apiUrl}/api/v1/sns`, {
//         url: newSns.url,
//         userID: Number(id),
//         typeofSNSID: newSnsType,
//       });

//       if (response.status === 200) {
//         window.location.reload();
//         // input要素を空にする
//         setNewSns({ url: "" });
//         setNewSnsType(0);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         marginBottom: 15,
//       }}
//     >
//       <Box
//         component="form"
//         onSubmit={(e) => handleNewSnsSubmit(e)}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: 2,
//           marginX: "auto", // 左右のマージンを中央に寄せる
//           maxWidth: "900px", // ボックスの最大幅を指定
//         }}
//       >
//         <>
//           <Grid container spacing={1}>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 select
//                 defaultValue={0}
//                 size="small"
//                 margin="normal"
//                 required
//                 label="SNSの種類"
//                 name="typeofSNSID"
//                 sx={{ background: "#fff" }}
//                 onChange={(e) => handleNewSnsType(e)}
//                 fullWidth
//               >
//                 <MenuItem value={0}>SNSの種類 を選択</MenuItem>
//                 {snsTypes &&
//                   snsTypes.map((type) => (
//                     <MenuItem key={type.id} value={type.id}>
//                       {type.typeofSNS}
//                     </MenuItem>
//                   ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 defaultValue={newSns.url}
//                 size="small"
//                 margin="normal"
//                 required
//                 id="url"
//                 label="SNSのURL"
//                 name="url"
//                 autoFocus
//                 sx={{ background: "#fff" }}
//                 onChange={(e) => handleSnsAdd(e, "url")}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 2,
//               mb: 2,
//             }}
//           >
//             新規 SNS を追加
//           </Button>
//         </>
//       </Box>
//     </Box>
//   );
// };

// export default UserSnsEdit;
