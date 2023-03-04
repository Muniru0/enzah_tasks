
import { getCombinations } from "./utils.js";






// get total bets for all 5 staright joint total bets
function getAll5StraightJointTotalBets(allUserSelections = []){

    if(allUserSelections.length < 1) return 0

    let result = 1
    allUserSelections.forEach(element => {
        result *= element.length
    }); 
    console.log(result)
    return result
}



// get total bets for all 5 staright combo total bets
function getAll5StraightComboTotalBets(allUserSelections = []){

  if(allUserSelections.length < 1) return 0

  let result = 1
  allUserSelections.forEach(element => {
      result *= element.length
  }); 
  
  return (result * 5)
}


// get total bets for all 5 Group total bets
function getGroup120TotalBets(allUserSelections = [],sampleSpace = 0) {


  // get the combination for the row 1 
  if(!Array.isArray(allUserSelections[0])) return 0


  // get the combination for the row 2
 return (getCombinations(allUserSelections[0],sampleSpace)).length



}


function getAll5Group60TotalBets(allUserSelections = []){


  
  

}

function getTotalBetsForPick2Sum2(checkboxes = [1,2],slots = [0]){

  let additiveArray = [0,1,2,3,4,5,6,7,8,9];
  let subtractiveArray = [10,11,12,13,14,15,16,17,18];
  




  if(checkboxes.length === 1) return;

  slots.forEach((slot)=>{
  for (let index = 0; index < checkboxes.length; index++) {
      const checkbox = checkboxes[index];

      if(checkbox === 1) continue;

      let betCountForSlot = 0
      if(slot <= 9){

          betCountForSlot = checkbox === 2 ?   (additiveArray.indexOf(slot) + 1) * 1 :  (additiveArray.indexOf(slot) + 1) * checkbox
             
         }else{

          betCountForSlot = checkbox === 2 ?     (1 * 10) - (subtractiveArray.indexOf(slot) + 1) :  (checkbox * 10) - (subtractiveArray.indexOf(slot) + 1)

       }
      
      if(userSelections.includes(slot)){
          totalBets -= betCountForSlot
          arrayRemove(userSelections, slot)

      }else{

          totalBets += betCountForSlot
          userSelections.push(slot)

      }
      
     
      
  }

})

  console.log(totalBets)

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