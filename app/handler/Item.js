const { Item } = require('../../models');

async function getAllItems(req, res) {
    try {
        const items = await Item.findAll({
            attributes: ['id','name', 'price'] // Only select 'name' and 'price' attributes
        });
        return res.json({
            message: "All Items Data",
            data: items
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function createItem(req, res) {
    try {
        const { name, count, price } = req.body;

        if (!name || !count || !price) {
            return res.status(400).json({ error: "Name, count, and price are required" });
        }

        const item = await Item.create({ name, count, price });
        return res.status(201).json({
            message: "New Item Created Successfully",
            item
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function getItemById(req, res) {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id,{
        attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclude timestamps
      });
    if (!item) {
      return res.status(404).json({ 
        Message: 'Failed To Get The Item',
        error: `Item with id: ${id} not found` 
    });
    }
    return res.json({
        message: `item id: ${id}`,
        item
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateItem(req, res) {
    const { id } = req.params;
    const { name, price } = req.body;
  
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }
  
    if (name.trim() === '') {
      return res.status(400).json({ error: "Name cannot be an empty string" });
    }
  
    if (price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }
  
    try {
      const [updated] = await Item.update({ name, price }, {
        where: { id: id }
      });
      if (updated) {
        const updatedItem = await Item.findByPk(id);
        return res.json({
          Message: "Item Successfully Updated",
          updatedItem
        });
      }
      throw new Error(`Item with id: ${id} not found`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
async function deleteItem(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Item.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.send({
        Message: "Item Successfully Deleted"
      });
    }
    throw new Error(`Item with id: ${id} not found`);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};