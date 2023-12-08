export const uploadImg = async (file: File) => {
  if (!file) return;
  let fileType = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/svg",
    "image/gif",
    "image/webp",
    "image/apng",
    "image/heic",
    "image/heic",
    "image/bmp",
    "image/tiff",
    "image/tif",
    "image/pp2",
  ];
  if (fileType.includes(file.type)) {
    try {
      const data = new FormData();
      data.set("file", file);

      const response = await fetch("/api/upload/photo_profil", {
        method: "POST",
        body: data,
      });
      if (response.ok) console.log("Photo téléversé avec succès");
      else alert(await response.text());
    } catch (error) {
      console.error(error);
    }
  } else alert("Format d'image invalide");
};
