const AddForm = ({sendProduct, state, inputHandler, picHandler}) => {
    return (
        <div className="addForm">
               <form onSubmit={(e) => sendProduct(e)}>
                         <div className="addForm__item">
                             <label htmlFor="name" className="addForm__label">Наименование</label>
                             <input 
                             className="addForm__input"
                                 onChange={(e) => inputHandler(e)}
                                 value = {state.name}
                                 id="name" type="text" />
                         </div>
                         <div className="addForm__item">
                             <label htmlFor="price" className="addForm__label">Цена</label>
                             <input 
                                className="addForm__input"
                                 onChange={(e) => inputHandler(e)}
                                 value = {state.price}
                                 id="price" type="text" />
                         </div>
                         <div className="addForm__item">
                             <label htmlFor="weight" className="addForm__label">Вес</label>
                             <input 
                                className="addForm__input"
                                 onChange={(e) => inputHandler(e)}
                                 value = {state.weight}
                                 id="weight" type="text" />
                         </div>
                         <div className="addForm__item">
                             <label htmlFor="size" className="addForm__label">Размер</label>
                             <input 
                             className="addForm__input"
                                 onChange={(e) => inputHandler(e)}
                                 value = {state.size}
                                 id="size" type="text" />
                         </div>
                         <div className="addForm__item">
                             <label htmlFor="image" className="addForm__label">Картинка</label>
                             <input 
                             className="addForm__input"
                                 onChange={(e) => picHandler(e)}
                                 // value = {pic}
                                 id="image" type="file" />
                         </div>
                         {/* <div className="addForm__item">
                             <label htmlFor="typeId" className="addForm__label">Тип продукта</label>
                             <input 
                             className="addForm__input"
                                 onChange={(e) => inputHandler(e)}
                                 value = {state.typeId}
                                 id="typeId" type="text" />
                         </div> */}
                         <div className="addForm__item">
                             <label htmlFor="description" className="addForm__label">Описание продукта</label>
                             <textarea 
                             className="addForm__textarea"
                                 onChange={(e) => inputHandler(e)}
                                 value = {state.description}
                                 id="description" type="text" />
                         </div>
                        
                         <button className="addForm__button" type="submit">Добавить</button>
                         
                     </form>
        </div>
    )
}


export default AddForm;