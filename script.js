function task11() {
    document.getElementById('tableForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const m = parseInt(document.getElementById('rows').value);
        const n = parseInt(document.getElementById('cols').value);
        generateTable(m, n);

    });

    document.getElementById('tableForm').addEventListener('input', function() {
        const rows = document.getElementById('rows').value;
        const cols = document.getElementById('cols').value;
        const button = document.getElementById('generateButton');

        button.disabled = !(rows && cols);
    });

    function generateTable(rows, cols) {
        const container = document.getElementById('tableContainer');
        container.innerHTML = '';

        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';

        for (let i = 0; i < rows; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < cols; j++) {
                const td = document.createElement('td');
                td.style.border = '1px solid black'; // Додаємо обрамлення
                td.style.padding = '8px'; // Додаємо відступи
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        container.appendChild(table);
    }
}

task11()


function task12(){
        const form = document.createElement('form');
        form.id = 'registrationForm';

        const loginGroup = document.createElement('div');
        loginGroup.className = 'form-group';
        const loginLabel = document.createElement('label');
        loginLabel.innerText = 'Login:';
        const loginInput = document.createElement('input');
        loginInput.type = 'text';
        loginInput.name = 'login';
        loginInput.required = true;
        loginGroup.appendChild(loginLabel);
        loginGroup.appendChild(loginInput);
        form.appendChild(loginGroup);


        const passwordGroup = document.createElement('div');
        passwordGroup.className = 'form-group';
        const passwordLabel = document.createElement('label');
        passwordLabel.innerText = 'Password:';
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.name = 'password';
        passwordInput.required = true;
        passwordGroup.appendChild(passwordLabel);
        passwordGroup.appendChild(passwordInput);
        form.appendChild(passwordGroup);


        const repeatPasswordGroup = document.createElement('div');
        repeatPasswordGroup.className = 'form-group';
        const repeatPasswordLabel = document.createElement('label');
        repeatPasswordLabel.innerText = 'Repeat Password:';
        const repeatPasswordInput = document.createElement('input');
        repeatPasswordInput.type = 'password';
        repeatPasswordInput.name = 'repeatPassword';
        repeatPasswordInput.required = true;
        repeatPasswordGroup.appendChild(repeatPasswordLabel);
        repeatPasswordGroup.appendChild(repeatPasswordInput);
        form.appendChild(repeatPasswordGroup);


        const sexGroup = document.createElement('div');
        sexGroup.className = 'form-group';
        const sexLabel = document.createElement('label');
        sexLabel.innerText = 'Sex:';
        sexGroup.appendChild(sexLabel);

        const sexes = ['Male', 'Female'];
        sexes.forEach((sex, index) => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'sex';
            radio.value = sex.toLowerCase();
            radio.id = `sex${index + 1}`;
            const label = document.createElement('label');
            label.setAttribute('for', radio.id);
            label.innerText = sex;
            sexGroup.appendChild(radio);
            sexGroup.appendChild(label);
            sexGroup.appendChild(document.createElement('br'));
        });
        form.appendChild(sexGroup);


        const cityGroup = document.createElement('div');
        cityGroup.className = 'form-group';
        const cityLabel = document.createElement('label');
        cityLabel.innerText = 'City:';
        const citySelect = document.createElement('select');
        citySelect.name = 'city';
        citySelect.required = true;
        citySelect.innerHTML = `
                <option value="">Select a city</option>
                <option value="newYork">Zhytomyr</option>
                <option value="losAngeles">Kyiv</option>
                <option value="chicago">Ternopil</option>
            `;
        cityGroup.appendChild(cityLabel);
        cityGroup.appendChild(citySelect);
        form.appendChild(cityGroup);


        const interestsGroup = document.createElement('div');
        interestsGroup.className = 'form-group';
        const interestsLabel = document.createElement('label');
        interestsLabel.innerText = 'Interests:';
        interestsGroup.appendChild(interestsLabel);

        const interests = ['Sports', 'Music', 'Reading', 'Traveling', 'Cooking'];
        interests.forEach((interest, index) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `interest${index + 1}`;
            checkbox.name = 'interests';
            checkbox.value = interest.toLowerCase();
            const label = document.createElement('label');
            label.setAttribute('for', checkbox.id);
            label.innerText = interest;
            interestsGroup.appendChild(checkbox);
            interestsGroup.appendChild(label);
            interestsGroup.appendChild(document.createElement('br'));
        });

        form.appendChild(interestsGroup);


        const clearButton = document.createElement('button');
        clearButton.type = 'button';
        clearButton.innerText = 'Clear';
        clearButton.onclick = clearForm;

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerText = 'Submit';

        form.appendChild(clearButton);
        form.appendChild(submitButton);


        document.getElementById('formContainer').appendChild(form);


        form.onsubmit = function(event) {
            event.preventDefault();
            alert('Form submitted successfully!');
        };

    function clearForm() {
        document.getElementById('registrationForm').reset();
    }
}

task12()


function task2(){
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                const allContents = document.querySelectorAll('.accordion-content');
                allContents.forEach(c => c.style.display = 'none');
                content.style.display = 'block';
            }
        });
    });
}

task2()