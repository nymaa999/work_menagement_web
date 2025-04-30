package com.example.task;
import org.bson.types.ObjectId;

public class TaskResponse {
    
    private String id;
    private String message;
    private TaskRequest request;

    public TaskResponse(String message, TaskRequest request){
        this.message = message;
        this.request = request; 
    }

    public String getId() {
        return id;
    }

}
