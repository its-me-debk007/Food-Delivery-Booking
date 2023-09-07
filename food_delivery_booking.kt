import java.text.SimpleDateFormat
import java.util.*

data class Booking(
    val bookingId: Int = 0,
    val customerId: Int = 0,
    val restaurant: String = "",
    val destination: String = "",
    val orderTimeInMillis: Long = 0,
    val pickUpTimeInMillis: Long = 0,
)

data class DeliveryExecutive(
    val name: String,
    var deliveryCharge: Int = 0,
    var allowance: Int = 0,
    val bookings: MutableList<Booking> = mutableListOf()
)

class FoodDeliveryBooking(n: Int) {
    private val deliveryExecutives = mutableListOf<DeliveryExecutive>()
    private var totalBookings = 0

    init {
        for (i in 0 until n) {
            val deliveryExecutive = DeliveryExecutive(name = "DE" + (i + 1))
            deliveryExecutives.add(deliveryExecutive)
        }
    }

    fun assignDeliveryExecutive(customerId: Int, restaurant: String, destination: String, orderTime: String) {
        val sdf = SimpleDateFormat("hh:mm a", Locale.ENGLISH)
        val orderTimeInMillis = sdf.parse(orderTime).time

        for (deliveryExecutive in deliveryExecutives) {

            var extraOrder = 0
            var previousPickUpTime = -1L

            for (booking in deliveryExecutive.bookings) {
                if (booking.restaurant === restaurant
                    && booking.destination === destination
                    && orderTimeInMillis <= booking.pickUpTimeInMillis
                ) {
                    extraOrder++
                    previousPickUpTime = booking.pickUpTimeInMillis
                }
            }

            if (extraOrder in 1 until 5) {
                val bookingId = ++totalBookings
                showSummary(bookingId, deliveryExecutive.name)

                deliveryExecutive.deliveryCharge += 5


                deliveryExecutive.bookings.add(
                    addBooking(bookingId, customerId, restaurant, destination, orderTimeInMillis, previousPickUpTime)
                )
                return
            }
        }

//        for (deliveryExecutive in deliveryExecutives) minDeliveryCharge =
//            min(minDeliveryCharge, deliveryExecutive.deliveryCharge)

        val minDeliveryCharge = deliveryExecutives.minBy { it.deliveryCharge }.deliveryCharge

        for (deliveryExecutive in deliveryExecutives) {
            if (deliveryExecutive.deliveryCharge == minDeliveryCharge) {
                val bookingId = ++totalBookings
                showSummary(bookingId, deliveryExecutive.name)

                deliveryExecutive.allowance += 10
                deliveryExecutive.deliveryCharge += 50

                deliveryExecutive.bookings.add(
                    addBooking(bookingId, customerId, restaurant, destination, orderTimeInMillis)
                )
                return
            }
        }
    }

    private fun addBooking(
        bookingId: Int,
        customerId: Int,
        restaurant: String,
        destination: String,
        orderTimeInMillis: Long,
        pickUpTimeInMillis: Long = -1
    ): Booking {

        val pickUpTime = if (pickUpTimeInMillis == -1L) orderTimeInMillis + 15 * 60 * 1000 else pickUpTimeInMillis
        return Booking(bookingId, customerId, restaurant, destination, orderTimeInMillis, pickUpTime)
    }

    private fun showSummary(bookingId: Int, deliveryExecName: String) {
        println("Booking ID: $bookingId")
        println("Available Executives:")
        println("Executive\tDelivery Charge Earned")

        deliveryExecutives.forEach {
            println("${it.name}\t\t\t${it.deliveryCharge}")
        }

        println("\nAllotted Delivery Executive: $deliveryExecName")
        println("-----------------------------------\n")
    }

    fun displayActivity(name: String) {
        val deliveryExecName = name.uppercase()

        deliveryExecutives.find { it.name == deliveryExecName }?.let {
            println("Name: ${it.name}")
            println("Allowance: Rs.${it.allowance}")
            println("Delivery Charge: Rs.${it.deliveryCharge}")
        }
    }
}

fun main() {
    val foodDeliveryBooking = FoodDeliveryBooking(2)

    foodDeliveryBooking.assignDeliveryExecutive(1, "A", "D", "9:00 AM")
    foodDeliveryBooking.assignDeliveryExecutive(2, "B", "A", "10:00 AM")
    foodDeliveryBooking.assignDeliveryExecutive(3, "B", "A", "10:01 AM")
    foodDeliveryBooking.assignDeliveryExecutive(4, "B", "A", "10:02 AM")
    foodDeliveryBooking.assignDeliveryExecutive(5, "B", "A", "10:03 AM")
    foodDeliveryBooking.assignDeliveryExecutive(6, "B", "A", "10:04 AM")
    foodDeliveryBooking.assignDeliveryExecutive(7, "B", "A", "10:05 AM")
    foodDeliveryBooking.assignDeliveryExecutive(8, "B", "A", "10:06 AM")
    foodDeliveryBooking.assignDeliveryExecutive(9, "B", "A", "10:07 AM")
    foodDeliveryBooking.assignDeliveryExecutive(10, "B", "A", "10:08 AM")
    foodDeliveryBooking.assignDeliveryExecutive(10, "B", "A", "10:09 AM")
    foodDeliveryBooking.assignDeliveryExecutive(11, "B", "A", "10:10 AM")
    foodDeliveryBooking.assignDeliveryExecutive(12, "B", "A", "10:12 AM")
    foodDeliveryBooking.assignDeliveryExecutive(13, "B", "A", "10:13 AM")

    foodDeliveryBooking.displayActivity("DE1")

//    for (deliveryExecutive in foodDeliveryBooking.deliveryExecutives) {
//        println(deliveryExecutive.name)
//        println(deliveryExecutive.allowance)
//        println(deliveryExecutive.deliveryCharge)
//
//        deliveryExecutive.bookings.forEach {
//            println(it)
//        }
//        println('\n')
//    }
}