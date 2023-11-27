const User = require("../../models/user");
const Order = require("../../models/order.js");
const Boom = require("boom");
const OrderSchema = require("./validations.js");

const Create = async (req, res, next) => {
  const input = req.body;
  input.items = input.items ? JSON.parse(input.items) : null;
  const { error } = OrderSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  const { user_id } = req.payload;

  try {
    const order = new Order({
      user: user_id,
      address: input.address,
      items: input.items,
    });

    const savedData = await order.save();

    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

const List = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password -__v")
      .populate("items");
    res.json(orders);
  } catch (e) {
    next(e);
  }
};

const GetMyOrders = async (req, res, next) => {
  const { user_id } = req.payload;

  try {
    const orders = await Order.find({ user: user_id }).populate("items");

    res.json(orders);
  } catch (e) {
    next(e);
  }
};

const DeleteOrder = async (req, res, next) => {
  const { order_id } = req.params;

  try {
    const deleted = await Order.findByIdAndDelete(order_id);

    if (!deleted) {
      throw Boom.badRequest("Order not found.");
    }

    res.json(deleted);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  Create,
  List,
  GetMyOrders,
  DeleteOrder,
};
