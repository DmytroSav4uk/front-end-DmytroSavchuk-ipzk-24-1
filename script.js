function task1() {

    let p = document.querySelectorAll('#paragraphs p');
    let arr = [];
    let resultDiv = document.querySelector('#result');

    for (const pElement of p) {
        arr.push(pElement.innerText.length);
        pElement.innerText = `${pElement.innerText} - length is: ${pElement.innerText.length}`;
    }

    resultDiv.innerText = "result array is: " + JSON.stringify(arr);
    console.log(arr);
}

task1()

function task2() {
    let arr = [20, 17, 4, -4, 10, -9, 13, 4, 12, 22, 13, 19, 1, 3];

    let results = {
        min: Math.min(...arr),
        max: Math.max(...arr),
        oddQuantity: 0,
        evenQuantity: 0,
        positiveQuantity: 0,
        twoNumbersQuantity: 0,
        negativeQuantity: 0,
        sortedArr: [...arr].sort((a, b) => a - b),
        reversedArr: [...arr].reverse()
    };

    for (const element of arr) {
        if (element % 2 === 0) {
            results.evenQuantity += 1;
        } else {
            results.oddQuantity += 1;
        }
    }

    for (const element of arr) {
        if (element < 0) {
            results.negativeQuantity += 1;
        } else {
            results.positiveQuantity += 1;
        }
    }

    for (const element of arr) {
        if (element >= 10 && element <= 100 || element <= -10 && element >= 100) {
            results.twoNumbersQuantity += 1;
        }
    }

    console.log(arr)
    console.log(results)

    document.querySelector('#task2 h1').innerText = "array: " + JSON.stringify(arr)
    document.querySelector('#task2 h5').innerText = JSON.stringify(results)
}

task2()

function task3() {
    let tables = document.querySelectorAll('.table');
    tables.forEach(function (div) {
        let tdElements = div.querySelectorAll('td');
        tdElements.forEach(function (td, index) {
            if ((index + 1) % 2 === 0) {
                td.classList.add('selected');
            }
        });
    });
}

task3()

