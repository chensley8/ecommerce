const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags with associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: { model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] },
    });

    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET one tag by id with associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] },
    });

    if (!tag) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }

    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({ tag_name: req.body.tag_name });
    res.json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT (update) a tag by id
router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Tag.update({ tag_name: req.body.tag_name }, { where: { id: req.params.id } });

    if (!updatedRows) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }

    res.json({ message: 'Tag updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE a tag by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({ where: { id: req.params.id } });

    if (!deletedTag) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }

    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
