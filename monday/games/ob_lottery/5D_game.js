// import the types of bets array
import {getVerticalSlotsActionsButtonsMarkup,slots_buttons_markup,getSlotsActionsButtonsMarkup,arrayRemove,getDrawLotsMarkup,getListParentTag,getRandomNumber,getPlayMethodTypesMarkup,playMethodsGroupName,getLotteryListMarkup} from './3D_utils.js'

import {Game5DDataModel } from "./models/data_model.js";
import { LotteryObj, PlayMethod} from "./models/classes_models.js"
import {INSTANT_GAME,PK10, _5D, MARK6, G11x6,FAST3, G3D, NORTH_VIETLOTT,Happy8, CENTRAL_VIETLOTT, SOUTH_VIETLOTT,G2COLOR,G4D,THAILOT, PLAY_METHODS_GROUP_CONSTANT_NAME,PLAY_GROUP_CONSTANT_NAME,PLAY_METHODS_JSON_KEY} from "./3D_constants.js";




// declare Lotteries array 
let lotteries = [INSTANT_GAME,PK10, _5D, MARK6, G11x6,FAST3, G3D, NORTH_VIETLOTT,Happy8, CENTRAL_VIETLOTT, SOUTH_VIETLOTT,G2COLOR,G4D,THAILOT, ];

let lotteriesListItems = [
  ['Instant game', 'Instant 5D','Instant Fast','Instant 11x3'],
  ['Instant PK10', 'Rapid Racer','Lucky Airship','Lucky10 Ball'],
  ['Instant 5D', 'Hanoi 1min','Rapid 5D','QQ 5D','Lucky 5mins','Lucky5 Ball','Hanoi 5mins'],
  ['Rapid Mark', 'Mark6 5mins','Hong Kong mark6','Macao Mark6'],
  ['Instant 11x5', 'Rapid 11x5','Lucky 11x5'],
  ['Instant Fast3', 'Rapid Fast3','Lucky Fast3'],
  ['Rapid 3D', 'Lucky 3D','China 3D','P3/P5'],
  ['Lucky20 Ball', 'Rapid Happy','China Happy'],
  ['Rapid 2colour Ball', 'Lucky 2colour','China 2colour ball'],
  ['Magnum 4D', 'TOTO 4D','Damacai H3D','Singapore 4D','Lucky 4d'],
  ['Hanoi', 'Quang Ninh','Bac Ninh','Haiphong','Nam Dinh','Thai Binh','Rapid Vn North','Lucky Vn North'],
];

// declare the buttons empty markup variable
let buttonsMarkup = "";

// declare the actions buttons empty markup variable
let slotActionsButtonsMarkup = "";


// declare the vertical actions buttons
let verticalActionsButtonsAll = "";
let verticalActionsButtonsClear = "";
let drawLotsMarkup = ''
let numberOfSlots = 5
let _5d 
let playGroup 



// declare and initialize the number of rows and columns
const numberOfRows = 6
const numberOfCols = 10


// declare the total number of buttons
let allUserSelections = [];


// declare variable for the selected play method
let selectedPlayMethodObj 


let betType = 'roayl'

// count down timer
let countDownTimer = 9

// selections for both machine and user task: 2
let machineSelection = [4,1,5,2,1]
let userSelection = [ [1,0,5,7,4], [3,5,7,8,2], [3,6,8,5,4], [7,9,4,1,2], [0,2,4,3,5] ]




let playMethodsObjs = []




// This code executes once the DOM is ready
$(function () {






  sandboxFunction()
  

    // task: 2
    machineAndUserSelection()

    // start count down timer
    handleTimer()



  // prepare the entire slots markup
 // prepareSlots(1);

  
  // create the vertical buttons
  prepareVerticalActionButtons()


  // 
  
  // handle slots selections
  $('body').on('click', '.series', function () {


      // console.log(  $(this).find('.list-ticketName'))
      // return;
    if($(this).hasClass('is-active')){
      $(this).removeClass('is-active')
      $(this).find('.list-ticketName').addClass('hidden')
      return;
    }


    $('.is-active').removeClass('active')
    $(this).addClass('is-active')
    $(this).find('.list-ticketName').removeClass('hidden')
    
  });


  // handle play group change
  $('body').on('click', '.play-group-name', function () {
    
    // provide a visual change
    $('.current').removeClass('current')
    $(this).parent().addClass('current')

    // get the position of the play group
    const _playGroupPosition = $(this).attr('id').split('-').pop()
    console.log(_playGroupPosition)

   
    
    
     handlePlayGroupChange(_5d.playGroups[0].playMethods[_playGroupPosition] )



  });


  // handle slots selections
  $('body').on('click', '.ball-item', function () {
    selectASlot(this);
  });

  // handle row buttons
  $('body').on('click', '.row-btns', function () {
    handleRowButtons(this);
    
  });








   $('#bet-now').click(function () {
    betNow(this);
  });

    


  // change the selected bet amount
  $('.amount').click(function () {

     $('#total-amount').text($(this)[0].innerHTML)
     $('.active').removeClass('active')
     $(this).addClass('active')

  });

  

  // change the bet method
  $('.play-method__item').click(function () {

    if($(this).hasClass('current')) return

    // update the ui
    $('.current').removeClass('current')
    $(this).addClass('current')

    // update the current play method
    selectedPlayMethodObj = playMethodsObjs[parseInt($(this).attr('id'))]
    
    // prepare the bets space
     prepareBetSpace(selectedPlayMethodObj)

 });

});



  
  // respond to the ball-item click
  

