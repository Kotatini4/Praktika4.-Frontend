import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import confetti from "canvas-confetti";

const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

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
    const [timeLeft, setTimeLeft] = useState(90);
    const [answers, setAnswers] = useState([]);
    const timerRef = useRef(null);
    const navigate = useNavigate();
    const currentQuestion = data[current];

    useEffect(() => {
        const shuffle = () => {
            const options = [...data[current].incorrect_answers];
            const correct = data[current].correct_answer;

            if (!options.includes(correct)) {
                options.splice(
                    Math.floor(Math.random() * (options.length + 1)),
                    0,
                    correct
                );
            }

            return options;
        };

        setAnswers(shuffle());
    }, [current]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(timerRef.current);
            setFinished(true);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (finished) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
            });
        }
    }, [finished]);

    const handleAnswer = (answer) => {
        if (selected || finished) return;
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
                    <h2 className="mb-3 text-white">🎉 Игра завершена!</h2>
                    <p className="lead text-white fw-bold fs-4">
                        Правильных ответов: {score} из {data.length}
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <button
                            className="btn btn-light btn-lg"
                            onClick={() => window.location.reload()}
                        >
                            Сыграть ещё раз
                        </button>

                        <button
                            className="btn btn-light btn-lg"
                            onClick={() => (window.location.href = "/")}
                        >
                            В главное меню
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                width: "100vw",
                margin: 0,
                padding: 0,
                background: "linear-gradient(to right, #4facfe, #00f2fe)", // красивый градиент
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflow: "hidden",
            }}
        >
            <div
                className="card shadow p-4 w-100"
                style={{ maxWidth: "600px" }}
            >
                <h4 className="mb-3">{decodeHTML(currentQuestion.question)}</h4>
                {answers.map((answer, index) => (
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
                <div className="progress my-3" style={{ height: "20px" }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                        role="progressbar"
                        style={{
                            width: `${((current + 1) / data.length) * 100}%`,
                        }}
                        aria-valuenow={current + 1}
                        aria-valuemin="0"
                        aria-valuemax={data.length}
                    >
                        Вопрос {current + 1} из {data.length}
                    </div>
                </div>

                <p className="text-danger fw-bold">
                    Осталось времени: {timeLeft} сек
                </p>

                <button
                    onClick={() => setFinished(true)}
                    className="btn btn-outline-danger mt-4"
                    style={{ float: "right" }}
                >
                    Выйти
                </button>
            </div>
        </div>
    );
};

export default Quiz;
