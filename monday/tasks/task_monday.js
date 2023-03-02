// import the method to check the user bet state
import {checkUserBetState} from './task_3_monday.js'








// declare the buttons empty markup
let buttonsMarkup = '';

// declare the total number of buttons
let overallBetsArray = []




// This code executes once the DOM is ready
$(function(){

   
   
   
   // prepare the entire slots markup
    prepareSlots()


    // call the checkUserBetState
    checkUserBetState()


   
$('li').click(function(){selectASlot(this)})  

$('#place-bet').click(function(){ submitBet()});



});






function submitBet(){
      console.log('bet placed.')
}


 function prepareSlots(){


    let count = 0
    let rowNumber 
    
     // Loop through 10 slots to prepare the markup for each slot
     for (let index = 0; index < 50; index++) {
         
        
            
        rowNumber = Math.trunc(index/10)


      // Prepare the slots markup for each row
      buttonsMarkup = buttonsMarkup.concat(' ',buttons_markup(rowNumber,count)) 
  
       // increment the count      
       count += 1
         
        // for efficiency append the markup in multiples of 10
        if(count == 10){
                
            buttonsMarkup = getListParentTag(rowNumber,buttonsMarkup) 
            updateListOfSlots()
            buttonsMarkup = ''
            count = 0
            
           

        }

        
        
    }


 }


// update the root element of the slots
function updateListOfSlots(){
    $("#root-parent").append(buttonsMarkup)
}



/**
 * Select a slot by adding highlight class to its span element and storing its digit in the appropriate row array.
 * @param {object} slotObject - The DOM element of the selected slot.
 */
function selectASlot(slotObject){
   
    
    // Visually highlight the slot selection
    const slotInnerElement =  $(slotObject).find('span');
    $(slotInnerElement).addClass('highlight');

    // Get the row number and selected slot digit
    var rowNumber = getSlotsRowNumber(slotObject);
    var selectedSlot = getSelectedSlotDigit(slotObject);


 

    // add the bet slot selected to the appropriate array
    overallBetsArray[rowNumber] === undefined ?
    overallBetsArray[rowNumber] = [selectedSlot] :
    overallBetsArray[rowNumber].push(selectedSlot)
    
    // log all the selected bets
    console.log(overallBetsArray)

}



function getSlotsRowNumber(eventObject){

    // Splits the class attribute of the event object into an array and selects the last element, which contains the row number.
    var selectedSlotSplittedClass = $(eventObject).find('span').attr('class').split(' ');
    
    return parseInt(selectedSlotSplittedClass[selectedSlotSplittedClass.length - 2]);

    }


    /**
 * Returns the selected slot digit from an event object's innerHTML.
 * @param {Event} eventObject - The event object that was fired when the slot was selected.
 * @returns {number} - The selected slot digit.
 */
function getSelectedSlotDigit(eventObject){

    // Get the selected slot     
    var splittedSelection = eventObject.innerHTML.split('>')[1];
    
    // Sanitize/process it to retrieve the actual digit
    return parseInt(splittedSelection.slice(0,splittedSelection.indexOf('<')));

}



function slot_buttons_markup(index,) {

    // Determines the classes for the button based on the button text and index of a secondary button.
    let buttonClasses = `btn  mx-3 btn-lg btn-${button_color(index)} btn-${slot_buttons_markup_text(index)}`;

    // Determines the ID for the button based on the slot index and row number.
    let buttonId = `btn-${slot_buttons_markup_text(index)}-${index}`;

    // Determines the text to display on the button based on the button text and whether a secondary button exists.
    let buttonTextDisplay =  slot_buttons_markup_text(index) ;
   
    // Returns the HTML markup for the button.
    return ` <button type='button' id='${buttonId}' class='${buttonClasses} ${index}'>${buttonTextDisplay}</button>`;
}



// The following function takes a slot number and row number as inputs and returns a string representing the markup for the slot in the game table.
function buttons_markup (rowNumber,count) {
       
          console.log(rowNumber)
            
   return ` <li class='h1 list-inline-item clickable ${rowNumber}'>
    <span class='border text-${button_color(count)} rounded p-3  ${rowNumber}'>${count}</span>
    </li>`;

  


}

function getListParentTag(row_number,children){
    
    return `<ul class='list-inline mb-5' id = 'li-parent-${row_number}'>${children}</ul>`
}





// returns a corresponding bootstrap colour for each case
function button_color(key){
    switch (key) {
    case 0:
    return 'success';
    case 1:
    return 'warning';
    case 2:
    return 'secondary';
    case 3:
    return 'success';
    case 4:
    return 'warning';
    case 5:
    return 'secondary';
    case 6:
    return 'danger';
    case 7:
    return 'dark';
    case 8:
    return 'secondary';
    case 9:
    return 'dark';
    default:
    return 'success';
    }
    }


    
    
    




