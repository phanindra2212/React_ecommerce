import { Routes, Route } from 'react-router';
import { HomePage } from './pages/Home/HomePage.jsx';
import { CheckoutPage } from './pages/Checkout/CheckoutPages.jsx';
import { OrdersPage } from './pages/Orders/OrdersPage.jsx';
import { Tracking } from './pages/Tracking/Tracking.jsx';
import './App.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product")
      .then((response) => {
        setCartItems(response.data);
      });
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cartItems={cartItems} />} />
        <Route path="checkout" element={<CheckoutPage cartItems={cartItems} />} />
        <Route path="orders" element={<OrdersPage cartItems={cartItems} />} />
        <Route path="tracking" element={<Tracking />} />
      </Routes>
    </>
  );
}

export default App;
