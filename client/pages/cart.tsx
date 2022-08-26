import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import jwtDecode from "jwt-decode";

import { compareAsc, format } from 'date-fns';

import styles from "../styles/Cart.module.scss"

import Router from 'next/router';
import { checkSlider } from "../store/UsersSlice"

import type { NextPage } from 'next';

import { AppState, wrapper } from '../store/store';



//Логика корзины
// если ползователь авторизован данные берутся из локалсторджь
// если нет, появляется форма и после клика на "заказать" также вызывается
// функция регистрации

const Cart: NextPage = ({hostname}) => {
    const user = useSelector(state => state.user?.user);

    const dispatch = useDispatch();

    const showDate = () => {
       const DDD = format(new Date(), "dd/MM/yy kk:mm:ss")
       console.log('date', DDD)
    }

    const [state, setState] = useState([]);
    useEffect(() => {
        // забираем товары из localstorage, засовываем в стейт
        const cart = localStorage.getItem("cart");

        //перенести условие в условный рендер: если в корзине
        //что-то ест - рендерим элементы, если нет, рендерим сообщение "корзина пуста"
        if (cart) {
            cart = JSON.parse(cart);
            setState(cart);
            sumHandler(cart)
        } else {
            console.log("Корзина пуста");
        }
        console.log(state);
    }, []);
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);


    const [stateInput, setStateInput] = useState({
        name: "den",
        address: "555",
    });
    const inputHandler = (e) => {
        setStateInput({ ...stateInput, [e.target.id]: e.target.value });
    };
    const sendForm = async (data) => {
        // e.preventDefault();
        var date = new Date();

        console.log(date)
        if (user.userId) {
            //то мы берём айди, имя, адрес и номер телефона из стора
            const order = {
                name: user.name,
                 //адрес из формы
                address: data.address,
                status: "accept",
                phoneNumber: user.phoneNumber,
                userId: user.userId,
                sum: sumState,
                // date: Date.now().toString(),
                // date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
                date: format(new Date(), "dd/MM/yy kk:mm:ss"),
                goods: [state],
            };
            console.log("order", order);
    
            const res = await axios.post(`${hostname}/orders`, order);
            console.log("order", res.data);
            console.log("order", res.data);
            // dispatch(addOneProduct(res.data));
            localStorage.removeItem('cart')
            setState([]);
            setSumState('')

        } else {
            const resReg = await axios.post(`${hostname}auth/registration`, data);
            const userReg = jwtDecode(resReg.data.token)
            console.log("newUser", userReg);

            const order = {
                name: userReg.name,
                //адрес из формы
                address: data.address,
                status: "accept",
                phoneNumber: userReg.phoneNumber,
                userId: userReg.id,
                // userId: "5",
                sum: sumState,
                // date: Date.now().toString(),
                date: format(new Date(), "dd/MM/yy kk:mm:ss"),
                // date: '30',
                goods: [state],
            };
            console.log("order", order);

            const res = await axios.post(`${hostname}/orders`, order);
            console.log("order", res.data);
            // dispatch(addOneProduct(res.data));
            localStorage.removeItem('cart')
            setState([]);
            setSumState('')
        }
        //если айди нет, то из формы + регистрируем пользователя
        //а где тогда брать айди заказа?
        //ответ: регистрируем пользователя данные о нём берём из ответа
        //затем заносим нужные данные в объект заказа и отправляем заказ
        //адрес должен поступать отдельно
        

    };


    const [sumState, setSumState] = useState('');
    const sumHandler = (arr) => {
        let result = arr.reduce(function(sum, elem) {
            let elemPrice = elem.count * elem.price;
            return sum + elemPrice;
        }, 0);

        setSumState(result);
    };

    const [count, setCount] = useState(1);
    const countHandlerPlus = async (item, index) => {
        const arr = [...state];
        arr[index].count++;
        setState(arr);
        sumHandler(arr)
        console.log(state);
    };
    const countHandlerMinus = (item, index) => {
        const arr = [...state];
        if (arr[index].count > 1) {
            arr[index].count--;
            setState(arr);
            console.log(state);
            sumHandler(arr)
        }

    };
    const deleteProduct = async (id) => {
        let cart = await localStorage.getItem('cart');

        let updatedCart = [];
        cart = JSON.parse(cart);
        
        updatedCart = cart.filter((item) => item.id !== id);
        console.log('updatedCart', updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // setCartState(updatedCart)
        setState(updatedCart)
    };



    
     //ПРОВЕРКА СЛАЙДЕРА
 const checkPagesSlider = () => {
    let e = Router.pathname;
    console.log('rrrrrrrrrr',e)
    if (e === "/auth") {
        dispatch(checkSlider(false));

    } else if (e === "/reg") {
        dispatch(checkSlider(false));

    }  else if (e === "/cart") {
        dispatch(checkSlider(false));

    } else {
        dispatch(checkSlider(true));
    }
   
}

useEffect(() => {
    checkPagesSlider();
}, [])

    return (
        <div className={styles.cart}>
            {state.length > 0  ? (
                <div className={styles.cart__wrapper}>
                    <div className={styles.cart__inner}>
                        {state.map((item, index) => (
                            <div key={index} className={styles.itemCart}>
                               <div className={styles.itemCart__picture}>
                                    <img src={`${hostname}/${item.image}`} alt="" />
                                </div>
                                <div className={styles.itemCart__name}>{item.name}</div>
                                <div className={styles.itemCart__description}>{item.description}</div>
                              
                                <div className={styles.itemCart__counter}>
                                    <button className={styles.itemCart__counterButton} onClick={() => countHandlerPlus(item, index)}>+</button>
                                    <div  className={styles.itemCart__count}>{item.count}</div>
                                    <button className={styles.itemCart__counterButton} onClick={() => countHandlerMinus(item, index)}>-</button>
                                </div>

                                <div className={styles.itemCart__price}>{item.price * item.count} руб.</div>
                                <button className={styles.itemCart__deleteButton} onClick={() => deleteProduct(item.id)}>X</button>
                            </div>
                        ))} 
                    </div>
                    
                    <div  className={styles.cart__sum}>к оплате: {sumState} руб.</div>

                    <div className="ff">
                        {!user?.userId 
                        ?
                        <div className="">
                            <h2>Зарегистрируйтесь и войдите, чтобы оформить заказ</h2>
                            <h5>Ваши товары сохранятся в корзине</h5>
                        </div>
                        
                        :
                        <div className="address">
                            <form className='reg__form' onSubmit={handleSubmit(sendForm)}>
                                <div style={{marginBottom:"20px"}} className='form__item'>
                                    <label
                                        style={{ display: "block" }}
                                        htmlFor='address'
                                        className='form__label'
                                    >
                                        Адрес
                                    </label>
                                    <input
                                        id='address'
                                        type='text'
                                        {...register("address", {
                                            required:"Поле обязательно для заполнения",
                                        })}
                                    />
                                    <div className="errors" style={{color:'red'}}>
                                        {errors?.address && <p>{errors?.address?.message}</p>}
                                    </div>
                                </div>
                                <button className={styles.cartButtonOrder} type='submit'>Заказать</button>
                            </form>
                        </div>
                        }
                    </div>
                </div>
            ) : (
                <div>Ваша Корзина пуста</div>
            )}

        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        // const res = await axios.get('http://localhost:5000/products/drinks');
        // const drinks = {
        // drinks: [...res.data]
        // };
        // await store.dispatch(addUser(drinks));

        return {
            props: {
                hostname: process.env.NEXT_PUBLIC_HOST,
            }
        }
    }
);

export default Cart;

