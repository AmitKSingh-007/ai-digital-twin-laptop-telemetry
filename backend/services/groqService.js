const Groq = require("groq-sdk");

const groq = new Groq({

    apiKey: process.env.GROQ_API_KEY

});

async function askGroq(context) {

    const completion =
        await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [

                {
                    role: "system",
                    content: `
                        You are a Dell Laptop Digital Twin Assistant.

                        Analyze telemetry, anomalies, predictions and simulations.

                        Do not describe a laptop as overheating if:
                        - Thermal State is NORMAL
                        - Temperature Risk is LOW

                        Use historical anomalies separately from current state.

                        Provide:
                        1. Explanation
                        2. Root cause
                        3. Recommendation

                        Use only the supplied context.

                        Never invent telemetry values.

                        Keep answers concise and practical.
                    `
                },

                {
                    role: "user",
                    content: context
                }

            ]

        });

    return completion
        .choices[0]
        .message
        .content;

}

module.exports = { askGroq };