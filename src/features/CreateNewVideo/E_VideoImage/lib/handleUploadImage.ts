// const handleUploadImage = async (index: number) => {
//   setLoading(true);
//   const imgItem = imageUrl.find((img) => img.imageId === index);

//   if (!imgItem) {
//     alert("이미지를 찾을 수 없습니다.");
//     return;
//   }

//   try {
//     // 이미지 URL에서 Blob으로 변환
//     const response = await fetch(imgItem.imageUrl);
//     const blob = await response.blob();

//     // Cloudinary에 업로드
//     const formData = new FormData();
//     formData.append("file", blob);
//     formData.append(
//       "upload_preset",
//       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
//     ); // Cloudinary upload preset 설정

//     const cloudinaryResponse = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const cloudinaryData = await cloudinaryResponse.json();

//     if (cloudinaryData.url) {
//       const updatedImageUrl: ImageUrlType[] = imageUrl.map((item) =>
//         item.imageId === index
//           ? {
//               imageId: index,
//               imageUrl: imgItem.imageUrl,
//               cloudinaryUrl: cloudinaryData.url,
//             }
//           : item
//       );
//       setImageUrl("imageUrl", updatedImageUrl);
//     }

//     console.log("cloudinaryData");
//     console.log(cloudinaryData);

//     // if (cloudinaryResponse.ok) {
//     //   // Cloudinary 업로드 성공 후 URL 업데이트
//     //   const updatedImageUrl: ImageUrlType[] = imageUrl.map((item) =>
//     //     item.imageId === index
//     //       ? {
//     //           imageId: index,
//     //           imageUrl: cloudinaryData.secure_url,
//     //         }
//     //       : item
//     //   );

//     //   setImageUrl("imageUrl", updatedImageUrl);
//     // } else {
//     //   throw new Error("Cloudinary 업로드에 실패했습니다.");
//     // }
//   } catch (error) {
//     console.error("이미지 업로드 오류:", error);
//   } finally {
//     setLoading(false);
//   }
// };
