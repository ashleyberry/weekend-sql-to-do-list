$( document ).ready( onReady );

function onReady(){
    console.log( 'in onReady' );
    getTasks();
    $( '#addTaskBtn' ).on( 'click', handleAddTask );
    $( document ).on( 'click', '.completeBtn', displayAsCompleted );
    $( document ).on( 'click', '.completeBtn', disableCompleteButton );
    $( document ).on( 'click', '.completeBtn', statusCompleteBtn );
    $( document ).on( 'click', '.deleteBtn', deleteBtn );
} // end onReady

function addTask( taskToSend ){
    console.log( 'in addTask' );
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

// disable the complete button upon completion
function disableCompleteButton(){
    console.log( 'in disableCompleteButton' );
    $( this ).removeClass( 'completeBtn' );
    $( this ).addClass ( 'finishedCompleteBtn' );
    $( this ).prop( 'disabled', true );
} // end disableCompleteButton

// visual display on DOM of completed status
function displayAsCompleted(){
    console.log ( 'in displayAsCompleted' )
    let tr = $( this ).parent().siblings( '.task' );
    $( tr ).removeClass( 'task' );
    $( tr ).addClass( 'complete' );
} // end displayAsCompleted

function handleAddTask(){
    console.log( 'in handleAddTask' );
    let taskToSend = {};
    taskToSend.task = $( '#taskIn' ).val();
    addTask( taskToSend );
} // end handleAddTask

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
        if( response[ i ].complete === false ){
            el.append( `
            <tr>
                <td class='task'>${ response[ i ].task }</td>
                <td>
                    <button class='completeBtn' 
                    data-id='${ response[ i ].id }' 
                    data-pending='${ response[ i ].complete }'>Complete</button>
                </td>
                <td><button class='deleteBtn' data-id=${response[i].id}>Delete</button></td>
            </tr>`)
        } else {
            el.append( `
            <tr>
                <td class='complete'>${ response[ i ].task }</td>
            <td>
                <button class='finishedCompleteBtn' 
                data-id='${ response[ i ].id }' 
                data-pending='${ response[ i ].complete }'>Complete</button>
            </td>
            <td><button class='deleteBtn' data-id=${response[i].id}>Delete</button></td>
        </tr>`)
        } // end else
    } // end for
} // end renderTasks

function statusCompleteBtn(){
    console.log( 'in statusCompleteBtn' );
    // make visual change on DOM
    displayAsCompleted()
    // disable button
    disableCompleteButton()
    let taskId = $( this ).data( 'id' );
    let pendingStatus = $( this ).data( 'pending' ) // will be false
    console.log( 'in statusCompleteBtn:', taskId, pendingStatus );
    $.ajax({
        method: 'PUT', 
        url: `/taskList/${ taskId }`,
        data: { newPending: !pendingStatus }
    }).then( response => {
        console.log( 'response from statusReadBtn:', response );
        //getTasks();
    }).catch( err => {
        console.log( 'error in statusCompleteBtn', err )
        alert('oh noes!');
    }) // end AJAX
} // end statusCompleteBtn

