

import {Game5DDataModel } from "./models/data_model.js";
import {LotteryObj} from "./models/classes_models.js"
import {PK10, _5D, MARK6, G11x6,FAST3, G3D, NORTH_VIETLOTT,Happy8, CENTRAL_VIETLOTT, SOUTH_VIETLOTT,G2COLOR,G4D,THAILOT,} from "./3D_constants.js";

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



$(function(){


    combinations()
    
 



















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

   