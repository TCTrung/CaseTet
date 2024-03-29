package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService{
    @Autowired
    private ProductRepository productRepo;

    @Override
    public Product saveProduct(Product product) {

        return productRepo.save(product);
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepo.findAll();
    }

    @Override
    public List<Product> searchProductByName(String productName) {
        return productRepo.findByProductNameContainingIgnoreCase(productName);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepo.findById(id).get();
    }

    @Override
    public String deleteProduct(Long id) {
        Product product = productRepo.findById(id).get();

        if (product != null) {
            productRepo.delete(product);
            return "Product Delete Sucessfully";
        }

        return "Something wrong on server";
    }

    @Override
    public Product editProduct(Product p, Long id) {

        Product oldProduct = productRepo.findById(id).get();

        oldProduct.setProductName(p.getProductName());
        oldProduct.setDescription(p.getDescription());
        oldProduct.setPrice(p.getPrice());
        oldProduct.setCategory(p.getCategory());

        return productRepo.save(oldProduct);
    }
}
