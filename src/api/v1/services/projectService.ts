import { Project } from "../models/interfaces";
import { ServiceError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";

const projects: Project[] = [
    {
        id: 1,
        name: "Website Redeisgn",
        status: "active",
        createdAt: "2025-01-10T10:00:00.000Z"
    },
    {
        id: 2,
        name: "Mobile App v2",
        status: "planning",
        createdAt: "2025-01-08T10:00:00.000Z"
    },
    {
        id: 3,
        name: "API Migration",
        status: "active",
        createdAt: "2025-01-05T10:00:00.000Z"
    },
    {
        id: 4,
        name: "Security Audit",
        status: "completed",
        createdAt: "2025-01-03T10:00:00.000Z"
    }
];

export function getAllProjects(): Project[] {
    return projects;
};

export function getProjectById(id: number): Project {
    const project = projects.find((p) => p.id === id);
    if(!project){
        throw new ServiceError("Project not found", "NOT_FOUND", HTTP_STATUS.NOT_FOUND);
    }
    return project;
};

export function createProject(data: Omit<Project, "id" | "createdAt">): Project {
    const newProject: Project = {
        id: projects.length + 1,
        createdAt: new Date().toDateString(),
        ... data
    };

    projects.push(newProject);
    return newProject;
};

export function updateProject(id: number, data: Partial<Omit<Project, "id" | "createdAt">>): Project {
    const index = projects.findIndex((p) => p.id === p.id);
    if(index === -1){
        throw new ServiceError("Project not found", "NOT_FOUND", HTTP_STATUS.NOT_FOUND);
    }

    projects[index] = {
        ... projects[index],
        ... data
    };
    return projects[index];
};

export function deleteProject(id: number): void {
    const index = projects.findIndex((p) => p.id === id);
    if(index === -1){
        throw new ServiceError("Project not found", "NOT_FOUND", HTTP_STATUS.NOT_FOUND);
    }

    projects.splice(index, 1);
};