import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from "../../components/header";
import { ProductsGrid } from './ProductGrid.jsx';
import "./HomePage.css";

export function HomePage({ cartItems = [], loadCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("/api/products")
            .then((response) => {
                setProducts(response.data);
            });
    }, []);

    return (
        <>
            <Header cart={cartItems} />
            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}
