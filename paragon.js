// G -> trzeba zrobic funkcje do walidacji - sprawdzanie czy nie jest pusta + czy nie sa wartosci ujemne
// E -> dodawnie elementów do tabeli
// G -> edycja istniejacych  - sumowanie wszystkich wierszy i zamiana na input; button
// K -> usuwanie elementów - suma jeszcze raz puścić przy zmianie; button
// K -> zmiana kolejności (próba drag & drop), ewentualnie zamiana wierszy 
// E -> css
let receipt = null;
let table = document.getElementsByTagName("table")[0];

class Item{
    constructor(name, count, price)
    {
        this.update(name,count,price)
    }

    sum()
    {
        return (this.count)*(this.price);
    }

    update(name, count, price)
    {
        this.price = price;
        this.name = name;
        this.count = count;
    }
}

function displayItems(itemList)
{
    for(let i=0; i< itemList.length; i++)
    {
        let newRow =table.insertRow(i + 1);
        let lp = newRow.insertCell();
        lp.innerHTML = i + 1;
        let name = newRow.insertCell();
        name.innerHTML = itemList[i].name;
        let amout = newRow.insertCell()
        amout.innerHTML = itemList[i].count;
        let price = newRow.insertCell()
        price.innerHTML = itemList[i].price;
        let sum = newRow.insertCell()
        sum.innerHTML = itemList[i].count * itemList[i].price;
    }
    console.log(table.rows.length)
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

/*let form = document.getElementById("addingNewElement");
form.onsubmit((event) => {

})*/
setTimeout( () => clearTable(), 1000);