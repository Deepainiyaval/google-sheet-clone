import React from "react";
import "./FormulaBar.css";

function FormulaBar({ selectedCell, handleFormulaChange }) {
  return (
    <div className="formula-bar">
      <input
        type="text"
        placeholder="Type formula here..."
        value={selectedCell ? selectedCell.value : ""}
        onChange={(e) => handleFormulaChange(e.target.value)}
        disabled={!selectedCell} // Disable when no cell is selected
      />
    </div>
  );
}

export default FormulaBar;
