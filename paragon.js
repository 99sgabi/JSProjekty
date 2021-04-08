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
let itemList = [new Item("paczki", 10, 1.45), new Item("lukier", 12, 5.00)];
let receipt = window.localStorage.getItem("receipt");
if(receipt != null)
{
    window.localStorage.setItem("receipt", itemList);
    receipt = window.localStorage.getItem("receipt");
}

function displayItems(itemList)
{
    let table = document.getElementsByTagName("table")[0];console.log(table)
    for(let i=0; i< itemList.length; i++)
    {
        let newRow =table.insertRow();
        let lp = newRow.insertCell();
        lp.innerHTML = i + 1;
        let name = newRow.insertCell();
        name.innerHTML = itemList[i].name;
        let amout = newRow.insertCell()
        amout.innerHTML = itemList[i].count;
        let price = newRow.insertCell()
        price.innerHTML = itemList[i].price;
        let sum = newRow.insertCell()
        sum.innerHTML = itemList[i].sum();
        console.log(newRow)
    }
}
console.log(itemList)

displayItems(itemList)
