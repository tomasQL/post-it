import React from "react";
import './postit.css';
export function PostItComponent({ postit, eliminarPostit }) {
    return <div className="col-12 col-md-3 mb4">
        <div className="postit">
            <h3>{postit.title}</h3>
            <p>{postit.content}</p>
            <button onClick={() => eliminarPostit(postit.id)} className="btn btn-danger">Quitar</button></div>
    </div>
};