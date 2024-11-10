package com.project.dropbox.controller;

import com.project.dropbox.model.UserFile;
import com.project.dropbox.service.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<UserFile> uploadFile(@RequestParam("file") MultipartFile file) {
        logger.info("upload request for file: {}", file.getOriginalFilename());
        try {
            UserFile uploadedFile = fileService.uploadFile(file);
            return ResponseEntity.ok(uploadedFile);
        } catch (IOException e) {
            logger.error("Error while uploading file: {}", file.getOriginalFilename(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping
    public List<UserFile> listFiles() {
        logger.info("Fetching list of all files.");
        return fileService.listAllFiles();
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<Resource> viewFile(@PathVariable Long id) {
        logger.info("view request for file id: {}", id);
        try {
            Path filePath = fileService.getFile(id)
                    .orElseThrow(() -> new RuntimeException("File not found"));
            Resource resource = new UrlResource(filePath.toUri());

            String contentType;
            try {
                contentType = Files.probeContentType(filePath);
            } catch (IOException e) {
                contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filePath.getFileName().toString() + "\"")
                    .body(resource);
        } catch (Exception e) {
            logger.error("Error while viewing file with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
        logger.info("download request for file id: {}", id);

        try {
            Path filePath = fileService.getFile(id)
                    .orElseThrow(() -> new RuntimeException("File not found"));
            Resource resource = new UrlResource(filePath.toUri());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath.getFileName().toString() + "\"")
                    .body(resource);
        }catch (Exception e){
            logger.error("Error while downloading file with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
