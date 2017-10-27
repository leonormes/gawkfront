const pupilTemplate = require('./views/row.handlebars');
const editModal = require('./views/edit-modal.handlebars');
const moment = require('moment');
const Rx = require('rxjs/Rx');
const socket = require('./websocket');
let pupilRecordsArray;
let activePupils;
const $editModal = $('#edit');

socket.subscribe((mes) => {
    console.log(mes)
})
$editModal.find('.delete').click(() => {
    closeEditModal();
});
$editModal.find('#cancel').click(() => {
    closeEditModal();
});
const pupilData$ = Rx.Observable.fromPromise($.get('http://localhost:8081/allPupils'))
    .subscribe(
        (pupils) => {
            pupilRecordsArray = pupilRecordsToArray(pupils);
            activePupils = filterPupils(pupilRecordsArray);
            createRegisterHTML(activePupils);
        }
    )
// fetch('http://localhost:8081/allPupils')
//     .then((res) => {
//         return res.json();
//     })
//     .then((pupils) => {
//         pupilRecordsArray = pupilRecordsToArray(pupils);
//         activePupils = filterPupils(pupilRecordsArray);
//         return activePupils;
//     })
//     .then((activePupils) => {
//         app = document.getElementsByClassName('app')[0];
//         activePupils.forEach((pupil) => {
//             const divasync = document.createElement('div');
//             divasync.setAttribute('class', 'card');
//             divasync.setAttribute('id', pupil.key);
//             divasync.innerHTML += pupilTemplate({
//                 id: pupil.key,
//                 adultfname: pupil['adultfname'],
//                 adultsurname: pupil['adultsurname'],
//                 allergies: pupil['allergies'],
//                 childfname: pupil['childfname'],
//                 childsurname: pupil['childsurname'],
//                 age: getPupilAge(pupil['dob']),
//                 email: pupil['email'],
//                 hasStarted: pupil['hasStarted'],
//                 phone: pupil['phone'],
//                 startDate: moment(pupil['startDate']).format('MMMM Do YYYY'),
//                 status: pupil['status'],
//                 dateAdded: moment(pupil['timeStamp']).format('MMMM Do YYYY'),
//             });

//             app.appendChild(divasync);
//             const $footer = $('#' + pupil.key).find('.card-footer');
//             Rx.Observable.fromEvent($footer, 'click')
//                 .subscribe((e) => {
//                     handleFooterClick(e);
//                 })
//         });
//     });

function createRegisterHTML(activePupils) {
    const app = document.getElementsByClassName('app')[0];
    activePupils.forEach((pupil) => {
        const divasync = document.createElement('div');
        divasync.setAttribute('class', 'card');
        divasync.setAttribute('id', pupil.key);
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
            dateAdded: moment(pupil['timeStamp']).format('MMMM Do YYYY'),
        });

        app.appendChild(divasync);
        const $footer = $('#' + pupil.key).find('.card-footer');
        Rx.Observable.fromEvent($footer, 'click')
            .subscribe((e) => {
                handleFooterClick(e);
            })
    });

}

function getPupilAge(dob) {
    const a = moment();
    const b = moment(dob);
    return a.diff(b, 'months');
};

function openEditModal(id) {
    const pupil = _.find(pupilRecordsArray, (p) => {
        return p.key === id;
    });
    const editForm = document.createElement('form');
    editForm.innerHTML = editModal(
        pupil
    );
    $editModal.find('.modal-card-body').append(editForm);
    $editModal.addClass('is-active');
}

function closeEditModal() {
    $editModal.removeClass('is-active');
    $editModal.find('.modal-card-body').empty();
}

function handleFooterClick(e) {
    if ($(e.target).hasClass('edit')) {
        openEditModal($(e.target).closest('.card').attr('id'));
        // console.log('Edit ' + $(e.target).closest('.card').attr('id'))
    } else if ($(e.target).hasClass('remove')) {
        console.log('Delete ' + $(e.target).parent().parent().parent().attr('id'));
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
    const pupilRecordsArray = Object.keys(pupilRecord).map(function (key) {
        pupilRecord[key].key = key;
        return pupilRecord[key];
    });
    return pupilRecordsArray;
}

/**
 * The data return from Firebase contains ex-pupils. In most cases we do not need to
 * see them so this func returns a new collection of just those that are current
 * @param {collection} pupils
 * @returns  {collection} current pupils
 */
function filterPupils(pupils) {
    const filtered = pupils.filter(function (p) {
        return p.status === 'Active' || p.status === 'Waiting';
    });
    return filtered;
}