function sandboxFunction(breaker = 0){



  
lotteries.forEach((lotteryHeader,index,arr) => {

    
   // list out the classic lotteries 
   $("#classic-lotto").append(getLotteryListMarkup(lotteryHeader,lotteriesListItems [index]))
   

});


 

  let gamesObj = {};
  const game5d_data_model = Game5DDataModel

  const gamesJsonDataModel =  JSON.parse(JSON.stringify(game5d_data_model));

    gamesJsonDataModel.forEach((game,gameIndex,gameArr)=>{
           
           if(game['lotteryName'] == _5D){
               gamesObj[game['lotteryName']] = new LotteryObj(game)
              
           }
       });
           




    _5d = gamesObj[_5D].LotteryJsonObj
   const playGroups = _5d.playGroups


  
  
   if(Array.isArray(playGroups)){
    

    // check if the play groups are available(e.g Rapid 5D,hanoi, etc)
    if(playGroups[0] === undefined) return
    

    // since this is just an init, get the first play group (i.e Rapid 5D)
     playGroup = playGroups[0]

    // get all the play methods names under the play group (e.g. All 5, All 4 ,All 3)
    playGroup.playMethodsNames.forEach((item,index,arr)=>{
      $("#play-group-ul").append(playMethodsGroupName(item,index,`${_5d.lotteryName}-${playGroup.playGroupName}-${index}`))
    });
    
    

    
    // get the straight types of play methods
    const straightPlayMethod = playGroup.playMethods[0].Straight

    // get the group types of play methods
    const GroupPlayMethod = playGroup.playMethods[0].Group
  
    // get the other types of play methods
    const otherPlayMethod = playGroup.playMethods[0].other
   
          
    // turn the json data of the play methods into play methods
    // objects : Straight
        if(straightPlayMethod !== undefined){
          straightPlayMethod.forEach((item,index,arr)=>{
          
            // set the defalut play Method obj
            index === 0 && (selectedPlayMethodObj = item)
          playMethodsObjs.push(new PlayMethod(item))

        })

      }


      // :Group
      if(GroupPlayMethod !== undefined){

        GroupPlayMethod.forEach((item,index,arr)=>{

          playMethodsObjs.push(new PlayMethod(item))

        })
      }


      // : Other
      if(otherPlayMethod !== undefined){

        otherPlayMethod.forEach((item,index,arr)=>{

          playMethodsObjs.push(new PlayMethod(item))

        })
      }

   $("#play-types-parent").append(getPlayMethodTypesMarkup(straightPlayMethod,GroupPlayMethod))

          

   
      

    
   }


   console.log(playMethodsObjs)

   // after traversing the data model, prepare the bet space.
   prepareBetSpace()



   
  


  
}



 function handlePlayGroupChange(_playGroup = playGroup){
  


   
    // get the straight types of play methods
    const straightPlayMethod = _playGroup.playMethods[0].Straight

    // get the group types of play methods
    const GroupPlayMethod = _playGroup.playMethods[0].Group
  
    // get the other types of play methods
    const otherPlayMethod = _playGroup.playMethods[0].other
   


    playMethodsObjs = []
          
    // turn the json data of the play methods into play methods
    // objects : Straight
        if(straightPlayMethod !== undefined){
          straightPlayMethod.forEach((item,index,arr)=>{
          
            // set the defalut play Method obj
            index === 0 && (selectedPlayMethodObj = item)
          playMethodsObjs.push(new PlayMethod(item))

        })

      }


      // :Group
      if(GroupPlayMethod !== undefined){

        GroupPlayMethod.forEach((item,index,arr)=>{

          playMethodsObjs.push(new PlayMethod(item))

        })
      }


      // : Other
      if(otherPlayMethod !== undefined){

        otherPlayMethod.forEach((item,index,arr)=>{

          playMethodsObjs.push(new PlayMethod(item))

        })
      }

   $("#play-types-parent").empty()
   $("#play-types-parent").append(getPlayMethodTypesMarkup(straightPlayMethod,GroupPlayMethod))

          

   
      

    
   }


   // after traversing the data model, prepare the bet space.
   prepareBetSpace()
  



  // prepare the bet space
 function prepareBetSpace(playMethodObj = playMethodsObjs[0]){


   // clear all the selections 
    allUserSelections.length !== 0 && (allUserSelections = [])



    console.log(playMethodObj.numberOfRows)
    //prepare the slots
    prepareSlots(playMethodObj.numberOfRows)


    // update the how to play 
    $('#how-to-play').text(playMethodObj.howToPlay)


    //handle user selections combinations 
    //handleBetCombination()
    

 }


  function checkAndGetBetInfo(row1 = [2,3,4,5,6,7,8,9],row2 = [8,7,9,2,3,4,5],selections = [1,3],run = true){


    
    // helper function to skip function execution
    if (!run)  return;

   
    // get the user selections
    let row1Selections = allUserSelections[0]
    let row2Selections = allUserSelections[1]

   

    // check and make sure they are both array
    if(!Array.isArray(row1Selections) || 
       !Array.isArray(row2Selections) ||
        row1Selections.length < 1 || row2Selections < 3) return;


       


  // get the combination for the row 1   
  const combRow1 = getCombinations(row1, selections[0])

  // get the combination for the row 2
  const combtnRow2 = getCombinations(row2,selections[1])

   // check and merge the combinatn of both rows
  const totalBetsCount = mergeAndCheck2(combRow1,combtnRow2).length
  
    console.log(`total bets count: ${totalBetsCount}`)
  // update the bets count 
  $('#total-bets-count').text(totalBetsCount)


  console.log(combRow1)
  console.log(combtnRow2)
  console.log(`Total number of bets without repetitions: ${totalBetsCount}`)


}

