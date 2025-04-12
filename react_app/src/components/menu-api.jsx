import { Link } from "react-router-dom";

const MenuAPI = () => {
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
                <h1 className="mb-5 text-white">
                    География — выбери сложность
                </h1>
                <div className="d-flex flex-column gap-3">
                    <Link to="/quiz-api/easy">
                        <button className="btn btn-light btn-lg w-100">
                            🟢 Лёгкий
                        </button>
                    </Link>
                    <Link to="/quiz-api/medium">
                        <button className="btn btn-light btn-lg w-100">
                            🟡 Средний
                        </button>
                    </Link>
                    <Link to="/quiz-api/hard">
                        <button className="btn btn-light btn-lg w-100">
                            🔴 Сложный
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuAPI;
