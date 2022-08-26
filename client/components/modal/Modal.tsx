
const Modal = ({active, setActive, children}) => {
    return (
        <div style={{zIndex: 20}} className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__inner active" : "modal__inner"} onClick={e => e.stopPropagation()}>
                {children}
                <div className={active ? "modal__button active" : "modal__button"} onClick={() => setActive(false)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            
            
        </div>
    )
}


export default Modal;