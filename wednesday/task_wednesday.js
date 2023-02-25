

const BASE_URL = 'http://localhost:8080/slot_machine/monday/games/ob_lottery/3D_game.php';

// This code defines and initializes various variables used in a slot machine game, such as the number of slots, the user's bet, the machine's bet, a countdown timer, and various arrays to store selected slots and drawn sets.
let firstRowSelectedSlots = [] // An array to store the slots selected by the user in the first row.
let secondRowSelectedSlots = [] // An array to store the slots selected by the user in the second row.
let thirdRowSelectedSlots = [] // An array to store the slots selected by the user in the third row.
let betRowsSelected = [] // An array to store the rows selected by the user for betting.
const machineBet = [[4,5,6,7,8],[0,8,4,2,3],[9,0,1,2,3],[3,5,1,7,8], [2,4,0,5,7]] // A 2D array representing the machine's bet.
const userBet = [5,4,1,6,3] // An array representing the user's bet.
let countDownTimer = 10 // A countdown timer for the game.
let drawsets = [] // An array to store the sets drawn by the machine.
let numberOfSlots = 5 // The number of slots in the game.
let drawLotsMarkup = '' // A string to store the markup for the drawn sets.
let isRefresh = true

let firstSlotMarkup = ''; // A string to store the markup for the first slot in each row.
let firstSlotButtonsMarkup = ''; // A string to store the markup for the buttons associated with the first slot in each row.

let secondSlotMarkup = ''; // A string to store the markup for the second slot in each row.
let secondSlotButtonsMarkup = ''; // A string to store the markup for the buttons associated with the second slot in each row.

let thirdSlotMarkup = ''; // A string to store the markup for the third slot in each row.
let thirdSlotButtonsMarkup = ''; // A string to store the markup for the buttons associated with the third slot in each row.
 



let fourthSlotMarkup = ''; // A string to store the markup for the second slot in each row.
let fourthSlotButtonsMarkup = ''; // A string to store the markup for the buttons associated with the second slot in each row.

let fifthSlotMarkup = ''; // A string to store the markup for the third slot in each row.
let fifthSlotButtonsMarkup = ''; // A string to store the markup for the buttons associated with the third slot in each row.
 




let selectAllVerticalsButtonsMarkup = ''; // A string to store the markup for the vertical buttons associated with the first slot.
let clearAllVerticalSlotsButtonsMarkup = ''; // A string to store the markup for the vertical buttons associated with the second slot.



let tableRowMarkup = ''; // A string to store the markup for a row in the game table.

let machineSelection = [4,1,5,2,1]
let userSelection = [ [1,0,5,7,4], [3,5,7,8,2], [3,6,8,5,4], [7,9,4,1,2], [0,2,4,3,5] ]


// The following function takes a slot number and row number as inputs and returns a string representing the markup for the slot in the game table.
function slot_markup (slot_number,row_number) {
    return ` <li class='h1 list-inline-item clickable ${row_number}'>
    <span class='border text-${button_color(slot_number)} rounded p-3 ${slot_number}'>${slot_number}</span>
    </li>`;
};




// The following function takes an index as input and returns a string representing the markup for a drawn set in the game table.
function getDrawLotsMarkup(index){
    return `<li class='h1 list-inline-item clickable lot-${index}'>
    <span class='border text-warning rounded p-3' id='lot-${index}'>0-9</span>
    </li>`;
}

/**
 * Generates the markup for a slot button.
 * @param {number} index - The index of the slot.
 * @param {number} row_number - The number of the row the slot belongs to.
 * @param {string} [buttonText=''] - The text to display on the button.
 * @param {number} [verticalButtonsColumnsIndex] - The index of a secondary button (optional).
 * @returns {string} - The HTML markup for the button.
 */
function slot_buttons_markup(index, row_number, buttonText = '', verticalButtonsColumnsIndex) {

    // Determines the classes for the button based on the button text and index of a secondary button.
    let buttonClasses = `btn ${buttonText.length > 0 ? (buttonText == 'All' ? 'btn-vertical-all' : 'btn-vertical-clr') : ''} ${buttonText.length == 0 ? 'mx-3 btn-lg ' : (verticalButtonsColumnsIndex == 0 ? 'btn mml-0 ' : 'btn mmx-3')} btn-${button_color(index)} ${buttonText.length == 0 ? `btn-${slot_buttons_markup_text(index)}` : ''}`;

    // Determines the ID for the button based on the slot index and row number.
    let buttonId = `btn-${slot_buttons_markup_text(index)}-${row_number}`;

    // Determines the text to display on the button based on the button text and whether a secondary button exists.
    let buttonTextDisplay = buttonText.length == 0 ? slot_buttons_markup_text(index) : buttonText;
   
    // Returns the HTML markup for the button.
    return ` <button type='button' id='${buttonId}' class='${buttonClasses} ${buttonText.length != 0 ? verticalButtonsColumnsIndex : row_number}'>${buttonTextDisplay}</button>`;
}

