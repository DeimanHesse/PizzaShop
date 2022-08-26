import Head from "next/head";
import Link from "next/link";
import Heading from "../../components/Heading";
import { useAppDispatch } from "../../store/hooks";
import { useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOnePizza, addPizzas, deletePizza, redactPizza } from "../../store/ProductsSlice";
import axios from "axios";
import { type } from "os";
import { useEffect } from "react";
import React from 'react';

import { addDrinks2 } from "../../store/DrinksSlice";
import { deleteDrink } from "../../store/ProductsSlice";
// import Image from 'next/image'

import { AppState, wrapper } from '../../store/store';

import Product from "../../components/Products/Product";
import AddForm from "../../components/AddForm";
import UpdeteForm from "../../components/UpdateForm";
import Modal from "../../components/modal/Modal";

//Проверка слайдера
import { checkSlider } from "../../store/UsersSlice"
import Router from 'next/router';

import type { NextPage } from 'next';

export interface IProduct {
    name: string;
    price: number;
    weight: string;
    size?: number;
    image: string;
    typeId: number;
    description: null;
}

  
const Pizzas: NextPage = ({hostname}) => { 
    //useselector обращается к гидрированным данным
    const pizzas = useSelector(state => state.products.pizzas);
    const auth = useSelector(state => state.user?.user?.auth);
    const role = useSelector(state => state.user?.user?.role);

    const store = useSelector(state => state);


    
    const dispatch = useDispatch();

    //ФОРМА ДОБАВЛЕНИЯ НОВОГО ПРОДУКТА
    //стейт для формы нового продукта
    const [state, setState] = useState<IProduct> ({
        name: '',
        price: '',
        weight: '',
        size: 0,
        image: '',
        typeId: '1',
        description: ''
    });

    //функции которые передаютс в форму добавления нового продукта
    const [pic, setPic] = useState('');
    const [active, setActive] = useState(false);

    //функции для добавления нового продукта
    const inputHandler = (e) => {
        setState({...state, [e.target.id]: e.target.value });
    };

    const picHandler = (e) => {
        setPic(e.target.files[0]);
    }

    const sendProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', state.name);
        formData.append('price', state.price);
        formData.append('weight', state.weight);
        formData.append('size', state.size);
        formData.append('image', pic);
        formData.append('typeId', state.typeId);
        formData.append('description', state.description);
        const res = await axios.post(`${hostname}/products`, formData);
        console.log('oneDrink', res.data)
        dispatch(addOnePizza(res.data));

        // setState({
        //     name: '',
        //     price: '',
        //     weight: '',
        //     size: '',
        //     image: '',
        //     typeId: '1',
        //     description: ''
        // });
        setPic('');
        setActive(false);
    };

    //удаление продукта из базы
    const deleteProduct = async (item) => {
        const res = await axios.delete(`${hostname}/products/${item.id}`);
        dispatch(deletePizza(item.id));
    }; 

    //работа с корзиной
    let cart = [];
    const [cartState, setCartState] = useState([]);

    const checkCart = async () => {
        let cart = [];
        cart = await localStorage.getItem('cart');
        if (cart) {
            cart = await JSON.parse(cart);
            await setCartState(cart)
        }
    }

    useEffect(() => {
        checkCart();
    }, [])
    
    //не нужно в корзину вставлять весь объект - достаточно вставить его id...или их id...или лучше, всё-таки объект??? 
    const addInCart = async (item, e) => {
        let obj = {};
        obj = {...item, count: 1};
        cart = await localStorage.getItem('cart');

        let updatedCart = [];
        if (cart) {
            cart = JSON.parse(cart);
            updatedCart = [...cart, obj ];
        } else {
            updatedCart = [ obj ];
        }

       localStorage.setItem('cart', JSON.stringify(updatedCart));
       setCartState(updatedCart);
    };
      
 //ПРОВЕРКА СЛАЙДЕРА
 const checkPagesSlider = () => {
    let e = Router.pathname;

    if (e === "/auth") {
        dispatch(checkSlider(false));

    } else if (e === "/reg") {
        dispatch(checkSlider(false));

    } else {
        dispatch(checkSlider(true));
    }
   
}

useEffect(() => {
    checkPagesSlider();
}, [])

    
//************************************************************ */
    return (
        <>
         
            <Head>
                <title>Pizzas</title>
            </Head>
            <div className="wrapper">
                
                {auth && role === "admin" ?
                    <div className="addProduct">
                        <Modal active={active} setActive={setActive}>
                            <AddForm 
                                sendProduct={sendProduct} 
                                state={state} 
                                inputHandler={inputHandler} 
                                picHandler={picHandler}
                                hostname={hostname}
                                />
                        </Modal>
                        <button className="addProduct__button" onClick={() => setActive(true)}>Добавить новый товар</button>
                    </div> 
                    : 
                    <div className=""></div>
                } 
               
                <h1>Пицца</h1>
                <div className="products">
                    {pizzas && pizzas.map((item, index) => (
                         <Product key={index} 
                            index={index}
                            cartState={cartState}
                            product={item}  
                            addInCart={addInCart}  
                            deleteProduct={deleteProduct}
                            redactProduct={redactPizza}
                            hostname={hostname}
                            />
                        ))}
                </div>
          

                {/* тут будет модалка. Пропсами будет принимать все данные товара (конкретного айтема, поэтому модалку
              наверное, лучше засунуть в айтем и спозиционировать относительно окна, т.е. сделать fixed) */}
            </div>
        
           
        </>
    );
};
  

export const getServerSideProps = wrapper.getServerSideProps(store => async(context) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/products/pizzas`);
    // const res = await axios.get('http://localhost:5000/products/pizzas');
    // const res = await axios.get('http://88.212.253.186:35226/products/pizzas');
    const pizzas = {
      pizzas: [...res.data]
    };
    await store.dispatch(addPizzas(pizzas));

    return {
        props: {
            hostname: process.env.NEXT_PUBLIC_HOST,
            
        }
    }
});

export default Pizzas;
