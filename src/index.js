const pupilTemplate = require('./views/row.handlebars')

fetch('http://localhost:8081/allPupils')
    .then((res) => {
        return res.json();
    })
    .then((elm) => {

    let divasync = document.createElement('div');
        for (r in elm) {
    divasync.innerHTML += pupilTemplate({
        adultfname: elm[r].adultfname,
        childfname: elm[r].childfname
    });

        }
    app = document.getElementsByClassName('app')[0];
    app.appendChild(divasync);
    })
