import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();

    useEffect(() => {
        fetch(`/api/getItemById/${productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(`Error fetching product details for ID ${productId}:`, error);
                setLoading(false);
            });
    }, [productId]);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
    };

    return (
        <Element>
            {loading ? (
                <CircularProgress />
            ) : (
                <ProductDetails
                    product={product}
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                />
            )}
        </Element>
    );
};

const ProductDetails = ({ product, quantity, onQuantityChange }) => {
    const [notification, setNotification] = useState(null);

    
    
    const handleAddToCart = async () => {

fetch("/api/addToCart", {
    method:"POST",
    headers: {
        Accept : "application/json",
        "Content-Type" : "application/json",
    },
    })

    .then((response) => response.json())
    .then(data => {
    console.log(data);
    console.log(data.data._id);
    console.log(data.message);
    if (data.message !== "Item added to the existing cart successfully") {
        console.log("error");
        }
    })
    }


    return (
        <DetailContainer>
            <ItemImage src={product.item.imageSrc} alt={product.item.name} />
            <ItemInfo>
                <h2>{product.item.name}</h2>
                <p>{product.item.description}</p>
                <p>Price: {product.item.price}</p>
                <QuantityContainer>
                    <label>Quantity:</label>
                    <QuantityInput
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={onQuantityChange}
                    />
                </QuantityContainer>
                <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
            </ItemInfo>
            {notification && <Notification>{notification}</Notification>}
        </DetailContainer>
    );
};

const DetailContainer = styled.div`
    display: flex;
    margin-top: 20px;
`;

const ItemImage = styled.img`
    max-width: 300px;
    border-radius: 20px;
    padding: 10px;
`;

const ItemInfo = styled.div`
    margin-left: 20px;
    flex-grow: 1;
`;

const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    label {
        margin-right: 10px;
    }
`;

const QuantityInput = styled.input`
    width: 40px;
    text-align: center;
`;

const AddToCartButton = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Notification = styled.div`
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: #4caf50;
    color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Element = styled.div`
    margin-top: 40px;
    margin-left: 30px;
    margin-right: auto;
`;

export default ProductPage;