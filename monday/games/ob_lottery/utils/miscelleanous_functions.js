

function getAll5StraightJointTotalBets(allUserSelections = []){

    if(allUserSelections.length < 1) return 0

    let result = 1
    allUserSelections.forEach(element => {
        result *= element.length
    }); 
    console.log(result)
    return result
}

function checkUserPrizeWins(ma,allUserSelections = []){

    if(allUserSelections.length < 1) return 0

    let result = 1
    allUserSelections.forEach(element => {
        result *= element.length
    }); 
    console.log(result)
    return result
}







export {getAll5StraightJointTotalBets} 