// + G -> trzeba zrobic funkcje do walidacji - sprawdzanie czy nie jest pusta + czy nie sa wartosci ujemne
// E -> dodawnie elementów do tabeli
// G -> edycja istniejacych  - sumowanie wszystkich wierszy i zamiana na input; button
// K -> usuwanie elementów - suma jeszcze raz puścić przy zmianie; button
// K -> zmiana kolejności (próba drag & drop), ewentualnie zamiana wierszy 
// E -> css
let receipt = null;
const form = document.getElementById("addingNewElement");
let table = document.getElementsByTagName("table")[0];

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
    sum.innerHTML = itemCount * itemPrice;
    let button = newRow.insertCell()
    button.innerHTML = '<button name="edit">Edytuj</button> <br/> <button name="delete">Usun</button>';
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
    console.log(table.rows.length)
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
        displayItems(receipt);    
    }
}

window.onbeforeunload = function() {
    localStorage["receipt"] = JSON.stringify(receipt);
}

form.onsubmit = (event) => {
    //walidajca
    validateItemData(
        form.name.value, parseFloat(form.count.value), parseFloat(form.price.value))
    

    event.preventDefault();
}
//setTimeout( () => clearTable(), 1000);