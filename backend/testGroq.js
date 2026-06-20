require("dotenv").config();

const {
    askGroq
} = require("./services/groqService");

async function run() {

    const answer =
        await askGroq(
            "Why is my laptop hot?"
        );

    console.log(answer);

}

run();