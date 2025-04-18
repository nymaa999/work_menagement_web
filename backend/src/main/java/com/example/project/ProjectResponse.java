package com.example.project;

public class ProjectResponse {

    private String message;
    private ProRegRequest request;

    public ProjectResponse(String message, ProRegRequest request) {
        this.message = message;
        this.request = request;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
