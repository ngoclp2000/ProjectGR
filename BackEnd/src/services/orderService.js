const OrderRepo = require('../repos/orderRepo');
const ValueDefault = require("../shared/constants/valueDefault");

const orderRepo = new OrderRepo();

module.exports = {
    takePayment: async function (payload, userId) {
        if (payload) {
            let objectOrder = {
                orderTotalAmount : payload.orderTotalAmount,
                orderDiscountId: payload.orderDiscountId || ValueDefault.OrderDiscountId,
                orderShippingTypeId : payload.orderShippingTypeId || ValueDefault.OrderShippingTypeId,
            }
            let resCreateOrder =  await orderRepo.createOrder(objectOrder);
        }
    }
}