class TotalBets {

    /**
   * Calculates the total number of possible combinations of selections across two rows, taking into account repeated selections between the rows.
   * @param {array} row1Selections - An array containing the selections for the first row.
   * @param {number} row1Sample - An integer representing the number of selections that can be made from the first row.
   * @param {array} [row2Selections=false] - An optional array containing the selections for the second row. Defaults to false if not provided.
   * @param {number} [row2Sample=false] - An optional integer representing the number of selections that can be made from the second row. Defaults to false if not provided.
   * @returns {number} - The total number of possible combinations of selections across both rows.
   */
     _combinations_totalBets(...rowsAndSamples) {
      let rows = [],
        samples = [];
        
  
      //dividing rows and samples
      rowsAndSamples.forEach((element) => {
        Array.isArray(element) ? rows.push(element) : samples.push(element);
      })
  
    let row1Len = rows[0].length; // Get length of row1 Selections
    if (!rows.length == 1) return this.getCombination(row1Len, samples[0]); // If there is only one row, return number of combinations for that row
    let row2Len = rows[1].length; // Get length of row2 Selections
    let row1Combinations = this.getCombination(row1Len, samples[0]); // Calculate number of combinations for first row
    let row2Combinations = this.getCombination(row2Len, samples[1]); // Calculate number of combinations for second row
    let totalCombinations = row1Combinations * row2Combinations; // Calculate total number of combinations
    let repeatedSelections = rows[1].filter((element) => rows[0].includes(element)).length; // Count the number of repeated selections between the two rows
    let combinationsWithoutRepeats = -1; // Placeholder for variable to be calculated
    if (samples[0] != 1) { // If there is more than one selection in the first row
      let repeatsToRemove = this.getCombination(row1Len - 1, samples[0] - 1) * repeatedSelections; // Calculate number of combinations with repeated selections to remove
      combinationsWithoutRepeats = totalCombinations - repeatsToRemove; // Calculate number of combinations without repeats
    }
    if (samples[1] != 1) { // If there is more than one selection in the second row
      let repeatsToRemove = this.getCombination(row2Len - 1, samples[1] - 1) * repeatedSelections; // Calculate number of combinations with repeated selections to remove
      combinationsWithoutRepeats = totalCombinations - repeatsToRemove; // Calculate number of combinations without repeats
    }
    return combinationsWithoutRepeats;
  }
}



const factorial = (num) => {
    if (num == 0) return 1;
    if (num < 0) return 0
    let result = num;
    for (let i = num - 1; i > 1; i--) result *= i;
    return result;
}

//n= number of selections 
//r= sample items selected
const getCombination = (n, r) =>  {
    if (!(r >= 0 && n >= r)) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
}


