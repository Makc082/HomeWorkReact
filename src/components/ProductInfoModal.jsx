import React from "react";
import ReactDOM from "react-dom";

function ProductInfoModal({ product, onClose, addToCart }) {
    if (!product) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p><b>Ціна:</b> ${product.price}</p>

                <button onClick={() => addToCart(product)}>Додати в кошик</button>
                <button onClick={onClose}>Закрити</button>
            </div>
        </div>,
        document.body
    );
}

export default ProductInfoModal;
