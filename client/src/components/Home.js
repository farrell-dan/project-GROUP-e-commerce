import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { Link } from "react-router-dom";
import banner from "../images/banner.jpg";


const Home = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [categoryImages, setCategoryImages] = useState({});

    useEffect(() => {
        fetch("/api/Categories")
        .then((response) => response.json())
        .then((data) => {
            setCategories(data.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const fetchCategoryImages = async () => {
            const images = {};
            for (const category of categories) {
                try {
                    const response = await fetch(`/api/getItemsByCategory/${category}`);
                    const data = await response.json();
                    if (data.data && data.data.length > 0) {
                        const randomItem = data.data[Math.floor(Math.random() * data.data.length)];
                        images[category] = randomItem.imageSrc;
                    }
                } catch (error) {
                    console.error(`Error fetching image for category ${category}:`, error);
                }
            }
            setCategoryImages(images);
        };

        fetchCategoryImages();
    }, [categories]);

    
    return (
        <Element>
            
                    <Banner src={banner} alt="Banner" />
                    <CategoryContainer>
                        <h2>Product Categories</h2>
                        <CategoryList>
                        {categories.map((category) => (
                                <StyledLink key={category} to={`/category/${category}`}>
                                    <CategoryItem>
                                        <CategoryImageContainer>
                                            {categoryImages[category] && (
                                                <CategoryImage src={categoryImages[category]} alt={category} />
                                            )}
                                            {!categoryImages[category] && <CircularProgress />}
                                        </CategoryImageContainer>
                                        <CategoryName>
                                            <span>{category}</span>
                                        </CategoryName>
                                    </CategoryItem>
                                </StyledLink>
                            ))}
                        </CategoryList>
                    </CategoryContainer>
              
            
        </Element>
    );
};

const CategoryImageContainer = styled.div`
        // Your styling for the container
    `;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Banner = styled.img`
  width: 100vw;
`;

const Element = styled.div`
    
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 70px;
  margin-right: 70px;
`;

const CategoryList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    padding: 0;
    text-align: center;
`;

const CategoryItem = styled.li`
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 350px;
    display: flex;
    flex-direction: column;
    margin: 10px;   
    align-items: center;
    background-color: white;

`;

const CategoryImage = styled.img`
  max-width: 200px;
  border-radius: 20px;
  padding: 10px;
`;

const CategoryName = styled.div`
  margin: 10px;
  font-size: 1.25em;
  font-weight: bold;
`;

export default Home;
