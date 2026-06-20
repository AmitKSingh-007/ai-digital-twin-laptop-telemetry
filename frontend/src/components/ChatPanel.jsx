import { useState } from "react";

import "../styles/ChatPanel.css";

import api from "../services/api";

function ChatPanel() {

    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    async function askQuestion() {

        if (!question.trim()) {

            return;

        }

        const userQuestion = question;

        setQuestion("");

        setLoading(true);

        setMessages(prev => [

            ...prev,

            {
                role: "user",
                content: userQuestion
            }

        ]);

        try {

            const response =
                await api.post(
                    "/chat",
                    {
                        question: userQuestion
                    }
                );

            setMessages(prev => [

                ...prev,

                {
                    role: "assistant",
                    content: response.data.answer
                }

            ]);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function askSuggestedQuestion(text) {

        setLoading(true);

        setMessages(prev => [

            ...prev,

            {
                role: "user",
                content: text
            }

        ]);

        try {

            const response =
                await api.post(
                    "/chat",
                    {
                        question: text
                    }
                );

            setMessages(prev => [

                ...prev,

                {
                    role: "assistant",
                    content: response.data.answer
                }

            ]);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="chat-container">

            <h2 className="chat-title">
                AI Digital Twin Assistant
            </h2>

            <div className="suggested-questions">

                <button
                    onClick={() =>
                        askSuggestedQuestion(
                            "Why is my laptop hot?"
                        )
                    }
                >
                    Why is my laptop hot?
                </button>

                <button
                    onClick={() =>
                        askSuggestedQuestion(
                            "Will my battery degrade?"
                        )
                    }
                >
                    Battery Health
                </button>

                <button
                    onClick={() =>
                        askSuggestedQuestion(
                            "Explain detected anomalies."
                        )
                    }
                >
                    Explain Anomalies
                </button>

                <button
                    onClick={() =>
                        askSuggestedQuestion(
                            "What happens if the cooling fan fails?"
                        )
                    }
                >
                    Fan Failure
                </button>

            </div>

            <div className="chat-input-row">

                <input
                    className="chat-input"
                    type="text"
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            askQuestion();

                        }

                    }}
                    placeholder="Ask about your laptop..."
                />

                <button
                    className="chat-button"
                    onClick={askQuestion}
                    disabled={loading}
                >

                    {loading
                        ? "Thinking..."
                        : "Send"}

                </button>

            </div>

            <div className="chat-history">

                {
                    messages.map((msg, index) => (

                        <div
                            key={index}
                            className={
                                msg.role === "user"
                                    ? "user-message"
                                    : "assistant-message"
                            }
                        >

                            <strong>

                                {
                                    msg.role === "user"
                                        ? "You"
                                        : "AI"
                                }

                                :

                            </strong>

                            <p>
                                {msg.content}
                            </p>

                        </div>

                    ))

                }

                {
                    loading && (

                        <div className="assistant-message">

                            <strong>
                                AI:
                            </strong>

                            <p>
                                🤖 Analyzing telemetry...
                            </p>

                        </div>

                    )
                }

            </div>

        </div>

    );


}

export default ChatPanel;