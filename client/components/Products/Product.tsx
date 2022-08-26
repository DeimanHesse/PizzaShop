import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import UpdeteForm from "../UpdateForm";

import Image from "next/image";

const Product = ({
    product,
    index,
    cartState,
    addInCart,
    deleteProduct,
    redactProduct,
    hostname
}) => {
    const auth = useSelector((state) => state.user?.user?.auth);
    const role = useSelector((state) => state.user?.user?.role);

    const dispatch = useDispatch();
    // модалка апдейта
    const [active, setActive] = useState(false);
    //модалка информации о продукте
    const [activeProductModal, setActiveProductModal] = useState(false);

    const productModal = () => {
        setActiveProductModal(true);
    };

    //ФУНКЦИИ РАБОТЫ С КОРЗИНОЙ============================================
    const [productInCart, setProductInCart] = useState(false);

    useEffect(() => {
        checkCart();
    }, []);

    const checkCart = async () => {
        let cart = await localStorage.getItem("cart");

        if (cart) {
            cart = JSON.parse(cart);
            console.log("cartExist", cart);
            console.log("productId", product.id);
            const exist = await cart.some((item) => item.id === product.id);
            console.log("exist", exist);
            if (exist) {
                await setProductInCart(true);
            }
        }
    };

    const addIn = (product) => {
        addInCart(product);
        setProductInCart(true);
    };

    return (
        <div
            className="wrapper"
            style={{
                // alignSelf:"end",
                // height: "100%"
                display: "grid",
                alignItems: "stretch",
            }}
        >
            {/* Карточка товара в модалке */}
            <Modal
                active={activeProductModal}
                setActive={setActiveProductModal}
            >
                <div className="productСardModal">
                    {/* <Image loader={myLoader} src="me.png" alt="Picture of the author" width={500} height={500}/> */}
                    <div className="productСardModal__pic">
                        <img src={`${hostname}/${product.image}`} />
                    </div>

                    <div className="productСardModal__info">
                        <div className="productСardModal__name">
                            {product.name}
                        </div>
                        <div className="productСardModal__description">
                            {product.description}
                        </div>
                        <div className="productСardModal__price">
                            {product.price} руб.
                        </div>
                        <div className="carrrr">
                            {productInCart ? (
                                <div className="">товар добавлен</div>
                            ) : (
                                <button
                                    style={{ borderRadius: "5px" }}
                                    onClick={() => addIn(product)}
                                    className="product-card__button"
                                >
                                    Добавить в корзину
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
            {/* Форма обновления товара в модалке */}
            <Modal active={active} setActive={setActive}>
                <UpdeteForm
                    index={index}
                    product={product}
                    redactProduct={redactProduct}
                    setActive={setActive}
                    hostname={hostname}
                />
            </Modal>
            {/* Карточка товара на странице */}
            <div className="product">
                <div className="product-card">
                    {/* <Image loader={myLoader} src="me.png" alt="Picture of the author" width={500} height={500}/> */}
                    <div onClick={productModal} className="product-card__pic">
                        <img
                            src={`${hostname}/${product.image}`}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                    <div className="product-card__name">{product.name}</div>
                    <div className="product-card__description">
                        {product.description}
                    </div>
                    <div className="product-card__price">
                        {product.price} руб.
                    </div>
                    {auth && role === "admin" ? (
                        <div className="product-card__buttons-admin">
                            <button
                                style={{ borderRadius: "5px" }}
                                onClick={() => deleteProduct(product)}
                                className="product-card__button"
                            >
                                Удалить продукт
                            </button>
                            <button
                                style={{ borderRadius: "5px" }}
                                onClick={() => setActive(true)}
                                className="product-card__button"
                            >
                                Редактировать продукт
                            </button>
                        </div>
                    ) : (
                        <div className="product-card__buttons-user">
                            {productInCart ? (
                                <div className="product-card__cart-title">
                                    Товар добавлен
                                </div>
                            ) : (
                                <button
                                    onClick={() => addIn(product)}
                                    className="product-card__cart-button"
                                >
                                    Добавить в корзину
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
