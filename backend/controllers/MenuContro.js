import Menu from '../models/Menu.js'
import { menuSchema } from '../validations/MenuValidations.js'
const GetAllMenu = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const CreateNewMenuItem = async (req, res) => {

    const { name, price, category, available, ImageUrl } = menuSchema.parse(req.body);
    if (!name || !price || !category || available === undefined) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
        const NewMenu = await Menu.create({ name, price, category, available, userId: req.user._id, ImageUrl });
        res.status(201).json(NewMenu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


const GetMenuById = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Please provide a valid id' });
    }
    try {
        const menu = await Menu.findById(id);
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const UpdateMenu = async (req, res) => {
    const { name, price, category, available } = menuSchema.parse(req.body);
    let id = req.params.id;
    let userId = req.user._id;
    if (!id) {
        return res.status(400).json({ message: 'Please provide a valid id' });
    }

    try {
        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        if (!name || !price || !category || available === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (userId.toString() !== menu.userId.toString()) {
            return res.status(403).json({ message: 'You do not have permission to update this menu item' });
        }

        const updatedMenu = await Menu.findByIdAndUpdate(id, { name, price, category, available, userId }, { new: true });

        res.status(200).json({ message: 'Menu updated successfully', updatedMenu });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const DeleteMenu = async (req, res) => {
    let id = req.params.id;
    let userId = req.user._id;
    const menu = await Menu.findById(id);
    if (!id) {
        return res.status(400).json({ message: 'Please provide a valid id' });
    }
    if (userId.toString() !== menu.userId.toString()) {
        return res.status(403).json({ message: 'You do not have permission to update this menu item' });
    }
    try {
        const menu = await Menu.findByIdAndDelete(id);
        res.json({ message: 'Menu deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const SearchItem = async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Title not received from params",
        });
    }

    try {
        const items = await Menu.find({
            name: { $regex: String(name), $options: 'i' },
        }).select("name price category available ImageUrl");

        if (items.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No item found",
            });
        }

        return res.status(200).json({
            success: true,
            items,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Error occurred: ${err.message}`,
        });
    }
};


export { GetAllMenu, CreateNewMenuItem, GetMenuById, UpdateMenu, DeleteMenu, SearchItem };