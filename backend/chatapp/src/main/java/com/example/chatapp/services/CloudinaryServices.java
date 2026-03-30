package com.example.chatapp.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryServices {
    private final Cloudinary cloudinary;

    public CloudinaryServices(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        Map uploadResults = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResults.get("url").toString();

    }
}