/**
 * Determines the text to display on the slot button based on the slot index.
 * @param {number} key - The index of the slot.
 * @returns {string} - The text to display on the button.
 */
function slot_buttons_markup_text(key) {
    switch (key) {
        case 0:
            return 'odd';
        case 1:
            return 'even';
        case 2:
            return 'big-slots';
        case 3:
            return 'small-slots';
        case 4:
            return 'All';
        case 5:
            return 'Clear';
        default:
            return 'Unknown Action';
    }
}



    
// This code executes once the DOM is ready
$(function(){

   
    // perform API request to a php server

    // ...

    makePhpApiCall()

    // task 2
    machineAndUserSelection()

    // // Set up a timer countdown
    setInterval(()=>{
        
      let locallyStoredTimer = window.localStorage.getItem('time');
      
      console.log(locallyStoredTimer)
        if(locallyStoredTimer !== undefined ){
            if(countDownTimer !== parseInt(locallyStoredTimer)){
                countDownTimer = locallyStoredTimer
            }
            
        }  


      // When the countdown reaches 1, reset the timer and draw lots
      if(countDownTimer <= 0){
        resetCountDownTimer();
        drawLots()
      }
    //   Decrement the timer and display the updated time on the page
       countDownTimer -= 1
      $('#timer').text( ': ' + countDownTimer)
     
      // update the locally stored timer
      window.localStorage.setItem('time',   JSON.stringify(countDownTimer) );
      
    },1000);
    
    // If the max number of selections has been reached for the first row, log an error message and return
    if(firstRowSelectedSlots.length >= 1 ){
      console.log('max number of selections reached for first row');
      return;
    }
  
    // If the max number of selections has been reached for the second row, log an error message and return
    if(secondRowSelectedSlots.length >= 10 ){
      console.log('max number of selections reached for row 2');
      return;
    }
  
    // If the max number of selections has been reached for the third row, log an error message and return
    if(thirdRowSelectedSlots.length >= 10 ){
      console.log('max number of selections reached for row 3');
      return;
    }
  
    // Loop through 10 slots to prepare the markup for each slot
    for (let index = 0; index < 10; index++) {
      
      // If the slot is within the number of slots limit, add the draw lots markup
      if(index < numberOfSlots){
        drawLotsMarkup = drawLotsMarkup.concat(' ', getDrawLotsMarkup(index))
      }
  
      // If the slot is the last one within the number of slots limit, append the draw lots markup to the parent element
      if(index == numberOfSlots - 1){
        $('#draw-lots-parent').append(drawLotsMarkup)
      }
  
      // Prepare the slots markup for each row
      firstSlotMarkup = firstSlotMarkup.concat(' ',slot_markup(index,1)) 
      secondSlotMarkup = secondSlotMarkup.concat(' ',slot_markup(index,2)) 
      thirdSlotMarkup = thirdSlotMarkup.concat(' ',slot_markup(index,3)) 
      fourthSlotMarkup = fourthSlotMarkup.concat(' ',slot_markup(index,4)) 
      fifthSlotMarkup = fifthSlotMarkup.concat(' ',slot_markup(index,5)) 
  


      // Prepare the slots buttons markup
      selectAllVerticalsButtonsMarkup = selectAllVerticalsButtonsMarkup.concat(' ',slot_buttons_markup(4,4,'All',index)) 
      clearAllVerticalSlotsButtonsMarkup = clearAllVerticalSlotsButtonsMarkup.concat(' ',slot_buttons_markup(5,5,'Clr' ,index)) 


  
      // If the index is less than or equal to 5, add the buttons markup to the appropriate slot
       if(index <= 5){
      firstSlotButtonsMarkup = firstSlotButtonsMarkup.concat(' ',slot_buttons_markup(index,1)) 
      secondSlotButtonsMarkup = secondSlotButtonsMarkup.concat(' ',slot_buttons_markup(index,2)) 
      thirdSlotButtonsMarkup = thirdSlotButtonsMarkup.concat(' ',slot_buttons_markup(index,3)) 
      fourthSlotButtonsMarkup = fourthSlotButtonsMarkup.concat(' ',slot_buttons_markup(index,4)) 
      fifthSlotButtonsMarkup = fifthSlotButtonsMarkup.concat(' ',slot_buttons_markup(index,5)) 
       }
  
      // If the index is 9, append the slot buttons markup to the end of the slots
   if(index == 9){
        
       firstSlotMarkup = firstSlotMarkup.concat(' ',firstSlotButtonsMarkup);
       secondSlotMarkup = secondSlotMarkup.concat(' ',secondSlotButtonsMarkup);
       thirdSlotMarkup = thirdSlotMarkup.concat(' ', thirdSlotButtonsMarkup)
       fourthSlotMarkup = fourthSlotMarkup.concat(' ',fourthSlotButtonsMarkup);
       fifthSlotMarkup = fifthSlotMarkup.concat(' ', fourthSlotButtonsMarkup)
     
   

       }
  
      
  
    }

    // Append the prepared slots markup to the appropriate parent elements
    $('#first-li-parent').append(firstSlotMarkup);
    $('#second-li-parent').append(secondSlotMarkup);
    $('#third-li-parent').append(thirdSlotMarkup);
    $('#fourth-li-parent').append(secondSlotMarkup);
    $('#fifth-li-parent').append(thirdSlotMarkup);
    $('#first-vertical-li-parent').append(selectAllVerticalsButtonsMarkup);
    $('#second-vertical-li-parent').append(clearAllVerticalSlotsButtonsMarkup)

    

    // start by drawing lots
     drawLots()

    // turns the elements of an array into arrays as elements
    // of a different array
    copyArray()



   

// draw lots 
$('#draw-lots').click(function(){drawLots(true)})

// make api call

$('#make-api-call').click(function(){makeApiCall()})



// listen-in on the selection of slot
$('li').click(function(){selectASlot(this);})


// select odd or even slots buttons
$('.btn-odd').click(function(){selectAllOdd(this)});
$('.btn-even').click(function(){selectAllEven(this)});
  

// select big & small slots buttons
$('.btn-big-slots').click(function(){selectAllBigSlots(this)});
$('.btn-small-slots').click(function(){selectAllSmallSlots(this)});


// select all buttons
$('.btn-All').click(function(){selectAllSlots(this)});
$('.btn-vertical-all').click(function(){ selectAllVerticalSlots(this)});   

// clear selections buttons
$('.btn-Clear').click(function(){ clearAllSelected(this)});
$('.btn-vertical-clr').click(function(){ clearAllVerticalSlots(this)});


// place machineBet buttons
$('#btn-place-machineBet').click(function(){ placeBet()});
$('#btn-place-vertical-bet').click(function(){ placeVerticalBet(machineBet)});


        //summation of eight
        console.log(summationOfEight())

        // fizzbuzz
       console.log(fizzBuzz(15))
       console.log(fizzBuzz(5))
       console.log(fizzBuzz(3))
       console.log(fizzBuzz(11))
       console.log(fizzBuzz(''))
      


      // start timer count down
      setInterval(()=>{
       makeApiCall()
        
    },60000);

});


