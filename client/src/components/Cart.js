import styled from "styled-components";
import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";



const Cart = () => {

  const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [cartBuy, setCartBuy] = useState([]);
    const [itemBuy, SetitemBuy] = useState([]);
    const [buying, SetBuying] = useState(false)
    const [errorMessage, SetErrorMessage] = useState(null);
    const [quantityBuy, SetQuantityBuy] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/cart/`)
            .then((response) => response.json())
            .then((data) => {
                setCart(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(`Error fetching items from the cart`, error);
                setLoading(false);
            });
    }, []);
    
    const BuyItem = () => {
      SetBuying(true)
      fetch(`/api/BuyItem`)
      .then((response) => response.json())
      .then((data) => {

        if (data.message !== "purchase successful") {
          SetErrorMessage(data.message);
        } else {
          setCartBuy(data.data);
          SetBuying(false)
        }
      })
      .catch((error) => {
          console.error(`Error fetching items from the cart`, error);
      });

      navigate("/cart")
    }

let subTotal = 0;

cart && (subTotal = cart.reduce((sum, item) => {
  return sum + ((Number(item.price.slice(1))) * (Number(item.quantityBuy)))
  },0)
)

    return (
      <Element>
          {loading ? (
              <CircularProgress />
          ) : (
            <PageContainer>
              <ItemContainer>
                {
                  !cart ? (
                  <h1> You cart is empty</h1>) : (  
                  cart.map((item) => (
                      <ItemCard key={item._id} item={item} quantityBuy={quantityBuy} SetQuantityBuy={SetQuantityBuy} />
                  ))
                  )
              }
              </ItemContainer>
              <OrderSummary>
              <h1>Order Summary</h1>
              <OrderInformation>
              <div>  
              <p>Subtotal :</p>
              <p>Estimated Shipping:</p>
              <p>Estimated Total : </p>
              </div>
              <div style={{textAlign:"right"}}>
              <p>{Math.round(subTotal*100)/100} $ </p>
              <p>20.99 $</p>
              <p>{Math.round(subTotal * 1.15625) + 20.99} $</p>
              </div>
              </OrderInformation>
              {cart &&
              <CheckoutButton disabled={buying} onClick={BuyItem}>Checkout</CheckoutButton>}
              {errorMessage && <UserMessage>{errorMessage}</UserMessage>} 
              {/* // : navigate("checkoutPage")} */}
            </OrderSummary>
            </PageContainer>
          )}
      </Element>
  );
};

const ItemCard = ({ item, quantityBuy, SetQuantityBuy }) => {
  
  const ModifyQuantity = (_id, quantityBuy) => {
    fetch("/api/addToCart", {
      method:"POST",
      headers: {
      Accept : "application/json",
      "Content-Type" : "application/json",
    },
    body:JSON.stringify({_id, quantityBuy})
  })
  .then((response) => response.json())
  .then(data => {
    console.log(data);
  })
    }

  const add = () => {
    SetQuantityBuy(quantityBuy + 1)
  }

  const remove = () => {
    SetQuantityBuy(quantityBuy - 1)
  }
  
  return (
      
          <Card>
              <ItemInfo>
                  <ImgDiv>
                    <StyledLink to={`/product/${item._id}`} key={item._id}>
                        <ItemImage src={item.imageSrc} />
                    </StyledLink>
                  </ImgDiv>
                  <h3>{item.name}</h3>
                  <p> Price : {item.price}</p>
                  <button onClick={add}>+</button>
                  <input type="text" onChange={() => ModifyQuantity(item._id, quantityBuy)} value={quantityBuy}></input>
                  <button onClick={remove}>-</button>
              </ItemInfo>
          </Card>
  );
};

const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
width:100%;
`

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  justify-items: left;
  margin-left: 20px; 
  width: 100%;
  height: 100%;
`;

const ImgDiv = styled.div`
display: flex;
justify-content: center;
`

const ItemImage = styled.img`
  max-width: 200px;
  border-radius: 20px;
  padding: 10px;
`;

const Card = styled.div`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 350px;
  display: flex;
  flex-direction: row;
  margin: 10px;   
  align-items: center;
  text-align: left;

  h1 {
      margin: 0;
  }
  h3 {
      margin-right: 10px;
      font-style: italic;
  }
  p {
      font-weight: bold;
      text-align: right;
      margin-right: 10px;
  }
`;

const OrderSummary = styled.div`
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

const PageContainer = styled.div`
display : flex;
flex-direction: row;
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap; 
  width: 100%;
  justify-content: left;
`;

const Element = styled.div`
  margin-top: 40px;
  margin-left: 30px;
  margin-right: auto;
  


`

export default Cart

