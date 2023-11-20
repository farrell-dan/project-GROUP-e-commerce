import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductType = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const { category } = useParams();
    const [filterUse, SetFilterUse] = useState("Sort By")
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`/api/getItemsByCategory/${category}`)
            .then((response) => response.json())
            .then((data) => {
                setItems(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(`Error fetching items for category ${category}:`, error);
                setLoading(false);
            });

    }, [category]);

    const filter = (event) => {
        const filterChoose = event.target.value;
    
        console.log(filterChoose);
    
        if (filterChoose === "Price:low to High" ) {
            const sortItems = items.slice().sort((a, b) => {
              return (Number((a.price).slice(1))) - (Number((b.price).slice(1)));
            });
            setItems(sortItems);
            SetFilterUse("Price:low to High")
        }
        if (filterChoose === "Price:High To low" ) {
          
            const sortItems = items.slice().sort((a, b) => {
              return ((Number((b.price).slice(1)) - Number((a.price).slice(1))));
            });
  
            console.log("SORTING");
            setItems(sortItems);
            SetFilterUse("Price:High To low")
          };
        }

    return (
        <Element>
            {loading ? (
                <CircularProgress />
                
            ) : (
                <>
            <SortingSelector>
                <select onChange={(event)=> filter(event)} value={filterUse}>
                <option>Sort by</option>
                <option value="Price:low to High">Price: Low to High</option>
                <option value="Price:High To low">Price: High To low</option>
                </select>
            </SortingSelector>
                <ItemContainer>
                    {items.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </ItemContainer>
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

const SortingSelector = styled.div`
margin-top:100px;
margin-bottom: 75px;
margin-left:70px;

select, option{
font-size: 1.17rem;
}
`

export default ProductType;