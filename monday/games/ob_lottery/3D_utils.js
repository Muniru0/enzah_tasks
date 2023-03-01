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


// get the Group Markup
function getPlayMethodTypesMarkup(straightPlayMethods = [],GroupPlayMethods = []){

  let playStraightMethodsMarkup = ''
  let playGrouptMethodsMarkup = ''


  
  straightPlayMethods.forEach((playMethod,index,arry)=>{
    playStraightMethodsMarkup +=  ` <div class="play-method__item ${index === 0 && 'current'}" id=${index}>${playMethod.playMethodName}</div>`;
  });


  playStraightMethodsMarkup = playMethodsGroupParent('Straight',(getPlayMethodsParentsMarkup(playStraightMethodsMarkup)))

 
  let numOfStraightBets =  straightPlayMethods.length 
  GroupPlayMethods.forEach((playMethod,index,arry)=>{
  
    playGrouptMethodsMarkup += ` <div class="play-method__item " id=${numOfStraightBets + index}>${playMethod.playMethodName}</div>`

  });
  
  playGrouptMethodsMarkup = playMethodsGroupParent('Group',(getPlayMethodsParentsMarkup(playGrouptMethodsMarkup)))

  return playStraightMethodsMarkup + ' ' + playGrouptMethodsMarkup

}




// get the play methods group name markup
function playMethodsGroupName(playGroupName,index,ID){
  

  
  return  `<li class="play-group-item-parent  ${index === 0 && 'current'}" style="pointer-events:auto;"><div class="play-group-name " id="${ID}">${playGroupName}</div></li>`
}



// get the play methods parent tag
function getPlayMethodsParentsMarkup(children){

  return `<div class="play-method__item-wrap" >${children}</div>`;

 }


  // get the play method group title(e.g Straight or Combo)
  function playMethodsGroupParent(name,children){

    return `<li><span class="play-method__title wuxingzhixuan">${name}</span>${children}</li>`;

  }





 // get the holder tag for both the play method's title and items.
function getPlayMethodParentMarkup(title = '',children = []){

   
  // declare and initialize a string to hold the play Methods and their title
    let childrenMarkupString = '';

   
    // check whether title and the children are present
  if(title.length === 0 || children ===  []) return;

 
  // check the children markup to the {childrenMarkupString}
   children.forEach((item,index,arr) =>{

     childrenMarkupString += item;

   });


   // embed the accumulated markup and return it.
   return `<li>${childrenMarkupString}</li>`
 
}




// get Lottery List header 
 function getLotteryListMarkup(title = '',children = []){

   
  // declare and initialize a string to hold the play Methods and their title
    let childrenMarkupString = '';

   
    // check whether title and the children are present
  if(title.length === 0 || children ===  []) return;

 
  // check the children markup to the {childrenMarkupString}
   children.forEach((lotteryListItemName,index,arr) =>{

     childrenMarkupString +=  `<li data="ticketName81" class="lenMore"><!----> <span class="ticketName" id="${lotteryListItemName}-${index}" style="font-size: 12px;">${lotteryListItemName}</span></li>`;

   });



  return `  <li class="series">
   <div class="list-seriesName"><i class="mk-icon mk-lottery-99"></i> <span class="seriesName">${title}</span> <i class="arrow el-icon-arrow-down"></i></div> 
  <ul class="list-ticketName hidden" style="height: 150px;">${childrenMarkupString}</ul><li> `

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
  

  export {getRandomNumber,getVerticalSlotsActionsButtonsMarkup,slots_buttons_markup,getSlotsActionsButtonsMarkup,arrayRemove,getDrawLotsMarkup,slot_buttons_markup_text,getListParentTag,getPlayMethodTypesMarkup,playMethodsGroupName,getLotteryListMarkup}