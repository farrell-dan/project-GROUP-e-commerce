import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CheckoutForm = ({ open, handleClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        creditCardNumber: '',
        expirationDate: '',
    });
    const [buying, SetBuying] = useState(false);
    const [successBuy, SetSuccessBuy] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [validationMessage, setvalidationMessage] = useState("");

    const navigate = useNavigate();

    const BuyItem = () => {
        SetBuying(true)
        fetch(`/api/BuyItem`)
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "purchase successful") {
                SetSuccessBuy(true)
                setvalidationMessage("Purchase successful !")
            }
        })
        .catch((error) => {
            console.error(`Error fetching items from the cart`, error);
            SetBuying(false);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.creditCardNumber || !formData.expirationDate) {
            setErrorMessage('Please fill out all required fields.');
            return;
        }

        setErrorMessage('');

        BuyItem();

            setTimeout(()=>{
                handleClose();
            },2000);
            
            setTimeout(()=>{
                navigate("/")
            },3000);

            setFormData({
                name: '',
                creditCardNumber: '',
                expirationDate: '',
            });
        
    };

    return (
        <StyledDialog open={open} onClose={handleClose}>
            <DialogTitle>Checkout Form</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your information to complete the checkout:
                </DialogContentText>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    id="creditCardNumber"
                    name="creditCardNumber"
                    label="Credit Card Number"
                    value={formData.creditCardNumber}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    id="expirationDate"
                    name="expirationDate"
                    label="Expiration Date (MM/YYYY)"
                    type="month"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                {validationMessage && <ValidationText>{validationMessage}</ValidationText>}
            </DialogContent>
            <DialogActions>
                <StyledCancelButton onClick={handleClose} color="primary">
                    Cancel
                </StyledCancelButton>
                <StyledButton onClick={handleSubmit} color="primary">
                    Checkout
                </StyledButton>
            </DialogActions>
        </StyledDialog>
    );
};

const ErrorText = styled.p`
    color: red;
    margin-top: 5px;
`;

const ValidationText = styled.p`
    color:green;
    margin-top: 5px;
`


const StyledDialog = styled(Dialog)`
    && {
    max-width: 600px;
    margin: 20px auto; 
    border-radius: 10px;

    .MuiDialogTitle-root {
        background-color: #f0f0f0;
        border-bottom: 1px solid #ccc;
    }

    .MuiDialogContent-root {
        padding: 20px;
    }

    .MuiDialogActions-root {
        padding: 10px 20px;
        justify-content: space-between;
        }
    }
`;

const StyledButton = styled(Button)`
    && {
        color: black;
        border: 2px solid black;
    }
`;

const StyledCancelButton = styled(Button)`
    && {
        color: black;
        border: 2px solid black;
    }
`;

export default CheckoutForm;
