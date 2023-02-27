 // get horizontal buttons
 function getSlotsActionsButtonsMarkup(rowNumber, count,) {

    // construct a 2D html ID for the button based on the rows and columns
    let buttonId = `${slot_buttons_markup_text(count)}-${rowNumber}-h`;
  
    // find the appropriate text for the button(odd,even,small,big,etc)
    let buttonTextDisplay = slot_buttons_markup_text(count);
  
    // now return the horizontal action button
    return `<div class="row-btns ${rowNumber}" id='${buttonId}'> <span class="all">${buttonTextDisplay}</span></div>`;
  
  }
  

  
 // build the vertical action buttons
 function getVerticalSlotsActionsButtonsMarkup(index, count,displayText ='All') {
   
    // Determines the ID for the button based on the slot index and row number.
      let buttonId = `${slot_buttons_markup_text(count)}-${index}-v`;
    
      // Determines the text to display on the button based on the button text and whether a secondary button exists.
      let style = index === 50 ? 'margin-left:0px;' : 'margin-left:13px;'
    
      return `<div style=${style} class="row-btns ${index}" id='${buttonId}'> <span class="all">${displayText}</span></div>`;
    
    }
    
  

  // The following function takes a slot number and row number as inputs and returns a string representing the markup for the slot in the game table.
  function slots_buttons_markup(rowNumber, count) {
    return `<div class="ball">
            <div class="ball-item ${rowNumber}" id="${rowNumber}-${count}">${count}</div> 
        <div class="ball-cm"></div>
        </div>`;
  }



  // get slots parent tag
  function getListParentTag(row_number, children) {
    return `<li class='balls-row'><div class='row-balls ${row_number}'>${children}</div></li>`;
  }

  // get slots buttons markup text
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

  // get the draw lots markup
  function getDrawLotsMarkup(index){
    return `<li class='h1 list-inline-item clickable lot-${index}'>
    <span class='border text-warning rounded p-3' id='lot-${index}'>0-9</span>
    </li>`;
}




 //------------------LOGIC----------------------

 function arrayRemove(array, element, sort = false) {
    array.splice(array.indexOf(element), 1);
    sort && array.sort();
  }

  function getRandomNumber(seed) {
    let randomNumber = (Math.random() * (10 ** seed)).toString().split('.')[0];
    if(randomNumber.length < seed){
    randomNumber +=  (Math.random() * (10 ** seed)).toString().split('.')[0]
   return parseInt(randomNumber.substring(0,5))
    }

    return parseInt(randomNumber)
  }
  

  export {getRandomNumber,getVerticalSlotsActionsButtonsMarkup,slots_buttons_markup,getSlotsActionsButtonsMarkup,arrayRemove,getDrawLotsMarkup,slot_buttons_markup_text,getListParentTag}