function machineAndUserSelection() {
    
        let winCount = 0

        // traverse the entire user Selection
        userSelection.forEach((userBet,outerIndex,array)=>{
            
            // for efficiency check to see first items in both the
            // user selection and the machine selection are the same
            if((userBet[0] + userBet[userBet.length])  === (machineSelection[0] + machineSelection[machineSelection.length])){
    
               winCount += 1; 

            }
    
        });
    
      console.log(`The user has won:${winCount} and lost:${userSelection.length - winCount}`);
    
     
}

const makePhpApiCall = async () => {
    try {
        let royalBetType = 5;
      const response = await axios.get(`${BASE_URL}?royal=${royalBetType}`);
  
      const responseData = response.data;
  
      console.log( responseData);
  
      return responseData;
    } catch (errors) {
      console.error(errors);
    }
  };
  


/**
 * Select a slot by adding highlight class to its span element and storing its digit in the appropriate row array.
 * @param {object} slotObject - The DOM element of the selected slot.
 */
function selectASlot(slotObject){
    // Find the span element inside the slot and add the highlight class
    const slotInnerElement =  $(slotObject).find('span');
    $(slotInnerElement).addClass('highlight');

    // Get the row number and selected slot digit
    let rowNumber = getSlotsRowNumber(slotObject);
    let selectedSlot = getSelectedSlotDigit(slotObject);
  
    // Update the array of selected slots for the appropriate row
    if(rowNumber === 1){
        if(firstRowSelectedSlots.includes(selectedSlot)){
            // If the slot is already selected, remove the highlight and remove it from the array
            $(slotInnerElement).removeClass('highlight');
            const indexOfSelectSlot = firstRowSelectedSlots.indexOf(selectedSlot);
            firstRowSelectedSlots.splice(indexOfSelectSlot,1);
            firstRowSelectedSlots.sort()
        }else{
            // If the slot is not selected, add it to the array and sort it
            firstRowSelectedSlots.push(selectedSlot);
            firstRowSelectedSlots.sort();
        }
    }else if(rowNumber === 2){
        if(secondRowSelectedSlots.includes(selectedSlot)){
            $(slotInnerElement).removeClass('highlight');
            const indexOfSelectSlot = secondRowSelectedSlots.indexOf(selectedSlot);
            secondRowSelectedSlots.splice(indexOfSelectSlot,1);
            secondRowSelectedSlots.sort()
        }else{
            secondRowSelectedSlots.push(selectedSlot);
            secondRowSelectedSlots.sort();
        }
    }else if(rowNumber === 3){
        if(thirdRowSelectedSlots.includes(selectedSlot)){
            $(slotInnerElement).removeClass('highlight');
            const indexOfSelectSlot = thirdRowSelectedSlots.indexOf(selectedSlot);
            thirdRowSelectedSlots.splice(indexOfSelectSlot,1);
            thirdRowSelectedSlots.sort()
        }else{
            thirdRowSelectedSlots.push(selectedSlot);
            thirdRowSelectedSlots.sort();
        }
    }
    // Log the arrays of selected slots for each row
    console.log(firstRowSelectedSlots);
    console.log(secondRowSelectedSlots);
    console.log(thirdRowSelectedSlots);
}





