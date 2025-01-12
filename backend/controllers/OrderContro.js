import Order from '../models/Order.js';
import Menu from '../models/Menu.js';
import { orderSchema } from '../validations/OrderValidations.js';
const CreateOrder = async (req, res) => {

    let { items, totalAmount } = orderSchema.parse(req.body);
    if (!items, !totalAmount) {
        return res.status(400).json({ message: "Please provide all the required fields" });
    }

    try {
        for (let item of items) {
            let menuitem = await Menu.findById(item.menuItemId);
            if (!menuitem) {
                return res.status(400).json({ message: "Menu item not found" });
            }
        }

        const NewOrder = await Order.create({
            userId: req.user._id,
            items,
            totalAmount,
        });

        res.status(201).json({
            message: "new order created",
            NewOrder
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}
const GetOrderByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).populate({
            path: "items.menuItemId", // Assuming 'menuItemId' is the reference to the Menu model
            model: "Menu", // Explicitly specify the model to populate
            select: "name price", // Select the fields you want to include from the Menu model
        });

        res.status(200).json({ orders });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

export { CreateOrder, GetOrderByUserId };