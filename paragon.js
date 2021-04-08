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
