package com.example.task;

public class TaskRequest {

    private String title;
    private String description;
    private String status;
    private String priority;
    private String dueDate;
    private String[] taskMems;
    private String proId;

    // Default constructor
    public TaskRequest() {}

    public TaskRequest(String title, String description, String status, String priority, String dueDate, String[] taskMems, String proId) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.taskMems = taskMems;
        this.proId = proId;
    }

    // Getter and Setter using same name as field
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

    public String[] getTaskMems() {
        return taskMems;
    }
    public void setTaskMems(String[] taskMems) {
        this.taskMems = taskMems;
    }

    public String getProId() {
        return proId;
    }
    public void setProId(String proId) {
        this.proId = proId;
    }
}
