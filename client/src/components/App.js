import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../GlobalStyles";
import Home from "./Home";
import ProductType from "./ProductType";
import ProductPage from "./ProductPage";
import Cart from "./Cart";
import OrderConfirmed from "./OrderConfirmed"
import Header from "./Header"
import FilterByPriceLowToHigh from "./FilterByPriceLowToHigh"




const App = () => {
    
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:category" element={<ProductType />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/product/sorting" element={<FilterByPriceLowToHigh/>} />                
                <Route path="/cart" element={<Cart />} />
                <Route path="/confirm/:orderId" element={<OrderConfirmed />} />
            </Routes>  
        </BrowserRouter>
    );
};

export default App;
