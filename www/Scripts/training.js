// Set up Ojbects

var Exercise = {
    id: "",
    machine_num: "",
    name: "",
    type: "",
    method_of_measure:""


};

var user = {
    userName: "",
    userGender: "",
    userBirthdate: "",
    userWeight: ""
};



var Workout = {
    id: "",
    name: "",
    description: ""
};

var Workout_Exercise = 
{
    id:"",
    woID: "",
    exID : "",
    sets : "",
    target: ""
    }
   

Exercise.webdb = { db: null };

Exercise.webdb.open = function () {
    var dbSize = 5 * 1024 * 1024; // 5MB
    Exercise.webdb.db = openDatabase("Training", "1.0", "Training Log", dbSize);
};

Exercise.webdb.createTable = function () {
    var db = Exercise.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS exercise(ID INTEGER PRIMARY KEY ASC, exercise_name TEXT,machine_num INTEGER, exercise_type TEXT, added_on DATETIME, exercise_measure)", []);
    });
}

Exercise.webdb.alterTable = function () {
    var db = Exercise.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("Alter TABLE exercise ADD COLUMN exercise_measure TEXT");
    });
}

Exercise.webdb.addExercise = function (thisExercise) {
    var db = Exercise.webdb.db;
    db.transaction(function (tx) {
        var addedOn = new Date();
        tx.executeSql("INSERT INTO exercise(exercise_name, machine_num,exercise_type,added_on,exercise_measure) VALUES (?,?,?,?,?)",
              [thisExercise.name, thisExercise.machine_num, thisExercise.type, addedOn,thisExercise.method_of_measure],
              Exercise.webdb.onSuccess,
              Exercise.webdb.onError);
    });
}

Exercise.webdb.editExercise = function (thisExercise) {
    var db = Exercise.webdb.db;
    db.transaction(function (tx) {
       
        tx.executeSql("Update exercise set exercise_name=?, machine_num = ?,exercise_type = ?,exercise_measure=? where ID= ?",
              [thisExercise.name, thisExercise.machine_num, thisExercise.type, thisExercise.method_of_measure, thisExercise.id],
              Exercise.webdb.onSuccess,
              Exercise.webdb.onError);
    });
}



Exercise.webdb.getAllTodoItems = function (renderFunc) {
    var db = Exercise.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM exercise order by exercise_name", [], renderFunc,
              Exercise.webdb.onError);
    });
}

Exercise.webdb.getExerciseInfo = function (renderFunc,exID) {
    var db = Exercise.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM exercise where ID=?", [exID], renderFunc,
              Exercise.webdb.onError);
    });
}

Exercise.webdb.deleteTodo = function (id) {
    var db = Exercise.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("DELETE FROM exercise WHERE ID=?", [id],
              Exercise.webdb.onSuccess,
              Exercise.webdb.onError);
    });
}



Exercise.webdb.onError = function (tx, e) {
    alert("There has been an error: " + e.message);
}

Exercise.webdb.onSuccess = function (tx, r) {
    // re-render the data.
    Exercise.webdb.getAllTodoItems(loadTodoItems);
}

Exercise.webdb.onSuccessIndExercise = function (tx, r) {
    // re-render the data.
    Exercise.webdb.getAllTodoItems(loadTodoItems);
}



//General functions and methods
//use prototype function from javascript "the good parts" to create prototypes of cell literal


if (typeof Object.beget !== 'function') {
    Object.beget = function (o) {
        var F = function () { };
        F.prototype = o;
        return new F();
    };
}


function createExercise() {
    var myExercise = Object.beget(Exercise);
    myExercise.machine_num = document.getElementById("txtMachineNum").value;
    myExercise.name = document.getElementById("txtName").value;
   

    var m = document.getElementById("cboMethod");
    myExercise.method_of_measure = m.options[m.selectedIndex].text;

    var e = document.getElementById("cboType");
    myExercise.type = e.options[e.selectedIndex].text;
    myExercise.webdb.addExercise(myExercise);
    
    document.getElementById("txtMachineNum").value = "";
    document.getElementById("txtName").value = "";
    history.back();


}

function editExercise() {
    var myExercise = Object.beget(Exercise);
    myExercise.id = $("#hdnEditID").val();
    myExercise.machine_num = $("#txtEditMachineNum").val();
    myExercise.name = $("#txtEditName").val();
    myExercise.method_of_measure = $("#selEditMethOfEval").val();
    myExercise.type = $("#selEditExType").val();
    myExercise.webdb.editExercise(myExercise);
    history.back();


}

function loadTodoItems(tx, rs) {
    var rowOutput = "";
    var todoItems = document.getElementById("todoItems");
    for (var i = 0; i < rs.rows.length; i++) {
        rowOutput += renderTodo(rs.rows.item(i));
    }

    todoItems.innerHTML = rowOutput;
    $("#todoItems").listview("refresh");



}

$("#exerciseDisplay").on("pageshow", onPageShow);

