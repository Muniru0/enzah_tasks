
import { getCombinations } from "./utils.js";







function getAll5StraightJointTotalBets(allUserSelections = []){

    if(allUserSelections.length < 1) return 0

    let result = 1
    allUserSelections.forEach(element => {
        result *= element.length
    }); 
    console.log(result)
    return result
}




function getAll5StraightComboTotalBets(allUserSelections = []){

  if(allUserSelections.length < 1) return 0

  let result = 1
  allUserSelections.forEach(element => {
      result *= element.length
  }); 
  
  return (result * 5)
}


function getGroup120TotalBets(allUserSelections = [],sampleSpace = 0) {


  // get the combination for the row 1 
  if(!Array.isArray(allUserSelections[0])) return 0


  // get the combination for the row 2
 return (getCombinations(allUserSelections[0],sampleSpace)).length



}


function checkUserPrizeWins(allUserSelections = [],checkbox = 2){

  const AllSelections = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]

  let result = 0


  allUserSelections.forEach(element,i => {
    
    let elementPos = AllSelections.indexOf(element) + 1
    if(elementPos <= 9){
        if(checkbox === 2){

            result += elementPos

        }
    }

  });


}







export {getAll5StraightJointTotalBets,getAll5StraightComboTotalBets,getGroup120TotalBets} 