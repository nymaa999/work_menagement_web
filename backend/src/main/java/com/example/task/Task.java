package com.example.task;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Task {

    @Id
    private String id;
    private String title;
    private String description;
    private String status;
    private String priority;
    private String dueDate;
    private String [] mems;
    private String proId;

    public Task() {
    }

    public Task(String dueDate, String title, String description, String status, String[] mems, String proId) {
        this.dueDate = dueDate;
        this.title = title;
        this.description = description;
        this.status = status;
        this.proId = proId;
        this.mems = mems;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getPriority() {
        return priority;
    }
    public void setPriority(String priority) {
        this.priority = priority;
    }
    public String getDueDate() {
        return dueDate;
    }
    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }
    public String[] getMems() {
        return mems;
    }
    public void setMems(String[] mems) {
        this.mems = mems;
    }
    public String getProId() {
        return proId;
    }
    public void setProId(String proId) {
        this.proId = proId;
    }
}
