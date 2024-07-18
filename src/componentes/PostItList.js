import React, { Fragment, useState, useRef } from "react";
import { PostItComponent } from "./PostItComponent";
import { v4 as uuid } from "uuid";
import './postit.css';

export function PostItList() {
    const [postits, setPostits] = useState(
        [
            // Objetos Post-It de ejemplo
            { id: 1, title: "Llamar a:", content: "Beatriz 9 9983 1923" },
            { id: 2, title: "Código lipigas", content: "LR800" },
            { id: 3, title: "Clave wifi", content: "wifi pancho 88888888 wifi alejandra_5g abcdefg wifi pedro contraseña123" },
            { id: 4, title: "cumpleaños", content: "mama 12/02 papa 15/03 hermana 04/06" }
        ]
    );

    // Manejamos el estado de validación del campo descripción como un error con state
    const [error, setError] = useState('');

    // Hooks para el título y el contenido de los post-it
    const titleRef = useRef();
    const contentRef = useRef();

    const agregarPostit = () => {
        // Hook de referencia para el actual valor en los campos del post-it
        const postitTitle = titleRef.current.value
        const postitContent = contentRef.current.value
        // Validamos solamente que la descripción no se encuentre vacía
        if (postitContent === '') {
            setError('Completa al menos la descripción');
            return;
        }
        setError(''); // limpia el mensaje de error
        setPostits(
            (prevPostits) => {
                const newPostit = { id: uuid(), title: postitTitle, content: postitContent }
                return [...prevPostits, newPostit]
            }
        );
    };

    // La función recibe el id del postit que vamos a eliminar
    const eliminarPostit = (id) => {
        setPostits((prevPostits) => prevPostits.filter(postit => postit.id !== id));
    }

    return (
        <Fragment>
            {error && <div className="alert alert-warning">{error}</div>}
            <div className="container">
                <h1 className="titulo">Mi Tablero de Post It's</h1>
                <div className="input-group mt-4 mb-4">
                    <input ref={titleRef} type="text" className="form-control border-black rounded-0" placeholder="Título del Post It" required={false}></input>
                    <input ref={contentRef} type="text" className="form-control border-black rounded-0" placeholder="Descripción" required={true}></input>
                    <button onClick={agregarPostit} className="boton-postit">Postealo!</button>
                </div>
            </div>
            <div className="row">
                {
                    postits.map((postit) => (<PostItComponent postit={postit} key={postit.id} eliminarPostit={eliminarPostit} />))
                }
            </div>
        </Fragment >
    );
};