/**

Returns a Bootstrap color class based on the provided key value.
@param {number} key - The input key value for selecting a color class.
@returns {string} The corresponding Bootstrap color class for the provided key.
*/
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


    
    
    
    
    

/**
 * Clears all currently selected slots and selects only the even slots in the row of the clicked event object.
 * @param {Object} eventObject - The event object that triggered the function.
 */
function selectAllEven(eventObject){
    // Clear all currently selected slots
    clearAllSelected(eventObject);
    
    // Get the row number of the slots in the clicked event object
    let rowNumber = getSlotsRowNumber(eventObject);
    
    // Find all slots in the row
    let allSlots = $(document).find(`li.${rowNumber}`);
    
    // Iterate over each slot in the row
    for (let index = 0; index < allSlots.length; index++) {
        let eventObject = allSlots[index];
        
        // If the slot digit is even, select the slot
        if(getSelectedSlotDigit(eventObject) % 2 == 0){
            selectASlot(eventObject);
        }
    }

    // Log the currently selected slots in the first row
    console.log(firstRowSelectedSlots); 
}


/**
 * Select all odd-numbered slots in the row of the clicked slot.
 * Clears any previously selected slots.
 * 
 * @param {Event} eventObject - The event object for the clicked slot.
 */
function selectAllOdd(eventObject){
   
    // Clear any previously selected slots.
    clearAllSelected(eventObject);
    
    // Get the row number of the clicked slot.
    let rowNumber = getSlotsRowNumber(eventObject);
    
    // Get all the slots in the row of the clicked slot.
    let allSlots = $(document).find(`li.${rowNumber}`);
    console.log(allSlots[1]);
    
    // Loop through all the slots in the row and select the odd-numbered slots.
    for (let index = 0; index < allSlots.length; index++) {
        let eventObject = allSlots[index];
        if(getSelectedSlotDigit(eventObject) % 2 == 1){
            selectASlot(eventObject);
        }
    }

    // Log the array of first row selected slots to the console.
    console.log(firstRowSelectedSlots); 
}



 
/**

selectAllBigSlots - selects all the big slots in a given row and logs the firstRowSelectedSlots

@param {eventObject} eventObject The object representing the event that triggered the function

@return {undefined} The function does not return a value
*/
function selectAllBigSlots(eventObject){
    // Clears all selected slots before selecting new ones
    clearAllSelected(eventObject);
    
    // Gets the row number of the clicked slot
    let rowNumber = getSlotsRowNumber(eventObject);
    
    // Finds all the slots in the given row
    let allSlots = $(document).find(`li.${rowNumber}`);
    
    // Selects the last five slots in the row
    for (let index = 5; index < 10; index++) {
    selectASlot(allSlots[index]);
    }
    
    // Logs the firstRowSelectedSlots
    console.log(firstRowSelectedSlots);
    }







 
