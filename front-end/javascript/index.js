"use strict";

var zip = new JSZip();

jQuery("#download").on("click", async function () {
    NProgress.start();
    const form = $('#form-data').serializeArray()
    try {

        var body = {
            targets: form.filter(item => item.name === 'language').map(item => item.value),
            jsonText: JSON.parse(form.find(item => item.name === 'json').value)
        }

    } catch (e) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid JSON data!",
            showConfirmButton: false

        });
        return;

    }

    try {

        const results = await fetch('https://api-translate.rsrm.dev/translate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(res => res.json())

        const keys = Object.keys(results)
        keys.forEach(key => {
            zip.file(key + ".json", results[key])
        })

        zip.generateAsync({type: "blob"}).then(function (blob) { // 1) generate the zip file
            saveAs(blob, "translated.zip");                          // 2) trigger the download
        }, function (err) {
            jQuery("#blob").text(err);
        });
    } catch (e) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error while translating!",
            showConfirmButton: false

        });
    }

    NProgress.done();


});