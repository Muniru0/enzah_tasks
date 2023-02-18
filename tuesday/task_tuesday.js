

 function slot_markup (slot_number,row_number) {
   // key = parseInt(String(Math.random()*10).split('.')[0]);
    return ` <li class='h1 list-inline-item clickable ${row_number}'>
 <span class='border text-${button_color(slot_number)} rounded p-3'>${slot_number}</span>
</li>`};

function slot_buttons_markup(index,row_number){

    return ` <button type='button' id='btn-${slot_buttons_markup_text(index)}-${row_number}' class='btn mx-3 btn-${button_color(index)} btn-lg btn-${slot_buttons_markup_text(index)} ${row_number}'>${slot_buttons_markup_text(index)}</button>`;
    
    
}

function slot_buttons_markup_text(key){

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
        
    
        default: 'Unknown Action'
            break;
    }

}


 var firstRowSelectedSlots = []
 var secondRowSelectedSlots = []
 var thirdRowSelectedSlots = []
 var betRowsSelected = []
 var createSlotsList = true;
 
 var firstSlotMarkup = '';
 var firstSlotButtonsMarkup = '';
 
 
 var secondSlotMarkup = '';
 var secondSlotButtonsMarkup = '';
 
 
 var thirdSlotMarkup = '';
 var thirdSlotButtonsMarkup = '';



// wait for the document to finish rendering
$(function(){
    
    if(firstRowSelectedSlots.length >= 1 ){
     console.log('max number of selections reached for first row');
     return;
    }

    if( secondRowSelectedSlots.length >= 10 ){
     console.log('max number of selections reached for row 2');
     return;
    }

    if( thirdRowSelectedSlots.length >= 10 ){
     console.log('max number of selections reached for row 3');
     return;
    }

    if(createSlotsList){
        console.log('it is happening in here.')
        for (let index = 0; index < 10; index++) {
            

            firstSlotMarkup = firstSlotMarkup.concat(' ',slot_markup(index,1)) 
            secondSlotMarkup = secondSlotMarkup.concat(' ',slot_markup(index,2)) 
            thirdSlotMarkup = thirdSlotMarkup.concat(' ',slot_markup(index,3)) 
            
            if(index <= 5){

                firstSlotButtonsMarkup = firstSlotButtonsMarkup.concat(' ',slot_buttons_markup(index,1)) 
                secondSlotButtonsMarkup = secondSlotButtonsMarkup.concat(' ',slot_buttons_markup(index,2)) 
                thirdSlotButtonsMarkup = thirdSlotButtonsMarkup.concat(' ',slot_buttons_markup(index,3)) 

            }

            if(index == 9){

                firstSlotMarkup = firstSlotMarkup.concat(' ',firstSlotButtonsMarkup);
                secondSlotMarkup = secondSlotMarkup.concat(' ',secondSlotButtonsMarkup);
                thirdSlotMarkup = thirdSlotMarkup.concat(' ', thirdSlotButtonsMarkup)

            }
            
        }

        $('#first-li-parent').append(firstSlotMarkup);
        $('#second-li-parent').append(secondSlotMarkup);
        $('#third-li-parent').append(thirdSlotMarkup);
        
    }

    

    

   
    // listen-in on the selection of slot
    $('li').click(function(){
        
        selectASlot(this);

})


    
$('.btn-odd').click(function(){selectAllOdd(this)});
$('.btn-even').click(function(){selectAllEven(this)});
   
$('.btn-big-slots').click(function(){selectAllBigSlots(this)});
$('.btn-small-slots').click(function(){selectAllSmallSlots(this)});

$('.btn-All').click(function(){selectAllSlots(this)});   
$('.btn-Clear').click(function(){ clearAllSelected(this)});
$('#btn-place-bet').click(function(){ placeBet()});


});



function selectASlot(slotObject){

    const slotInnerElement =  $(slotObject).find('span');
    $(slotInnerElement).addClass('highlight');

        
        var rowNumber = getSlotsRowNumber(slotObject);
        console.log(rowNumber)

     
        var selectedSlot = getSelectedSlotDigit(slotObject)
     
     
    
      
         if(rowNumber === 1){
            
            if(firstRowSelectedSlots.includes(selectedSlot)){
                $(slotInnerElement).removeClass('highlight');
                const indexOfSelectSlot = firstRowSelectedSlots.indexOf(selectedSlot);
                
                firstRowSelectedSlots.splice(indexOfSelectSlot,1);
                firstRowSelectedSlots.sort()
              
                
            }else{

            // add the selectedSlot to the list of firstRowSelectedSlots
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

                
            // add the selectedSlot to the list of secondRowSelectedSlots
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

            // add the selectedSlot to the list of thirdRowSelectedSlots
            thirdRowSelectedSlots.push(selectedSlot);
            thirdRowSelectedSlots.sort();
           
            }
        
          
           

         }
     
      
         console.log(firstRowSelectedSlots);
         console.log(secondRowSelectedSlots);
         console.log(thirdRowSelectedSlots);
  
  
     
  }
  




