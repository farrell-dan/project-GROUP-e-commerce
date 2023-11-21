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
                  cart.map((item, index) => (
                      <ItemCard key={item._id} item={item} cart={cart} setCart={setCart} index={index}/>
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

const ItemCard = ({setCart, item, index}) => {

  const [ModifiedQuantity, SetModifiedQuantity] = useState(item.quantityBuy);

  let outOfStock = false;

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
              <h2>{index+1}</h2>
                  <ImgDiv>
                    <StyledLink to={`/product/${item._id}`} key={item._id}>
                        <ItemImage src={item.imageSrc} />
                    </StyledLink>
                  </ImgDiv>
                  {outOfStock = item.numInStock < 1}
                  <h3>{item.name}</h3>
                  <p> Price : {item.price}</p>
                  <div style={{display:"flex"}}>
                  <button onClick={add} disabled={outOfStock}>+</button>
                  <p>Qty : {(outOfStock) ?"Out Of Stock": (ModifiedQuantity || item.quantityBuy)} </p>
                  <button onClick={remove} disabled={outOfStock}>-</button>
                  <button className="update" onClick={ModifyQuantity} disabled={outOfStock}>Update</button>
                  </div>
                  <button className="delete" ><DeleteIcon/></button>
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
  margin: auto;
  align-self: center;
  width:10%;
}

.update{
  width:25%;
  margin-left: 2%;
}

.delete {
  width:10%;
  margin-bottom:10px;
  align-items: left;
}`;

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
  width: 400px;
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

