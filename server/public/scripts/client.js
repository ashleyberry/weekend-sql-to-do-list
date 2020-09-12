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
    $.ajax( {
        method: 'POST',
        url: '/taskList',
        data: taskToSend
    }) .then( response => {
        console.log( 'back from POST with:', response );
        getTasks();
        clearTaskInput();
    } ).catch( err => {
        console.log( 'error in addTask', err );
    } ) // end AJAX POST
} // end addTask

function clearTaskInput(){
    $( '#taskIn' ).val('');
} // end clearTaskInput

function completeBtn(){
    console.log( 'in completeBtn' );
} // end completeBtn

function deleteBtn(){
    console.log( 'in deleteBtn' );
    let taskId = $( this ).data( 'id' );
    console.log( 'taskId:', taskId );
    $.ajax({
        method: 'DELETE',
        url: `/taskList/${ taskId }` 
    }).then( response => {
        console.log( 'Deleted!', response )
        getTasks();
    }).catch( err => {
        console.log( 'error in delete', err )
        alert('oh noes!');
    }) // end AJAX
} // end deleteBtn

// gets all tasks from the server and renders to page
function getTasks(){
    console.log( 'in getTasks' );
    $.ajax({
        method: 'GET',
        url: '/taskList'
    }).then( function( response ){
        console.log( 'back from GET with:', response ); 
        // display tasks on DOM 
        renderTasks( response );
    }).catch( function( err ){
        alert( 'error!' );
        console.log( 'error in getTasks', err );
    }) // end AJAX GET
} // end getTasks

// Display an array of tasks on the DOM
function renderTasks( response ){
    console.log( 'in renderTasks' );
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
            <td><button class='deleteBtn' data-id=${response[i].id}>Delete</button></td>
        </tr>`)
    } // end for
} // end renderTasks
