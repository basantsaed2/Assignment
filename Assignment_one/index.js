//A. Part 1: Coding Questions:

//1: Convert the string "123" to a number and add 7.
console.log(Number("123") + 7);

//2: Check if the given variable is falsy and return "Invalid" if it is.
let x = 0;
if (!x) {
    console.log("Invalid");
}

//3: Use for loop to print all numbers between 1 and 10, skipping even numbers using continue
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue;
    }
    console.log(i);
}

//4: Create an array of numbers and return only the even numbers using filter method.
let arr = [1, 2, 3, 4, 5];
let evenNum = arr.filter((num) => num % 2 === 0);
console.log(evenNum);

//5: Use the spread operator to merge two arrays, then return the merged array.
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let mergedArr = [...arr1, ...arr2];
console.log(mergedArr);

//6: Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday).
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = 2;
switch (day) {
    case 1:
        console.log(days[0]);
        break;
    case 2:
        console.log(days[1]);
        break;
    case 3:
        console.log(days[2]);
        break;
    case 4:
        console.log(days[3]);
        break;
    case 5:
        console.log(days[4]);
        break;
    case 6:
        console.log(days[5]);
        break;
    case 7:
        console.log(days[6]);
        break;
    default:
        console.log("Invalid day");
}

//7: Create an array of strings and return their lengths using map method.
let strArr = ["a", "ab", "abc"];
let strLength = strArr.map((str) => str.length);
console.log(strLength);

//8: Write a function that checks if a number is divisible by 3 and 5.
function checkDivisibility(num) {
    if (num % 3 === 0 && num % 5 === 0) {
        console.log("Divisible by both");
    } else {
        console.log("Not Divisible by both");
    }
}
checkDivisibility(15);

//9: Write a function using arrow syntax to return the square of a number.
const square = (num) => num * num;
console.log(square(5));

//10: Write a function that destructures an object to extract values and returns a formatted string.
let person = {
    name: "John",
    age: 25,
};
function formatObject(obj) {
    const { name, age } = obj;
    return `${name} is ${age} years old`;
}
console.log(formatObject(person));

//11: Write a function that accepts multiple parameters (two or more) and returns their sum.
let arrSum = [1, 2, 3, 4, 5];
function sumation(x) {
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    console.log(sum);
}
sumation(arrSum);

//12: Write a function that returns a promise which resolves after 3 seconds with a 'Success' message.
function promiseFunction() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Success");
            reject("Failed");
        }, 3000);
    });
}
promiseFunction().then(
    (x) => console.log(x))
    .catch((error) => console.log(error));


//13: Write a function to find the largest number in an array.
let arrLargest = [1, 2, 7, 3, 4];
function largestNumber(arr) {
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    console.log(max);
}
largestNumber(arrLargest);

//14: Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)
let personKey = {
    name: "John",
    age: 30,
};
function objectKey(obj) {
    return Object.keys(obj);
}
console.log(objectKey(personKey));

//15: Write a function that splits a string into an array of words based on spaces.
function splitString(str) {
    return str.split(" ");
}
console.log(splitString("The quick brown fox"));

//------------------------------------------------------------------------------------------------------
// B. Part 2: Essay Questions:

// 1. What is the difference between forEach and for...of? When would you use each?
// forEach is used with arrays
// can not use break or continue in forEach

// for...of is used with arrays and objects
// for...of can use break or continue in for...of


// 2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.
// Hoisting is the process of moving variable declarations to the top of their containing scope.
// TDZ is the period of time between the start of a block and the declaration of a variable.

// 3. What are the main differences between == and ===?
// == is used to compare values.
// === is used to compare values and types.

// 4. Explain how try-catch works and why it is important in async operations.
// try-catch is used to catch errors and prevent the program from crashing.
// It is important in async operations because it allows the program to continue running even if an error occurs.

// 5. What’s the difference between type conversion and coercion? Provide examples of each.
// Type conversion is the process of converting a value from one type to another.
// Coercion is the process of automatically converting a value from one type to another.


