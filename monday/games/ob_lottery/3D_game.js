// import the types of bets array
import {playItemsName} from './rapid5D/data.js'


// declare the buttons empty markup variable
let buttonsMarkup = "";

// declare the actions buttons empty markup variable
let slotActionsButtonsMarkup = "";


// declare the vertical actions buttons
let verticalActionsButtonsAll = "";
let verticalActionsButtonsClear = "";
let drawLotsMarkup = ''
let numberOfSlots = 5



// declare and initialize the number of rows and columns
const numberOfRows = 6
const numberOfCols = 10


// declare the total number of buttons
let allRowsArray = [];
let drawsets = []

const slotsCommonClass = "ball-item";


// count down timer
let countDownTimer = 10





// This code executes once the DOM is ready
$(function () {




   // handleTimer()
  console.log(playItemsName)

  // prepare the entire slots markup
  prepareSlots();

  
  // create the vertical buttons
  prepareVerticalActionButtons()



  // build vertical buttons
  // Loop through 10 slots to prepare the markup for each slot
 

  $(".ball-item").click(function () {
    selectASlot(this);
  });

  $(".row-btns").click(function () {
    handleRowButtons(this);
  });


});



function handleTimer(){


    let storedTimer =  JSON.parse(window.localStorage.getItem('timer'));
    if(storedTimer !== undefined){
        console.log(storedTimer)
      countDownTimer =  parseInt(storedTimer.tens.trim() + storedTimer.ones.trim());
   
    }

    setInterval(()=>{
       
        // When the countdown reaches 1, reset the timer and draw lots
        if(countDownTimer == 1){
          resetCountDownTimer();
          drawLots()
        }
      //   Decrement the timer and display the updated time on the page
       let stringedTime = countDownTimer.toString()
       countDownTimer -= 1
       
         
         stringedTime = stringedTime.trim().split('')
        console.log(stringedTime[0])
      
        const timer = {
          ones: stringedTime[0] >= 1 ? stringedTime[0] : '0',
          tens:stringedTime[1],
      }
      
      window.localStorage.setItem('timer', JSON.stringify(timer));
  
        $('#timer-tens').text(stringedTime[0] >= 1 ? stringedTime[0] : 0)
        $('#timer-ones').text(stringedTime[1])
      
     
  
      },1000);
  
  

}


function resetCountDownTimer(){
    countDownTimer = 10;
}


/**
 * Draws a random number and fills it in the designated slots. 
 * @param {boolean} resetTimer - Optional parameter indicating whether to reset the countdown timer or not. Defaults to false.
 */
function drawLots(resetTimer = false) {
  
    // Get a string of a random number and split it into an array of digits
    let drawString = (Math.random() * (10 ** numberOfSlots)).toString().split('.')[0].split('')
  
    // If the drawString is not long enough, generate a new one
    if (drawString.length < numberOfSlots) {
      drawString = (Math.random() * (10 ** numberOfSlots)).toString().split('.')[0].split('')
    }
  
    let drawSlot;
    let drawset = [];
  
    // Fill each slot with a digit from the drawString array and update the UI
    for (let index = 0; index < drawString.length; index++) {
      drawSlot = drawString[index];
  
      // push the slot into the drawn slots array
      drawset.push(drawSlot);
      
      // update the ui
      $(`#lot-${index}`).text(drawSlot);
    }
  
    // push the set into the parent's array
    drawsets.push(drawset);
  
    // Reset the countdown timer if requested
    if (resetTimer) {
      resetCountDownTimer();
    }
  }

