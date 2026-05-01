export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // You might need to create this in Cloudinary dashboard

  // Note: For signed uploads, you'd fetch the signature from /api/upload first.
  // For simplicity initially, you can use unsigned uploads if configured in Cloudinary.
  // This utility follows the unsigned pattern but is ready to be upgraded to signed.

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};
