import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useForm } from "react-hook-form";
import { addUser } from "../store/UsersSlice";

import styles from "../styles/Reg.module.scss";

import Router from 'next/router';
import { checkSlider } from "../store/UsersSlice"

import { AppState, wrapper } from '../store/store';

import type { NextPage } from 'next';
import Modal from "../components/modal/Modal";

const Reg: NextPage = ({hostname}) => {
    const [activeProductModal, setActiveProductModal] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [state, setState] = useState({
       
        });


    const inputHandler = (e) => {
        setState({...state, [e.target.id]: e.target.value });
    }
    
    if (user?.user?.auth) {
        Router.push("/pizzas");
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const send2 = async (data) => {
        try {
            const res = await axios.post(`${hostname}/auth/registration`, data);
            const user = jwtDecode(res.data.token)
            console.log("newUser", user);
            dispatch(addUser(user));
        } catch (error) {
            setActiveProductModal(true)
            console.log('Некорректный емайл или пароль')
        }


    }

    const normalizeCardNumber = (value) => {
        return value.replace(/\s/g, "").match(/^[0-9]+$/)?.join(" ").match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
    }


     //ПРОВЕРКА СЛАЙДЕРА
 const checkPagesSlider = () => {
    let e = Router.pathname;
    console.log('rrrrrrrrrr',e)
    if (e === "/auth") {
        dispatch(checkSlider(false));

    } else if (e === "/reg") {
        dispatch(checkSlider(false));

    } else if (e === "/cart") {
        dispatch(checkSlider(false));

    } else {
        dispatch(checkSlider(true));
    }
   
}

useEffect(() => {
    checkPagesSlider();
}, [])

    return (
        <div className={styles.reg} >
                <Modal active={activeProductModal} setActive={setActiveProductModal}>
                <div className={styles.error}>
                    <h1>Пользователь с таким телефонным номером уже существует</h1>
                    <h4>Напишите нам, если забыли пароль</h4>
                </div>
                    
                </Modal>
            <form className={styles.form} onSubmit={handleSubmit(send2)}>
            <div className={styles.form__title}>
                    Регистрация
                </div>
                <div className={styles.form__item}>
                    <label
                        htmlFor='name'
                        className={styles.form__label}
                    >
                        Имя
                    </label>
                    <input
                        className={styles.form__input}
                        maxLength='20'
                        placeholder="Андрей"
                        id='name'
                        type='text'
                         {...register("name", {
                            required:"Поле обязательно для заполнения",
                            // minLength: {
                                // value: 13,
                                // message: "должно быть 16 символов"
                            // },
                            maxLength: {
                                value: 13,
                                message: "должно быть 16 символов"
                            },
                            // onChange: (e) => {
                            //     const {value} = e.target
                            //     e.target.value = normalizeCardNumber(value)
                                
                            // }, 
                        })}
                    />
                    <div className={styles.form__errors}>
                        {errors?.phoneNumber && <h4>{errors?.name?.message}</h4>}
                    </div>
                </div>
                <div className={styles.form__item}>
                    <label
                       
                        htmlFor='name'
                        className={styles.form__label}
                    >
                        Номер телефона
                    </label>
                    <input
                        className={styles.form__input}
                        maxLength='13'
                        placeholder="+375297775777"
                        id='phoneNumber'
                        // inputMode="numeric"
                        type='text'
                         {...register("phoneNumber", {
                            required:"Поле обязательно для заполнения",
                            minLength: {
                                value: 13,
                                message: "должно быть 16 символов"
                            },
                            maxLength: {
                                value: 13,
                                message: "должно быть 16 символов"
                            },
                            // onChange: (e) => {
                            //     const {value} = e.target
                            //     e.target.value = normalizeCardNumber(value)
                                
                            // }, 
                        
                        })}
                    />
                    <div className={styles.form__errors}>
                        {errors?.phoneNumber && <h4>{errors?.phoneNumber?.message}</h4>}
                    </div>
                </div>
                <div className={styles.form__item}>
                    <label
                       
                        htmlFor='password'
                        className={styles.form__label}
                    >
                        Пароль
                    </label>
                    <input
                        placeholder="password"
                        className={styles.form__input}
                        id='password'
                        type='text'
                        {...register("password", {
                            required:"Поле обязательно для заполнения",
                        })}
                    />
                    <div className={styles.form__errors}>
                        {errors?.phoneNumber && <h4>{errors?.password?.message}</h4>}
                    </div>
                </div>
            <button className={styles.form__button} type='submit'>Зарегистрироваться</button>
            </form>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        return {
            props: {
                hostname: process.env.NEXT_PUBLIC_HOST,
            }
        }
    }
);

export default Reg;