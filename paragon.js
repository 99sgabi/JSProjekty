//Ewa Nowosada, Konrad Olender, Gabriela Sawicka 
let receipt = null;
const form = document.getElementById("addingNewElement");
let table = document.getElementsByTagName("table")[0];
let div = document.getElementById("container");
const inputs = ['------',
                '<input name="nameEdit" id="nameEdit" type="text"></input>',
                '<input name="countEdit" id="countEdit" type="number" step="0.1">',
                '<input name="priceEdit" id="priceEdit" type="number" step="0.01">',
                '------']
let editingOneAtATime = false

class Item{
    constructor(name, count, price)
    {
        this.update(name,count,price)
    }

    update(name, count, price)
    {
        this.price = price;
        this.name = name;
        this.count = count;
    }
}

function validateItemData(name, count, price)
{
    if(name == null || name == "")
    {
        alert("Nalezy podac nazwe produktu, nie moze byc pusta!")
        return false;
    }
        
    if(count <= 0 || price <= 0 || isNaN(count) || isNaN(price))
    {
        alert("Cena, jak i ilosc musza byc liczbami dodatnimi")
        return false;
    }
     
    return true;
}

function sumTableElements()
{
    let sum = 0.0;
    for(let i=0; i<receipt.length; i++)
    {
        sum += parseFloat((receipt[i].count * receipt[i].price).toFixed(2));
    }
    document.getElementById("receipt_sum").innerHTML = sum.toFixed(2);
}

function createNewRowInTable(itemLp, itemName, itemCount, itemPrice)
{
    let newRow =table.insertRow(itemLp);
    let buttons = newRow.insertCell();
    buttons.innerHTML = `<button data-editing="${false}" data-row-number="${itemLp}" class="up">▲</button> <br/> <button data-row-number="${itemLp}" class="down">▼</button>`;
    let lp = newRow.insertCell();
    lp.innerHTML = itemLp;
    let name = newRow.insertCell();
    name.innerHTML = itemName;
    let amout = newRow.insertCell()
    amout.innerHTML = itemCount;
    let price = newRow.insertCell()
    price.innerHTML = itemPrice;
    let sum = newRow.insertCell()
    sum.innerHTML = (itemCount * itemPrice).toFixed(2);
    let button = newRow.insertCell()
    button.innerHTML = `<button data-editing="${false}" data-row-number="${itemLp}" class="edit">Edytuj</button> <br/> <button data-row-number="${itemLp}" class="delete">Usun</button>`;
}

function displayItems(itemList)
{
    for(let i=0; i< itemList.length; i++)
    {
        createNewRowInTable(i+1, itemList[i].name, itemList[i].count, itemList[i].price)
    }
    sumTableElements();
}

function clearTable()
{
    for(let i = table.rows.length - 2; i > 0 ; i--)
    {
        table.deleteRow(i);
    }
}

function display(){
    if(localStorage["receipt"] != null)
    {
        receipt = JSON.parse(
            window.localStorage.getItem("receipt"))
        if(receipt != null) displayItems(receipt);    
        else 
            receipt = [];
        tableColors();
    }
}

function deleteItem(itemLp){
    receipt.splice(itemLp - 1,1);
    table.deleteRow(itemLp);
    sumTableElements();
    localStorage["receipt"] = JSON.stringify(receipt);
    clearTable();
        display();
}

function moveUp(i){
    if(i > 1){
        console.log('move ' + i + ' to ' + (i-1))
        let placeholder = receipt[i-1];
        receipt[i-1] = receipt[i-2];
        receipt[i-2] = placeholder;
        localStorage["receipt"] = JSON.stringify(receipt);
        clearTable();
        display();
    }
}
function moveDown(i){
    if(i < receipt.length){
        console.log('move ' + i + ' to ' + (i+1))
        let placeholder = receipt[i-1];
        receipt[i-1] = receipt[i];
        receipt[i] = placeholder;
        localStorage["receipt"] = JSON.stringify(receipt);
        clearTable();
        display();
    }
}

document.body.onload = function() {
    display()
}

window.onbeforeunload = function() {
    localStorage["receipt"] = JSON.stringify(receipt);
}

form.onsubmit = (event) => {
    //walidajca
    if(validateItemData(
        form.name.value, parseFloat(form.count.value), parseFloat(form.price.value)))
        {
            let item = new Item(form.name.value, parseFloat(form.count.value), parseFloat(form.price.value))
            receipt.push(item)
            localStorage["receipt"] = JSON.stringify(receipt);
            createNewRowInTable(this.table.length+1, item.name, item.count, item.name)
            sumTableElements()
        }

    event.preventDefault();
}

div.addEventListener("click", function(event){
    if(event.target.className == "edit"  && event.target.dataset.editing == 'false')
    {
        if(editingOneAtATime) return false;
        else
        {
            editingOneAtATime = !editingOneAtATime;
        }
        let rowNumber = parseInt(event.target.dataset.rowNumber);
        for(let i = 2; i <= 5 ; i++)
            table.rows[rowNumber].cells[i].innerHTML = inputs[i - 1];

        document.getElementById("nameEdit").value = receipt[rowNumber  - 1].name   
        document.getElementById("countEdit").value = receipt[rowNumber - 1].count
        document.getElementById("priceEdit").value = receipt[rowNumber - 1].price
        
        event.target.dataset.editing = 'true';
    }
    else if(event.target.className == "edit" && event.target.dataset.editing == 'true')
    {
        let rowNumber = parseInt(event.target.dataset.rowNumber)
        let name = document.getElementById("nameEdit").value
        let count = parseFloat(document.getElementById("countEdit").value)
        let price = parseFloat(document.getElementById("priceEdit").value)
        if(validateItemData(name, count, price))
        {
            table.rows[rowNumber].cells[2].innerHTML = name;
            table.rows[rowNumber].cells[3].innerHTML = count;
            table.rows[rowNumber].cells[4].innerHTML = price;
            table.rows[rowNumber].cells[5].innerHTML = (price * count).toFixed(2);
            receipt[rowNumber - 1].name = name;
            receipt[rowNumber - 1].price = price;
            receipt[rowNumber - 1].count = count;
            event.target.dataset.editing = 'false';
            editingOneAtATime = !editingOneAtATime
            sumTableElements();
        }
        
    }
    else if(event.target.className=="delete" && !editingOneAtATime){
        let rowNumber = parseInt(event.target.dataset.rowNumber)
        deleteItem(rowNumber)
    }
    else if(event.target.className=="up" && !editingOneAtATime){
        let rowNumber = parseInt(event.target.dataset.rowNumber)
        moveUp(rowNumber);
    }
    else if(event.target.className=="down" && !editingOneAtATime){
        let rowNumber = parseInt(event.target.dataset.rowNumber)
        moveDown(rowNumber);
    }
    return false;
})
//kolory w tabeli
function tableColors(){
    let n = table.rows.length;
    for(let i=1;i<n-1;i++){
        if(i%2==0) table.rows[i].className="tabColorDarker";
        else  table.rows[i].className="tabColorLight";
    }
}