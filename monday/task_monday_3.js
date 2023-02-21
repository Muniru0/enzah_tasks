
// declare a variable to hold the user selection
const userSelection = [[2,1,5,6,7],[1,7,3,45],[6,2,4,5,6],[1,5,2,7,6],[1,5,2,7,6]] 
const machineSelection = [1,5,2,7,6]

let userBetWins = []


// check the user bet state
function checkUserBetState(){


    // traverse the entire user Selection
    userSelection.forEach((userBet,outerIndex,arra)=>{
        
        // for efficiency check to see first items in both the
        // user selection and the machine selection are the same
        if(userBet[outerIndex] === machineSelection[outerIndex]){

            // then start from the next item in the machine to iterate through
            // the user selection
            for (let index = 1; index <= machineSelection.length; index++) {

                // break out of the loop upon hitting a non-matching digit
                if(machineSelection[index] != userBet[index]){
                    break;
                }

                // store the index of the won bet in the user wins array
                if((index  == (userBet.length - 1))){
                    userBetWins.push(outerIndex)
                }
               
                
            }
        }

    });

  console.log(`User has won: ${userBetWins.length} number of bets.`)
}


export {checkUserBetState}