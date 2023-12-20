const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET all products with associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: ProductTag, as: 'tags' },
      ],
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET one product by id with associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: ProductTag, as: 'tags' },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'No product found with this id' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT (update) a product by id
router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Product.update(req.body, { where: { id: req.params.id } });

    if (!updatedRows) {
      return res.status(404).json({ message: 'No product found with this id' });
    }

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE a product by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({ where: { id: req.params.id } });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'No product found with this id' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
