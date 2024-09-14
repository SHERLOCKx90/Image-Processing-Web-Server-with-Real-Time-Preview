import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { processImage, getPreview, downloadImage } from './controllers';  // Ensure correct imports

const app = express();
app.use(cors());  // Enable CORS

const upload = multer({ dest: 'uploads/' });

// Routes for uploading, previewing, and downloading images
app.post('/upload', upload.single('image'), processImage);
app.post('/preview', upload.single('image'), getPreview);
app.get('/download', downloadImage);  // Route to handle image download

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
