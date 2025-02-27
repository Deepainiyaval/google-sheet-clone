
import React, { useState } from "react";
import "./Sheet.css";

function Sheet({ bold, italic, fontSize, color, cells, setCells, selectedCell, setSelectedCell, setHistory, history }) {
    const [isDragging, setIsDragging] = useState(false);
    const [startCell, setStartCell] = useState(null);
    const [endCell, setEndCell] = useState(null);

    const handleChange = (row, col, value) => {
        const newCells = JSON.parse(JSON.stringify(cells));
        newCells[row][col] = { value };
        setCells(newCells);
        setSelectedCell({ row, col, value });
        setHistory([...history, JSON.parse(JSON.stringify(cells))]);
    };

    const handleMouseDown = (row, col) => {
        setStartCell({ row, col });
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        if (startCell && endCell)
        {
            const newCells = JSON.parse(JSON.stringify(cells));
            const { row: startRow, col: startCol } = startCell;
            const { row: endRow, col: endCol } = endCell;

            const startValue = newCells[startRow][startCol].value;

            for (let i = Math.min(startRow, endRow); i <= Math.max(startRow, endRow); i++)
            {
                for (let j = Math.min(startCol, endCol); j <= Math.max(startCol, endCol); j++)
                {
                    newCells[i][j].value = startValue; // Copy Content
                }
            }

            setCells(newCells);
            setHistory([...history, JSON.parse(JSON.stringify(cells))]);
        }
        setIsDragging(false);
        setStartCell(null);
        setEndCell(null);
    };

    const handleMouseOver = (row, col) => {
        if (isDragging)
        {
            setEndCell({ row, col });
        }
    };

    const alphabet = "ABCDEFGHIJKLMNOPQRST".split("");

    return (
  
      < div className = "sheet" >
      {/* Header for Columns */}
      < div className = "header" >
        < div className = "corner" ></ div >
        {
        alphabet.map((letter, index) => (
          < div key ={ index}
        className = "column-header" >
            { letter}
          </ div >
        ))}
      </ div >

      < div className = "grid" >
        {
        cells.map((row, rowIndex) => (
          < div key ={ rowIndex}
        className = "row" >
            < div className = "row-number" >{ rowIndex + 1}</ div >
            {
            row.map((cell, colIndex) => (
              < div key ={ colIndex}
            className = "cell" >
                < input
                  type = "text"
                  value ={ cell.value}
            style ={
                {
                fontWeight: bold ? "bold" : "normal",
                    fontStyle: italic ? "italic" : "normal",
                    fontSize: fontSize,
                    color: color,
                    backgroundColor:
                    startCell &&
                    endCell &&
                    rowIndex >= Math.min(startCell.row, endCell.row) &&
                    rowIndex <= Math.max(startCell.row, endCell.row) &&
                    colIndex >= Math.min(startCell.col, endCell.col) &&
                    colIndex <= Math.max(startCell.col, endCell.col)
                      ? "#c3e5fc" /* Blue Highlight Like Google Sheets */
                      : "",
                  }
            }
            onChange ={ (e) => handleChange(rowIndex, colIndex, e.target.value)}
            onClick ={
                () =>
              setSelectedCell({ row: rowIndex, col: colIndex, value: cell.value })
                  }
            onMouseDown ={ () => handleMouseDown(rowIndex, colIndex)}
            onMouseUp ={ handleMouseUp}
            onMouseOver ={ () => handleMouseOver(rowIndex, colIndex)}
                />
              </ div >
            ))}
          </ div >
        ))}
      </ div >
    </ div >
  );
}

export default Sheet;
