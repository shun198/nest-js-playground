let apples: number = 5;
let speed: string = "fast"

// build in object
let now: Date = new Date();

// array
let colors: string[] = ["red", "green", "blue"];
let numbers: number[] = [1,2,3];
let booleans: boolean[] = [true,false,false];

// class
class Car {}

let car: Car = new Car();

// object literal
let point: { x: number, y: number} = {
    x: 10,
    y: 20
};

// Function
const logNumber: (i: number) => void = (i:number) => {
    console.log(i);
} 

// when to use type annotation
// 1) Functions that returns "any" type
const json = `{"x": 10, "y": 20}`;
const coordinates: {x: number, y: number} = JSON.parse(json);
console.log(coordinates);

let words = ["red","green","blue"];
let foundWord = false;

for (let i = 0; i < words.length; i++) {
    if (words[i] === "green") {
        foundWord = true;
    }
}

let num = [-10,-1,12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < num.length; i++) {
    if (num[i] > 0) {
        numberAboveZero = num[i];
    }
}