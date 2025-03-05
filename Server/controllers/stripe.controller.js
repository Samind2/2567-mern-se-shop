const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");

exports.createCheckOutSession = async (req, res) => {
  const cartItems = req.body.cart;
  const products = cartItems.map((item) => {
    return {
      productId: item.productId,
      quantity: item.quantity,
    };
  });
  //customer info
  const customer = await stripe.customers.create({
    metadata: {
      email: req.body.email.toString(),
      cart: JSON.stringify(products),
    },
  });

  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: "thb",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.name,
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.price * 100, // THB to cent
      },
      quantity: item.quantity, // Quantity of the item
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "promptpay"], // Add payment method types
    shipping_address_collection: {
      allowed_countries: ["TH"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "thb",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        }, // Replace with your shipping rate
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 4500,
            currency: "thb",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        }, // Replace with your shipping rate
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items, // Pass the line items created.
    customer: customer.id, // Pass the customer ID created.
    mode: "payment",
    success_url: `${process.env.BASE_URL}/checkout-success`,
    cancel_url: `${process.env.BASE_URL}/cart`,
  });
  console.log(session);

  res.send({ url: session.url });
};

const clearCart = async (email) => {
  try {
    await CartModel.deleteMany({ email }); // Delete all cart items for the user
    console.log("Cart Cleared successfully");   
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while clearing cart",
    });
  }
}
const createOrder = async (customer, data) => {
  const products = JSON.parse(customer.metadata.cart); // แปลงsting เป็น Object
  console.log("Products", products);
  try {
    const newOrder = await OrderModel.create({
      email: customer.metadata.email,
      customerId: data.customer,
      products,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    }); // สร้าง Order ใหม่
    if (newOrder) {
      console.log("Order created successfully");
      
      await clearCart(customer.metadata.email); // ลบสินค้าในตะกร้า
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while creating creating new order",
    });
  }
};

exports.webhook = async (req, res) => {
  console.log("Webhook is called!");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Add your endpoint secret here
  console.log(endpointSecret);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send({ message: `Webhook Error: ${err.message}` });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      console.log("Payment received!");
      let data = event.data.object;
      //retrieve = ดึงข้อมูล
      stripe.customers.retrieve(data.customer).then(async (customer) => {
        try {
          await createOrder(customer, data);
        } catch (error) {
          res.status(500).send({ message: `Webhook Error: ${err.message}` });
        }
      });
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).end();
};
