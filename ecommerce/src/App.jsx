import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPages.jsx';
import { OrdersPage } from './pages/OrdersPage.jsx';
import { Tracking } from './pages/Tracking.jsx';
import './App.css';

import { useEffect ,useState} from 'react';
import axios  from 'axios';
function App() {
  
   const [cartItems, setCartItems] = useState([]);

   useEffect(()=>{
     axios.get("/api/cart-items?expand=product")
        .then((response) => {
            setCartItems(response.data);
        });
   }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cartItems={cartItems}/>} />
        <Route path="checkout" element={<CheckoutPage cartItems={cartItems} />} /> 
        <Route path="orders" element={<OrdersPage />} /> 
        <Route path="tracking" element={<Tracking />} /> 
      </Routes>
    </>
  );
}

export default App;
