import axios from 'axios'
import { useEffect, useState } from 'react';
import Header from "../components/header";
// import { products as Products } from '../../starting-code/data/products';
import "./HomePage.css";

export function HomePage() {

    const [products, setProducts] = useState([]);
   const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

    axios.get("http://localhost:3000/api/products")
        .then((response) => {
            setProducts(response.data);
        });

    axios.get("http://localhost:3000/api/cart-items")
        .then((response) => {
            setCartItems(response.data);
        });

}, []);
    
    return (
        <>
            <Header cart={cartItems}/>

            <div className="home-page">
                <div className="products-grid">

                    {products.map((product) => (
                        <div key={product.id} className="product-container">

                            <div className="product-image-container">
                                <img
                                    className="product-image"
                                    src={`/${product.image}`}
                                    alt={product.name}
                                />
                            </div>

                            <div className="product-name limit-text-to-2-lines">
                                {product.name}
                            </div>

                            <div className="product-rating-container">
                                <img
                                    className="product-rating-stars"
                                    src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
                                    alt="Rating"
                                />

                                <div className="product-rating-count link-primary">
                                    {product.rating.count}
                                </div>
                            </div>

                            <div className="product-price">
                                ${(product.priceCents / 100).toFixed(2)}
                            </div>

                            <div className="product-quantity-container">
                                <select>
                                    {[...Array(10)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="product-spacer"></div>

                            <div className="added-to-cart">
                                <img src="/images/icons/checkmark.png" alt="Added" />
                                Added
                            </div>

                            <button className="add-to-cart-button button-primary">
                                Add to Cart
                            </button>

                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}
