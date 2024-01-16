import AppContext from './context/AppContext';
import { Route, Routes } from 'react-router-dom';
import { MediaPage, ReportDatePage, ViewExcelPage, ViewListReportPage, MakeInspectionPage, Appendix } from './page';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Layout from './layout/layout';

function App() {
  return (
    <AppContext>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MediaPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="media/view" element={<ViewExcelPage />} />
            <Route path="report-day" element={<ReportDatePage />} />
            <Route path="report/view" element={<ViewListReportPage />} />
            <Route path="inspect" element={<MakeInspectionPage />} />
            <Route path="appendix" element={<Appendix />} />
          </Route>
        </Routes>
      </div>
    </AppContext>
  );
}

export default App;
