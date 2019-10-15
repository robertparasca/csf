const apiUrl = 'https://jsonplaceholder.typicode.com/';

/** GET */

const formCreate = document.querySelector('.grid-item.create form#create');

formCreate.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('.grid-item.create form#create input');

    const form = {
        [input.name]: input.value
    };

    const requestData = {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(`${apiUrl}posts`, requestData)
        .then((response) => response.json())
        .then((data) => {
            const createGrid = document.querySelector('.grid-item.create');
            const p = document.createElement('p');
            p.innerHTML = `Post ID: ${data.id}, Title: ${data.title}`;
            createGrid.appendChild(p);
        });
});

/** READ */

const buttonRead = document.querySelector('.grid-item.read button');

const renderDataFromRead = (data, domNode) => {
    const li = document.createElement('li');
    li.innerHTML = `Post ID: ${data.id}, Title: ${data.title}`;
    domNode.appendChild(li);
};

buttonRead.addEventListener('click', () => {
    fetch(`${apiUrl}posts`)
        .then((response) => response.json())
        .then((data) => {
            data = data.slice(0, 5);
            const readGrid = document.querySelector('.grid-item.read');
            const ul = document.createElement('ul');
            data.forEach((item) => {
                renderDataFromRead(item, ul);
            });
            readGrid.appendChild(ul);
        });
});

/** UPDATE */

// populate the field
const updateInput = document.querySelector('.grid-item.update form#update input');

fetch(`${apiUrl}posts/1`)
    .then((res) => res.json())
    .then((data) => {
        updateInput.value = data.title;
    });

const formUpdate = document.querySelector('.grid-item.update form#update');

formUpdate.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = {
        [updateInput.name]: updateInput.value
    };

    const requestData = {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(`${apiUrl}posts/1`, requestData)
        .then((response) => response.json())
        .then((data) => {
            const updateGrid = document.querySelector('.grid-item.update');
            const p = document.createElement('p');
            p.innerHTML = `Post ID: ${data.id}, Title: ${data.title}`;
            updateGrid.appendChild(p);
        });
});


/** DELETE */

const formDelete = document.querySelector('.grid-item.delete form#delete');

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();

    const deleteInput = document.querySelector('.grid-item.delete form#delete input');
    
    fetch(`${apiUrl}posts/${deleteInput.value}`)
        .then((response) => response.json())
        .then((data) => {
            const deleteGrid = document.querySelector('.grid-item.delete');
            const p = document.createElement('p');
            p.innerHTML = `Post ID: ${data.id} was deleted.`;
            deleteGrid.appendChild(p);
        });
});