function getCombinations(array, r){
  const result = [];
 
  // Recursive function to generate combinations
  function generateCombos(combination, index) {
    if (combination.length === r) {
      result.push(combination);
      return;
    }
 
    if (index >= array.length) {
      return;
    }
 
    const newCombo = [...combination];
    newCombo.push(array[index]);
 
    generateCombos(newCombo, index + 1);
    generateCombos(combination, index + 1);

  }
 
  generateCombos([], 0);
  return result;
}




  function mergeAndCheck2(arr1, arr2) {
  
    let mergedArr = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j].indexOf(arr1[i][0]) !== -1 && arr1[i].every(val => arr2[j].indexOf(val) !== -1)) {
        continue; // skip if arr1 and arr2 have same values
      } else {
        mergedArr.push([...arr1[i], ...arr2[j]]);
      }
    }
  }
  return mergedArr;
  }

function machineAndUserSelection(run = false) {
    
  if (!run) return ;
  let winCount = 0

  // traverse the entire user Selection
  userSelection.forEach((userBet,outerIndex,array)=>{
      
      // for efficiency check to see first items in both the
      // user selection and the machine selection are the same
      if((userBet[0] + userBet[userBet.length])  === (machineSelection[0] + machineSelection[machineSelection.length])){

         winCount += 1; 

      }

  });




}


