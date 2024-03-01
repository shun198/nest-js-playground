class Vehicle {
    drive(): void {
        console.log('driving');
    }

    honk(): void {
        console.log('honk');
    }
}

// CarはVehicleを継承する
class Car extends Vehicle {
    drive(): void {
        console.log('car is driving');
    }
}

const vehicle = new Vehicle();
vehicle.drive();
const car = new Car();
car.drive();
car.honk();
