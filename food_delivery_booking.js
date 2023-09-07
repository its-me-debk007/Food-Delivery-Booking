const Booking = {
    bookingId: 0,
    customerId: 0,
    restaurant: '',
    destination: '',
    time: 0,
}

const DeliveryExecutive = {
    name: "",
    orders: 0,
    deliveryCharge: 0,
    allowance: 0,
    bookings: []
}

class FoodDeliveryBooking {
    deliveryExecutives = []

    constructor(n) {
        for (let i = 0; i < n; i++) {
            let deliveryExecutive = {...DeliveryExecutive}

            deliveryExecutive.name = "DE" + (i + 1)

            this.deliveryExecutives.push(deliveryExecutive)
        }
    }

    addBooking(bookingId, customerId, restaurant, destination, time) {
        let booking = Booking

        booking.bookingId = bookingId
        booking.customerId = customerId
        booking.restaurant = restaurant
        booking.destination = destination
        booking.time = time

        return booking
    }

    assignDeliveryExecutive(customerId, restaurant, destination, time) {
        let minDeliveryCharge = Number.MAX_VALUE, deliveryExecutive
        let timeInMillis = Date.parse(`1970-01-01 ${time}`)

        for (deliveryExecutive of this.deliveryExecutives) {
            for (let booking of deliveryExecutive.bookings) {
                if (booking.restaurant === restaurant
                    && booking.destination === destination
                    && timeInMillis - booking.time <= 15 * 60 * 1000
                ) {
                    deliveryExecutive.orders += 1
                    deliveryExecutive.deliveryCharge += 5
                    return
                }
            }
        }

        for (deliveryExecutive of this.deliveryExecutives)
            minDeliveryCharge = Math.min(minDeliveryCharge, deliveryExecutive.deliveryCharge)

        for (deliveryExecutive of this.deliveryExecutives) {
            if (deliveryExecutive.deliveryCharge === minDeliveryCharge) {
                deliveryExecutive.allowance += 10
                deliveryExecutive.orders += 1
                deliveryExecutive.deliveryCharge += 50

                let bookingId = deliveryExecutive.bookings.length + 1
                deliveryExecutive.bookings.push(this.addBooking(bookingId, customerId, restaurant, destination, timeInMillis))
                return
            }
        }
    }

    deliveryActivity(name) {
        for (let deliveryExecutive of this.deliveryExecutives) {
            if (deliveryExecutive.name === name) {
                console.log(deliveryExecutive)
                return
            }
        }
    }
}

console.log("JS Program started")
let foodDeliveryBooking = new FoodDeliveryBooking(5)
// foodDeliveryBooking.assignDeliveryExecutive(1, 'A', 'D', "9:00 AM")
console.log(foodDeliveryBooking.deliveryExecutives)