function prepareSlots(numRows = numberOfRows,numCols = numberOfCols) {

  let count = 0;
  let rowNumber;
 
    // check the 
  // empty the slots wrapper.
   $('#slots-wrapper').empty();



  // Loop through 10 slots to prepare the markup for each slot
  for (let index = 0; index < numRows*numCols; index++) {
  
   
    rowNumber = Math.trunc(index / 10);
 
    // Prepare the slots markup for each row
    buttonsMarkup = buttonsMarkup.concat(
      " ",
      slots_buttons_markup(rowNumber, count)
    )
    

     // If the slot is within the number of slots limit, add the draw lots markup
     if(index < numberOfSlots){
        drawLotsMarkup = drawLotsMarkup.concat(' ', getDrawLotsMarkup(index))
      }

  

    if (count < 6) {
      // prepare the slots actions buttons markup
      slotActionsButtonsMarkup = slotActionsButtonsMarkup.concat(
        " ",
        getSlotsActionsButtonsMarkup(rowNumber, count)
      );
    }

    // increment the count
    count += 1;

    // for efficiency append the markup in multiples of 10
    if (count == 10) {
        buttonsMarkup = getListParentTag(
        rowNumber,
        buttonsMarkup.concat("", slotActionsButtonsMarkup)
      );
      updateListOfSlots();
      buttonsMarkup = "";
      slotActionsButtonsMarkup = "";
      count = 0;
    }
    
   
   

  }

}

 function prepareVerticalActionButtons(run){

    if (!run) return;

  for (let index = 0; index < 10; index++) {
     // build the all vertical buttons
    verticalActionsButtonsAll = verticalActionsButtonsAll.concat(' ',getVerticalSlotsActionsButtonsMarkup(index,4))

    verticalActionsButtonsClear = verticalActionsButtonsClear.concat(' ',getVerticalSlotsActionsButtonsMarkup(index,5,'Clear'))
    

    
  }
          // add the vertical actions buttons
         $('#root-parent').append(getListParentTag(9 , verticalActionsButtonsAll))
         $('#root-parent').append(getListParentTag(9 , verticalActionsButtonsClear))

     
 

 }
 

// update the root element of the slots
function updateListOfSlots() {
  
  $("#slots-wrapper").append(buttonsMarkup);
}



/**
 * handle a slot lick
 * @param {object} slotObject - The DOM element of the selected slot.
 */
function selectASlot(slotObject) {

  // Visually highlight the slot selection
  $(slotObject).addClass("selected");
  
  // Get the row number and selected slot digit
  let rowNumberAndColumn = getSlotRowAndColumn(slotObject);
  let selectedSlot = getSelectedSlotDigit(slotObject);

    // get the row number
    let rowNumber = rowNumberAndColumn[0]

  // check if the row already exists
  if (allUserSelections[rowNumber] !== undefined) {
    
    // if it does and include's the selected slot
    if (allUserSelections[rowNumber].includes(selectedSlot)) {
      
      // de-select the slot
        if ($(slotObject).hasClass("selected")) {
        
        $(slotObject).removeClass("selected");
      
      }
       
        // remove the slot from the array
         arrayRemove(allUserSelections[rowNumber], selectedSlot);

         // return afterwards to prevent selecting the slot again
         return;
    }
  }

  console.log('how')

  // add the bet slot selected to the appropriate array
     allUserSelections[rowNumber] === undefined
    ? (allUserSelections[rowNumber] = [selectedSlot])
    : allUserSelections[rowNumber].push(selectedSlot);




    // handle combinations
     handleBetCombination();

    // All group 60
  //  checkAndGetBetInfo(allUserSelections[0],allUserSelections[1],[1,3],false)

  // log all the selected bets
  console.log(allUserSelections);


}



// function to handle all group 120 selections
function handleBetCombination(playMethodObj = playMethodsObjs[0]){
  
    
    if(allUserSelections.length !== playMethodObj.betPlan.length){

      console.log('sorry user selections still not enough');

      return;
    }


  let combinations = []
  

    allUserSelections.forEach((userSelection,index,arr)=>{
      combinations.push(getCombinations(userSelection,playMethodObj.betPlan[index]))
    });
  
    
    console.log(combinations)

  return

   // check and merge the combinatn of both rows
  const totalBetsCount = combtnRow2.length
  
    console.log(`total bets count: ${totalBetsCount}`)
  // update the bets count 
  $('#total-bets-count').text(totalBetsCount)



  console.log(combtnRow2)
  console.log(`Total number of bets without repetitions: ${totalBetsCount}`)


}

// get the slot row and column positions
function getSlotRowAndColumn(eventObject) {
 
  // get the ID of the slot(i.e split it to obtain the column and row number)
  return $(eventObject).attr("id").split("-");

}

/**
 * Returns the selected slot digit from an event object's innerHTML.
 * @param {Event} eventObject - The event object that was fired when the slot was selected.
 * @returns {number} - The selected slot digit.
 */
function getSelectedSlotDigit(eventObject) {
  return parseInt(eventObject.innerHTML);
}


/**
 * Select all odd-numbered slots in the row of the clicked slot.
 * Clears any previously selected slots.
 *
 * @param {Event} eventObject - The event object for the clicked slot.
 */
