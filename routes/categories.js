const express = require('express');
const router = express.Router();
const Category = require('../schemas/category'); // Import model Category

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Không tìm thấy category' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi thêm category', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Không tìm thấy category' });
        }

        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi cập nhật category', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Không tìm thấy category' });
        }
        res.json({ message: 'Category đã được xóa', deletedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
});

module.exports = router;
