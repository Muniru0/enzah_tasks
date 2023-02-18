<?php 




  // declare and initiate a php array with numbers
  $machine_selection = [1,2,3,4,5];
  
  if( $_SERVER['REQUEST_METHOD'] == "POST" ){
        echo  count($_REQUEST['selected_slots']);
        echo  (count($_REQUEST['selected_slots']) == 5 && array_diff($machine_selection,$_REQUEST['selected_slots']) == [] ? 'You won' : 'Just try a little again.' );
    // echo  $_REQUEST['selected_slots'] ===  ? 'You won' : 'Just try a little again.';
  
  
  }else{
  

    print("
    <!DOCTYPE html>
 
    <head>
          <title>Task 1</title>
          <meta charset='utf-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1'>
         
      
          <!-- Latest compiled and minified CSS -->
      <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' rel='stylesheet'>
      
      <!-- Latest compiled JavaScript -->
      
      
      <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js'></script>
      <script language='javascript' type='text/javascript' src='task_1.js'></script>
      
      
      <link rel='stylesheet' href='task_1.css' />
      
      <style>
            .mm{
          cursor: pointer;
        }
        .mm:hover{
          background-color: red;
        }
      </style>
      
      </head>
      
      <body>
      
         
      
       <div class='container p-5 mt-5 text-white bg-info text-center'>
      
          <h1>Your No. 1 Jackpot</h1>
        <p class='mb-3'> Decide your destiny. <span>Select below</span></p>
        <div style='height:20px;' class='bg-info'></div>
        <ul class='list-inline'>
         
      
      
              
          <li class='h1 list-inline-item clickable even small-slots'>
              <span class='border text-primary rounded p-3 odd'>0</span>
          </li>
          <li class='h1 list-inline-item clickable odd small-slots'>
              <span class='border text-primary rounded p-3 odd'>1</span>
          </li>
          <li class='h1 list-inline-item clickable even small-slots'>
              <span class='border text-success rounded p-3'>2</span>
          </li>
      
          <li class='h1 list-inline-item text-info clickable odd small-slots'>
              <span class='border text-black rounded p-3'>3</span>  
          </li>
          
          <li class='h1 list-inline-item clickable even small-slots'>
              <span class='border text-success rounded p-3'>4</span>
         </li>
      
         <li class='h1 list-inline-item clickable odd big-slots'> 
             <span class='border text-white rounded p-3'>5</span>
         </li>
      
         <li class='h1 list-inline-item clickable even big-slots'>
              <span class='border text-primary rounded p-3'>6</span>
         </li>
      
         <li class='h1 list-inline-item clickable odd big-slots'>
              <span class='border text-black rounded p-3 '>7</span>
             </li>
      
         <li class='h1 list-inline-item clickable even big-slots'>
              <span class='border text-secondary rounded p-3'>8</span>
         </li>
      
         <li class='h1 list-inline-item clickable odd big-slots'>
              <span class='border text-black rounded p-3'>9</span>
         </li>
        
         
        </ul>
      
          
      </div>
      
      
      
      <div class='container p-5 text-white text-center'>
          <button type='button' id='btn-odd' class='btn mx-3 btn-primary btn-lg '>Odd</button>
          <button type='button' id='btn-even' class='btn mx-3 btn-secondary btn-lg'>Even</button>
          <button type='button' id='btn-big-slots' class='btn mx-3 btn-success btn-lg'>big-slots</button>
          <button type='button' id='btn-small-slots' class='btn mx-3 btn-info btn-lg'>small-slots</button>
          <button type='button' id='btn-select-all' class='btn mx-3 btn-warning btn-lg'>All</button>
          <button type='button' id='btn-clear-all' class='btn mx-3 btn-warning btn-lg'>Clear</button>
          
          <button type='button' id='btn-place-bet' class='btn btn-success btn-lg mx-5'>Place Bet</button>
      </div>
      
       
      
      
      </body>
      
      
      </html>");
    
      }
















?>