const pupilTemplate = require('./views/row.handlebars')
const moment = require('moment');
let pupilRecordsArray;
let activePupils;

fetch('http://localhost:8081/allPupils')
    .then((res) => {
        return res.json();
    })
    .then((pupils) => {
        console.log(pupils)
    pupilRecordsArray = pupilRecordsToArray(pupils);
    console.log('pupilrecordsArray', pupilRecordsArray)
    activePupils = filterPupils(pupilRecordsArray);
        return activePupils;
    })
    .then((activePupils) => {
        app = document.getElementsByClassName('app')[0];
        console.log(activePupils)
        activePupils.forEach((pupil) => {
        let divasync = document.createElement('div');
                divasync.innerHTML += pupilTemplate({
                id: pupil.key,
                adultfname: pupil['adultfname'],
                adultsurname: pupil['adultsurname'],
                allergies: pupil['allergies'],
                childfname: pupil['childfname'],
                childsurname: pupil['childsurname'],
                age: getPupilAge(pupil['dob']),
                email: pupil['email'],
                hasStarted: pupil['hasStarted'],
                phone: pupil['phone'],
                startDate: moment(pupil['startDate']).format('MMMM Do YYYY'),
                status: pupil['status'],
                dateAdded: moment(pupil['timeStamp']).format('MMMM Do YYYY')
            });

        app.appendChild(divasync);
        $('#' + pupil.key).find('.card-footer')
        .click((e) => {
            handleFooterClick(e);
        });
        })
    })

function getPupilAge(dob) {
    let a = moment();
    let b = moment(dob);
    return a.diff(b, 'months')
};

function editRecord(id) {
    console.log(id)
}

function handleFooterClick(e) {
    if($(e.target).hasClass('edit')) {
        console.log('Edit ' + $(e.target).parent().parent().parent().attr('id'))
    } else if ($(e.target).hasClass('remove')) {
        console.log('Delete ' + $(e.target).parent().parent().parent().attr('id'))
    }
}

/**
 * pupilRecordsToArray - It is easier to sort and manipulate the
 * data in an array.
 * This function takes the Object returned from the server and
 * maps the data to an array of objects.
 * @param {Object} pupilRecord - The Object to be converted to Array
 * @returns {undefined}
 */
function pupilRecordsToArray(pupilRecord) {
    const pupilRecordsArray = Object.keys(pupilRecord).map(function(key) {
        pupilRecord[key].key = key;
        return pupilRecord[key];
    });
    return pupilRecordsArray;
}
function filterPupils(pupils) {
    let filtered = pupils.filter(function(p) {
        return p.status === 'Active' || p.status === 'Waiting';

    })
    return filtered;

}
