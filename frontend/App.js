import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentPage from './PaymentPage'; // Import the payment page

function App() {
  return (
    <Router>
      <Routes>
        {/* Add other routes as needed */}
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
