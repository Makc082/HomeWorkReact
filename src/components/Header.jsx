import React from "react";

function Header({
                    isAuth,
                    user,
                    form,
                    handleChange,
                    handleLogin,
                    handleRegister,
                    isRegister,
                    setIsRegister,
                    handleLogout,
                    search,
                    setSearch,
                    viewCart,
                    setViewCart
                }) {
    return (
        <header className="header">
            <h1>Каталог товарів</h1>

            {/* Пошук товарів */}
            <input
                type="text"
                placeholder="Пошук..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Кнопка переходу в кошик */}
            <button onClick={() => setViewCart(!viewCart)}>
                {viewCart ? "До каталогу" : "Кошик"}
            </button>

            {isAuth ? (
                <div>
                    <span>Вітаю, {user.email}</span>
                    <button onClick={handleLogout}>Вийти</button>
                </div>
            ) : (
                <div className="auth-box">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {isRegister ? (
                        <button onClick={handleRegister}>Зареєструватися</button>
                    ) : (
                        <button onClick={handleLogin}>Увійти</button>
                    )}
                    <button onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? "У мене вже є акаунт" : "Реєстрація"}
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
