function task1() {
    let body = document.querySelector('body')
    body.style.fontFamily = 'Arial';

    let h1Arr = document.querySelectorAll('h1');

    let styleArr = [
        "color: orange; background-color:yellow; font-size:16px;padding:5px;text-align:center;",
        "color: blue; background-color:skyBlue; font-size:14px;padding:5px;text-align:right;",
        "color: red; background-color:#FFCCCB; font-size:12px;padding:5px;text-align:left;",

    ]

    for (let i = 0; i < styleArr.length; i++) {
        h1Arr[i].style = styleArr[i]
    }

    // for (let [h1ArrIndex,h1ArrElement] of [h1Arr].entries()) {
    //     console.log(h1ArrIndex, h1ArrElement)
    //
    //     switch (h1ArrIndex){
    //         case 0:
    //             break
    //     }
    //
    // }
}

function task2() {
    let table = document.querySelector('table');
    let rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
            if ((i + j) % 2 === 0) {
                cells[j].classList.add('selected');
            }
        }
    }
}

function task3() {

    let text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ea earum incidunt minima nihil. Blanditiis consectetur cumque debitis delectus dolor dolorem dolorum, eos laboriosam, modi nemo, quasi quos sint voluptatibus!`;
    let newText = text[12] + text[6] + text[18] + text[25];
    console.log(newText)
    console.log(text.toLowerCase())

    console.log(text.split(' '));

    function getIndices(searchStr, str) {
        let searchStrLen = searchStr.length;
        if (searchStrLen === 0) {
            return [];
        }
        let startIndex = 0, index, indices = [];
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }


    console.log(getIndices('in', text));

}


task1()
task2()
task3()

function ucFirst(txt) {
    let newTxt = txt.replace(txt[0], txt[0].toUpperCase())
    return newTxt;
}

console.log(ucFirst("some text"));