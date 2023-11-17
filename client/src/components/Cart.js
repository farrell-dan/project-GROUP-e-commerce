import styled from "styled-components";
import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useNavigate, useParams } from "react-router-dom";



const Cart = () => {

  const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [cartBuy, setCartBuy] = useState([]);
    const [itemBuy, SetitemBuy] = useState([]);

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
      fetch(`/api/BuyItem`)
      .then((response) => response.json())
      .then((data) => {
        setCartBuy(data.data);
        console.log("BUY DONE!");
      })
      .catch((error) => {
          console.error(`Error fetching items from the cart`, error);
      });
    }

    return (
      <Element>
          {loading ? (
              <CircularProgress />
          ) : (
            <>
              <ItemContainer>
                  {cart.map((item) => (
                      <ItemCard key={item.id} item={item} />
                  ))}
              </ItemContainer>
            <button onClick={BuyItem}>Buy Items</button>
            </>
          )}
      </Element>
  );
};

const ItemCard = ({ item }) => {
  return (
      <StyledLink to={`/product/${item.id}`} key={item.id}>
          <Card>
              <ItemInfo>
                  <ImgDiv>
                      <ItemImage src={item.imageSrc} />
                  </ImgDiv>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
              </ItemInfo>
          </Card>
      </StyledLink>
  );
};

const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`


const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap; 
  width: 100%;
  justify-content: center;
`;

const Element = styled.div`
  margin-top: 40px;
  margin-left: 30px;
  margin-right: auto;
  


`

export default Cart