function button_color(key){
   
    console.log(key)
    switch (key) {
       
        case 0:
          return 'success'
        case 1:
          return 'warning'
        case 2:
          return 'secondary'
        case 3:
          return 'success'
        case 4:
          return 'warning'
        case 5:
          return 'secondary'
        case 6:
          return 'danger'
        case 7:
          return 'dark'
        case 8:
          return 'secondary'
        case 9:
          return 'dark'
        
            
    
        default:
            return 'success'
           
    }
}


// select all even slots

function selectAllEven(eventObject){
    
    clearAllSelected(eventObject);
    let rowNumber = getSlotsRowNumber(eventObject);
    let allSlots = $(document).find(`li.${rowNumber}`);
    console.log(allSlots[1]);
    for (let index = 0; index < allSlots.length; index++) {
        let eventObject = allSlots[index];
        if(getSelectedSlotDigit(eventObject) % 2 == 0){
          
            selectASlot(eventObject);
        }
         
        

        }

       console.log(firstRowSelectedSlots); 
 }

//select all odd slots
function selectAllOdd(eventObject){
   
    clearAllSelected(eventObject);
    let rowNumber = getSlotsRowNumber(eventObject);
    let allSlots = $(document).find(`li.${rowNumber}`);
    console.log(allSlots[1]);
    for (let index = 0; index < allSlots.length; index++) {
        let eventObject = allSlots[index];
        if(getSelectedSlotDigit(eventObject) % 2 == 1){
          
            selectASlot(eventObject);
        }
         
        

        }

       console.log(firstRowSelectedSlots); 
        
 }


 
// select all big slots
 function selectAllBigSlots(eventObject){
    clearAllSelected(eventObject);
   
    let rowNumber = getSlotsRowNumber(eventObject);
    let allSlots = $(document).find(`li.${rowNumber}`);
    
    for (let index = 5; index < 10; index++) {
       
        selectASlot(allSlots[index]);
        
    }

       console.log(firstRowSelectedSlots); 

}


// select all small slots
function selectAllSmallSlots(eventObject){

    clearAllSelected(eventObject);
   
    let rowNumber = getSlotsRowNumber(eventObject);
    let allSlots = $(document).find(`li.${rowNumber}`);
    
    for (let index = 0; index < 5; index++) {

        selectASlot(allSlots[index]);
        
    }

       console.log(firstRowSelectedSlots); 
 }


// clear all selected slots
function selectAllSlots(eventObject){
    

    var rowNumber = getSlotsRowNumber(eventObject);
    var allSlots = $(document).find(`li.${rowNumber}`);
   
    for (let index = 0; index < allSlots.length; index++) {
        
     const slot = $(allSlots[index]).find('span');
        if(!$(slot).hasClass('highlight')){
            $(slot).addClass('highlight');
        }
    }

     var justToLog;
    if(rowNumber === 1){
        justToLog =  firstRowSelectedSlots = [0,1,2,3,4,5,6,7,8,9];
    }else if(rowNumber === 2){

        justToLog =  secondRowSelectedSlots = [0,1,2,3,4,5,6,7,8,9];

    }
    else if(rowNumber === 3){

        justToLog = thirdRowSelectedSlots = [0,1,2,3,4,5,6,7,8,9];

    }

    
    console.log(justToLog)
   
}


// clear all selected slots
function clearAllSelected(eventObject){
    
   var slotsRowNumber = getSlotsRowNumber(eventObject);
   
   
    if(getSelectedSlotsArray(slotsRowNumber).length < 1){
        console.log('Slots cleared.');
     return;
    }
    var allSlots = $(document).find(`li.${slotsRowNumber}`);
    
    for (let index = 0; index < allSlots.length; index++) {
        $(allSlots[index]).find('span').removeClass('highlight');
        
    }
   
    // empty the selectedSlots array
    var justToLog;
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


function placeBet(){
    betRowsSelected =[firstRowSelectedSlots,secondRowSelectedSlots,thirdRowSelectedSlots]
    console.log(betRowsSelected)
    // if(selectedSlots.length != 5){
    //         console.log('Sorry, please select 5 slots to play.');
    //         return;
    //     }

    //     $.post("task_3.php",
    //     {
    //       selected_slots: selectedSlots,
          
    //     },
    //     function(data, status){
    //      console.log("Data: " + data + "\nStatus: " + status);
    //     });


   
}

function getSlotsRowNumber(eventObject){
      
      var selectedSlotSplittedClass = $(eventObject).attr('class').split(' ');
      return  parseInt(selectedSlotSplittedClass[selectedSlotSplittedClass.length - 1]);
}

function getSelectedSlotDigit(eventObject){

     // get the selected slot     
     var splittedSelection = eventObject.innerHTML.split('>')[1];
      
     // and sanitize/process it to retrieve the actual digit
     return parseInt(splittedSelection.slice(0,splittedSelection.indexOf('<')));
}


function getSelectedSlotsArray(row_number){

    switch (row_number) {
        case 1:
            
            return firstRowSelectedSlots;
        case 2:
            
        return secondRowSelectedSlots;
        case 3:
            
        return thirdRowSelectedSlots;
    
        default:
            break;
    }
}
