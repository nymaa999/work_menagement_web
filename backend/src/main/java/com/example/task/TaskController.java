package com.example.task;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    // private final ProjectRepository projectRepository;
    // private final UserRepository userRepository;

    // public TaskController(TaskRepository taskRepository, ProjectRepository projectRepository, UserRepository userRepository) {
    //     this.taskRepository = taskRepository;
    //     this.projectRepository = projectRepository;
    //     this.userRepository = userRepository;
    // }

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody TaskRequest taskRequest) {
        try {
            System.out.println("===== CREATE TASK METHOD CALLED =====");
            System.out.println("Creating task: " + taskRequest.getTitle() + ", " + taskRequest.getDescription());
            Task response = taskService.createTask(taskRequest);
            return ResponseEntity.ok(response); // 200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(new TaskResponse("Error", taskRequest)); // 400 Bad Request
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllTasks() {
        try {
            List<Task> tasks = taskService.getAllTasks();
            return ResponseEntity.ok(tasks); // 200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(new TaskResponse("No projects found!", null)); // 404 Not Found
        }
    }
    
}
