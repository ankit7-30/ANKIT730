export const uploadToCloudinary = async (file: File, folder: string = "ankit_general") => {
  const formData = new FormData();
  formData.append("file", file);
  
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default";
  formData.append("upload_preset", uploadPreset); 
  formData.append("folder", folder); // This will automatically create and organize folders

  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      throw new Error("Cloudinary Cloud Name is missing in .env.local");
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    
    if (response.ok && data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Cloudinary Response Error:", data);
      throw new Error(data.error?.message || "Upload failed. Check if your Upload Preset is set to 'Unsigned' in Cloudinary.");
    }
  } catch (error: any) {
    console.error("Cloudinary Connection Error:", error);
    throw new Error(error.message || "Network error during upload.");
  }
};
