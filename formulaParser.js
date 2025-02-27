export function parseFormula(formula) {
    const regex = /([A-Z]+)(\d+)(:([A-Z]+)(\d+))?/g;
    const matches = [];
    let match;
  
    while ((match = regex.exec(formula)) !== null) {
      const startCol = match[1];
      const startRow = parseInt(match[2]) - 1;
  
      if (match[4] && match[5]) {
        const endCol = match[4];
        const endRow = parseInt(match[5]) - 1;
  
        const startColIndex = startCol.charCodeAt(0) - "A".charCodeAt(0);
        const endColIndex = endCol.charCodeAt(0) - "A".charCodeAt(0);
  
        for (let i = Math.min(startRow, endRow); i <= Math.max(startRow, endRow); i++) {
          for (let j = Math.min(startColIndex, endColIndex); j <= Math.max(startColIndex, endColIndex); j++) {
            matches.push({ row: i, col: j });
          }
        }
      } else {
        matches.push({ col: startCol, row: startRow });
      }
    }
  
    return matches;
  }
  
  export function calculateFormula(formula, cells) {
    if (!formula.startsWith("=")) return formula;
  
    const refs = parseFormula(formula);
    const values = refs.map(({ row, col }) => {
      return parseFloat(cells[row]?.[col]?.value) || 0;
    });
  
    if (formula.includes("SUM")) {
      return values.reduce((sum, val) => sum + val, 0);
    }
    if (formula.includes("AVERAGE")) {
      return values.length ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
    }
    if (formula.includes("MAX")) {
      return Math.max(...values);
    }
    if (formula.includes("MIN")) {
      return Math.min(...values);
    }
  
    return formula;
  }
  