// + G -> trzeba zrobic funkcje do walidacji - sprawdzanie czy nie jest pusta + czy nie sa wartosci ujemne
// E -> sumowanie wszystkich wierszy i dodawnie elementów do tabeli
// + (ewentualnie do poprawy) G -> edycja istniejacych  -  zamiana na input; button
// K -> usuwanie elementów - suma jeszcze raz puścić przy zmianie; button
// K -> zmiana kolejności (próba drag & drop), ewentualnie zamiana wierszy 
// E -> css
let receipt = null;
const form = document.getElementById("addingNewElement");
let table = document.getElementsByTagName("table")[0];
let div = document.getElementById("container");
const inputs = ['<input name="nameEdit" id="nameEdit" type="text"></input>',
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
        
    if(count <= 0 || price <= 0)
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
    console.log("SUMA = "+ sum);
    document.getElementById("receipt_sum").innerHTML = sum;
}

function createNewRowInTable(itemLp, itemName, itemCount, itemPrice)
{
    console.log(table)
    let newRow =table.insertRow(itemLp);
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

document.body.onload = function() {
    if(localStorage["receipt"] != null)
    {
        receipt = JSON.parse(
            window.localStorage.getItem("receipt"))
        if(receipt != null) displayItems(receipt);    
        else receipt = []
    }
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

//musiałam dodać tu if (bez żadnych danych w local storage wyrzucało mi tu błąd)
if(div != null)
div.addEventListener("click", function(event){
    if(event.target.className == "edit"  && event.target.dataset.editing == 'false')
    {
        if(editingOneAtATime) return false;
        else
        {
            editingOneAtATime = !editingOneAtATime;
        }
        let rowNumber = parseInt(event.target.dataset.rowNumber)
        localStorage["orginalRow"] = table.rows[rowNumber].outerHTML;
        for(let i = 1; i <= 4 ; i++)
            table.rows[rowNumber].cells[i].innerHTML = inputs[i - 1];
        
        event.target.dataset.editing = 'true';
        return false;
    }
    else if(event.target.className == "edit" && event.target.dataset.editing == 'true')
    {
        let rowNumber = parseInt(event.target.dataset.rowNumber)
        let name = document.getElementById("nameEdit").value
        let count = parseFloat(document.getElementById("countEdit").value)
        let price = parseFloat(document.getElementById("priceEdit").value)
        if(validateItemData(name, count, price))
        {
            table.rows[rowNumber].cells[1].innerHTML = name;
            table.rows[rowNumber].cells[2].innerHTML = count;
            table.rows[rowNumber].cells[3].innerHTML = price;
            table.rows[rowNumber].cells[4].innerHTML = (price * count).toFixed(2);
        }
        
        event.target.dataset.editing = 'false';
        editingOneAtATime = !editingOneAtATime
        sumTableElements();
        return false;
    }
})
//setTimeout( () => clearTable(), 1000);