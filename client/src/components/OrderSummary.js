//Component Order summary 

import styled from "styled-components";
import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const OrderSummary = ({cart}) => {

  const [errorMessage, SetErrorMessage] = useState(null);
  const [buying, SetBuying] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  
  let total = 0;

  useEffect(() => { 
        for (let index = 0; index < cart.length; index++) {
        const item = cart[index];
        if(item.numInStock > 1) {
        total += ((Number(item.price.slice(1))) * (Number(item.quantityBuy)))
      }
    }
    setSubTotal(total);
  },[cart])

  const BuyItem = () => {
    SetBuying(true)
    fetch(`/api/BuyItem`)
    .then((response) => response.json())
    .then((data) => {

      if (data.message !== "purchase successful") {
        SetErrorMessage(data.message);
      } else {
        SetBuying(false)
      }
    })
    .catch((error) => {
        console.error(`Error fetching items from the cart`, error);
    });
  }
              return (
              <OrderSummaryStyle>
              <h1>Order Summary</h1>
              <OrderInformation>
              <div>  
              <p>Subtotal :</p>
              <p>Estimated Shipping:</p>
              <p>Estimated Total : </p>
              </div>
              {(
              <div style={{textAlign:"right"}}>
              <p>{Math.round(subTotal*100)/100} $ </p>
              <p>20.99 $</p>
              <p>{Math.round(subTotal * 1.15625) + 20.99} $</p>
              </div>
              )}
              </OrderInformation>
              {cart &&
              <CheckoutButton disabled={buying} onClick={BuyItem}>Checkout</CheckoutButton>}
              {errorMessage && <UserMessage>{errorMessage}</UserMessage>} 
              {/* // : navigate("checkoutPage")} */}
              </OrderSummaryStyle>
              )
}

const OrderSummaryStyle = styled.div`
display: flex;
flex-direction: column;
padding:20px 40px;
margin: 20px;
width: 75%;
height: 100%;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
border: solid black;
border-radius: 10px;
`

const OrderInformation = styled.div`
display: grid;
grid-template-columns:1fr 1fr;
grid-gap: 50%;
`

const CheckoutButton = styled.button`
width:75%;
text-align: center;
align-self: center;
border-radius: 15px;
margin:20px;
padding:10px;
font-size: 1.5em;
outline: auto;
`

const UserMessage = styled.p`

`

export default OrderSummary;