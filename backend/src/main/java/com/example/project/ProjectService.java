package com.example.project;

import java.util.Optional;

import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
    // public List<Project> getAllProjects() {
    //     return projectRepository.findAll();
    // }
    
    public Project createProject(ProRegRequest request) {
        // Check if project name already exists
        Optional<Project> existing = projectRepository.findByProName(request.getProName());
        if (existing.isPresent()) {
            throw new RuntimeException("Project name already in use!");
        }

        // Create project
        Project newProject = new Project(request.getProName(),
                                         request.getProDesc(),
                                         request.getProType(),
                                         request.getProStatus(),
                                         request.getProStartDate(),
                                         request.getProMembers(),
                                         request.getProEndDate());
                                         
        System.out.println("===== CREATE PROJECT METHOD CALLED =====");
        System.out.println("Creating project: " + newProject.getProName() + ", " + newProject.getProDesc());
        projectRepository.save(newProject);

        return newProject;
       
    }

    public List<Project> getAllProjects() {
        if (projectRepository.count() == 0) {
            throw new RuntimeException("No projects found!");
        }
        return projectRepository.findAll();
    }
    
}