/**

selectAllSmallSlots - selects all the small slots in a given row and logs the firstRowSelectedSlots

@param {eventObject} eventObject The object representing the event that triggered the function

@return {undefined} The function does not return a value
*/
function selectAllSmallSlots(eventObject){
    // Clears all selected slots before selecting new ones
    clearAllSelected(eventObject);
    
    // Gets the row number of the clicked slot
    let rowNumber = getSlotsRowNumber(eventObject);
    
    // Finds all the slots in the given row
    let allSlots = $(document).find(`li.${rowNumber}`);
    
    // Selects the first five slots in the row
    for (let index = 0; index < 5; index++) {
    selectASlot(allSlots[index]);
    }
    
    // Logs the firstRowSelectedSlots
    console.log(firstRowSelectedSlots);
    }

/**
 * Selects all slots in a given row of a table and adds the 'highlight' class to the corresponding HTML elements.
 *
 * @param {Object} eventObject - The event object that triggered the function.
 */
function selectAllSlots(eventObject) {

    // Get the row number of the slots to be selected
    let rowNumber = getSlotsRowNumber(eventObject);

    // Find all the slots in the row
    let allSlots = $(document).find(`li.${rowNumber}`);
   
    // Add the 'highlight' class to all the slots in the row
    for (let index = 0; index < allSlots.length; index++) {
        
        const slot = $(allSlots[index]).find('span');
        if(!$(slot).hasClass('highlight')){
            $(slot).addClass('highlight');
        }
    }

    // Determine which row was selected and log the selected slots for debugging purposes
    let justToLog;
    if(rowNumber === 1){
        justToLog =  firstRowSelectedSlots = [0,1,2,3,4,5,6,7,8,9];
    } else if(rowNumber === 2) {
        justToLog =  secondRowSelectedSlots = [0,1,2,3,4,5,6,7,8,9];
    } else if(rowNumber === 3) {
        justToLog = thirdRowSelectedSlots = [0,1,2,3,4,5,6,7,8,9];
    }
    
    console.log(justToLog)
}


/**
 * Selects and highlights all the slots within a particular column of a schedule grid
 * @param {Event} eventObject - The event object representing the user's interaction with the schedule grid
 */
function selectAllVerticalSlots(eventObject){




    let slotsColumnNumber = getSlotsColumnNumber(eventObject); // Get the column number of the selected slots
    console.log(slotsColumnNumber);
  
    let allSlots = $(document).find(`span.${slotsColumnNumber}`); // Find all the slots with the same column number
    let justToLog;

    

    // Loop through all the slots and highlight them if they're not already highlighted
    for (let index = 0; index < allSlots.length; index++) {
        let slot = allSlots[index];
        if(!$(slot).hasClass('highlight')){
            $(slot).addClass('highlight');
        }
        
    }

    // Update and log the arrays that keep track of which slots are selected in each row
    if(!firstRowSelectedSlots.includes(slotsColumnNumber)){
        firstRowSelectedSlots.push(slotsColumnNumber);
        firstRowSelectedSlots.sort();
    }

    if(!secondRowSelectedSlots.includes(slotsColumnNumber)){
        secondRowSelectedSlots.push(slotsColumnNumber);
        secondRowSelectedSlots.sort();
    }

    if(!thirdRowSelectedSlots.includes(slotsColumnNumber)){
        thirdRowSelectedSlots.push(slotsColumnNumber);
        thirdRowSelectedSlots.sort();
    }

    // console.log(firstRowSelectedSlots);
    // console.log(secondRowSelectedSlots);
    // console.log(thirdRowSelectedSlots);
}



/**
 * Clear all the slots that belong to a row and are currently selected.
 * @param {object} eventObject - The object representing the event that triggered this function.
 */
function clearAllSelected(eventObject){
    
    // Get the row number of the slots to be cleared.
    let slotsRowNumber = getSlotsRowNumber(eventObject);
    
    // If there are no slots to clear, return and log a message.
    if(getSelectedSlotsArray(slotsRowNumber).length < 1){
        console.log('Slots cleared.');
        return;
    }
    
    // Find all slots that belong to the specified row and remove their highlight class.
    let allSlots = $(document).find(`li.${slotsRowNumber}`);
    for (let index = 0; index < allSlots.length; index++) {
        $(allSlots[index]).find('span').removeClass('highlight');
    }
   
    // Clear the array of selected slots for the specified row and log the cleared array.
    let justToLog;
    if(slotsRowNumber === 1){
        justToLog =  firstRowSelectedSlots = [];
    }else if(slotsRowNumber === 2){
        justToLog =  secondRowSelectedSlots = [];
    }
    else if(slotsRowNumber === 3){
        justToLog = thirdRowSelectedSlots = [];
    }
    console.log(justToLog)
}





