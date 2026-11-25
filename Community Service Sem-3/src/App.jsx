import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RiskAlertPanel from './components/RiskAlertPanel';
import PrescriptionModal from './components/PrescriptionModal';
import LiveWardView from './views/LiveWardView';
import MLAnalyticsView from './views/MLAnalyticsView';
import EHRLogsView from './views/EHRLogsView';
import ScheduleMatrixView from './views/ScheduleMatrixView';

function AppContent() {
  const { state } = useApp();

  const renderView = () => {
    switch (state.activeView) {
      case 'live-ward': return <LiveWardView />;
      case 'schedule-matrix': return <ScheduleMatrixView />;
      case 'ml-analytics': return <MLAnalyticsView />;
      case 'ehr-logs': return <EHRLogsView />;
      default: return <LiveWardView />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="app-content">
          {renderView()}
        </main>
      </div>
      <RiskAlertPanel />
      <PrescriptionModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
