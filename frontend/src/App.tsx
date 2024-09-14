import React from 'react';
import ImageUploader from './components/ImageUploader';
import Preview from './components/Preview';
import { ImageProvider } from './context/ImageContext';

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div>
        <ImageUploader />
        {/* <Preview /> */}
      </div>
    </ImageProvider>
  );
};

export default App;
