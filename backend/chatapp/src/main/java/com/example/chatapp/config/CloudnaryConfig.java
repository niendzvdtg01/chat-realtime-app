package com.example.chatapp.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.example.chatapp.Properties.CloudinaryProperties;

@Configuration
@ConfigurationProperties(prefix = "cloudinary")
public class CloudnaryConfig {
    private final CloudinaryProperties props;

    public CloudnaryConfig(CloudinaryProperties props) {
        this.props = props;
    }

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", props.getCloudName());
        config.put("api_key", props.getApiKey());
        config.put("api_secret", props.getApiSecret());
        return new Cloudinary(config);
    }
}