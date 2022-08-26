import axios from "axios";
import { useEffect, useState } from "react";

import Order from "../../components/Active/Order";
import { useDispatch, useSelector } from "react-redux";
import { addOrdersActive } from "../../store/OrdersSlice";

import styles from "../../styles/Orders.module.scss"

import type { NextPage } from 'next';

import { AppState, wrapper } from '../../store/store';


const Orders: NextPage = ({ hostname }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state?.orders?.active);

    
    //получаем данные
    const ordersData = async () => {
        const token = localStorage.getItem('user')
        const res = await axios.get(`${hostname}/orders/active`,
            {
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            }
        );    
        console.log('resdata',res.data) 
        dispatch(addOrdersActive(res.data));
    }

    useEffect(() => {
        ordersData()
    }, []);

  

    // console.log('orders',orders);
    //сам объект заказа формируется в корзине и помещается в базу, корзины пользователей в базе хранить не нужно

    //статус изменяется в админке и передаётся на сервер (т.е. если комп например выйдет из строя, данные сохранятся)
    //после изменения статуса заказа из res с сервера приходит уведомление, что статус заказа изменён. в форме всплывашки. Появляется на несколько сек
    
    //на страницу с заказами данные приходят с сервера с флагом на 'выполнено' false
    //на страницу статистики и архива заказов приходят данные с флагом на 'выполнено' true
    //когда мы кликаем выполнен false меняется на true (или лучше придумать статусы и передавать их строкой
    // потом и выборки делать проще (искать объекты со статусом done))

    return (
        <div className={styles.orders}>
            {store.map((order, index) => (
                <Order key={index} 
                    order={order} 
                    index={index} 
                />
            ))}
        </div>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(store => async(context) => {
   return {
        props: {
            hostname: process.env.NEXT_PUBLIC_HOST,
            
        }
    }
});


export default Orders;