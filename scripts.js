
var tableData = [
  { uName: "tvoltas", fName: "Tata", lName: "Voltas", mail: "tvoltas@mail.com", project: "Air Conditioner" },
  { uName: "iphone", fName: "Apple", lName: "phone", mail: "iphone@mail.com", project: "Mobile" },
  { uName: "oplus", fName: "One", lName: "Plus", mail: "oplus@mail.com", project: "Television" },
  { uName: "tvoltas", fName: "Tata", lName: "Voltas", mail: "tvoltas@mail.com", project: "Air Conditioner" },
  { uName: "iphone", fName: "Apple", lName: "phone", mail: "iphone@mail.com", project: "Mobile" },
  { uName: "oplus", fName: "One", lName: "Plus", mail: "oplus@mail.com", project: "Television" }
];

var tableDataCopy = [];

var selectedFilterOptions = 
{
   uName: null,
   mail: null,
   project: null
}

var projects = ["Air Conditioner", "Mobile", "Television", "Laptop"];

var tempFilterTableData = [];

const menuTitle = document.querySelector('.menu-title');

const myUsrTable = document.querySelector('#tblUserList');
const collapseBar = document.querySelector("#collapse-bar");
const userMenu = document.querySelector("#user-menu");
const userSearchFilter = document.querySelector("#btnSearchFilter");
const btnCreateUser = document.querySelector("#btnCreateUser");
const userFormSubmitBtn = document.querySelector("#btnUserNewSubmit");
const userFormReset = document.querySelector("#btnReset");
const btnSearchClear = document.querySelector("#btnSearchClear");
const btnUserFormClose = document.querySelector("#btnUserFormClose");

const userName = document.querySelector("#txtUsername");
const firstName = document.querySelector("#txtFirstname");
const middleName = document.querySelector("#txtMiddletname");
const lastName = document.querySelector("#txtLastname");
const mailID = document.querySelector("#txtMailid");
const selectProject = document.querySelector("#selectProject");
const gender = document.getElementsByName("genderRadioBtn");

(function () {
 
function Init(){		
	showUserList();
	loadProjectsDropdown('selectProjectFilter');
	loadProjectsDropdown('selectProject');
}

Init();

collapseBar.addEventListener("click", collapseBarClickEvent);
userMenu.addEventListener("click", userMenuClickEvent);
userSearchFilter.addEventListener("click", userSearchFilterEvent);
btnCreateUser.addEventListener("click", btnCreateUserClickEvent);
userFormSubmitBtn.addEventListener("click", userFormSubmitBtnClickEvent);
userFormReset.addEventListener("click", userFormResetEvent);
btnSearchClear.addEventListener("click", btnSearchClearEvent);
btnUserFormClose.addEventListener("click", btnUserFormCloseEvent);

})();

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function loadUserTableData(){	
	
	let rows =  document.querySelectorAll("#tblUserList thead tr");
	for (var i = rows.length - 1 ; i > 0 ; i--) {
            myUsrTable.deleteRow(i);
        }
	generateTable(myUsrTable, tableData);  
}

function showUserList () {
	tableDataCopy = tableData;
	var userList = document.querySelector('.content-user-list');	
	var userCreate = document.querySelector('.content-user-create');	
	userList.classList.add('c-d-block');
	userCreate.classList.add('c-d-none');	
	userList.classList.remove('c-d-none');
	userCreate.classList.remove('c-d-block');
	menuTitle.innerHTML = "Users List";	
	loadUserTableData();	
}

function showUserCreate () {
	resetUserForm();
	var userList = document.querySelector('.content-user-list');	
	var userCreate = document.querySelector('.content-user-create');	
	userList.classList.remove('c-d-block');
	userCreate.classList.remove('c-d-none');	
	userList.classList.add('c-d-none');
	userCreate.classList.add('c-d-block');
	menuTitle.innerHTML = "Users Create";
}
	