/**
 * Removes the "highlight" class from all slots in a vertical column and removes the column number from corresponding row arrays.
 * @param {object} eventObject - Event object passed to the function, usually generated by user actions
 */
function clearAllVerticalSlots(eventObject){
    // Get the column number for the clicked slot
    let slotsColumnNumber = getSlotsColumnNumber(eventObject);
    console.log(slotsColumnNumber)

    // Find all slots in the same column
    let allSlots = $(document).find(`span.${slotsColumnNumber}`);
    let justToLog;

    console.log(allSlots)

    // Remove the "highlight" class from each slot in the column
    for (let index = 0; index < allSlots.length; index++) {
        let slot = allSlots[index];
        $(slot).removeClass('highlight');
    }

    // If the column number exists in any of the row arrays, remove it from the array and sort the array
    if(firstRowSelectedSlots.includes(slotsColumnNumber)){
        const indexOfSelectSlot = firstRowSelectedSlots.indexOf(slotsColumnNumber);
        firstRowSelectedSlots.splice(indexOfSelectSlot,1);
        firstRowSelectedSlots.sort()
        console.log(`${slotsColumnNumber} has being Removed from the first array`)
    }

    if(secondRowSelectedSlots.includes(slotsColumnNumber)){
        const indexOfSelectSlot = secondRowSelectedSlots.indexOf(slotsColumnNumber);
        secondRowSelectedSlots.splice(indexOfSelectSlot,1);
        secondRowSelectedSlots.sort()
        console.log(`${slotsColumnNumber} has being Removed  from the second array`)
    }

    if(thirdRowSelectedSlots.includes(slotsColumnNumber)){
        const indexOfSelectSlot = thirdRowSelectedSlots.indexOf(slotsColumnNumber);
        thirdRowSelectedSlots.splice(indexOfSelectSlot,1);
        thirdRowSelectedSlots.sort()
        console.log(`${slotsColumnNumber} has being Removed  from the third array`)
    }

    // Log the updated row arrays to the console
    console.log(firstRowSelectedSlots)
    console.log(secondRowSelectedSlots)
    console.log(thirdRowSelectedSlots)
}



/**

Places a bet using the currently selected slot rows. The function logs the selected rows to the console.

@returns {void}
*/
function placeBet(){

    // Creates an array of the selected slot rows.
    let betRowsSelected = [firstRowSelectedSlots, secondRowSelectedSlots, thirdRowSelectedSlots];
    
    // Logs the selected slot rows to the console.
    console.log(betRowsSelected);
    
    // NOTE: The following code is currently commented out and not functional.
    // It appears to send a post request with the selected slots to a PHP script.
    // However, it does not include any error handling or confirmation of successful submission.
    // Therefore, it is not recommended to use this code as-is.
    
    // if(selectedSlots.length != 5){
    // console.log('Sorry, please select 5 slots to play.');
    // return;
    // }
    
    // $.post("task_3.php",
    // {
    // selected_slots: selectedSlots,
    
    // },
    // function(data, status){
    // console.log("Data: " + data + "\nStatus: " + status);
    // });
    }
    
    
    
    
    

/**

Given an event object, extracts the row number of the selected slot and returns it as a number.

@param {Object} eventObject - The event object representing the user's interaction with the slot.

@returns {Number} The row number of the selected slot.
*/
function getSlotsRowNumber(eventObject){

    // Splits the class attribute of the event object into an array and selects the last element, which contains the row number.
    let selectedSlotSplittedClass = $(eventObject).attr('class').split(' ');
    console.log(`splittedClass: ${selectedSlotSplittedClass}`)
    return parseInt(selectedSlotSplittedClass[selectedSlotSplittedClass.length - 1]);
    }



/**
 * Returns the column number of the selected slot.
 *
 * @param {Object} eventObject - The event object of the clicked slot.
 * @return {Number} - The column number of the selected slot.
 */
function getSlotsColumnNumber(eventObject){
    
    // Get the class attribute of the selected slot
    let selectedSlotSplittedClass = $(eventObject).attr('class').split(' ');
    
    // Return the last element of the splitted class, which is the column number
    return  parseInt(selectedSlotSplittedClass[selectedSlotSplittedClass.length - 1]);
}



/**
 * Returns the selected slot digit from an event object's innerHTML.
 * @param {Event} eventObject - The event object that was fired when the slot was selected.
 * @returns {number} - The selected slot digit.
 */
function getSelectedSlotDigit(eventObject){

    // Get the selected slot     
    let splittedSelection = eventObject.innerHTML.split('>')[1];
     
    // Sanitize/process it to retrieve the actual digit
    return parseInt(splittedSelection.slice(0,splittedSelection.indexOf('<')));
}



