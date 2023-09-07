const DeliveryExecutive = {
    name: "",
    orders: 0,
    deliveryCharge: 0,
    allowance: 0
}

const Booking = {
    bookingId: 0,
    customerId: 0,
    restaurant: '',
    destination: ''
}

class FoodDeliveryBooking {
    deliveryExecutives = []
    bookings = []

    constructor(n) {
        let i;

        for (i = 0; i < n; i++) {
            let deliveryExecutive = DeliveryExecutive

            deliveryExecutive.name = "DE" + (i + 1)

            this.deliveryExecutives.push(deliveryExecutive)
        }
    }

    addBooking(customerId, restaurant, destination, time) {
        let booking = Booking

        booking.bookingId = this.bookings.length + 1
        booking.customerId = customerId
        booking.restaurant = restaurant
        booking.destination = destination

        let date = Date.parse(time)
        console.log(date)
        booking.time = time

        this.bookings.push(booking)
    }

    assignDeliveryExecutive() {
        let i, minDeliveryCharge = Number.MAX_VALUE;

        for (i = 0; i < this.deliveryExecutives.size(); i++) {
            minDeliveryCharge = Math.min(minDeliveryCharge, (this.deliveryExecutives)[i].deliveryCharge);
        }

        for (i = 0; i < this.deliveryExecutives.size(); i++) {
            if ((this.deliveryExecutives)[i].deliveryCharge === minDeliveryCharge)
                break;
        }

        if (2 > 1) {
            (this.deliveryExecutives)[i].deliveryCharge += 50;
            (this.deliveryExecutives)[i].allowance += 10;

        } else (this.deliveryExecutives)[i].deliveryCharge += 5;

        (this.deliveryExecutives)[i].orders += 1;
    }

    deliveryActivity() {

    }
}

console.log("JS Program started")
let foodDeliveryBooking = new FoodDeliveryBooking(5)
foodDeliveryBooking.addBooking(1, 'A', 'D', "9:00 AM")
console.log(foodDeliveryBooking.deliveryExecutives.length)