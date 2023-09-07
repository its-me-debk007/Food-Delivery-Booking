const Booking = {
    bookingId: 0,
    customerId: 0,
    restaurant: '',
    destination: '',
    orderTimeInMillis: 0,
    pickUpTimeInMillis: 0,
}

const DeliveryExecutive = {
    name: "",
    deliveryCharge: 0,
    allowance: 0,
    bookings: []
}

class FoodDeliveryBooking {
    deliveryExecutives = []
    totalBookings = 0

    constructor(n) {
        for (let i = 0; i < n; i++) {
            let deliveryExecutive = {...DeliveryExecutive}

            deliveryExecutive.name = "DE" + (i + 1)
            this.deliveryExecutives.push(deliveryExecutive)
        }
    }

    addBooking(bookingId, customerId, restaurant, destination, orderTimeInMillis,
               pickUpTimeInMillis = -1) {
        let booking = {...Booking}

        booking.bookingId = bookingId
        booking.customerId = customerId
        booking.restaurant = restaurant
        booking.destination = destination
        booking.orderTimeInMillis = orderTimeInMillis
        booking.pickUpTimeInMillis = pickUpTimeInMillis === -1? orderTimeInMillis + 15 * 60 * 1000: pickUpTimeInMillis

        return booking
    }

    assignDeliveryExecutive(customerId, restaurant, destination, orderTime) {
        let orderTimeInMillis = Date.parse(`1970-01-01 ${orderTime}`)

        for (let deliveryExecutive of this.deliveryExecutives) {

            let extraOrder = 0
            let previousPickUpTime = -1

            for (let booking of deliveryExecutive.bookings) {
                if (booking.restaurant === restaurant
                    && booking.destination === destination
                    && orderTimeInMillis <= booking.pickUpTimeInMillis
                ) {
                    extraOrder++
                    previousPickUpTime = booking.pickUpTimeInMillis
                }
            }

            if (extraOrder >= 1 && extraOrder < 5) {
                let bookingId = ++this.totalBookings
                this.showSummary(bookingId, deliveryExecutive.name)

                deliveryExecutive.deliveryCharge += 5


                deliveryExecutive.bookings.push(
                    this.addBooking(bookingId, customerId, restaurant, destination, orderTimeInMillis, previousPickUpTime)
                )
                return
            }

            let minDeliveryCharge = this.deliveryExecutives.reduce((min, obj) => Math.min(min, obj.deliveryCharge), Number.MAX_VALUE)
            console.log(`Min is ${minDeliveryCharge}`)

            for (let deliveryExecutive of this.deliveryExecutives) {
                if (deliveryExecutive.deliveryCharge === minDeliveryCharge) {
                    let bookingId = ++this.totalBookings
                    this.showSummary(bookingId, deliveryExecutive.name)

                    deliveryExecutive.allowance += 10
                    deliveryExecutive.deliveryCharge += 50

                    deliveryExecutive.bookings.push(
                        this.addBooking(bookingId, customerId, restaurant, destination, orderTimeInMillis)
                    )
                    return
                }
            }
        }
    }

    showSummary(bookingId, deliveryExecName) {
        console.log(`Booking ID: ${bookingId}`)
        console.log("Available Executives:")
        console.log("Executive\tDelivery Charge Earned")

        for (let deliveryExecutive of this.deliveryExecutives) {
            console.log(`${deliveryExecutive.name}\t\t\t${deliveryExecutive.deliveryCharge}`)
        }

        console.log(`\nAllotted Delivery Executive: ${deliveryExecName}`)
        console.log("-----------------------------------\n")
    }

    displayActivity(deliveryExecName) {
        deliveryExecName = deliveryExecName.toUpperCase()
        let deliveryExecutive = this.deliveryExecutives.find(obj => obj.name === deliveryExecName)

        console.log(`Name: ${deliveryExecutive.name}`)
        console.log(`Allowance: Rs.${deliveryExecutive.allowance}`)
        console.log(`Delivery Charge: Rs.${deliveryExecutive.deliveryCharge}`)
    }
}

let foodDeliveryBooking = new FoodDeliveryBooking(5)

console.log(foodDeliveryBooking.deliveryExecutives)

// foodDeliveryBooking.assignDeliveryExecutive(1, "A", "D", "9:00 AM")
// foodDeliveryBooking.assignDeliveryExecutive(2, "B", "A", "10:00 AM")
// foodDeliveryBooking.assignDeliveryExecutive(3, "B", "A", "10:01 AM")
// foodDeliveryBooking.assignDeliveryExecutive(4, "B", "A", "10:02 AM")
// foodDeliveryBooking.assignDeliveryExecutive(5, "B", "A", "10:03 AM")
// foodDeliveryBooking.assignDeliveryExecutive(6, "B", "A", "10:04 AM")
// foodDeliveryBooking.assignDeliveryExecutive(7, "B", "A", "10:05 AM")
// foodDeliveryBooking.assignDeliveryExecutive(8, "B", "A", "10:06 AM")
// foodDeliveryBooking.assignDeliveryExecutive(9, "B", "A", "10:07 AM")
// foodDeliveryBooking.assignDeliveryExecutive(10, "B", "A", "10:08 AM")
// foodDeliveryBooking.assignDeliveryExecutive(10, "B", "A", "10:09 AM")
// foodDeliveryBooking.assignDeliveryExecutive(11, "B", "A", "10:10 AM")
// foodDeliveryBooking.assignDeliveryExecutive(12, "B", "A", "10:12 AM")
// foodDeliveryBooking.assignDeliveryExecutive(13, "B", "A", "10:13 AM")

foodDeliveryBooking.assignDeliveryExecutive(1, "A", "D", "9:00 AM")
foodDeliveryBooking.assignDeliveryExecutive(2, "B", "A", "10:00 AM")
foodDeliveryBooking.assignDeliveryExecutive(3, "B", "A", "10:01 AM")
foodDeliveryBooking.assignDeliveryExecutive(4, "D", "C", "10:35 AM")


foodDeliveryBooking.displayActivity("DE1")
