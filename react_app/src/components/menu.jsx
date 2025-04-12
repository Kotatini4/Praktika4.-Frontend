import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                width: "100vw",
                margin: 0,
                padding: 0,
                background: "linear-gradient(to right, #4facfe, #00f2fe)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflow: "hidden",
            }}
        >
            <div className="container text-center">
                <h1 className="mb-4 text-white">
                    Добро пожаловать на Викторину!
                </h1>
                <Link to="/quiz">
                    <button className="btn btn-light btn-lg">
                        Начать игру
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Menu;
