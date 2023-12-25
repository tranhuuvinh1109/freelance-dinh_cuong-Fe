import AppContext from './context/AppContext';
import { Route, Routes } from 'react-router-dom';
import { MediaPage, ViewExcelPage } from './page';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <AppContext>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/view" element={<ViewExcelPage />} />
          <Route path="/" element={<MediaPage />} />
        </Routes>
      </div>
    </AppContext>
  );
}

export default App;
