import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPages';
import { OrdersPage } from './pages/OrdersPage.jsx';
import { Tracking } from './pages/Tracking.jsx';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="checkout" element={<CheckoutPage />} /> 
        <Route path="orders" element={<OrdersPage />} /> 
        <Route path="tracking" element={<Tracking />} /> 
      </Routes>
    </>
  );
}

export default App;