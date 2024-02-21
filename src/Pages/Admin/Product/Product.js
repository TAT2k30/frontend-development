import React, { useEffect, useState } from 'react';
import './Product.scss';
import axios from 'axios';
import { baseUrl } from '../../../Assets/Data/baseUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Product(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Product`);
                setProducts(response.data.data.$values);
              
            } catch (error) {
                alert("Error. Please check your console for details.");
                console.error(error);
            }
        };

        getAllProducts();   
    }, []);

    return (                
        <div className='admin-product'>
            <h2>Product list</h2>
        <div className="product-card-container">
            {products.map((product, index) => (
                <div className="product-card" key={index}>
                    <img src={product.pImgUrl} alt={product.name} className="product-card-image" />
                    <hr/>
                    <div className="product-card-details">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="product-status">
                            {product.status === 'Public' ? (
                                <FontAwesomeIcon icon={faEye} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                            <span>{product.status}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}

export default Product;
