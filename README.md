# ProImage Tool

ProImage Tool is a full-stack image processing web application that allows users to upload images, preview them in real-time, and download the processed images in different formats (PNG, JPEG). The app provides a smooth user experience with features such as progress bars for uploads, download buttons, and visually appealing design using Tailwind CSS and React.

## Features

- **Image Upload**: Users can upload images in PNG or JPEG format.
- **Real-time Preview**: A low-quality preview of the image is shown after upload for fast feedback.
- **Download Processed Images**: The user can download the processed image in either PNG or JPEG format.
- **Progress Bar**: The app displays a smooth progress bar showing the upload progress.
- **Responsive Design**: The UI is styled using Tailwind CSS for a professional look and is fully responsive.
- **Icons & Animations**: Heroicons are used for a modern and intuitive user experience, with smooth animations for the progress bar.
- **Background Processing**: Uses `Sharp.js` on the backend to handle image processing tasks.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Tailwind CSS**: For styling the UI.
- **Heroicons**: For adding professional icons to buttons and indicators.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: For handling server-side operations.
- **Express.js**: For routing and handling API requests.
- **Sharp.js**: For image processing tasks (resizing, converting formats, etc.).
- **Multer**: For handling file uploads.
- **TypeScript**: For type safety across the backend code.

## Installation

### Prerequisites

- **Node.js**: You need to have Node.js installed.
- **Vite**: Used as the development server for the frontend.
- **npm** or **yarn**: You can use either package manager to install dependencies.

### 1. Clone the Repository

```bash
git clone https://github.com/SHERLOCKx90/Image-Processing-Web-Server-with-Real-Time-Preview.git
cd Image-Processing-Web-Server-with-Real-Time-Preview
