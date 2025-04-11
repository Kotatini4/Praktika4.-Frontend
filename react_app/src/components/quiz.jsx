import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

// 🔹 Вопросы по географии
const data = [
    {
        question: "Столица Франции?",
        correct_answer: "Париж",
        incorrect_answers: ["Берлин", "Рим", "Мадрид"],
    },
    {
        question: "Какая самая большая страна в мире по территории?",
        correct_answer: "Россия",
        incorrect_answers: ["Канада", "Китай", "США"],
    },
    {
        question: "В какой стране находится гора Эверест?",
        correct_answer: "Непал",
        incorrect_answers: ["Индия", "Китай", "Пакистан"],
    },
    {
        question: "Какое самое длинное в мире озеро?",
        correct_answer: "Каспийское море",
        incorrect_answers: ["Байкал", "Виктория", "Онтарио"],
    },
    {
        question: "Какая река самая длинная в мире?",
        correct_answer: "Амазонка",
        incorrect_answers: ["Нил", "Янцзы", "Миссисипи"],
    },
    {
        question: "В какой стране находится Великая китайская стена?",
        correct_answer: "Китай",
        incorrect_answers: ["Япония", "Монголия", "Индия"],
    },
    {
        question: "Какой океан самый глубокий?",
        correct_answer: "Тихий",
        incorrect_answers: ["Атлантический", "Индийский", "Северный ледовитый"],
    },
    {
        question: "Какая страна граничит с наибольшим количеством государств?",
        correct_answer: "Китай",
        incorrect_answers: ["Россия", "США", "Бразилия"],
    },
    {
        question: "На каком материке находится пустыня Сахара?",
        correct_answer: "Африка",
        incorrect_answers: ["Азия", "Австралия", "Южная Америка"],
    },
    {
        question: "Какой континент самый маленький по площади?",
        correct_answer: "Австралия",
        incorrect_answers: ["Европа", "Антарктида", "Южная Америка"],
    },
];

const Quiz = () => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const currentQuestion = data[current];

    const shuffledAnswers = [...currentQuestion.incorrect_answers];
    if (!shuffledAnswers.includes(currentQuestion.correct_answer)) {
        shuffledAnswers.splice(
            Math.floor(Math.random() * 4),
            0,
            currentQuestion.correct_answer
        );
    }

    const handleAnswer = (answer) => {
        if (selected) return;
        setSelected(answer);
        if (answer === currentQuestion.correct_answer) {
            setScore(score + 1);
        }
        setTimeout(() => {
            if (current + 1 < data.length) {
                setCurrent(current + 1);
                setSelected(null);
            } else {
                setFinished(true);
            }
        }, 1500);
    };

    if (finished) {
        return (
            <div className="container text-center mt-5">
                <h2 className="mb-3">🎉 Игра завершена!</h2>
                <p className="lead">
                    Правильных ответов: {score} из {data.length}
                </p>
                <button
                    className="btn btn-secondary"
                    onClick={() => window.location.reload()}
                >
                    Сыграть ещё раз
                </button>
            </div>
        );
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8f9fa",
            }}
        >
            <div
                className="card shadow p-4 w-100"
                style={{ maxWidth: "600px" }}
            >
                <h4 className="mb-3">{decodeHTML(currentQuestion.question)}</h4>
                {shuffledAnswers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(answer)}
                        className={`btn btn-outline-primary btn-block mb-2 ${
                            selected
                                ? answer === currentQuestion.correct_answer
                                    ? "btn-success text-white"
                                    : answer === selected
                                    ? "btn-danger text-white"
                                    : ""
                                : ""
                        }`}
                    >
                        {decodeHTML(answer)}
                    </button>
                ))}
                <p className="mt-3 text-muted">
                    Вопрос {current + 1} из {data.length}
                </p>
            </div>
        </div>
    );
};

export default Quiz;
