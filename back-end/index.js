const express = require('express')
const app = express()
const fs = require('fs');
var cors = require('cors')

const i18nPath = 'i18n'
const translate = async (target, text) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${text}`
    return fetch(url).then(res => res.json()).then(res => res[0][0][0])
}
const toCapitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const translateAll = async (targets, json) => {


    console.log('LOG ~ :', targets);
    const enObject = json
    const enKeys = Object.keys(enObject);

    const total = targets.length;
    let index = 1;

    const results = {}

    for (let target of targets) {
        let result = {}
        for (let key of enKeys) {
            result[key] = toCapitalize(await translate(target, enObject[key]));
        }

        result = JSON.stringify(result, null, 2)

        results[target] = result
        console.log('LOG ~ :', target + '.json', index++, '/', total, 'done');
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