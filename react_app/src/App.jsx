import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Menu from "./components/menu";
import MenuAPI from "./components/menu-api";
import QuizAPI from "./components/quiz-api";
import Quiz from "./components/quiz";

const App = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.key}>
            <Route path="/" element={<Menu />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz-api" element={<MenuAPI />} />
            <Route path="/quiz-api/:difficulty" element={<QuizAPI />} />
        </Routes>
    );
};

export default App;
