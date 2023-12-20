const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: { model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] },
    });

    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET one category by id with associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: { model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] },
    });

    if (!category) {
      return res.status(404).json({ message: 'No category found with this id' });
    }

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({ category_name: req.body.category_name });
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT (update) a category by id
router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Category.update(req.body, { where: { id: req.params.id } });

    if (!updatedRows) {
      return res.status(404).json({ message: 'No category found with this id' });
    }

    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE a category by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({ where: { id: req.params.id } });

    if (!deletedCategory) {
      return res.status(404).json({ message: 'No category found with this id' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
