function test(b) {
    console.log("lol");
    b();
    return 0
}

const b = () => {
    console.log("Dbrr");
}
console.log(test(b));

// const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const d = a.filter(chan => chan % 2 == 0);
// console.log(d);

// const qq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const lol = qq.filter(a => a < 5)
// console.log(lol)