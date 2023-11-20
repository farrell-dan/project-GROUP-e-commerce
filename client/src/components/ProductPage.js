import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [quantityBuy, setQuantity] = useState(1);
    const  _id  = useParams()._id;

    useEffect(() => {
    fetch(`/api/getItemById/${_id}`)
    .then((response) => response.json())
    .then((data) => {
        setProduct(data.data);
        setLoading(false);
    })
    .catch((error) => {
        console.error(`Error fetching product details for ID ${_id}:`, error);
        setLoading(false);
    });
}, [_id]);

const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
};

return (
    <Element>
    {loading && !product ? (
        <CircularProgress />
    ) : (
        <ProductDetails
        product={product}
        quantityBuy= {quantityBuy}
        onQuantityChange={handleQuantityChange}
        />
    )}
    </Element>
);
};

const ProductDetails = ({ product, quantityBuy, onQuantityChange }) => {
const [notification, setNotification] = useState(null);


const handleAddToCart = async () => {

    const requestData = {
        _id: product._id,
        numInStock: product.numInStock,
        name: product.name,
        price: product.price,
        body_location: product.body_location,
        category: product.category,
        companyId: product.companyId,
        imageSrc: product.imageSrc,
        quantityBuy: quantityBuy,
    };

    console.log(requestData)

    fetch("/api/addToCart", {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.message);
        if (data.message !== "Item added to the cart successfully") {
        console.log("error");
        }
    });
};


return (
    <DetailContainer>
    <ImgDiv>
        <ItemImage src={product.imageSrc} alt={product.name} />
    </ImgDiv>
    <ItemInfo>
        <h3>{product.name}</h3>
        <h4>Price: {product.price}</h4>
        <h4>Category: {product.category}</h4>
        <h4>body Location: {product.body_location}</h4>
        <QuantityContainer>
        <label>Quantity:</label>
        <QuantityInput
            type="number"
            min="1"
            value={quantityBuy}
            onChange={onQuantityChange}
        />
        </QuantityContainer>
        <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
    </ItemInfo>
    {notification && <Notification>{notification}</Notification>}
    </DetailContainer>
);
};

const ImgDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const DetailContainer = styled.div`
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    align-items: center;
    text-align: left;
    width: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

`;

const ItemImage = styled.img`
    max-width: 200px;
    border-radius: 20px;
    padding: 10px;
`;

const ItemInfo = styled.div`
  display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
    height: 100%;
    h4 {
        text-align: right;
        margin-right: 10px;
        margin-top:10px;
        margin-bottom:0;
    }
    h3 {
        text-align: center;
    }
`;

const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: flex-end;
    label {
        margin-right: 10px;
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
    margin-left: 72px;
    margin-bottom: 10px;
    width: 200px;
    cursor: pointer;
`;

const Element = styled.div`
    margin-top: 40px;
    margin-left: 30px;
    margin-right: auto;
`;

export default ProductPage;