import Header from "./Header";
import Footer from "./Footer";
import { FC, ReactNode, useState, useEffect, useRef } from "react";
import axios from "axios";
import Modal from "./modal/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { AppState, wrapper } from "../store/store";
import { addEnv } from "../store/UsersSlice";
import { checkSlider } from "../store/UsersSlice";

type layoutProps = {
    children: ReactNode,
};

const Layout: FC<layoutProps> = ({ children }) => {
    const role = useSelector((state) => state.user?.user?.role);
    const host = process.env.NEXT_PUBLIC_HOST;
    const dispatch = useDispatch();
  

   dispatch(addEnv(process.env.HOST));

    const [state, setState] = useState([]);

    useEffect(() => {
        getOrders();
        //    checkPagesSlider();
    }, []);

    const getOrders = async () => {
        const res = await axios.get(`${host}/order-list`);
        // console.log(res.data)

        const arr = [];

        for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            arr.push(element.name);
            // console.log(element.name)
        }

        //   console.log('arr', arr)

        const input = arr;

        const mapped = input.reduce((acc, item) => {
            if (acc.hasOwnProperty(item)) {
                acc[item]++;
            } else {
                acc[item] = 1;
            }

            return acc;
        }, {});

        // получится объект, у которого ключ - элемент исходного массива, а значение - количество повторений
        // console.log(mapped)

        const result = Object.entries(mapped).filter(
            ([key, value]) => value > 0
        );

        const final = [];

        // console.log('result',result)
        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            final.push({ name: element[0], count: element[1] });
        }
        // console.log('final', final)
        final.sort((prev, next) => next.count - prev.count);
        // console.log('final', final)

        const products = [];

        for (let index = 0; index < final.length; index++) {
            const finalElement = final[index];
            for (let index = 0; index < res.data.length; index++) {
                const resElement = res.data[index];
                if (resElement.name === finalElement.name) {
                    if (
                        !products.some(
                            (item) => item.name === finalElement.name
                        )
                    ) {
                        products.push({
                            ...resElement,
                            count: finalElement.count,
                        });
                    }
                }
            }
        }

        products.sort((prev, next) => next.count - prev.count);
        setState(products);
    };

    const [activeProductModal, setActiveProductModal] = useState(false);
    const [stateModal, setStateModal] = useState({});
    const [product, setProduct] = useState({});

    //когда мы кликаем на кнопку, которая открывает модалку, объект продукта попадает в стейт, затем нам этот продукт нужно найти
    //в корзине: если он найден, будет сообщение 'товар уже добавлен', если нет, кнопка добавить
    const setProductIn = (product) => {
        setStateModal(product);
        setProduct(product);
        checkCart(product);
        setActiveProductModal(true);
    };

    //КОРЗИНА-------------------------------------------
    //там мы проверяли один товар, здесь же нам нужно сравнить массив товаров в корзине с массивом товаров в слайдере

    const [cartState, setCartState] = useState([]);
    const [productInCart, setProductInCart] = useState(false);

    const checkCart = async (product) => {
        let cart = await localStorage.getItem("cart");
        console.log("cartInLayoute", cart);
        if (cart) {
            cart = JSON.parse(cart);

            const exist = await cart.some((item) => item.id === product.id);
            console.log("exist", exist);
            if (exist) {
                await setProductInCart(true);
            } else {
                await setProductInCart(false);
            }
        }
    };

    const addIn = (product) => {
        addInCart(product);
        setProductInCart(true);
    };

    let cart = [];
    const addInCart = async (item, e) => {
        let obj = {};
        obj = { ...item, count: 1 };
        cart = await localStorage.getItem("cart");

        let updatedCart = [];
        if (cart) {
            cart = JSON.parse(cart);
            updatedCart = [...cart, obj];
        } else {
            updatedCart = [obj];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartState(updatedCart);
        //
    };

    //ПРОВЕРКА СТРАНИЦЫ НА КОТОРОЙ НАХОДИТСЯ СЛАЙДЕР

    const pagesSlider = useSelector((state) => state?.user?.pagesSlider);
    // const dispatch = useDispatch();

    const checkPagesSlider = () => {
        const e = Router.pathname;
        console.log("rrrrrrrrrr", e);
        if (e === "/auth") {
            dispatch(checkSlider(false));
        }
        console.log("pagesSlider", pagesSlider);
    };

    useEffect(() => {
        checkPagesSlider();
    }, []);

    return (
        <div className="layout" 
        // style={{padding:"0px 60px" }}
        >
            <Header />
            <Modal
                active={activeProductModal}
                setActive={setActiveProductModal}
            >
                     <div className="productSliderModal">
                    {/* <Image loader={myLoader} src="me.png" alt="Picture of the author" width={500} height={500}/> */}
                    <div className="productSliderModal__pic">
                        <img src={`${host}/${product.image}`} />
                    </div>

                    <div className="productSliderModal__info">
                        <div className="productSliderModal__name">
                            {product.name}
                        </div>
                        <div className="productSliderModal__description">
                            {product.description}
                        </div>
                        <div className="productSliderModal__price">
                            {product.price} руб.
                        </div>
                        <div className="carrrr">
                            {productInCart ? (
                                <div className="">товар добавлен</div>
                            ) : (
                                <button
                                   
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
            {role !== "admin" && pagesSlider === true ? (
                <div className="container">
                    <h1>Часто заказывают</h1>
                    <Swiper
                        // style={{
                        //     marginTop: "10px",
                        //     height: "130px",
                        //     padding: "20px",
                        // }}
                        modules={[
                            Navigation,
                            Pagination,
                            Scrollbar,
                            A11y,
                            Autoplay,
                        ]}
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                width: 640,
                                slidesPerView: 3,
                            },
                            // when window width is >= 768px
                            768: {
                                width: 768,
                                slidesPerView: 4,
                            },
                            900: {
                                width: 900,
                                slidesPerView: 4,
                            },
                            // when window width is >= 1200px
                            1200: {
                                width: 1200,
                                slidesPerView: 4,
                            },
                        }}
                        // onSlideChange={() => console.log('slide change')}
                        // onSwiper={(swiper) => console.log(swiper)}
                        // navigation
                        // pagination={{ clickable: true }}
                        loop={true}
                        // loopAdditionalSlides={8}
                        // loopedSlides={8}
                        // speed={2300}

                        // autoplay={{
                        //     delay: 2000,
                        //     disableOnInteraction: false,
                        //     pauseOnMouseEnter: true
                        // }}
                    >
                        {state.map((item, index) => (
                            <SwiperSlide
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    // backgroundColor:'blue',
                                    borderRadius: "14px",
                                    // overflow: "hidden",
                                    padding: "5px",
                                    boxShadow:
                                        "3px 4px 5px 4px rgba(0, 0, 0, 0.1)",
                                    // margin: "10px"
                                    marginTop: "15px",
                                    marginBottom: "10px",
                                    height: "90px",
                                    cursor: "pointer",
                                    transition: "0.5s",
                                }}
                                onClick={() => setProductIn(item)}
                                key={index}
                            >
                                <div
                                    style={{
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                        zIndex: "0",
                                        height: "100%",
                                    }}
                                    className="picture"
                                >
                                    <img
                                        style={{
                                            // width:'50%',
                                            // border: "2px solid black",
                                            height: "100%",
                                        }}
                                        src={`${host}/${item.image}`}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className=""
                                    style={{
                                        //  border: "2px solid black",
                                        width: "50%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div className="name">{item.name}</div>
                                    <div
                                        className="name"
                                        style={{ fontWeight: "500" }}
                                    >
                                        {item.price} руб.
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div className=""></div>
            )}
            <div style={{marginBottom:"30px"}} className="container">{children}</div>

            <Footer />
        </div>
    );
};


//диспатчим переменные окружени
// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) => async (context) => {
//         console.log('fffff', process.env.HOSTNAME)
//       await store.dispatch(addEnv(process.env.HOSTNAME));
//     }
//   );
export default Layout;
