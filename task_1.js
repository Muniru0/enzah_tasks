
 
    // declare an empty array for the to be selected slots
    var selectedSlots = [] ;



// wait for the document to finish rendering
$(document).ready(function(){
    
    if(selectedSlots.length >= 10){
     console.log('max number of selections reached');
     return;
    }

   
    // listen-in on the selection of slot
    $("li").click(function(){
        
     selectASlot(this); 
});



    
$('#btn-odd').click(function(){selectAllOdd()});
$('#btn-even').click(function(){selectAllEven()});
   
$('#btn-big-slots').click(function(){selectAllBigSlots()});
$('#btn-small-slots').click(function(){selectAllSmallSlots()});

$('#btn-select-all').click(function(){selectAllSlots()});   
$('#btn-clear-all').click(function(){ clearAllSelected()});
$('#btn-place-bet').click(function(){ placeBet()});





});



function selectASlot(slotObject){

  const slotInnerElement =  $(slotObject).find('span');
  $(slotInnerElement).addClass('highlight');
   

   console.log(slotInnerElement.innerHTML)
    
    // get the selected slot     
    var splittedSelection = slotObject.innerHTML.split('>')[1];
    console.log(splittedSelection)
    
    // and sanitize/process it to retrieve the actual digit
    var selectedLot = parseInt(splittedSelection.slice(0,splittedSelection.indexOf('<')));
   
    
    
    
    if(selectedSlots.includes(selectedLot)){
        $(slotInnerElement).removeClass('highlight');
        const indexOfSelectSlot = selectedSlots.indexOf(selectedLot);
        
        selectedSlots.splice(indexOfSelectSlot,1);
        selectedSlots.sort()
        console.log(selectedSlots);
        return;
    }

  
    // add the selectedLot to the list of selectedSlots
    selectedSlots.push(selectedLot);
    selectedSlots.sort();
    // selectedSlots.length == 0 ?  : selectedSlots[selectedLot] = selectedLot ;
    
    console.log(selectedSlots);
    if(Number.isInteger(selectedLot)){
        console.log(`the index of ${selectedLot} is : ${selectedSlots.indexOf(selectedLot)}`);
    }


   
}


// select all even slots

function selectAllEven(){
    clearAllSelected();
    var allEvenSlots = $(document).find('li.even');
    console.log(allEvenSlots[1]);
    for (let index = 0; index < allEvenSlots.length; index++) {
       
        selectASlot(allEvenSlots[index]);
        }

       console.log(selectedSlots); 
 }

//select all odd slots
function selectAllOdd(){
    clearAllSelected();
    var allOddSlots = $(document).find('li.odd');
    console.log(allOddSlots[1]);
    for (let index = 0; index < allOddSlots.length; index++) {
       
        selectASlot(allOddSlots[index]);
        }


        console.log(selectedSlots); 
        
 }


 
// select all big slots
 function selectAllBigSlots(){
        clearAllSelected();
    var allBigSlots = $(document).find('li.big-slots');
        
    
        for (let index = 0; index < allBigSlots.length; index++) {
        
            selectASlot(allBigSlots[index]);
            }

            console.log(selectedSlots); 

}


// select all small slots
function selectAllSmallSlots(){
    clearAllSelected();
    var allOddSlots = $(document).find('li.small-slots');
    
    for (let index = 0; index < allOddSlots.length; index++) {
       
        selectASlot(allOddSlots[index]);
        }

             console.log(selectedSlots); 
 }


// clear all selected slots
function selectAllSlots(){
    
    var allSlots = $(document).find('li');
   
    for (let index = 0; index < allSlots.length; index++) {
        
     const slot = $(allSlots[index]).find('span');
        if(!$(slot).hasClass('highlight')){
            $(slot).addClass('highlight');
        }
    }

    selectedSlots = [0,1,2,3,4,5,6,7,8,9];
    console.log(selectedSlots)
   
}


// clear all selected slots
function clearAllSelected(){
   
    if(selectedSlots.length < 1){
        console.log('Slots cleared.');
     return;
    }
    var allSlots = $(document).find('li');
    
    for (let index = 0; index < allSlots.length; index++) {
        $(allSlots[index]).find('span').removeClass('highlight');
        
    }
   
    // empty the selectedSlots array
     selectedSlots = [] ;
     console.log(selectedSlots);
}


function placeBet(){
        if(selectedSlots.length != 5){
            console.log('Sorry, please select 5 slots to play.');
            return;
        }

        $.post("task_3.php",
        {
          selected_slots: selectedSlots,
          
        },
        function(data, status){
         console.log("Data: " + data + "\nStatus: " + status);
        });
   
}