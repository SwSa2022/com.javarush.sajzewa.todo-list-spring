package com.javarush.controller;

import com.javarush.domain.Status;

public class TaskInfo {
    private String description;
    private Status status;

    public String getDescription() {
        return description;
    }

    public Status getStatus() {
        return status;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
