import axios from "axios";
import { useState, useEffect } from "react";

import styles from "../../styles/OrdersArchive.module.scss";
import Order from "../../components/Active/Order";

import type { NextPage } from 'next';
import { AppState, wrapper } from '../../store/store';

const Archive: NextPage = ({hostname}) => {


        const [orders, setOrders] = useState([])

        const ordersData = async () => {
            const token = localStorage.getItem('user')
            const res = await axios.get(`${hostname}/orders/archive`,
                {
                    headers: {
                    'Authorization': `Bearer ${token}` 
                    }
                }
            );     
    
            setOrders(res.data);
            
        }
    
        useEffect(() => {
            ordersData()
        }, []);



        //ФИЛЬТРЫ

        const sortUp = async() => {
           const ordersSorted = await orders.sort((a, b) => parseFloat(a.sum) - parseFloat(b.sum));
           setOrders([...ordersSorted])
        //почему это не раотает??????????? 
        //    setOrders(ordersSorted) 
        //    setOrders([]) 
        }
        const sortDown = () => {
           const ordersSorted = orders.sort((a, b) => parseFloat(b.sum) - parseFloat(a.sum));
           console.log('ordersSorted', ordersSorted)
           setOrders([...ordersSorted])
        //почему это не раотает??????????? 
        //    setOrders(ordersSorted) 
        //    setOrders([]) 
        }

    return (
        <div className={styles.archive}>
            <div className={styles.orderFilters}>
                <button className={styles.orderFilters__button} onClick={sortUp}>сумма по возрастанию</button>
                <button className={styles.orderFilters__button} onClick={sortDown}>сумма по убыванию</button>
            </div>

            {
            // orders &&
                orders.map((order, index) => (
                    <div key={index} className={styles.order}>
            <div className={styles.order__id}>№{order.id}</div>
            <div className={styles.order__name}>Имя: {order.name}</div>
            <div className={styles.order__phoneNumber}>Тел. номер: {order.phoneNumber}</div>
            <div className="order__goods">
                {order.orderLists.map((product, index) => (
                     <div key={index} className={styles.product}> 
                        <div className={styles.product__name}> {product.name}</div> 
                        <div className={styles.product__count}>Количество: {product.count}</div>
                        <div className={styles.product__price}>{product.price} руб.</div> 
                    </div> 
                 ))} 
            </div>
            <div className={styles.order__sum}>Сумма заказа: {order.sum} руб.</div>
            <div className={styles.order__date}>{order.date}</div>
                    </div>
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

export default Archive;
