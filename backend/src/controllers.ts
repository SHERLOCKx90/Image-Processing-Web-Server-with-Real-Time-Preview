import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// A utility function to validate the format is one of Sharp's supported formats
const isValidFormat = (format: any): format is keyof sharp.FormatEnum => {
  return ['png', 'jpeg', 'jpg', 'webp', 'tiff', 'gif', 'avif'].includes(format);
};

// Process the uploaded image
export const processImage = async (req: Request, res: Response) => {
  try {
    const imagePath = req.file?.path;
    if (!imagePath) return res.status(400).send('No image uploaded.');

    // Process the image using Sharp
    const processedImagePath = `uploads/processed-${req.file?.filename}.png`;
    await sharp(imagePath)
      .resize(800) // Resize the image
      .toFormat('png') // Convert image to PNG
      .toFile(processedImagePath); // Save the processed image

    res.json({ message: 'Image processed successfully', imageUrl: processedImagePath });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process image' });
  }
};

// Generate a preview of the uploaded image
export const getPreview = async (req: Request, res: Response) => {
  try {
    const imagePath = req.file?.path;
    if (!imagePath) return res.status(400).send('No image uploaded.');

    // Create a preview of the image using Sharp
    const previewBuffer = await sharp(imagePath)
      .resize(200) // Resize for preview
      .toFormat('jpeg') // JPEG format for preview
      .jpeg({ quality: 50 }) // Lower quality for faster preview
      .toBuffer();

    // Send the preview image back
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(previewBuffer, 'binary');
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate preview' });
  }
};

// Handle image download with format conversion
export const downloadImage = async (req: Request, res: Response) => {
  const { format, imageUrl } = req.query;

  try {
    // Decode the image URL and get the full path
    const decodedImageUrl = decodeURIComponent(imageUrl as string);
    const imagePath = path.resolve(__dirname, `../${decodedImageUrl}`);

    // Check if the file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).send({ error: 'File not found' });
    }

    // Validate the format, default to 'png'
    const validFormat = isValidFormat(format) ? format : 'png';

    // Convert and send the image
    const imageBuffer = await sharp(imagePath)
      .toFormat(validFormat) // Convert to valid format
      .toBuffer();

    res.set('Content-Disposition', `attachment; filename="image.${validFormat}"`);
    res.set('Content-Type', `image/${validFormat}`);
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).send({ error: 'Failed to download the image' });
  }
};
