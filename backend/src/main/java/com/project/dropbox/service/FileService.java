package com.project.dropbox.service;

import com.project.dropbox.model.UserFile;
import com.project.dropbox.repo.UserFileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final UserFileRepository fileRepository;

    public FileService(UserFileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public UserFile uploadFile(MultipartFile file) throws IOException {
        Path filePath = Path.of(uploadDir, file.getOriginalFilename());
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        UserFile userFile = new UserFile();
        userFile.setName(file.getOriginalFilename());
        userFile.setPath(filePath.toString());
        userFile.setSize(file.getSize());

        return fileRepository.save(userFile);
    }

    public List<UserFile> listAllFiles() {
        return fileRepository.findAll();
    }

    public Optional<Path> getFile(Long id) {
        return fileRepository.findById(id).map(userFile -> Path.of(userFile.getPath()));
    }
}
