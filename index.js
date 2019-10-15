const apiUrl = 'https://jsonplaceholder.typicode.com/';

const formCreate = document.querySelector('.grid-item.create form');

formCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.querySelector('.grid-item.create form input');

    const data = {
        [input.name]: input.value
    };

    const requestData = {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(`${apiUrl}posts`, requestData)
        .then(response => response.json())
        .then(json => {
            console.log(json)
        });
});

const buttonRead = document.querySelector('.grid-item.read button');

const renderDataFromRead = (data) => {
    const readGrid = document.querySelector('.grid-item.read');
    const p = document.createElement('p');
    p.innerHTML = `User ID: ${data.userId}, Title: ${data.title}`;
    readGrid.appendChild(p);
};

buttonRead.addEventListener('click', function () {
    console.log('fucking clicked read');
    fetch(`${apiUrl}todos/1`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            renderDataFromRead(data);
        });
});
