import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductType = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const { category } = useParams();
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

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : (
                <ItemContainer>
                    {items.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </ItemContainer>
            )}
        </div>
    );
};

const ItemCard = ({ item }) => {
    return (
        <Card>
            <p>{item.name}</p>
            
        </Card>
    );
};

const Card = styled.div`
    
`;

const ItemContainer = styled.div`
    
`;

export default ProductType;