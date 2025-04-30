package com.example.project;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
   
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }
    
    @GetMapping("/getAll")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createProject(@RequestBody ProRegRequest request) {
        try {
            
            System.out.println("===== CREATE PROJECT METHOD CALLED =====");
            System.out.println("Creating project: " + request.getProName() + ", " + request.getProDesc());  
            Project response = projectService.createProject(request);
            return ResponseEntity.ok(response); // 200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(new ProjectResponse("Error", request)); // 400 Bad Request
        }
    }

    // @GetMapping("/getProject")
    // public ResponseEntity<?> getProject(@RequestBody Project project) {
    //     try {
    //         Project response = projectService.getProject(project);
    //         return ResponseEntity.ok(response.getClass()); // 200 OK
    //     } catch (RuntimeException e) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    //                             .body(new ProjectResponse("Error", request)); // 400 Bad Request
    //     }
    // }
    
    // Add more methods as needed
    // @PutMapping("/{id}")
    // public Project updateProject(@PathVariable String id, @RequestBody Project project) {
    //     return projectService.updateProject(id, project);
    // }
    // @DeleteMapping("/{id}")
    // public void deleteProject(@PathVariable String id) {
    //     projectService.deleteProject(id);
    // }
    // @GetMapping("/{id}")
    // public Project getProjectById(@PathVariable String id) {
    //     return projectService.getProjectById(id);
    // }
    // @GetMapping("/search")
    // public List<Project> searchProjects(@RequestParam String query) {
    //     return projectService.searchProjects(query);
    // }
    // @GetMapping("/filter")
    // public List<Project> filterProjects(@RequestParam String status) {
    //     return projectService.filterProjects(status);
    // }
    // @GetMapping("/sort")
    // public List<Project> sortProjects(@RequestParam String field) {
    //     return projectService.sortProjects(field);
    // }
}
