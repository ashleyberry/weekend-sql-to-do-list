$( document ).ready( onReady );

function onReady(){
    console.log( 'in onReady' );
    getTasks();
    $( document ).on( 'click', '#addTaskBtn', addTask );
    $( document ).on( 'click', '.completeBtn', completeBtn );  
    $( document ).on( 'click', '.deleteBtn', deleteBtn );
} // end onReady

function addTask(){
    console.log( 'in addTask' );
    let taskToSend = {
        task: $( '#taskIn' ).val(),
    } // end book to send
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        // TODO getTasks function
    }).catch( function( err ){
        console.log( err );
    }) // end AJAX POST
    // TODO clearTaskInputs();
} // end addTask

function completeBtn(){
    console.log( 'in completeBtn' );
} // end completeBtn

function deleteBtn(){
    console.log( 'in deleteBtn' );
} // end deleteBtn

function getTasks(){
    console.log( 'in getTasks' );
    $.ajax({
        method: 'GET',
        url: '/taskList'
    }).then( function( response ){
        console.log( 'back from GET with:', response ); 
        // display tasks on DOM 
        displayTasks( response );
    }).catch( function( err ){
        alert( 'error!' );
        console.log( 'error in getTasks', err );
    }) // end AJAX GET
} // end getTasks

function displayTasks( response ){
    console.log( 'in displayTasks' );
    let el = $( '#tasksOut' );
    el.empty();
    for( let i=0; i<response.length; i++ ){
         el.append( `
         <tr>
            <td>${ response[ i ].task }</td>
            <td>
                <button class='completeBtn' 
                data-id='${ response[ i ].id }' 
                data-pending='${ response[ i ].complete }'>Complete</button>
            </td>
            <td><button class='deleteBtn'>Delete</button></td>
        </tr>`)
    } // end for
} // end displayTasks
