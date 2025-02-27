import React from "react";
import "./Toolbar.css";

function Toolbar({ applyBold, applyItalic, changeFontSize, changeColor, textColor, undo, redo, disableUndo, disableRedo }) {
  return (
    <div className="toolbar">
      <button onClick={undo} disabled={disableUndo}>
  <span>🔄</span>
</button>
<button onClick={redo} disabled={disableRedo}>
  <span>🔁</span>
</button>

      <button onClick={applyBold}><b>B</b></button>
      <button onClick={applyItalic}><i>I</i></button>

      <select onChange={(e) => changeFontSize(e.target.value)}>
        <option value="14px">14px</option>
        <option value="18px">18px</option>
        <option value="22px">22px</option>
      </select>

      <div className="text-color">
        <span className="icon">A</span>
        <div className="underline" style={{ backgroundColor: textColor }}></div>
        <input
          type="color"
          onChange={(e) => changeColor(e.target.value)}
          title="Text Color"
        />
      </div>
    </div>
  );
}

export default Toolbar;
