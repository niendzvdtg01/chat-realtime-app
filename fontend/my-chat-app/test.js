function test(b) {
    if (typeof b === 'function') { // Check if b is a function
        b(); // Call function b if it exists
    }
    return 0;
}

console.log(test); // Log the function itself, not calling it

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const d = a.filter(chan => chan % 2 == 0);
console.log(d);

const qq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Change the filter to only get values greater than 5
const lol = qq.filter(a => a > 5);
console.log(lol);

test(() => { }); // Pass an empty function to test
function deQuy(mang) {
    if (mang.length > 0) {
        mang.pop();
        return deQuy(mang);
    } else {
        return mang;
    }
}

const t = lol.slice(); // Create a copy of lol
if (t) {
    t.push(99);
}

console.log(t);

console.log(Math.max(...a));
const a1 = [1, 2, 3, 4, 5, 6];
const b1 = [...a1];
console.log(b1);
console.log(a1);

const b = () => {
    console.log("Dbrr");
};
console.log(test(b)); // Call the function if it exists
console.log(d);
// Change the filter to only get values greater than 5

test(() => { }); // Pass an empty function to test
if (t) {
    t.push(99);
}

console.log(t);

console.log(Math.max(...a));
b1.pop(); // Remove one element from b1
console.log(b1);
console.log(a1);
console.log("Dbrr");
console.log(test(b)); // Call the function if it exists
