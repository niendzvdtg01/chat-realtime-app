function test(b) {
    console.log("lol");
    b();
    return 0
}

const b = () => {
    console.log("Dbrr");
}
console.log(test(b));
