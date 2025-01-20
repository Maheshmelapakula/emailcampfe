import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import Login from './components/Login';
import CampaignPerformance from './components/CampaginPerfoemace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-campaign" element={<CampaignForm />} />
        <Route path="/campaign-list" element={<CampaignList />} />
        <Route path="/campaign-performance" element={<CampaignPerformance />} />

        
      </Routes>
    </Router>
  );
}

export default App;