function onPageShow(e, data) {
    var exIDi = getParameterByName('exID');
    Exercise.webdb.getExerciseInfo(showExerciseInfo, exIDi);
}
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
//ID INTEGER PRIMARY KEY ASC, exercise_name TEXT,machine_num INTEGER, exercise_type TEXT, added_on DATETIME, exercise_measure
function showExerciseInfo(tx, rs) {
    var exerciseOutput = "<table border='1'>";
    exerciseOutput += "<tr><td>ID</td><td>" + rs.rows.item(0).ID + "</td></tr>"
    exerciseOutput += "<tr><td>Name</td><td>" + rs.rows.item(0).exercise_name + "</td></tr>"
    exerciseOutput += "<tr><td>Machine #</td><td>" + rs.rows.item(0).machine_num + "</td></tr>"
    exerciseOutput += "<tr><td>Type of Exercise</td><td>" + rs.rows.item(0).exercise_type  + "</td></tr>"
    exerciseOutput += "<tr><td>Measured By:</td><td>" + rs.rows.item(0).exercise_measure+ "</td></tr>"
    exerciseOutput += "</table>"


    $("#exerciseInfo").html(exerciseOutput);


}

function populateExerciseForm(tx, rs) {

//(exercise_name, machine_num,exercise_type,added_on,exercise_measure) VALUES (?,?,?,?,?)",

    $("#hdnEditID").val(rs.rows.item(0).ID);
    $("#txtEditName").val(rs.rows.item(0).exercise_name);
    $("#txtEditMachineNum").val(rs.rows.item(0).machine_num);
    $("#selEditExType").val(rs.rows.item(0).exercise_type).selectmenu("refresh");
    $("$selEditMethOfEval").val(rs.rows.item(0).exercise_measure).selectmenu("refresh");
}
function renderTodo(row) {

    var rendertext = "<li id='item" + row.ID + "f' class='box'><table border='0' width='100%'><tr><td id='item" + row.ID + "a'><a href='?exID=" + row.ID + "#exerciseDisplay' rel='external'>" + row.exercise_name + "</a></td><td align='right' id='item" + row.ID + "c'><img id='image" + row.ID + "' class='deletearea'  onclick='Exercise.webdb.deleteTodo(" + row.ID + ");'</img></td></tr></table><input type='hidden' id='hdn" + row.ID + "' value='0'/></li>";
    return rendertext;
}

function init() {
    Exercise.webdb.open();
    Exercise.webdb.createTable();
    Exercise.webdb.alterTable();
    Exercise.webdb.getAllTodoItems(loadTodoItems);
	show();

}

function calculateBF() {

    var bf, sumOfSf;
    var abMeasure = parseInt($("#abMeasure").val());
    var triMeasure = parseInt($("#triMeasure").val());
    var thiMeasure = parseInt($("#thiMeasure").val());
    var iliMeasure = parseInt($("#iliMeasure").val());
    sumOfSf = abMeasure + triMeasure + thiMeasure + iliMeasure;
    bf = parseFloat((0.29288 * sumOfSf) - (0.0005 * Math.pow(sumOfSf, 2)) + (0.15845 * 50) - 5.76377).toFixed(2);


    $("#divResult").html(bf);
   
    

}

function calculateBF3pt() {

  
	var bf3pt, sumOfSf3pt;
    var chMeasure3pt = parseInt($("#cheMeasure3pt").val());
    var abMeasure3pt = parseInt($("#abMeasure3pt").val());
    var thiMeasure3pt = parseInt($("#thiMeasure3pt").val());
    
    sumOfSf3pt = chMeasure3pt + abMeasure3pt + thiMeasure3pt ;
	var x3pt =  1.1093800 - 0.0008267 * sumOfSf3pt + 0.0000016 * (Math.pow(sumOfSf3pt,2)) - 0.0002574 * 50
    bf3pt =  parseFloat(495 / x3pt - 450).toFixed(2);


    $("#divResult3pt").html(bf3pt);



}

function calculateMaxVo2() {

    var thisPerson = window.localStorage.getItem("StorageValue");
    thisPerson = JSON.parse(thisPerson);
    var Weight = parseFloat(thisPerson.userWeight)/2.2;
    var V02, Y, Time;
    Time = parseFloat($("#ergMin").val()) + parseFloat($("#ergSec").val() / 60);
    
    Y = 15.7 - (1.5 * Time);

    V02 = (Y * 1000) / Weight;


    $("#VO2Slider").val(parseInt(V02)).slider("refresh");
    $("#VO2Slider").slider("disable");



    




}

function updateSaveUserInfo() {

    //create a user object
    
    var thisUser = Object.beget(user);
    thisUser.userName = $("#userName").val();
    thisUser.userBirthdate= $("#birthDate").val();
    thisUser.userGender = $("input[name='rdoGender']:checked").val();
    thisUser.userWeight = $("#weightSlider").val();


    //add this to storage
    localStorage.setItem("StorageValue", JSON.stringify(thisUser));
    alert("info saved");

}


