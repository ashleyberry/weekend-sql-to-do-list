$( document ).ready( onReady );

function onReady(){
    console.log( 'in onReady' );
    getTasks();
    $( '#MyModal' ).modal();
    $( '#addTaskBtn' ).on( 'click', handleAddTask );
    $( document ).on( 'click', '#completeBtn', displayAsCompleted );
    $( document ).on( 'click', '#completeBtn', disableCompleteButton );
    $( document ).on( 'click', '#completeBtn', statusCompleteBtn );
    $( document ).on( 'click', '#deleteBtn', deleteTask );
} // end onReady

let modalId = [];
console.log('modalId:', modalId)

function addTask( taskToSend ){
    console.log( 'in addTask' );
    $.ajax({
        method: 'POST',
        url: '/taskList',
        data: taskToSend
    }) .then( response => {
        console.log( 'back from POST with:', response );
        getTasks();
        clearTaskInput();
    } ).catch( err => {
        console.log( 'error in addTask', err );
    }) // end AJAX POST
} // end addTask

function clearTaskInput(){
    $( '#taskIn' ).val('');
} // end clearTaskInput

function deleteTask(){
    console.log( 'in deleteTask' );
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
} // end deleteTask

// disable the complete button upon completion
function disableCompleteButton(){
    console.log( 'in disableCompleteButton' );
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
    }).then( response => {
        console.log( 'back from GET with:', response ); 
        // display tasks on DOM 
        renderTasks( response );
    }).catch( err => {
        alert( 'error!' );
        console.log( 'error in getTasks', err );
    }) // end AJAX GET
} // end getTasks

// Display an array of tasks on the DOM
function renderTasks( response ){
    console.log( 'in renderTasks' );
    let el = $( '.tasksOut' );
    el.empty();
    for( let i=0; i<response.length; i++ ){
        if( response[ i ].complete ){ //if task is completed
            el.append( 
                `<tr>
                    <td class='complete'>${ response[ i ].task }</td>
                    <td>
                        <button type='button'
                        id='completeBtn' 
                        class='btn btn-success' 
                        data-id='${ response[ i ].id }'
                        data-pending='${ response[ i ].complete }'
                        disabled>Complete</button>
                    <td>
                        <button type='button'
                        id='deleteBtn' 
                        class='btn btn-danger' 
                        data-id='${response[ i ].id}'
                        >Delete</button>
                    </td>
                </tr>`) 
        } else {
            el.append( `<tr>
                    <td class='task'>${ response[ i ].task }</td>
                    <td>
                        <button type='button'
                        id='completeBtn' 
                        class='btn btn-success' 
                        data-id='${ response[ i ].id }'
                        data-pending='${ response[ i ].complete }'
                        >Complete</button>
                    </td>
                    <td>
                        <div class="text-center">
                            <a href="#myModal" class='btn btn-danger' data-id='${response[ i ].id}' data-toggle='modal'>Delete</a>
                        </div>
                
                        <!-- Modal HTML -->
                        <div id="myModal" class="modal fade">
                            <div class="modal-dialog modal-confirm">
                                <div class="modal-content">
                                    <div class="modal-header flex-column">
                                        <div class="icon-box">
                                            <i class="material-icons">&#xE5CD;</i>
                                        </div>						
                                        <h4 class="modal-title w-100">Are you sure?</h4>	
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    </div>
                                    <div class="modal-body">
                                        <p>Do you really want to delete this task? This process cannot be undone.</p>
                                    </div>
                                    <div class="modal-footer justify-content-center">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal" >Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>     
                    </td>
                </tr>`)
                modalId = $(this).closest( 'id' )
                console.log( modalId )             
        } // end else
    } // end for
} // end renderTasks

function statusCompleteBtn(){
    console.log( 'in statusCompleteBtn' );
    let taskId = $( this ).data( 'id' );
    let pendingStatus = $( this ).data( 'pending' )
    console.log( 'in statusCompleteBtn:', taskId, pendingStatus );
    $.ajax({
        method: 'PUT', 
        url: `/taskList/${ taskId }`,
        data: { newPending: !pendingStatus }
    }).then( response => {
        console.log( 'response from statusReadBtn:', response );
    }).catch( err => {
        console.log( 'error in statusCompleteBtn', err )
        alert('oh noes!');
    }) // end AJAX
} // end statusCompleteBtn
