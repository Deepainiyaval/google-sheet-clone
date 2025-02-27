import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import FormulaBar from "./components/FormulaBar";
import Sheet from "./components/Sheet";
import { calculateFormula } from "./utils/formulaParser"; // Import the Formula Parser
import "./App.css";

function App() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [fontSize, setFontSize] = useState("14px");
  const [color, setColor] = useState("#000000");
  const [selectedCell, setSelectedCell] = useState(null);
  const [cells, setCells] = useState(
    Array(20)
      .fill()
      .map(() => Array(20).fill({ value: "" }))
  );
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const applyBold = () => setBold(!bold);
  const applyItalic = () => setItalic(!italic);

  const handleFormulaChange = (value) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newCells = JSON.parse(JSON.stringify(cells));

      // Store the Formula
      newCells[row][col].value = value;

      // Automatically Calculate the Formula
      newCells[row][col].value = calculateFormula(value, newCells);

      setCells(newCells);
      setSelectedCell({ row, col, value });
      setHistory([...history, JSON.parse(JSON.stringify(cells))]);
    }
  };

  const recalculateCells = (newCells) => {
    newCells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.value.startsWith("=")) {
          newCells[rowIndex][colIndex].value = calculateFormula(cell.value, newCells);
        }
      });
    });
    return newCells;
  };

  const undo = () => {
    if (history.length === 0) return;

    const lastState = history.pop();
    setRedoStack([JSON.parse(JSON.stringify(cells)), ...redoStack]);
    setCells(recalculateCells(lastState)); // Recalculate Formulas on Undo
    setHistory([...history]);
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const nextState = redoStack.shift();
    setHistory([...history, JSON.parse(JSON.stringify(cells))]);
    setCells(recalculateCells(nextState)); // Recalculate Formulas on Redo
  };

  return (
    <div className="app">
      <Toolbar
        applyBold={applyBold}
        applyItalic={applyItalic}
        changeFontSize={setFontSize}
        changeColor={setColor}
        textColor={color}
        undo={undo}
        redo={redo}
        disableUndo={history.length === 0}
        disableRedo={redoStack.length === 0}
      />
      <FormulaBar
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        handleFormulaChange={handleFormulaChange}
      />
      <Sheet
        bold={bold}
        italic={italic}
        fontSize={fontSize}
        color={color}
        cells={cells}
        setCells={setCells}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        setHistory={setHistory}
        history={history}
      />
    </div>
  );
}

export default App;
