import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../store/store";


const UpdeteForm = ({ index, product, redactProduct, setActive, hostname}) => {
  
    
    const dispatch = useDispatch();
    const [updateState, setUpdateState] = useState ({
        name: product.name,
        price: product.price,
        weight: product.weight,
        size: product.size,
        image: product.image,
        typeId: product.typeId,
        description: product.description
        });


        const inputUpdateHandler = (e) => {
            setUpdateState({...updateState, [e.target.id]: e.target.value });
        }

        const [pic, setPic] = useState(null);  

        const picHandler = (e) => {
            setPic(e.target.files[0]);
        }
        const updateProduct = async (e, index) => {
           e.preventDefault();
           
     
            const formData = new FormData()
            formData.append('name', updateState.name);
            formData.append('price', updateState.price);
            formData.append('weight', updateState.weight);
            formData.append('size', updateState.size);
            formData.append('image', pic);
            formData.append('typeId', updateState.typeId);
            formData.append('description', updateState.description);
     
            // const res = await axios.patch(`${hostname}/products/${product.id}`, updateState)
            const res = await axios.patch(`${hostname}/products/${product.id}`, updateState)
            dispatch(redactProduct({data: res.data[1], index: index}));
            setActive(false);
        }


    return (
        <div className="updateForm">
            {/* <div className="updateForm__picture">
                <img src={`${hostname}/${updateState.image}`} alt="" />
            </div> */}
            <form onSubmit={(e) =>updateProduct(e,index)}>
                    <div className="updateForm__item">
                                <label htmlFor="name" className="updateForm__label">Наименование</label>
                                <input 
                                    className="updateForm__input"
                                    onChange={(e) => inputUpdateHandler(e)}
                                        value = {updateState.name}
                                        id="name" type="text" />
                            </div>
                            <div className="updateForm__item">
                                <label htmlFor="price" className="updateForm__label">Цена</label>
                                <input 
                                 className="updateForm__input"
                                    onChange={(e) => inputUpdateHandler(e)}
                                    value = {updateState.price}
                                    id="price" type="text" />
                            </div>
                            <div className="updateForm__item">
                                <label htmlFor="weight" className="updateForm__label">Вес</label>
                                <input 
                                 className="updateForm__input"
                                    onChange={(e) => inputUpdateHandler(e)}
                                    value = {updateState.weight}
                                    id="weight" type="text" />
                            </div>
                            <div className="updateForm__item">
                                <label htmlFor="size" className="updateForm__label">Размер</label>
                                <input 
                                 className="updateForm__input"
                                    onChange={(e) => inputUpdateHandler(e)}
                                    value = {updateState.size}
                                    id="size" type="text" />
                            </div>
                            <div className="updateForm__item">
                                <label htmlFor="image" className="updateForm__label">Картинка</label>
                                <input 
                                 className="updateForm__input"
                                    onChange={(e) => picHandler(e)}
                                    // value = {updateState.image}
                                    id="image" type="file" />
                            </div>
                            <div className="updateForm__item">
                                <label htmlFor="description" className="updateForm__label">Описание продукта</label>
                                <textarea 
                                 className="updateForm__textarea"
                                    onChange={(e) => inputUpdateHandler(e)}
                                    value = {updateState.description}
                                    id="description" type="text" />
                            </div>
                            <button className="updateForm__button" type="submit">Отправить</button>
            </form>
        </div>
    )
}



export default UpdeteForm;