function task4(N, M) {
    const matrix = [];
    for (let i = 0; i < N; i++) {
        const row = [];
        for (let j = 0; j < M; j++) {
            row.push(Math.floor(Math.random() * 21) - 10);
        }
        matrix.push(row);
    }

    const matrixTable = document.getElementById("matrix-table");
    let tableHTML = '<table>';
    matrix.forEach(row => {
        tableHTML += '<tr>';
        row.forEach(cell => {
            tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</table>';
    matrixTable.innerHTML = tableHTML;

    const positiveCount = matrix.flat().filter(num => num > 0).length;

    const rowsWithoutZero = matrix.filter(row => !row.includes(0)).length;

    let columnsWithZero = 0;
    for (let j = 0; j < M; j++) {
        if (matrix.some(row => row[j] === 0)) {
            columnsWithZero++;
        }
    }

    let maxSeriesLength = 0;
    let rowWithMaxSeries = -1;
    for (let i = 0; i < N; i++) {
        let seriesLength = 1;
        let maxRowSeries = 1;
        for (let j = 1; j < M; j++) {
            if (matrix[i][j] === matrix[i][j - 1]) {
                seriesLength++;
            } else {
                seriesLength = 1;
            }
            if (seriesLength > maxRowSeries) {
                maxRowSeries = seriesLength;
            }
        }
        if (maxRowSeries > maxSeriesLength) {
            maxSeriesLength = maxRowSeries;
            rowWithMaxSeries = i + 1;
        }
    }

    const productOfNonNegativeRows = matrix
        .filter(row => row.every(num => num >= 0))
        .map(row => row.reduce((acc, num) => acc * num, 1));

    let sumOfNonNegativeColumns = Array(M).fill(0);
    for (let j = 0; j < M; j++) {
        if (matrix.every(row => row[j] >= 0)) {
            sumOfNonNegativeColumns[j] = matrix.reduce((acc, row) => acc + row[j], 0);
        }
    }

    let sumOfColumnsWithNegative = Array(M).fill(0);
    for (let j = 0; j < M; j++) {
        if (matrix.some(row => row[j] < 0)) {
            sumOfColumnsWithNegative[j] = matrix.reduce((acc, row) => acc + row[j], 0);
        }
    }

    const transposedMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));


//diagonals
    function getMainDiagonalSums(matrix) {
        const N = matrix.length;
        const M = matrix[0].length;
        const diagonals = [];
        let maxDiagonalIndices = [];


        for (let k = 1; k < M; k++) {
            let sum = 0;
            let indices = [];
            for (let i = 0, j = k; i < N && j < M; i++, j++) {
                sum += matrix[i][j];
                indices.push([i, j]);
            }
            diagonals.push({sum, indices});
        }


        for (let k = 1; k < N; k++) {
            let sum = 0;
            let indices = [];
            for (let i = k, j = 0; i < N && j < M; i++, j++) {
                sum += matrix[i][j];
                indices.push([i, j]);
            }
            diagonals.push({sum, indices});
        }

        const maxDiagonal = diagonals.reduce((prev, curr) => (curr.sum > prev.sum ? curr : prev));
        maxDiagonalIndices = maxDiagonal.indices;

        maxDiagonalIndices.forEach(([i, j]) => {
            const cell = document.querySelector(`#cell-${i}-${j}`);
            if (cell) {
                cell.style.backgroundColor = "lightblue";
            }
        });
        return maxDiagonal.sum;
    }


    //paint

    function getSecondaryDiagonalSums(matrix) {
        const N = matrix.length;
        const M = matrix[0].length;
        const diagonals = [];
        let minDiagonalIndices = [];

        for (let k = 0; k < M; k++) {
            let sum = 0;
            let indices = [];
            for (let i = 0, j = k; i < N && j >= 0; i++, j--) {
                sum += Math.abs(matrix[i][j]);
                indices.push([i, j]);
            }
            diagonals.push({sum, indices});
        }

        for (let k = 1; k < N; k++) {
            let sum = 0;
            let indices = [];
            for (let i = k, j = M - 1; i < N && j >= 0; i++, j--) {
                sum += Math.abs(matrix[i][j]);
                indices.push([i, j]);
            }
            diagonals.push({sum, indices});
        }

        const minDiagonal = diagonals.reduce((prev, curr) => (curr.sum < prev.sum ? curr : prev));
        minDiagonalIndices = minDiagonal.indices;

        minDiagonalIndices.forEach(([i, j]) => {
            const cell = document.querySelector(`#cell-${i}-${j}`);
            if (cell) {
                cell.style.backgroundColor = "deeppink";
            }
        });

        return Math.min(...diagonals.map(diag => diag.sum));
    }

    document.getElementById("matrix-table").innerHTML = `
  <table>
    ${matrix.map((row, i) => `
      <tr>${row.map((cell, j) => `<td id="cell-${i}-${j}">${cell}</td>`).join('')}</tr>
    `).join('')}
  </table>
`;

    const maxMainDiagonalSum = getMainDiagonalSums(matrix);
    const minSecondaryDiagonalSum = getSecondaryDiagonalSums(matrix);
    const results = `
  <p>positive elements: ${positiveCount}</p>
  <p>rows without zeros: ${rowsWithoutZero}</p>
  <p>columns with at least one zero: ${columnsWithZero}</p>
  <p>longest series of identical elements: ${rowWithMaxSeries !== -1 ? rowWithMaxSeries : 'none'}</p>
  <p>Product of elements in rows without negative elements: ${productOfNonNegativeRows.length > 0 ? productOfNonNegativeRows.join(', ') : 'none'}</p>
  <p>Sum of elements in columns without negative elements: ${sumOfNonNegativeColumns.filter(sum => sum !== 0).join(', ') || 'none'}</p>
  <p>Sum of elements in columns with at least one negative element: ${sumOfColumnsWithNegative.filter(sum => sum !== 0).join(', ') || 'none'}</p>
  <p>Max among sum of diagonals, parallel to main diagonal: ${maxMainDiagonalSum}</p>
  <p>Min among sums of modules of diagonal's elements, parallel to side diagonal: ${minSecondaryDiagonalSum}</p>
`;
    document.getElementById("results").innerHTML = results;
    const transMatrixTable = document.getElementById("trans-matrix");
    let transTableHTML = '<table>';
    transposedMatrix.forEach(row => {
        transTableHTML += '<tr>';
        row.forEach(cell => {
            transTableHTML += `<td>${cell}</td>`;
        });
        transTableHTML += '</tr>';
    });
    transTableHTML += '</table>';
    transMatrixTable.innerHTML = transTableHTML;
}

task4(5, 5);
