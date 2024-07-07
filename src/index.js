function blackFriday(amounnt) {
    return amounnt * 0.8;
}

const funcPrice = {
    blackFriday,
};

const getPrice = (amount, name) => {
    return funcPrice[name](amount);
};

const price = getPrice(200, 'blackFriday');
console.log(price);
