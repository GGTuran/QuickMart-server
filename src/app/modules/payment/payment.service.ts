/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from "path";
// import { Rental } from "../rental/rental.model";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import { User } from "../user/user.model";
import { Order } from "../order/order.model";


const PaymentIntoDB = async (transactionId: string, userId: string) => {
    const verifyResponse = await verifyPayment(transactionId);
    // console.log(verifyResponse);

    let message = "";

    let result;

    // await Order.find({ userId })


    // console.log(verifyResponse, 'amount')

    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        result = await Order.findOneAndUpdate({ userId }, { paymentStatus: "paid" }, { new: true })
        //  await User.findByIdAndUpdate(userId, { isPaid: true }, { new: true })
        message = "Successfully Paid!"

    }


    else {
        message = "Payment Failed!"
    }

    const filePath = join(__dirname, '../../../../confirmation.html');
    let template = readFileSync(filePath, 'utf-8')

    template = template.replace('{{message}}', message)


    return template;
}

export const PaymentServices = {
    PaymentIntoDB,
}