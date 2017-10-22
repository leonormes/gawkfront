const pupilTemplate = require('./views/row.handlebars')
const moment = require('moment');

fetch('http://localhost:8081/allPupils')
    .then((res) => {
        return res.json();
    })
    .then((elm) => {
        app = document.getElementsByClassName('app')[0];

        Object.keys(elm).forEach((r) => {
        let divasync = document.createElement('div');
            if (elm.hasOwnProperty(r)) {
                divasync.innerHTML += pupilTemplate({
                id: r,
                adultfname: elm[r].adultfname,
                adultsurname: elm[r].adultsurname,
                allergies: elm[r].allergies,
                childfname: elm[r].childfname,
                childsurname: elm[r].childsurname,
                age: getPupilAge(elm[r].dob),
                email: elm[r].email,
                hasStarted: elm[r].hasStarted,
                phone: elm[r].phone,
                startDate: moment(elm[r].startDate).format('MMMM Do YYYY'),
                status: elm[r].status,
                dateAdded: moment(elm[r].timeStamp).format('MMMM Do YYYY')
            });
        }

        app.appendChild(divasync);
        })
    })

function getPupilAge(dob) {
    let a = moment();
    let b = moment(dob);
    return a.diff(b, 'months');
};

function editRecord(id) {
    console.log(id)
}
