# ProImage Tool - Image-Processing-Web-Server-with-Real-Time-Preview

**ProImage Tool** is a full-stack image processing web application that allows users to upload images, preview them in real-time, and download the processed images in various formats (PNG, JPEG). It provides a smooth user experience with progress bars for uploads, and download buttons, and is styled using Tailwind CSS and React.

## Features

- **Image Upload**: Users can upload images in PNG or JPEG format.
- **Real-time Preview**: A low-quality preview of the image is shown after upload for fast feedback.
- **Download Processed Images**: The user can download the processed image in either PNG or JPEG format.
- **Progress Bar**: A smooth progress bar is displayed, showing the upload progress.
- **Responsive Design**: The UI is styled using Tailwind CSS and is fully responsive for any device.
- **Icons & Animations**: Heroicons are used for a modern, intuitive user experience, with smooth animations for progress.
- **Background Processing**: Uses Sharp.js on the backend to handle image processing tasks (resizing, converting formats, etc.).

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

---

## Installation and Setup Manual

### Prerequisites

- **Node.js**: You need to have Node.js installed.
- **Vite**: Used as the development server for the frontend.
- **npm** or **yarn**: You can use either package manager to install dependencies.

### 1. Clone the Repository

First, clone the repository from GitHub using the following command:

```bash
git clone https://github.com/SHERLOCKx90/Image-Processing-Web-Server-with-Real-Time-Preview.git
cd Image-Processing-Web-Server-with-Real-Time-Preview

### 2. Install Dependencies

Navigate to both the `backend` and `frontend` directories and install dependencies for each using the following steps:

#### For Backend:

```bash
cd backend
npm install
```

#### For Frontend:

```bash
cd frontend
npm install
```

### 3. Start the Backend Server

To start the backend server, navigate to the `backend` folder and run:

```bash
cd backend
npx ts-node src/app.ts
```

This starts the backend server on `http://localhost:3001`.

### 4. Start the Frontend Development Server

Navigate to the `frontend` folder and start the Vite development server:

```bash
cd frontend
npm run dev
```

This starts the frontend server on `http://localhost:5173`.

---

## Usage Manual

Once the application is set up and running, follow these steps to use the app:

### 1. Navigate to the App:

Open your browser and go to:

```plaintext
http://localhost:5173
```

### 2. Upload an Image:

- Click on the "Choose File" button to select an image from your local machine (JPEG or PNG format).
- You will see the file name displayed once selected.

### 3. Watch the Progress:

- A progress bar will appear, showing the percentage of the upload in real-time.
- The bar will smoothly animate as the upload progresses.

### 4. Preview the Image:

- Once the upload completes, a preview of the image will be shown on the page.

### 5. Download the Processed Image:

- You can choose to download the image in either PNG or JPEG format using the dropdown menu.
- Click the "Download Image" button, and the processed image will be downloaded to your machine.

---

## Project Structure

```plaintext
Image-Processing-Web-Server-with-Real-Time-Preview/
├── backend/                    # Backend code
│   ├── src/
│   │   ├── app.ts              # Express server setup
│   │   ├── controllers.ts      # Image upload, preview, and download logic
│   │   ├── routes.ts           # API routes
│   ├── uploads/                # Directory where uploaded images are stored
│   └── tsconfig.json           # TypeScript configuration for backend
├── frontend/                   # Frontend code
│   ├── src/
│   │   ├── components/         # React components
│   │   │   └── ImageUploader.tsx  # Main component for uploading images
│   │   ├── context/            # Context API for managing image state
│   │   ├── App.tsx             # Main React app
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   └── vite.config.ts          # Vite configuration
└── README.md                   # Project readme
```

---

## API Documentation

### 1. **Upload and Preview Image**

#### Endpoint:
- `POST /preview`

#### Description:
- Upload an image and generate a real-time low-quality preview.

#### Request:
- Form Data: `image` (file)

#### Response:
- A preview URL of the uploaded image.

---

### 2. **Process and Upload Image**

#### Endpoint:
- `POST /upload`

#### Description:
- Upload an image and process it for downloading.

#### Request:
- Form Data: `image` (file)

#### Response:
- JSON response with the `imageUrl` of the processed image.

---

### 3. **Download Processed Image**

#### Endpoint:
- `GET /download?format=png&imageUrl=path`

#### Description:
- Download the processed image in the specified format (PNG or JPEG).

#### Query Parameters:
- `format`: PNG or JPEG
- `imageUrl`: Path to the processed image

---

## SSH Setup for GitHub (Optional)

If you're pushing your code to GitHub via SSH, follow these steps:

### 1. Generate an SSH key

If you don't have an SSH key, generate one:

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

### 2. Add the SSH key to your SSH agent

Run these commands to add the key:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 3. Add the SSH key to GitHub

- Copy the SSH public key:

    ```bash
    cat ~/.ssh/id_ed25519.pub
    ```

- Go to GitHub -> **Settings** -> **SSH and GPG keys**.
- Click **New SSH key**, give it a title, and paste the public key.
- Save the key.

### 4. Test the SSH connection

Run this command to verify that your SSH key works:

```bash
ssh -T git@github.com
```

You should see a message like:

```plaintext
Hi your-github-username! You've successfully authenticated, but GitHub does not provide shell access.
```

### 5. Push the Code Using SSH

Change the remote URL to use SSH:

```bash
git remote set-url origin git@github.com:SHERLOCKx90/Image-Processing-Web-Server-with-Real-Time-Preview.git
git push origin main
```

---

## Contributing

We welcome contributions! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- **Tailwind CSS**: For quick and easy styling.
- **Heroicons**: For professional, open-source icons.
- **Sharp.js**: For powerful image processing capabilities.
- **Axios**: For seamless HTTP requests.

---

## Contact

Designed & Developed by [Subhadeep Chell](https://github.com/subhadeepchell) ❤️
```

### How to Use:

1. Copy this entire raw code.
2. Open your `README.md` file in your project.
3. Paste the raw code into the `README.md` file.
4. Commit and push the file to GitHub.

This complete `README.md` includes all the sections and manuals to provide users with clear setup instructions, usage details, and contribution guidelines for the project.
