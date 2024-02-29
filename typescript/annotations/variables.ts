let apples:number = 5;
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
