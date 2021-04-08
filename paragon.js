class Item{
    constructor(name, count, price)
    {
        this.update(name,count,price)
    }

    sum()
    {
        return this.count*this.sum;
    }

    update(name, count, price)
    {
        this.price = price;
        this.name = name;
        this.count = count;
    }
}

let receipt = window.localStorage.getItem("receipt");
let table = document.getElementsByTagName("table");
if(receipt != null)
{
    window.localStorage.setItem("receipt", []);
    receipt = window.localStorage.getItem("receipt");
}
