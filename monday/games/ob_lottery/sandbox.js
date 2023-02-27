

import {Game5DDataModel } from "./models/data_model.js";
import {GameObj} from "./models/classes_models.js"
import {PK10, _5D, MARK6, G11x6,FAST3, G3D, NORTH_VIETLOTT,Happy8, CENTRAL_VIETLOTT, SOUTH_VIETLOTT,G2COLOR,G4D,THAILOT, PLAY_METHODS_NAME_CONSTANT} from "./3D_constants.js";

$(function(){

    let gamesObj = {};
   const game5d_data_model = Game5DDataModel

   const gamesJsonDataModel =  JSON.parse(JSON.stringify(game5d_data_model));

    



        gamesJsonDataModel.forEach((game,gameIndex,gameArr)=>{
            
            if(game['gameName'] == _5D){
                gamesObj[game['gameName']] = new GameObj(game)
               
            }
        });
            
 



    const _5d = gamesObj[_5D].gameJsonObj
    const playGroups = _5d.playGroups


    if(Array.isArray(playGroups)){

        playGroups.forEach((playGroup,playMethodIndex,playMethodArr)=>{
           
           playGroup[PLAY_METHODS_NAME_CONSTANT].forEach((playMethod,item,arr)=>{

            console.log(playMethod);
            console.log('------------------------------------------------------------------------------------')
            console.log(playMethod.playMethodName);
            console.log(playMethod)
           });

        })

    }
   
    
})

   