import { getEnvVar } from './env';

export async function uploadImage(file: File) {
  const uploadApiKey = getEnvVar('PUBLIC_UPLOAD_API_KEY');
  const assetsUrl = getEnvVar('PUBLIC_ASSETS_URL');
  
  // Using Uploadcare
  const formData = new FormData();
  formData.append('file', file);
  formData.append('UPLOADCARE_PUB_KEY', uploadApiKey);
  
  try {
    const response = await fetch('https://upload.uploadcare.com/base/', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    return `${assetsUrl}/${data.file}/`;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}