/**
 * Returns the array of selected slots for a given row number.
 * 
 * @param {number} row_number - The number of the row to get the selected slots for (1, 2, or 3).
 * 
 * @returns {array} - The array of selected slots for the given row number.
 */
function getSelectedSlotsArray(row_number){

    switch (row_number) {
        case 1:
            // Return the array of selected slots for the first row.
            return firstRowSelectedSlots;
        case 2:
            // Return the array of selected slots for the second row.
            return secondRowSelectedSlots;
        case 3:
            // Return the array of selected slots for the third row.
            return thirdRowSelectedSlots;
    
        default: return []
            // If the row number is not 1, 2, or 3, return nothing.
            break;
    }
}



/**
 * Compares the received bet with each inner array of the main array for a matching sequence and digit. 
 * @param {Array} receivedBet - the bet provided by the user
 */
function placeVerticalBet(receivedBet){

    // boolean flag to indicate if array has been found within the main array.
    let ifArrayFound = false;

    // boolean flag to indicate if digit 9 has been found within the main array.
    let ifDigitFound = false;

    // loop through each inner array of the main array 
    for (let outerIndex = 0; outerIndex < receivedBet.length; outerIndex++) {

        // Sort the current inner array, and compare it to the userBet array
        let sortedMachineBet = receivedBet[outerIndex].sort();
        if(JSON.stringify(sortedMachineBet) == JSON.stringify(userBet.sort())){
            console.log(`UserBet found @ index: ${index} within machineBet.`)
            ifArrayFound = true;
        }

        // loop through each element of the current inner array
        for (let index = 0; index < receivedBet[outerIndex].length; index++) {
            let innerArrayElement = receivedBet[outerIndex][index]
         
            // check if the current element is a 9
            if(innerArrayElement == 9){
                console.log(`Digit(9) found @ index : (${outerIndex}) of main array`)
                console.log(receivedBet)
                console.log(`And index: (${index}) of inner array .`)
                console.log(receivedBet[outerIndex])
                
                ifDigitFound = true;
           }
        }
    }

    console.log('\n\n')
    console.log(`Has array being found: ${ifArrayFound} \n Has digit being found: ${ifDigitFound}`)
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
  
   

    let locallyStoredDrawlots = window.localStorage.getItem('drawlots')
    

    if(drawset.toString() !== locallyStoredDrawlots && isRefresh){
      drawset =  locallyStoredDrawlots.split(',')
        
      console.log(locallyStoredDrawlots.split(','))

      for (let index = 0; index < drawset.length; index++) {
        // update the ui
        $(`#lot-${index}`).text(drawset[index]);
      }
      isRefresh = false;
        
    }else{

         for (let index = 0; index < drawString.length; index++) {
        drawSlot = drawString[index];
    
        // push the slot into the drawn slots array
        drawset.push(drawSlot);
        
        // update the ui
        $(`#lot-${index}`).text(drawSlot);
      }


    }
    

    // push the set into the parent's array
    drawsets.push(drawset);



    // store the values in the local storage
    window.localStorage.setItem('drawlots', (drawset.toString()));
  


    // Reset the countdown timer if requested
    if (resetTimer) {
      resetCountDownTimer();
    }


  }



  
/**
 * Resets the count down timer to 60.
 */
function resetCountDownTimer(){
    countDownTimer = 10;
}


/**
 * Copies the elements of an array into a new array with nested arrays for each element.
 * @returns {undefined}
 */
function copyArray(){
    // the original array with integer elements
    let originalArray = [0,1,2,3,4,5,6,7,8,9];
    
    // the new array that will store each element in a nested array
    let newOuterArray = [];

    // loop through each element in originalArray, creating a new nested array with the element
    for (let index = 0; index < originalArray.length; index++) {
        
        newOuterArray.push([originalArray[index]]);
    }

    // log both arrays to the console
    console.log([0,1,2,3,4,5,6,7,8,9]);
    console.log(newOuterArray);
}


/**
 * This function creates a copy of an original array and stores each element in a nested array.
 * 
 * @returns {undefined} This function does not return anything.
 */
function copyArray(){
    // the original array with integer elements
    let originalArray =  [0,1,2,3,4,5,6,7,8,9];
    
    // the new array that will store each element in a nested array
    let newOuterArray = [];

    // loop through each element in originalArray, creating a new nested array with the element
    for (let index = 0; index < originalArray.length; index++) {
        
        newOuterArray.push([originalArray[index]])
        
    }

    // log both arrays to the console
    console.log([0,1,2,3,4,5,6,7,8,9])
    console.log(newOuterArray)

}




