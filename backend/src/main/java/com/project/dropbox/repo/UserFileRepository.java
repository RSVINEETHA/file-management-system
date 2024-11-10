package com.project.dropbox.repo;

import com.project.dropbox.model.UserFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFileRepository extends JpaRepository<UserFile, Long> {
}
