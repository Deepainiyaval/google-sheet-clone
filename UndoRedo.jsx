import React from "react";
import "./UndoRedo.css";

function UndoRedo({ undo, redo, canUndo, canRedo }) {
  return (
    <div className="undo-redo">
      <button onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        Redo
      </button>
    </div>
  );
}

export default UndoRedo;
