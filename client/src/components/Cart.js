import styled from "styled-components";
import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import OrderSummary from "./OrderSummary"
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {

  const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

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
                      <ItemCard key={item._id} item={item} cart={cart} setCart={setCart}/>
                  ))
                  )
              }
              </ItemContainer>
              <OrderSummary cart={cart}/>
            </PageContainer>
          )}
      </Element>
  );
};

const ItemCard = ({setCart, item}) => {

  const [ModifiedQuantity, SetModifiedQuantity] = useState(item.quantityBuy);

  const ModifyQuantity = () => {
    
    fetch("/api/addToCart", {
      method:"POST",
      headers: {
      Accept : "application/json",
      "Content-Type" : "application/json",
    },
    body:JSON.stringify({_id : item._id, quantityBuy : ModifiedQuantity})
  })
  .then((response) => response.json())
  .then(data => {
    console.log(data);
  })

      fetch(`/api/cart/`)
        .then((response) => response.json())
        .then((data) => {
            setCart(data.data);
        })
        .catch((error) => {
            console.error(`Error fetching items from the cart`, error);
        });
}

  const add = () => {
    SetModifiedQuantity(ModifiedQuantity + 1)
  }

  const remove = () => {
    if(ModifiedQuantity > 1) {
      SetModifiedQuantity(ModifiedQuantity - 1)
    }     
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
                  <div style={{display:"flex"}}>
                  <button onClick={add}>+</button>
                  <p>Quantity : {(item.numInStock < 1) ? "OutOfStock" : (ModifiedQuantity || item.quantityBuy)} </p>
                  <button onClick={remove}>-</button>
                  <button className="update" onClick={ModifyQuantity}>Update</button>
                  </div>
                  <button className="fullSize" ><DeleteIcon/></button>
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

  button {
  height:50%;
  margin-bottom: 10px;
  align-self: center;
  width:10%;
}

.update{
  width:35%;
  margin-left: 2%;
}

.fullSize {
  width:20%;
  margin-right:85%;
}

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
  background-color: white;

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
      margin-left: 10px;
  }
`;



const PageContainer = styled.div`
display : flex;
flex-direction: row;
justify-content: center;

`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap; 
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Element = styled.div`
  margin-top: 80px;
  margin-left: 30px;
  margin-right: auto;
  


`

export default Cart

