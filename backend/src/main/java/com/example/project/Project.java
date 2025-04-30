package com.example.project;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;

public class Project {

    @Id
    private String id;
    private String proName;
    private String proDesc;
    private String proType;
    private String proStatus;
    private String proStartDate; 
    private ArrayList<String> proMembers;
    private LocalDate proEndDate; 

    // constructor
    public Project(String proName, String proDesc, String proType, String proStatus, String proStartDate, ArrayList<String> proMembers, LocalDate proEndDate) {
        this.proName = proName;
        this.proDesc = proDesc;
        this.proType = proType;
        this.proStatus = proStatus;
        this.proMembers = proMembers;
        this.proStartDate = proStartDate;
        this.proEndDate = proEndDate;
    }
    public Project() {
        // Default constructor
    }

    // getters and setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getProName() {
        return proName;
    }
    public void setProName(String proName) {
        this.proName = proName;
    }
    public String getProDesc() {
        return proDesc;
    }
    public void setProDesc(String proDesc) {
        this.proDesc = proDesc;
    }
    public String getProType() {
        return proType;
    }
    public void setProType(String proType) {
        this.proType = proType;
    }
    public String getProStatus() {
        return proStatus;
    }
    public void setProStatus(String proStatus) {
        this.proStatus = proStatus;
    }
    public String getProStartDate() {
        return proStartDate;
    }
    public void setProStartDate(String proStartDate) {
        this.proStartDate = proStartDate;
    }
    public ArrayList<String> getProMembers() {
        return proMembers;
    }
    public void setProMembers(ArrayList<String> proMembers) {
        this.proMembers = proMembers;
    }
    public LocalDate getProEndDate() {
        return proEndDate;
    }
    public void setProEndDate(LocalDate proEndDate) {
        this.proEndDate = proEndDate;
    }

}
