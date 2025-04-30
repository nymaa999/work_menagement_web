package com.example.task;

import java.util.Optional;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {
    
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(TaskRequest request) {
        Optional<Task> existing = taskRepository.findByTitle(request.getTitle());
        if (existing.isPresent()) {
            throw new RuntimeException("Task name already in use!");
        }
        
        System.out.println("===== CREATE TASK METHOD CALLED =====");
        System.out.println("Creating task: " + request.getProId());
        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());
        task.setMems(request.getTaskMems());
        task.setProId(request.getProId());

        System.out.println("Task Title: " + task.getTitle()+ ", TaskDesc:" + task.getDescription());

        taskRepository.save(task);

        return task;
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public List<Task> getAllTasks() {
        if (taskRepository.count() == 0) {
            throw new RuntimeException("No projects found!");
        }
        return taskRepository.findAll();
    }
    // public void updateTask(Optional<Task> task) {
    //     taskRepository.update(task);
    // }

    // public void deleteTask(ObjectId id) {
    //     taskRepository.delete(id);
    // }
    
}
