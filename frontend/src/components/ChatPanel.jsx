
import { useState } from "react";
import "../styles/ChatPanel.css";
import api from "../services/api";

function ChatPanel() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    async function sendQuestion(text) {

        if (!text.trim()) return;

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
                    content:
                        response.data.answer
                }
            ]);

        } catch (error) {

            console.error(error);

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "⚠ AI service is currently unavailable."
                }
            ]);

        } finally {

            setLoading(false);

        }

    }

    async function askQuestion() {

        const userQuestion = question;

        setQuestion("");

        await sendQuestion(
            userQuestion
        );

    }

    async function askSuggestedQuestion(text) {

        if (loading) return;

        await sendQuestion(text);

    }

    return (

        <div className="chat-container">

            <h2 className="chat-title">
                AI Digital Twin Assistant
            </h2>

            <div className="suggested-questions">

                <button
                    disabled={loading}
                    onClick={() =>
                        askSuggestedQuestion(
                            "Why is my laptop hot?"
                        )
                    }
                >
                    Why is my laptop hot?
                </button>

                <button
                    disabled={loading}
                    onClick={() =>
                        askSuggestedQuestion(
                            "Will my battery degrade?"
                        )
                    }
                >
                    Battery Health
                </button>

                <button
                    disabled={loading}
                    onClick={() =>
                        askSuggestedQuestion(
                            "Explain detected anomalies."
                        )
                    }
                >
                    Explain Anomalies
                </button>

                <button
                    disabled={loading}
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
                        setQuestion(
                            e.target.value
                        )
                    }
                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter"
                        ) {

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

                {messages.map(
                    (msg, index) => (

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

                    )
                )}

                {loading && (

                    <div className="assistant-message">

                        <strong>
                            AI:
                        </strong>

                        <p>
                            🤖 Analyzing telemetry...
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default ChatPanel;

