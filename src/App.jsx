import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductInfoModal from "./components/ProductInfoModal";

function App() {

    //стан авторизації
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);

    // форма та режим реєстрації
    const [form, setForm] = useState({ email: "", password: "" });
    const [isRegister, setIsRegister] = useState(false);

    //стан товарів
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // обраний товар

    // кошик
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    // пошук та перегляд кошика
    const [search, setSearch] = useState("");   // пошук
    const [viewCart, setViewCart] = useState(false); // режим перегляду кошика

    // збереження кошика
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // завантаження каталогу з API
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Помилка завантаження:", err));
    }, []);

    // обробка зміни полів форми
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // реєстрація користувача
    const handleRegister = () => {
        localStorage.setItem("user", JSON.stringify(form));
        alert("Реєстрація успішна!");
        setIsRegister(false);
    };

    // логін користувача
    const handleLogin = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (
            storedUser &&
            storedUser.email === form.email &&
            storedUser.password === form.password
        ) {
            setUser(storedUser); // встановлюємо користувача
            setIsAuth(true); // авторизація успішна
        } else {
            alert("Невірний логін або пароль!");
        }
    };

    // вихід користувача
    const handleLogout = () => {
        setIsAuth(false);
        setUser(null);
    };

    // додавання у кошик
    const addToCart = (product) => {
        setCart([...cart, product]);
        alert(`Додано в кошик: ${product.title}`);
    };

    //видалення з нього
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    // фільтр товарів за пошуком
    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    // рендер компонентів
    return (
        <div className="container">
            {/* хедер з авторизацією, пошуком і кошиком */}
            <Header
                isAuth={isAuth}
                user={user}
                form={form}
                handleChange={handleChange}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
                isRegister={isRegister}
                setIsRegister={setIsRegister}
                handleLogout={handleLogout}
                search={search}
                setSearch={setSearch}
                viewCart={viewCart}
                setViewCart={setViewCart}
            />

            {/* перегляд та показ кошика  */}
            {viewCart ? (
                <main className="catalog">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div key={item.id} className="product-card">
                                <img src={item.image} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>${item.price}</p>
                                <button onClick={() => removeFromCart(item.id)}>Видалити</button>
                            </div>
                        ))
                    ) : (
                        <p>Кошик порожній</p>
                    )}
                </main>
            ) : (
                // перегляд каталогу
                <ProductList
                    products={filteredProducts}
                    onProductClick={setSelectedProduct}
                />
            )}

            {/* модальне вікно з інформацією про товар */}
            <ProductInfoModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                addToCart={addToCart}
            />

            <Footer />
        </div>
    );
}

export default App;
