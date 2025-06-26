const { secret } = require("../config/secret");
const stripe = require("stripe")(secret.stripe_key);
const Order = require("../model/Order");
const nodemailer = require("nodemailer");

// create-payment-intent
exports.paymentIntent = async (req, res, next) => {
  try {
    const product = req.body;
    const price = Number(product.price);
    const amount = price * 100;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    next(error)

  }
};
// addOrder
exports.addOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    // console.log("Order created:", orderItems);

    // Build email HTML
    const html = `
            <h2>🛒 New Order Received</h2>
            <p><strong>Invoice:</strong> #${order.invoice}</p>
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Contact:</strong> ${order.contact}</p>
            <p><strong>Address:</strong> ${order.address}, ${order.city}, ${order.country}, ${order.zipCode}</p>

            <h3>🛍️ Cart Items:</h3>
            <ul style="list-style: none; padding: 0;">
              ${order.cart.map(item => `
                <li style="margin-bottom: 20px;">
                  <img src="${item.img}" alt="${item.title}" width="100" style="display: block; margin-bottom: 5px;" />
                  <strong>${item.title}</strong><br/>
                  <span>Quantity: ${item.orderQuantity}</span><br/>
                  <span>Price: ${item.price} PKR</span><br/>
                  <span>Subtotal: ${item.price * item.orderQuantity} PKR</span>
                </li>
              `).join("")}
            </ul>

            <h3>🧾 Order Summary:</h3>
            <p><strong>Total:</strong> ${order.totalAmount} PKR</p>

            <p><em>Status: ${order.status}</em></p>
            <p><em>Order Date: ${new Date(order.createdAt).toLocaleString()}</em></p>
`;


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "silentvisagee@gmail.com",
        pass: process.env.EMAIL_PASS || "sgpv ceit nqjx cgxs",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ghalib6700@gmail.com",
      subject: "🛒 New Order Placed",
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.status(200).json({
      success: true,
      message: "Order added successfully",
      order: order,
    });
  } catch (error) {
    console.error("Email error:", error);
    next(error);
  }

};

// get Orders
exports.getOrders = async (req, res, next) => {
  try {
    console.log("hey");

    // Fetch all orders from the database
    const orderItems = await Order.find({});

    // Send response with data
    res.status(200).json({
      success: true,
      data: orderItems,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get Orders
exports.getSingleOrder = async (req, res, next) => {
  try {
    const orderItem = await Order.findById(req.params.id).populate('user');
    res.status(200).json(orderItem);
  }
  catch (error) {
    console.log(error);
    next(error)
  }
};

exports.updateOrderStatus = async (req, res) => {
  const newStatus = req.body.status;

  try {
    const result = await Order.updateOne(
      { _id: req.params.id },
      { $set: { status: newStatus } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating status',
      error: error.message,
    });
  }
};

exports.deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.deleteAllOrders = async (req, res) => {
  const { orderIds } = req.body;

  if (!Array.isArray(orderIds) || orderIds.length === 0) {
    return res.status(400).json({ message: "No orders selected for deletion." });
  }

  try {
    const result = await Order.deleteMany({ _id: { $in: orderIds } });
    res.status(200).json({ message: "Orders deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error deleting orders:", error);
    res.status(500).json({ message: "Error deleting orders", error });
  }
}
