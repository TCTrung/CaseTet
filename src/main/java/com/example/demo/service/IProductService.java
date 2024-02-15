package com.example.demo.service;

import com.example.demo.model.Product;

import java.util.List;

public interface IProductService {
    public Product saveProduct(Product product);

    public List<Product> getAllProduct();
    List<Product> searchProductByName(String productName);

    public Product getProductById(Long id);

    public String deleteProduct(Long id);

    public Product editProduct(Product product,Long id);

}
