package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.service.FirebaseStorageService;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private FirebaseStorageService firebaseStorageService;

    @PostMapping("/saveProduct")
    public ResponseEntity<?> saveProduct(@RequestParam("file") MultipartFile file,
                                         @RequestParam("productName") String productName,
                                         @RequestParam("description") String description,
                                         @RequestParam("price") Long price) throws IOException {
        // Tải lên ảnh vào Firebase Storage
        String imageUrl = firebaseStorageService.uploadFile(file);

        // Tạo đối tượng Product
        Product product = new Product();
        product.setProductName(productName);
        product.setDescription(description);
        product.setPrice(price);
        product.setImage(imageUrl);

        // Lưu sản phẩm vào cơ sở dữ liệu
        productService.saveProduct(product);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllProduct() {
        return new ResponseEntity<>(productService.getAllProduct(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/editProduct/{id}")
    public ResponseEntity<?> editProduct(@RequestBody Product product, @PathVariable Long id,
                                         @RequestParam(value = "file", required = false) MultipartFile file) {
        // Lấy thông tin sản phẩm cần chỉnh sửa từ cơ sở dữ liệu
        Product existingProduct = productService.getProductById(id);

        if (existingProduct == null) {
            return ResponseEntity.notFound().build();
        }

        // Nếu có file ảnh mới được cung cấp, tải lên Firebase Storage và cập nhật URL mới
        if (file != null && !file.isEmpty()) {
            try {
                String imageUrl = firebaseStorageService.uploadFile(file);
                existingProduct.setImage(imageUrl);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
            }
        }

        // Cập nhật thông tin sản phẩm
        existingProduct.setProductName(product.getProductName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());

        // Lưu lại thông tin sản phẩm sau khi chỉnh sửa vào cơ sở dữ liệu
        productService.saveProduct(existingProduct);

        return ResponseEntity.ok(existingProduct);
    }

    @GetMapping("/searchProduct")
    public ResponseEntity<?> searchProductByName(@RequestParam String productName) {
        List<Product> products = productService.searchProductByName(productName);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

}
