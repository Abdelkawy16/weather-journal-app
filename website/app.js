/* Global Variables */
let date = document.getElementById('date');
let temp = document.getElementById('temp');
let content = document.getElementById('content');
let zip = document.getElementById('zip');
let feelings = document.getElementById('feelings');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;

document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    const zipcode = zip.value;
    const myFeelings = feelings.value || '-you should provide your feelings-';
    date.textContent = 'Loading...';
    temp.textContent = '';
    content.textContent = '';
    fetch(`/weather?zipcode=${zipcode}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                date.textContent = data.error;
            } else {
                date.textContent = `Your current date: ${newDate}.`;
                temp.textContent = `The location tempreture is ${data.body.temp} Celsius degree`;
                content.textContent = `Your current feeling is ${myFeelings}`;
            }
        })
    });
    zip.value = '';
    feelings.value = '';
    zip.focus();
})