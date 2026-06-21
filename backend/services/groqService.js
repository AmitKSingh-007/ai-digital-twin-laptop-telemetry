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

                        Provide your answer EXACTLY in this format:

                        1. Explanation:
                        - point 1
                        - point 2
                       

                        2. Root Cause:
                        - point 1
                        - point 2
                      

                        3. Recommendation:
                        - point 1
                        - point 2
                        
Rules:
- Use bullet points
- Put each bullet on a new line
- Each bullet must be a single sentence
- Never insert a line break inside a bullet point
- Start a new line only when starting a new bullet
- Keep answers concise and focused on the most relevant information

                        Example:

                        1. Explanation:
                        - Thermal throttling events were detected.
                        - Fan operated at maximum speed multiple times.
                        - Memory utilization exceeded the safe threshold.

                        2. Root Cause:
                        - Sustained high workload.
                        - Increased cooling demand.
                        - High memory consumption.

                        3. Recommendation:
                        - Improve airflow around the laptop.
                        - Close unnecessary applications.
                        - Monitor temperature and memory trends.
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