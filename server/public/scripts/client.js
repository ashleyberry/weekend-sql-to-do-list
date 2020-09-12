$( document ).ready( onReady );

function onReady(){
    console.log( 'in onReady' );
    $( document ).on( 'click', '#addTaskBtn', addTask );
} // end onReady

function addTask(){
    console.log( 'in addTask' );
} // end addTask