/**
 * Makes an API call to https://jsonplaceholder.typicode.com/posts?phone
 * and displays the results in a table on the page.
 *
 * @returns {Promise<void>} A promise that resolves once the API response has been displayed on the page.
 */
async function makeApiCall() {
    try {

        // Check and remove all child nodes from the table body
        if($("#table-body").has("tr")){
            $("#table.body").empty()
        }

      // Add a busy indicator to the table while waiting for the API response.
      $('#table-body').append(apiRequestBusyIndicator()); 
  
      // Make the API request using fetch().
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  
      // Check the response status.
      if (!response.ok) {
        throw new Error('File not found');
      }
  
      // Parse the response data as JSON.
      const jsonData = await response.json();
  
      // Build the table row markup using the API response data.
      let tableRowMarkup = '';
      for (const data of jsonData) {
        tableRowMarkup += getTableRowMarkup(data.userId, data.id, data.title, data.body);
      }
  
      // Remove the busy indicator and append the table row markup to the table.
      $('#busy-indicator').remove();
      $('#table-body').append(tableRowMarkup);
    } catch (error) {
      console.error(error);
    }
  }
  


/**
 * Returns an HTML markup for a table row that displays a busy indicator
 * while an API request is in progress.
 *
 * @returns {string} The HTML markup for the table row with the busy indicator.
 */
function apiRequestBusyIndicator() {
    // Create an HTML markup for the table row with a busy indicator.
    // The row displays 'loading' for the first two columns and 'loading...' for the last two columns.
    return `<tr id='busy-indicator'>
        <td>loading</td>
        <td>loading</td>
        <td>loading...</td>
        <td>loading...</td>
      </tr>`
  }
  



/**
 * Returns an HTML markup for a table row using provided user ID, ID, title, and body.
 *
 * @param {number} userId - The ID of the user associated with the row.
 * @param {number} id - The unique ID of the row.
 * @param {string} title - The title of the row.
 * @param {string} body - The body of the row.
 * @returns {string} The HTML markup for the table row.
 */
function getTableRowMarkup(userId, id, title, body) {
    // Create the table row markup with the provided data and return it as a string.
    return `<tr>
           <td>${userId}</td>
           <td>${id}</td>
           <td>${title}</td>
           <td>${body}</td>
         </tr>`;
  }
  



/**
 * Calculates the pairs of indexes whose values add up to 8.
 * @returns {Array} Returns an array containing the pairs of indexes whose values add up to 8.
 */
function summationOfEight(){
    // The array of numbers to search for pairs
    let parentArray = [0,1,2,3,4,5,6,7,8,9];
    
    // The resulting array that will contain the pairs of indexes
    let secondArr = [];
   
    // Starting at the middle of the summation digit, get the indexes whose values add up to 8
    for (let index1 = 0; index1 < parentArray.length; index1++) {
        
        // If the current index has already passed the middle, break the loop
        if(index1 == 5){
            break;
        }
        
        // Loop through the parentArray and find the pairs of indexes whose values add up to 8
        for (let index = 0; index < parentArray.length; index++) {
            
            // If the sum of the values of the current index and the first index equals 8 and they are not the same index, add the pair to the secondArr array
            if((index + parentArray[index1] == 8) && (index != parentArray[index1])){
                secondArr.push([parentArray.indexOf(index),parentArray.indexOf(parentArray[index1])])
            }
            
        }
        
    }
 
    // Return the secondArr array
    return secondArr;
}






/**
 * Determines the FizzBuzz value for a given input.
 * @param {number} input - The number to evaluate.
 * @returns {string|number} - The FizzBuzz value for the input.
 */
function fizzBuzz(input) {

    // Check if input is not an integer
    if(!Number.isInteger(input)){
        // Return 'NaN' if input is not an integer
        return 'NaN';
    }

    // Check if input is divisible by both 3 and 5
    else if ((input % 3 == 0) && (input % 5 == 0)) {
        // Return 'FizzBuzz' if input is divisible by both 3 and 5
         return 'FizzBuzz';
    }

    // Check if input is divisible by 3
    else if(input % 3 == 0){
        // Return 'Fizz' if input is divisible by 3
        return 'Fizz';
    } 

    // Check if input is divisible by 5
    else if(input % 5 == 0){
        // Return 'Buzz' if input is divisible by 5
        return 'Buzz';
    }

    // If input is not divisible by either 3 or 5
    else if((input % 3 != 0) && (input % 5 != 0)){
        // Return the input number
        return input;
    }
    }

