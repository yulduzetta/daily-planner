// If there is nothing in 'localStorage', sets the 'list' to an empty array
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// displays current day
$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

// color-flags the tasks based on the timestamp (past, present, future)
var auditTasks = function (){

}

// on page load
var loadTasks = function () {
  var taskDescriptionEntryEl = $(".row .description");

  // reads tasks from local storage and displays on UI
  if (tasks.length == 0) {
    for (var i = 0; i < taskDescriptionEntryEl.length; i++) {
      tasks.push("");
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    taskDescriptionEntryEl.each(function (index) {
      $(this).val(tasks[index]);
    });
  }
};

// on task save, update the tasks object and the localStorage
$(".row .saveBtn").on("click", function () {
  var editedTaskFieldEl = $(this).parent().children(".description");
  var text = editedTaskFieldEl.val().trim();
  var taskId = editedTaskFieldEl.attr("data-task-id");

  tasks[taskId] = text;
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

loadTasks();
auditTasks();
