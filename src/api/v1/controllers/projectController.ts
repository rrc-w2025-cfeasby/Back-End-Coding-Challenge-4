import { Request, Response, NextFunction } from "express";
import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from "../services/projectService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Get Project Handler
 * 
 * @param req Request object
 * @param res Response object
 * @param next Next Function
 */
export function getProjectsHandler(req: Request, res: Response, next: NextFunction): void {
    try{
        const data = getAllProjects();
        res.status(HTTP_STATUS.OK).json({
            message: "Projects retrieved",
            count: data.length,
            data,
        });
    }catch (error){
        next(error);
    }
};

/**
 * Get Project by Id Handler
 * 
 * @param req Request object
 * @param res Response object
 * @param next Next Function
 */
export function getProjectByIdHandler(req: Request, res: Response, next: NextFunction): void {
    try{
        const id = Number(req.params.id);
        const project = getProjectById(id);
        res.status(HTTP_STATUS.OK).json(project);
    }catch (error){
        next(error);
    }
};

/**
 * Create Project Handler
 * 
 * @param req Request object
 * @param res Response object
 * @param next Next Function
 */
export function createProjectHandler(req: Request, res: Response, next: NextFunction): void {
    try{
        const project = createProject(req.body);
        res.status(HTTP_STATUS.CREATED).json({
            message: "Project created",
            data: project
        });
    }catch(error){
        next(error);
    }
};

/**
 * Update Project Handler
 * 
 * @param req Request object
 * @param res Response object
 * @param next Next Function
 */
export function updateProjectHandler(req: Request, res: Response, next: NextFunction): void {
    try{
        const id = Number(req.params.id);
        const updated = updateProject(id, req.body);
        res.status(HTTP_STATUS.OK).json({
            message: "Project updated",
            data: updated
        });
    }catch(error){
        next(error);
    }
};

/**
 * Delete Project Handler
 * 
 * @param req Request Object
 * @param res 
 * @param next 
 */
export function deleteProjectHandler(req: Request, res: Response, next: NextFunction): void {
    try{
        const id = Number(req.params.id);
        deleteProject(id);
        res.status(HTTP_STATUS.NO_CONTENT).send();
    }catch(error){
        next(error);
    }
};