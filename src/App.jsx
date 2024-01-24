import AppContext from './context/AppContext';
import { Route, Routes } from 'react-router-dom';
import {
  MediaPage,
  ReportDatePage,
  ViewExcelPage,
  ViewListReportPage,
  MakePlanPage,
  Appendix,
  ViewPlanPage,
  CreateAppendix,
} from './page';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Layout from './layout/layout';
import checkAPI from './api/checkAPI';
import { useQuery } from '@tanstack/react-query';
function App() {
  useQuery({ queryKey: ['todos'], queryFn: () => checkAPI.checkServer(), retry: 5 });

  return (
    <AppContext>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MakePlanPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="media/view" element={<ViewExcelPage />} />
            <Route path="report-day" element={<ReportDatePage />} />
            <Route path="report/view" element={<ViewListReportPage />} />
            <Route path="plan/view" element={<ViewPlanPage />} />
            <Route path="appendix" element={<Appendix />} />
            <Route path="appendix/create" element={<CreateAppendix />} />
          </Route>
        </Routes>
      </div>
    </AppContext>
  );
}

export default App;
