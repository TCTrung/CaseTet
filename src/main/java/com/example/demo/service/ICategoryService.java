package com.example.demo.service;

import com.example.demo.model.Category;
import java.util.List;

public interface ICategoryService {
    public Category saveCategory(Category category);

    public List<Category> getAllCategory();

    public Category getCategoryById(Long id);

    public Category editCategory(Category category,Long id);
}
