class Vehicle {

    constructor(public color: string) {}

    public drive(): void {
        console.log('driving');
    }

    protected honk(): void {
        console.log('honk');
    }
}

// CarはVehicleを継承する
class Car extends Vehicle {
    constructor(public wheels: number, color: string) {
        // 親クラスのconstructerを呼ぶためにsuper();を呼ぶ必要がある
        super(color);
    }

    drive(): void {
        console.log('car is driving');
        this.startDrivingProcess();
    }

    private startDrivingProcess(): void {
        console.log('This is private');
        this.honk();
    }
}

const vehicle = new Vehicle("orange");
console.log(vehicle.color)
vehicle.drive();
const car = new Car(4,"red");
console.log(car.color)
car.drive();

