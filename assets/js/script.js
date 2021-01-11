// If there is nothing in 'localStorage', sets the 'list' to an empty array
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// color-flag the tasks based on the timestamp (past, present, future)
var auditTasks = function () {
  $(".hour").each(function (index) {
    var taskTimestampHr = moment($(this).text(), "h A");
    var nowTimestampHr = moment().hour("h A");
    var taskRowEl = $(this).parent().children(".description");

    // removes all classes
    taskRowEl.removeClass("future past present");

    if (taskTimestampHr.isAfter(nowTimestampHr)) {
      taskRowEl.addClass("future");
    } else if (taskTimestampHr.isSame(nowTimestampHr, "hour")) {
      taskRowEl.addClass("present");
    } else {
      taskRowEl.addClass("past");
    }
  });
};

// on page load populate tasks  description
var loadTasks = function () {
  var taskDescriptionEntryEl = $(".row .description");

  // read tasks from local storage and display on UI
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
  auditTasks();
};
// update current timestamp every second
var periodicallyUpdateCurrentTimeStamp = function () {
  setInterval(function () {
    $("#currentDay").text(moment().format("h:mm:ss A dddd, MMMM Do, YYYY"));
    auditTasks();
  }, 1000);
};

// on task row click, highlight the task
$(".row .description").on("click select", function () {
  $(this).css({
    "background-color": "white",
    "font-style": "italic",
    color: "black",
  });
  $(this)
    .parent()
    .children(".saveBtn")
    // change save btn css to highlight the unsaved changes
    .css({ "background-color": "white", color: "#06aed5" });
});

// indicate changes are unsaved
$(".row .description").blur(function () {
  $(this).css({ "background-color": "", color: "white" });
  $(this).parent().children(".err-msg").css("visibility", "visible");
});

// on task save, update the tasks object and the localStorage
$(".row .saveBtn").on("click", function () {
  $(this).css({ "background-color": "#06aed5", color: "white" });
  $(this).parent().children(".err-msg").css("visibility", "hidden");

  // set to default styling on save
  var editedTaskFieldEl = $(this).parent().children(".description");
  editedTaskFieldEl.css({ "font-style": "normal", color: "black" });

  var text = editedTaskFieldEl.val().trim();
  var taskId = editedTaskFieldEl.attr("data-task-id");
  tasks[taskId] = text;
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

// prompts to save unsaved changes before page reload
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  // only prompt if there are unsaved tasks
  $(".saveBtn").each(function (index) {
    if ($(this).css("background-color") === "rgb(255, 255, 255)") {
      e.returnValue = "";
    }
  });
});

loadTasks();
periodicallyUpdateCurrentTimeStamp();
