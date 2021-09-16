/* Global Variables */
let date = document.getElementById('date');
let temp = document.getElementById('temp');
let content = document.getElementById('content');
let zip = document.getElementById('zip');
let feelings = document.getElementById('feelings');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const myFeelings = feelings.value || '-you should provide your feelings-';
    fetch('http://localhost:5000/weather').then((res) => {
        res.json().then((data) => {
            console.log(data);
            if (data.error) {
                date.textContent = data.error;
            } else {
                date.textContent = `Your current date: ${newDate}.`;
                temp.textContent = `The location tempreture is ${data.temp} Celsius degree`;
                content.textContent = `Your current feeling is ${myFeelings}`;
            }
        })
    })
    zip.value = '';
    feelings.value = '';
    zip.focus();
}


const forecast = async (zipcode) => {
    if (zipcode) {
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=e02a3414e003776ddfd4d6603a56cbca&units=metric`;

        const res = await fetch(url);
        const data = await res.json();
        //console.log(data);
        return data;
    } else {
        return { error: 'You must provide a zipcode!' };
    }
}

document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    const zipcode = zip.value;
    date.textContent = 'Loading...';
    temp.textContent = '';
    content.textContent = '';
    forecast(zipcode).then((res) => {
        postData('/weather', res)
    }).then(() => {
        updateUI()
    })
})