function prepareSlots() {

  let count = 0;
  let rowNumber;
 

  // Loop through 10 slots to prepare the markup for each slot
  for (let index = 0; index < numberOfRows*numberOfCols; index++) {
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

      // If the slot is the last one within the number of slots limit, append the draw lots markup to the parent element
      if(index == numberOfSlots - 1){
        $('#draw-lots-parent').append(drawLotsMarkup)
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
    if (count == 10 && index < 50) {
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

 function prepareVerticalActionButtons(){

  for (let index = 0; index < 10; index++) {
   

    // build the all vertical buttons
    verticalActionsButtonsAll = verticalActionsButtonsAll.concat(' ',getVerticalSlotsActionsButtonsMarkup(index,4))

    verticalActionsButtonsClear = verticalActionsButtonsClear.concat(' ',getVerticalSlotsActionsButtonsMarkup(index,5,'Clear'))
    

    
  }
  
         

         $('#root-parent').append(getListParentTag(9 , verticalActionsButtonsAll))
         $('#root-parent').append(getListParentTag(9 , verticalActionsButtonsClear))

     
 

 }
 

function getDrawLotsMarkup(index){
    return `<li class='h1 list-inline-item clickable lot-${index}'>
    <span class='border text-warning rounded p-3' id='lot-${index}'>0-9</span>
    </li>`;
}



// update the root element of the slots
function updateListOfSlots() {
  
  $("#root-parent").append(buttonsMarkup);
}

/**
 * Select a slot by adding highlight class to its span element and storing its digit in the appropriate row array.
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
  if (allRowsArray[rowNumber] !== undefined) {
    
    // if it does and include's the selected slot
    if (allRowsArray[rowNumber].includes(selectedSlot)) {
      
      // de-select the slot
        if ($(slotObject).hasClass("selected")) {
        
        $(slotObject).removeClass("selected");
      
      }
       
        // remove the slot from the array
         arrayRemove(allRowsArray[rowNumber], selectedSlot);

         // return afterwards to prevent selecting the slot again
         return;
    }
  }



  // add the bet slot selected to the appropriate array
  allRowsArray[rowNumber] === undefined
    ? (allRowsArray[rowNumber] = [selectedSlot])
    : allRowsArray[rowNumber].push(selectedSlot);

  // log all the selected bets
  console.log(allRowsArray);
}



function arrayRemove(array, element, sort = false) {
  array.splice(array.indexOf(element), 1);
  sort && array.sort();
}

function getSlotRowAndColumn(eventObject) {
  // Splits the class attribute of the event object into an array and selects the last element, which contains the row number.

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



function getSlotsActionsButtonsMarkup(rowNumber, count,) {
  // Determines the ID for the button based on the slot index and row number.
  let buttonId = `${slot_buttons_markup_text(count)}-${rowNumber}-h`;

  // Determines the text to display on the button based on the button text and whether a secondary button exists.
  let buttonTextDisplay = slot_buttons_markup_text(count);

  return `<div class="row-btns ${rowNumber}" id='${buttonId}'> <span class="all">${buttonTextDisplay}</span></div>`;

}




function getVerticalSlotsActionsButtonsMarkup(index, count,displayText ='All') {
   
  // Determines the ID for the button based on the slot index and row number.
    let buttonId = `${slot_buttons_markup_text(count)}-${index}-v`;
  
    // Determines the text to display on the button based on the button text and whether a secondary button exists.
    let style = index === 50 ? 'margin-left:0px;' : 'margin-left:13px;'
  
    return `<div style=${style} class="row-btns ${index}" id='${buttonId}'> <span class="all">${displayText}</span></div>`;
  
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

      console.log(actionButtonType)  
    
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
          allRowsArray[rowNumber] === undefined
          ? (allRowsArray[rowNumber] = [index])
          : allRowsArray[rowNumber].push(index);

          // de-select it in the row
          $(`#${rowNumber}-${index}`).addClass(`selected`);

      }


  }


  // Log the array of first row selected slots to the console.
  console.log(allRowsArray);


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
          allRowsArray[rowNumber] === undefined
          ? (allRowsArray[rowNumber] = [selectedDigit])
          : allRowsArray[rowNumber].push(selectedDigit);

        // de-select it in the row
        $(rowSlot).addClass(`selected`);


      }else{

          // remove it from the array if it is odd
          ((allRowsArray[rowNumber] !== undefined)
          && allRowsArray[rowNumber].includes(selectedDigit)) &&
          arrayRemove(allRowsArray[rowNumber],selectedDigit)
          
  
        // de-select it in the row
        $(rowSlot).removeClass(`selected`);

      }
    }


      // log the result to the console.log 
      console.log(allRowsArray)
  }



  // clear all the selected slots
  function clearAllSelected(rowNumber) {

    
        // make sure atleast slot is selected
        if (allRowsArray[rowNumber] === undefined) return;
        
      
        // If there are no slots to clear, return and log a message.
        if (allRowsArray[rowNumber].length === 0) return;

        
        // clear all the slots of {rowNumber}
        allRowsArray[rowNumber] = [];

        // de-select all selected slots
        for (let index = 0; index < 10; index++) {
            
              if($(`#${rowNumber}-${index}`).hasClass(`selected`)){
              
                $(`#${rowNumber}-${index}`).removeClass(`selected`);
              }
          
        
        }

  
  }



  // The following function takes a slot number and row number as inputs and returns a string representing the markup for the slot in the game table.
  function slots_buttons_markup(rowNumber, count) {
    return `<div class="ball">
            <div class="${slotsCommonClass} ${rowNumber}" id="${rowNumber}-${count}">${count}</div> 
        <div class="ball-cm"></div>
        </div>`;
  }



  // get slots parent tag
  function getListParentTag(row_number, children) {
    return `<li class='balls-row'><div class='row-balls ${row_number}'>${children}</div></li>`;
  }

  function slot_buttons_markup_text(key) {
    switch (key) {
      case 0:
        return "Odd";
      case 1:
        return "Even";
      case 2:
        return "Big";
      case 3:
        return "Small";
      case 4:
        return "All";
      case 5:
        return "Clear";
      default:
        return "Unknown Action";
    }
  }


 
