


import {LotteryObj} from "./models/classes_models.js"
import {PK10, _5D, MARK6, G11x6,FAST3, G3D, NORTH_VIETLOTT,Happy8, CENTRAL_VIETLOTT, SOUTH_VIETLOTT,G2COLOR,G4D,THAILOT,} from "./3D_constants.js";

import {arrayRemove } from "./utils/utils.js";

const userSelections = []
let totalBets = 0;

// Define the selections as a 5xN array
const selections = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [4, 5, 6, 7],
    [5, 6, 7, 8],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [4, 5, 6, 7],
    [5, 6, 7, 8]
  ];



function combinations(breaker = 0){


    let result = [];

    const firstElement = selections.shift()

    firstElement.forEach((item,index,arr)=>{

        selections.forEach((innerItem,index,arr)=>{

            result.push([item, item])

        });

    });

    console.log(result)

}


function getTotalBetsForPick2Sum2(checkboxes = [1,2],slots = [0]){

    let additiveArray = [0,1,2,3,4,5,6,7,8,9];
    let subtractiveArray = [10,11,12,13,14,15,16,17,18];
    let subtractiveMultiplier = 10

  


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


$(function(){


   // combinations()
    
 

   getTotalBetsForPick2Sum2([1,2], [18])

















//     let gamesObj = {};
//    const game5d_data_model = Game5DDataModel

//    const gamesJsonDataModel =  JSON.parse(JSON.stringify(game5d_data_model));

    



//         gamesJsonDataModel.forEach((game,gameIndex,gameArr)=>{
            
//             if(game['gameName'] == _5D){
//                 gamesObj[game['gameName']] = new LotteryObj(game)
               
//             }
//         });
            
 



//     const _5d = gamesObj[_5D].gameJsonObj
//     const playGroups = _5d.playGroups


  
    
})

   