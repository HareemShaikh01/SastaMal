const express = require("express");
const {
  paymentIntent,
  addOrder,
  getOrders,
  updateOrderStatus,
  getSingleOrder,
  deleteOrderById,
  deleteAllOrders,
} = require("../controller/order.controller");

// router
const router = express.Router();

// get orders
router.get("/get-orders", getOrders);
// single order
router.get("/:id", getSingleOrder);
// add a create payment intent
router.post("/create-payment-intent", paymentIntent);
// save Order
router.post("/saveOrder", addOrder);
// update status
router.put("/update-status/:id", updateOrderStatus);

router.delete('/bulk-delete', deleteAllOrders);

router.delete('/delete/:id', deleteOrderById);

module.exports = router;
