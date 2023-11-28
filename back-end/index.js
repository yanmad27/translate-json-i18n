const express = require('express')
const app = express()
const cors = require('cors')

const translateWord = async (target, text) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${text}`
    return fetch(url).then(res => res.json()).then(res => res[0][0][0])
}
const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const translate = async (target, curr) => {
    const keys = Object.keys(curr);
    const result = {}
    for (let key of keys) {
        const isArray = Array.isArray(curr[key])
        const dataType = isArray ? 'array' : typeof curr[key]

        switch (dataType) {
            case "string":
                result[key] = toCapitalize(await translateWord(target, curr[key]));
                break;
            case "object":
                result[key] = await translate(target, curr[key]);
                break;
            default:
                result[key] = curr[key];

        }
    }
    return result
}
const translateAll = async (targets,) => {

    const results = {}

    for (let target of targets) {
        const result = await translate(target, json)
        results[target] = JSON.stringify(result, null, 2)
    }

    return results
}

app.use(cors())

app.use(express.json());

app.post('/translate', async function (req, res) {

    try {

        const targets = req.body.targets;
        const jsonText = req.body.jsonText;

        const results = await translateAll(targets, jsonText)

        res.send(results)

    } catch (err) {
        console.log(err)
        res.status(400).send("Oh uh, something went wrong");
    }

})


app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));