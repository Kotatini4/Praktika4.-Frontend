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
                <h1 className="mb-5 text-white">Выберите викторину</h1>
                <div className="d-flex flex-column gap-3">
                    <Link to="/quiz">
                        <button className="btn btn-light btn-lg w-100">
                            🌍 География (локально)
                        </button>
                    </Link>
                    <Link to="/quiz-api">
                        <button className="btn btn-light btn-lg w-100">
                            🎲 Общая викторина (из API)
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
