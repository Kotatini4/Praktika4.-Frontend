import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "bootstrap/dist/css/bootstrap.min.css";

const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

const QuizAPI = () => {
    const { difficulty } = useParams();
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(90);
    const [answers, setAnswers] = useState([]);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Сброс состояния
        setQuestions([]);
        setAnswers([]);
        setCurrent(0);
        setSelected(null);
        setScore(0);
        setFinished(false);
        setTimeLeft(90);

        fetch(
            `https://opentdb.com/api.php?amount=10&category=22&difficulty=${difficulty}&type=multiple`
        )
            .then((res) => res.json())
            .then((data) => {
                if (!data.results || data.results.length === 0) {
                    alert(
                        "Сервер вернул пустой список вопросов. Попробуйте позже."
                    );
                    return;
                }

                setQuestions(data.results);
                setAnswers(shuffleAnswers(data.results[0]));
            });
    }, [difficulty]);

    useEffect(() => {
        if (questions.length > 0) {
            setAnswers(shuffleAnswers(questions[current]));
        }
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

    const shuffleAnswers = (question) => {
        const options = [...question.incorrect_answers];
        const correct = question.correct_answer;
        options.splice(Math.floor(Math.random() * 4), 0, correct);
        return options;
    };

    const handleAnswer = (answer) => {
        if (selected || finished) return;
        setSelected(answer);
        if (answer === questions[current].correct_answer) {
            setScore((prev) => prev + 1);
        }

        setTimeout(() => {
            if (current + 1 < questions.length) {
                setCurrent((prev) => prev + 1);
                setSelected(null);
            } else {
                setFinished(true);
            }
        }, 1500);
    };

    if (!questions.length || !questions[current]) {
        return (
            <div
                className="text-center text-white"
                style={{ paddingTop: "100px" }}
            >
                Загрузка вопросов...
            </div>
        );
    }

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
                <div
                    className="text-center card shadow p-4"
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        minWidth: "350px",
                        backgroundColor: "white",
                        borderRadius: "12px",
                    }}
                >
                    <h2 className="mb-3">🎉 Викторина завершена!</h2>
                    <p className="fw-bold fs-4 mb-4">
                        Правильных ответов: {score} из {questions.length}
                    </p>

                    <div className="d-flex justify-content-center gap-3">
                        <button
                            className="btn btn-light btn-lg"
                            onClick={() => navigate("/quiz-api")}
                        >
                            Сыграть ещё раз
                        </button>

                        <button
                            className="btn btn-light btn-lg"
                            onClick={() => navigate("/")}
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
                width: "100vw", // 👈 важно!
                margin: 0,
                padding: 0,
                background: "linear-gradient(to right, #4facfe, #00f2fe)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflow: "hidden",
            }}
        >
            <div
                className="card shadow p-4"
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    minWidth: "350px",
                    backgroundColor: "white",
                    borderRadius: "12px",
                }}
            >
                <h5 className="mb-4">
                    {decodeHTML(questions[current].question)}
                </h5>

                {answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(answer)}
                        className={`btn btn-outline-primary btn-block mb-2 ${
                            selected
                                ? answer === questions[current].correct_answer
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

                {/* Прогресс бар */}
                <div className="progress my-3" style={{ height: "20px" }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                        role="progressbar"
                        style={{
                            width: `${
                                ((current + 1) / questions.length) * 100
                            }%`,
                        }}
                    >
                        Вопрос {current + 1} из {questions.length}
                    </div>
                </div>

                {/* Таймер */}
                <p className="text-danger fw-bold text-end">
                    Осталось: {timeLeft} сек
                </p>

                {/* Кнопка выхода */}
                <button
                    onClick={() => setFinished(true)}
                    className="btn btn-outline-danger mt-3"
                    style={{ float: "right" }}
                >
                    Выйти
                </button>
            </div>
        </div>
    );
};

export default QuizAPI;
