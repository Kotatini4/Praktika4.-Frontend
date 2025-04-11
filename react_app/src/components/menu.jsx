import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Добро пожаловать в Викторину!</h1>
            <Link to="/quiz">
                <button className="btn btn-primary btn-lg">Начать игру</button>
            </Link>
        </div>
    );
};

export default Menu;
