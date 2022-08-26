import axios from "axios";
import React,{ useState } from "react";
import Modal from "../modal/Modal";
import styles from '../../styles/Orders.module.scss';
import { useDispatch, useSelector } from "react-redux";

import { updateOrdersActive } from "../../store/OrdersSlice";

const Order = ({order, index, radioHandler}) => {
 

    const dispatch = useDispatch();
    const [active, setActive] = useState(false);

    const [status, setStatus] = useState({
        //тут один статус, поэтому осталные пропадали
        status: order.status
    });

 
    //функция апдейта конкретного инпута
    const inputHandler = async (e) => {
        await setStatus({status: e.target.id });
        console.log('status', status);
        console.log('orderid', order.id);

        const token = await localStorage.getItem('user')
        const updateOrder = {
            //id нужно передават строкой
            id: `${order.id}`,
            status: e.target.id
        };
        console.log('updateOrder', updateOrder);
        //вносим изменения в базу
        const res = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/orders/${order.id}`, updateOrder,
            {
                    headers: {
                    'Authorization': `Bearer ${token}` 
                    }
                }
        );
        //вносим изменения в стор

        console.log('rrrrrr', res.data)
        dispatch(updateOrdersActive(res.data[1][0]))
       

        //возможно  прмо в этой функции сделаю запрос на изменение статуса (по айди заказа -
        // "изменить статус в order, где id =..."
        //), в ответ мне вернтся этот же обновлённый статус
        // и я запихаю его в стейт, стор и т.д.
    };

    const [orderDone, setOrderDone] = useState('')

    //по нажатию на кнопку заказ 
    const orderIsDone = async (e) => {
        setActive(true);
        //сохраняем объект события в стейт при открытии модалки
        //затем передаём его в есХэндлере в инпут хэндлер
        setOrderDone(e)
    };

    const yesHandler = () => {
        inputHandler(orderDone);
        setActive(false)
    }

    return (
        <div className={styles.order}>
            <div className="order__id">{order.id}</div>
            <div className="order__name">{order.name}</div>
            <div className="order__tel">{order.phoneNumber}</div>
            <div className="order__goods">
                {order.orderLists.map((product, index) => (
                    <div key={index} className={styles.product}>
                        {/* <div className="product__id">{product.id}</div> */}
                        <div className={styles.product__name}> {product.name}</div>
                        <div className={styles.product__count}>Количество: {product.count}</div>
                        <div className={styles.product__price}>{product.price} руб.</div>
                        
                    </div>
                ))}
            </div>
            <div className="order__price">{order.sum}руб.</div>
            <div className={styles.order__status}>

                <div className="form__item">
                    <label htmlFor="image" className="form__label">Принят</label>
                    <input onChange={(e) => inputHandler(e)} name={order.id}  
                        checked = {order.status === "accept" ? true : false}
                        value = {status.status} 
                        id="accept"
                            
                        type={"radio"} />
                </div>    
                <div className="form__item">    
                    <label htmlFor="image" className="form__label">Готовится</label>
                    <input 
                        checked = {order.status === "inProcess" ? true : false}
                        onChange={(e) => inputHandler(e)} name={order.id} value = {status.status} id="inProcess" type={"radio"} />
                </div>    
                <div className="form__item">    
                    <label htmlFor="image" className="form__label">Отправлен</label>
                    <input 
                        checked = {order.status === "send" ? true : false}
                        onChange={(e) => inputHandler(e)} name={order.id} value = {status.status} id="send" type={"radio"} />
                </div>    
                <div className="form__item">    
                    <label htmlFor="image" className="form__label">Доставлен</label>
                    <input 
                        checked = {order.status === "done" ? true : false}
                        // onChange={(e) => orderIsDone(e)} name={order.id} value = {status.status} id="done" type={"radio"} />
                        onChange={(e) => orderIsDone(e)} name={order.id} value = {status.status} id="done" type={"radio"} />
                </div>    
                    
            </div>
            {/* <button onClick={() => console.log('status', status)}>Status</button> */}
            <Modal active={active} setActive={setActive}>
                <h1>Заказ действително выполнен?</h1>
                <button onClick={yesHandler}>да</button>
                <button onClick={() => setActive(false)}>нет</button>
            </Modal>
        </div>
    );
};

export default Order;