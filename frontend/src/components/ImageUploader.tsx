import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ImageContext } from '../context/ImageContext';
import { CloudUploadIcon, DownloadIcon, CheckCircleIcon } from '@heroicons/react/outline'; // Import Heroicons

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null); // Store the file name
  const { previewUrl, finalImageUrl, setPreviewUrl, setFinalImageUrl } = useContext(ImageContext);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpeg'>('png'); // Default to 'png'
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Track upload progress
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false); // Track upload success

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name); // Set the selected file's name
      setUploadProgress(0); // Reset progress bar when a new file is selected
      setUploadSuccess(false); // Reset upload success state
    }
  };

  // Simulate slow progress bar animation
  const simulateSlowProgress = (callback: () => Promise<void>) => {
    let progress = 0;
    const timer = setInterval(() => {
      progress += 10;
      if (progress <= 90) {
        setUploadProgress(progress);
      } else {
        clearInterval(timer);
        callback();
      }
    }, 300); // Increment every 300ms to slow down the animation
  };

  // Handle file upload and image processing
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    // Simulate slow progress first, then do the actual upload
    simulateSlowProgress(async () => {
      try {
        // Step 1: Get real-time preview (lower quality)
        const previewResponse = await axios.post('http://localhost:3001/preview', formData, {
          responseType: 'blob', // Expect a Blob for the image preview
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress); // Update the progress bar with actual progress from the server
          },
        });

        const previewUrl = URL.createObjectURL(previewResponse.data); // Create a local URL for the Blob
        setPreviewUrl(previewUrl);

        // Step 2: Get the final processed image
        const processResponse = await axios.post('http://localhost:3001/upload', formData);
        setFinalImageUrl(processResponse.data.imageUrl);

        setUploadProgress(100); // Ensure progress reaches 100%
        setUploadSuccess(true); // Set upload success to true after completion
      } catch (error) {
        console.error('Error uploading or processing the image:', error);
      }
    });
  };

  // Function to download the image in the selected format
  const handleDownload = async () => {
    if (!finalImageUrl) return;

    try {
      const response = await axios.get(`http://localhost:3001/download?format=${downloadFormat}&imageUrl=${encodeURIComponent(finalImageUrl)}`, {
        responseType: 'blob',
      });

      // Create a URL for the downloaded image and trigger a download
      const blob = new Blob([response.data], { type: `image/${downloadFormat}` });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `image.${downloadFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message after the image is downloaded
      setDownloadMessage(`Image successfully downloaded as ${downloadFormat.toUpperCase()}`);

      // Hide the message after 3 seconds
      setTimeout(() => setDownloadMessage(null), 3000);

    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      {/* Branding */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400">ProImage Tool</h1>
        <p className="text-lg text-gray-300">Image Processing Web Server with Real-Time Preview</p>
      </div>

      <div className="bg-slate-800 rounded-lg p-8 shadow-lg w-96 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4 text-center max-w-full">Upload Your Image</h1>

        {/* Choose file button with icon */}
        <label className="flex items-center cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 justify-center">
          <CloudUploadIcon className="h-5 w-5 mr-2" />
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Display the selected file name */}
        {fileName && (
          <div className="text-sm text-gray-300 mb-4">
            <span className="font-bold">Selected file:</span> {fileName}
          </div>
        )}

        {/* Progress Bar */}
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full mb-4">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 flex items-center justify-center"
        >
          <CloudUploadIcon className="h-5 w-5 mr-2" />
          Upload Image
        </button>

        {/* Success message */}
        {uploadSuccess && (
          <div className="text-center text-green-400 font-bold mb-4 flex items-center justify-center">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Image successfully uploaded!
          </div>
        )}

        {/* Preview the image */}
        {previewUrl && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Image Preview:</h3>
            <img src={previewUrl} alt="Image Preview" className="w-full rounded-lg mt-2" />
          </div>
        )}

        {finalImageUrl && (
          <div>
            <h3 className="text-lg font-semibold">Select Download Format:</h3>
            <select
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value as 'png' | 'jpeg')}
              className="w-full bg-white text-black p-2 rounded-lg mb-4"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
            <button
              onClick={handleDownload}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <DownloadIcon className="h-5 w-5 mr-2" />
              Download Image
            </button>
          </div>
        )}

        {downloadMessage && (
          <div className="mt-4 text-center text-green-400 font-bold">
            {downloadMessage}
          </div>
        )}
      </div>

      <div className='text-center'>
        <p className='text-gray-600 mt-10 '>Want to Contribute? Here's the code link: <span className='hover:cursor-pointer hover:text-white transition-all hover:text-pretty'>github.com/proimage</span></p>
        <p className='text-gray-600 mt-5'>Designed & Developed by Subhadeep Chell ❤️</p>
      </div>
    </div>
  );
};

export default ImageUploader;
