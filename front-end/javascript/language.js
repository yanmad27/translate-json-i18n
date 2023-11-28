var languages = [
    {
        "code": "bg",
        "name": "Bulgarian"
    },
    {
        "code": "zh",
        "name": "Chinese"
    },
    {
        "code": "hi",
        "name": "Hindi"
    },
    {
        "code": "hu",
        "name": "Hungarian"
    },
    {
        "code": "id",
        "name": "Indonesian"
    },

    {
        "code": "it",
        "name": "Italian"
    },
    {
        "code": "ja",
        "name": "Japanese"
    },

    {
        "code": "ko",
        "name": "Korean"
    },

    {
        "code": "lo",
        "name": "Lao"
    },
    {
        "code": "vi",
        "name": "Vietnamese"
    },
]

// create html checkbox list with wrap auto style  from languages array
function createLanguageList() {
    // create checkbox list from languages array
    for (var i = 0; i < languages.length; i++) {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "language";
        checkbox.value = languages[i].code;
        checkbox.id = languages[i].code;
        checkbox.style = "margin:0;"
        checkbox.checked = true;
        var label = document.createElement('label')
        label.htmlFor = languages[i].code;
        label.style = "margin:0;"
        label.appendChild(document.createTextNode(languages[i].name));
        var wrapper = document.createElement('div')
        wrapper.style = "display: inline-flex; width: 100px; text-align: left;  align-items: center; gap: 4px;"
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        document.getElementById('to').appendChild(wrapper);
    }
}

console.log('test')
createLanguageList()