function handleRowButtons(eventObject) {

    
    // check the row number and the action performed
    let rowNumberAndButtonType = getSlotRowAndColumn(eventObject);

    // get the action performed
    let actionButtonType = rowNumberAndButtonType[0].trim();

    // get the row number
    let rowNumber = rowNumberAndButtonType[1];

    // get the action direction
    let actionDirection = rowNumberAndButtonType[2];
  

    // handle the vertical buttons click events
    if(actionDirection === 'v'){
        
        handleVerticalRowButtons(rowNumberAndButtonType)

        return;
    }
    
   
    
  // clear the row 
  clearAllSelected(rowNumber);

  // check to see if the action is to clear in the first place
  if ("Clear" === actionButtonType) return;


  // declare a variable as a switch for the current slot
  let mySwitch = false

  // Loop through all the slots in the row and select the odd-numbered slots.
  for (let index = 0; index < numberOfCols; index++) {

      
    
      // select all the slots 
      actionButtonType === "All" && (mySwitch = true)
      
      // select all the odd slots
      actionButtonType === "Odd" && (mySwitch = (index % 2 === 1))

      // select all the even slots
      actionButtonType === "Even" && (mySwitch = (index % 2 === 0))

      // select all the small slots
      actionButtonType === "Small" && (mySwitch = (index <= 0 || index <= 4))

      // select all the large slots
      actionButtonType === "Big" && (mySwitch = index >= 5 && index <= 9)


     // check and decide the action to take
      if (mySwitch) {
       

          // remove it from the array if it is odd
          allUserSelections[rowNumber] === undefined
          ? (allUserSelections[rowNumber] = [index])
          : allUserSelections[rowNumber].push(index);
         

          // de-select it in the row
          $(`#${rowNumber}-${index}`).addClass(`selected`);

      }

     
  }


  // perform the combination of the row buttons selection
  handleBetCombination(selectedPlayMethodObj);


 


}


  //
  function handleVerticalRowButtons(actionAndRowNumber){

      

    
      let actionButtonType = actionAndRowNumber[0]
      let selectedDigit = actionAndRowNumber[1].split('').pop()
      let rowSlot 
    
    // Loop through all the slots in the row and select the odd-numbered slots.
    for (let rowNumber = 0; rowNumber < 5; rowNumber++) {
      
    rowSlot = $(document).find(`#${rowNumber}-${selectedDigit}`)

      // check and decide the action to take
      if (actionButtonType === 'All') {

          // remove it from the array if it is odd
          allUserSelections[rowNumber] === undefined
          ? (allUserSelections[rowNumber] = [selectedDigit])
          : allUserSelections[rowNumber].push(selectedDigit);

        // de-select it in the row
        $(rowSlot).addClass(`selected`);


      }else{

          // remove it from the array if it is odd
          ((allUserSelections[rowNumber] !== undefined)
          && allUserSelections[rowNumber].includes(selectedDigit)) &&
          arrayRemove(allUserSelections[rowNumber],selectedDigit)
          
  
        // de-select it in the row
        $(rowSlot).removeClass(`selected`);

      }
    }


     
  }



  // clear all the selected slots
  function clearAllSelected(rowNumber) {

    
        // make sure atleast slot is selected
        if (allUserSelections[rowNumber] === undefined) return;
        
      
        // If there are no slots to clear, return and log a message.
        if (allUserSelections[rowNumber].length === 0) return;

        
        // clear all the slots of {rowNumber}
        allUserSelections[rowNumber] = [];

        // de-select all selected slots
        for (let index = 0; index < 10; index++) {
            
              if($(`#${rowNumber}-${index}`).hasClass(`selected`)){
              
                $(`#${rowNumber}-${index}`).removeClass(`selected`);
              }
          
        
        }


        // handle the combination when the selection is cleared
        handleBetCombination();

  
  }






















































    function handleTimer(run = false){
         

      if(!run) return ;
      
    
    const locallyStoredTime =   window.localStorage.getItem('timer-ones')
    const locallyStoredDrawlots = window.localStorage.getItem('drawlots');

   
         
    if(locallyStoredTime !== undefined){
      if(locallyStoredTime !== countDownTimer){
        
       
        countDownTimer = locallyStoredTime
        $('#draw-lot').text(locallyStoredDrawlots)

        
       }
    }


    setInterval(()=>{
   
      // update the timer
      countDownTimer =  countDownTimer <= 0 ? 9 : countDownTimer - 1
      let drawlot 

      // when the count down timer reaches 0 re-generate another
      // random number show it on the web and locally persist it.
      if(countDownTimer == 0){
      
        drawlot = getRandomNumber(5).toString()
      
        $('#draw-lot').text(drawlot)
      
        window.localStorage.setItem('drawlots',drawlot)
      
      }

     // update time on the screen and localStorage
      $('#timer-ones').text(countDownTimer)
     window.localStorage.setItem('timer-ones', countDownTimer)
     
     
      
      

    },1000);
    }