function loadProjectsDropdown(element){
var projetSelect = document.querySelector(`#${element}`);  
	for (let item of projects) {
	  var option = document.createElement("option");
		 option.text = item;
		 option.value = item;
	  projetSelect.add(option);
	}
}

function userSearchFilterEvent(uname, email, project){
tempFilterTableData = [];

let unameFilter = document.querySelector("#txtUserNameFilter");
let emailFilter = document.querySelector("#txtEmailFilter");
let projectFilter = document.querySelector("#selectProjectFilter");

const selectedFilters = 
{
   uName: unameFilter.value,
   mail: emailFilter.value,
   project: projectFilter.value
}

if(selectedFilters.uName || selectedFilters.mail || selectedFilters.project)
{
	tableData = FilterSearchItem(selectedFilters);	
	loadUserTableData();
}

}

function FilterSearchItem(selectedFilters)
{
for(let row of tableDataCopy){

var addRow = false;
for (var rowKey in row) {
var abortLoop = false;

	for (var filterKey in selectedFilters) {
	
		if (rowKey === filterKey) {
			if (row[rowKey] && selectedFilters[filterKey]) {
				if(row[rowKey].includes(selectedFilters[filterKey]))
					addRow = true;
				else{
					addRow = false;
					abortLoop = true;
					break;
				}
			}
		}
	}
	 if (abortLoop) break;
}
if(addRow){
		tempFilterTableData.push(row);
	}
}
return tempFilterTableData;
}

function resetUserForm(){
	document.querySelector("#txtUsername").value = "";
	document.querySelector("#txtFirstname").value = "";
	document.querySelector("#txtMiddletname").value = "";
	document.querySelector("#txtLastname").value = "";
	document.querySelector("#txtMailid").value = "";
	document.querySelector("#selectProject").value = "";
	document.querySelector('#btnMaleRadio').checked = true;	
	document.querySelector('#switchIsactive').checked = false;	
}

function collapseBarClickEvent () {
	var collapseMenu = document.querySelectorAll('.menu-collapsed');	
	var containerLeft = document.querySelector('.container-left');
	for (let menu of collapseMenu) {
	  menu.classList.toggle('c-d-none');
	}
	containerLeft.classList.toggle('custoggle');
}

function userMenuClickEvent () {
	showUserList();
}

function btnCreateUserClickEvent(){	
	btnSearchClearEvent();
	showUserCreate();
}

function btnSearchClearEvent()
{	
	document.querySelector("#txtUserNameFilter").value = "";
	document.querySelector("#txtEmailFilter").value = "";
	document.querySelector("#selectProjectFilter").value = "";
	tableData = tableDataCopy;
	loadUserTableData();	
}

function btnUserFormCloseEvent(){	
	showUserList();
}

function userFormSubmitBtnClickEvent () {

	let userNameVal = userName.value;
	let firstNameVal = firstName.value;
	let middleNameVal = middleName.value;
	let lastNameVal = document.getElementById("txtLastname").value;
	let mailIDVal = lastName.value;
	let selectProjectVal = selectProject.value;
	let genderVal = "Male";
	for(let i = 0; i < gender.length; i++) {
            if(gender[i].checked)
            genderVal = gender[i].value;
        }
	let switchIsactive = document.querySelector('#switchIsactive').checked;	
		
	const User = {
         uName: userNameVal,
         fName : firstNameVal,
         mName : middleNameVal,
         lName : lastNameVal,
		 mail : mailIDVal,
		 project : selectProjectVal,
         gender: genderVal,
		 isactive: switchIsactive
    };	  
	if( userNameVal != '' || firstNameVal != '' || lastNameVal != '' || mailIDVal != '' || selectProjectVal != '')
	{
		sessionStorage.setItem("User", JSON.stringify(User));
		var GetUserData = JSON.parse(sessionStorage.User);

		let userObj = { uName: GetUserData.uName, fName: GetUserData.fName, lName: GetUserData.lName, 
		mail: GetUserData.mail, project: GetUserData.project };
		tableData.unshift(userObj);
		showUserList();
	}
}

function userFormResetEvent () {
	resetUserForm();
}