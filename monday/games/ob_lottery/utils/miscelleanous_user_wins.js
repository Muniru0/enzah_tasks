





function checkUserPrizeWins(allUserSelections = [],machineSelection = []){

    if(allUserSelections.length < 1) return 0

    let result = []
    allUserSelections.forEach((rowSelections,rowSelectionsIndex,arr) => {

        rowSelections.forEach((selection,index,arr)=>{
            if(machineSelection.includes(selection) && (selection === machineSelection[index])) result[rowSelectionsIndex] = index
                
                
            
        });
        
    }); 
    
    console.log(result)
    
    return result
}
