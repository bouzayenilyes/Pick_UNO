import React, { useRef } from 'react';
import { uploadImage } from '../lib/upload';
import { useCanvasStore } from '../stores/canvasStore';
import { fabric } from 'fabric';

export const ImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { canvas } = useCanvasStore();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvas) return;

    try {
      const imageUrl = await uploadImage(file);
      
      fabric.Image.fromURL(imageUrl, (img) => {
        img.scaleToWidth(200);
        canvas.add(img);
        canvas.renderAll();
      });
    } catch (error) {
      console.error('Error adding image to canvas:', error);
    }
  };

  return (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleUpload}
      className="hidden"
    />
  );
};