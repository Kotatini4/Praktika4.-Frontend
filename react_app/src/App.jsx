import { Routes, Route } from "react-router-dom";
import Menu from "./components/menu";
import Quiz from "./components/quiz";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/quiz" element={<Quiz />} />
        </Routes>
    );
};

export default App;
