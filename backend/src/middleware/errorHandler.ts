import { ErrorRequestHandler,Response } from "express";
import {z} from "zod";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    message : err.message,
    path: err.path.join(".")
  }));
  return res.status(400).json({
    message:error.message,
    errors
  });
}


const errorHandler:ErrorRequestHandler=(error,req,res,next)=>{
    console.log(`PATH ${req.path}`,error)
    if (error instanceof z.ZodError){
         handleZodError(res,error);
    }
    
    res.status(500).send("Internal Server Error")
}

export default errorHandler