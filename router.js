// router class
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';

        // Слушаем изменения в URL
        window.addEventListener('hashchange', () => {
            this.handleRoute(window.location.hash.slice(1));
        });

        // Обрабатываем маршрут при первой загрузке страницы
        this.handleRoute(window.location.hash.slice(1) || '/');
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigate(path) {
        window.location.hash = path; // Изменяем хеш в URL
        this.handleRoute(path);
    }

    handleRoute(path) {
        this.currentRoute = path;
        const routeHandler = this.routes[path];

        if (routeHandler) {
            routeHandler();
        } else {
            console.error(`Route not found: ${path}`);
        }
    }
}

const router = new Router();

//constructor functions

function addRoute(routeName, paramsObject) {
    router.addRoute(`/${routeName}`, () => {
        createTask(
            paramsObject.taskNumber,
            paramsObject.taskTitle,
            paramsObject.taskDescription,
            paramsObject.htmlMarkUp,
            paramsObject.codeFunction
        );
    });
}

function createTask(taskNumber, taskTitle, taskDescription, htmlMarkUp, codeFunction) {
    document.getElementById('content').innerHTML = `
        <h1>${taskTitle}</h1>
        <p>${taskDescription}</p>
        ${htmlMarkUp}
        <h2>Code:</h2>
        <pre><code class="language-javascript">${escapeHtml(codeFunction.toString())}</code></pre>
    `;
    codeFunction();
    Prism.highlightAll();
}


router.addRoute('/', () => {
    document.getElementById('content').innerHTML = '<h1>Лабораторна робота №6. Савчук Дмитро. ІПЗк-24-1</h1>';
});

let task1Params = {
    taskNumber: 1,
    taskTitle: 'Task 1: add users to table',
    taskDescription: 'Дана таблиця з користувачами: номер, ім\'я та прізвище. Під таблицею зробіть форму, з допомогою якої можна буде додати нового користувача в таблицю.',
    htmlMarkUp: `
     
        <table id="userTable">
        <thead>
            <tr>
                <th>№</th>
                <th>Name</th>
                <th>Surname</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Dmytro</td>
                <td>Savchuk</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Robert</td>
                <td>Bob</td>
            </tr>
        </tbody>     
        </table>
        
        
        <div class="form-container form-group">
            <form  id="userForm">           
            <input class="form-control" type="text" id="firstName" required placeholder="name">       
            <input class="form-control" type="text" id="lastName" required placeholder="surname">
            <button class="btn btn-dark" type="submit">submit</button>
        </form>
    </div>
        
    `,
    codeFunction: task1
};
addRoute('task1', task1Params) //1'st route with 1'st task
function task1() {
    let userCount = 2;

    document.getElementById('userForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;

        userCount++;

        const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        const numberCell = newRow.insertCell(0);
        const firstNameCell = newRow.insertCell(1);
        const lastNameCell = newRow.insertCell(2);

        numberCell.textContent = userCount;
        firstNameCell.textContent = firstName;
        lastNameCell.textContent = lastName;

        document.getElementById('userForm').reset();
    });
}//1'st task function

let task2Params = {
    taskNumber: 2,
    taskTitle: 'Task 2: textarea table color background',
    taskDescription: 'В елемент textarea вводяться нулі та одиниці і з них потрібно сформувати квадратики чорного і білого кольору',
    htmlMarkUp: `
     
     <textarea id="binaryInput" rows="5" cols="30"></textarea>
    <table id="gridTable"></table>
        
    `,
    codeFunction: task2
};
addRoute('task2', task2Params) //1'st route with 1'st task
function task2() {
    const binaryInput = document.getElementById('binaryInput');
    const gridTable = document.getElementById('gridTable');

    // Додати слухача на подію input
    binaryInput.addEventListener('input', generateGrid);

    function generateGrid() {

// сердечко для копіювання
        //       11111       11111
        //      1111111     1111111
        //     111111111   111111111
        //    11111111111 11111111111
        //   111111111111111111111111
        //  11111111111111111111111111
        //  11111111111111111111111111
        //   111111111111111111111111
        //    1111111111111111111111
        //     11111111111111111111
        //      111111111111111111
        //       1111111111111111
        //        11111111111111
        //         111111111111
        //          1111111111
        //           11111111
        //            111111
        //             1111
        //              11
        const input = binaryInput.value;
        gridTable.innerHTML = '';
        const rows = input.split('\n');


        rows.forEach(row => {

            const tableRow = document.createElement('tr');

            for (let i = 0; i < row.length; i++) {
                const char = row[i];
                const tableCell = document.createElement('td');
                if (char === '1') {
                    tableCell.classList.add('black');
                } else if (char === '0') {
                    tableCell.classList.add('white');
                }
                tableRow.appendChild(tableCell);
            }


            gridTable.appendChild(tableRow);
        });
    }
}


//code highlights
function escapeHtml(html) {
    return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.getElementById('navbar').addEventListener('click', (event) => {
    if (event.target.matches('a')) {
        event.preventDefault();
        const path = event.target.getAttribute('href').slice(1);
        router.navigate(path);
    }
});

router.handleRoute(window.location.hash.slice(1) || '/');