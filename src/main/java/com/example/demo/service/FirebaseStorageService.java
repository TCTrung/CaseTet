package com.example.demo.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class FirebaseStorageService {
    private static final String BUCKET_NAME = "fir-2c9ce.appspot.com"; // Thay thế bằng tên bucket Firebase Storage của bạn

    public String uploadFile(MultipartFile file) throws IOException {
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.getApplicationDefault())
                .build()
                .getService();

        BlobId blobId = BlobId.of(BUCKET_NAME, file.getOriginalFilename());
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
        Blob blob = storage.create(blobInfo, file.getBytes());

        return blob.getMediaLink();
    }

}
