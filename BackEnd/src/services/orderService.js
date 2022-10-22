const Order = require('../models/order');
const ValueDefault = require("../shared/constants/valueDefault");

const orderInstance = new Order();

module.exports = {
    takePayment: async function (payload, userId) {
        if (payload) {
            let objectOrder = {
                orderTotalAmount : payload.orderTotalAmount,
                orderDiscountId: payload.orderDiscountId || ValueDefault.OrderDiscountId,
                orderShippingTypeId : payload.orderShippingTypeId || ValueDefault.OrderShippingTypeId,
            }
            let resCreateOrder =  await orderInstance.createOrder(objectOrder);
            
        }
    }
}