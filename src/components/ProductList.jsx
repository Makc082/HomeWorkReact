import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, onProductClick }) {
    return (
        <main className="catalog">
            {products.length > 0 ? (
                products.map((p) => (
                    <ProductCard key={p.id} product={p} onClick={onProductClick} />
                ))
            ) : (
                <p>Товарів не знайдено</p>
            )}
        </main>
    );
}

export default ProductList;
