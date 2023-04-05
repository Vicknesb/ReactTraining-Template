(function () {
	
let tableData = [
  { uName: "tvoltas", fName: "Tata", lName: "Voltas", mail: "tvoltas@mail.com", project: "Air Conditioner" },
  { uName: "iphone", fName: "Apple", lName: "phone", mail: "iphone@mail.com", project: "Mobile" },
  { uName: "oplus", fName: "One", lName: "Plus", mail: "oplus@mail.com", project: "Television" },
  { uName: "tvoltas", fName: "Tata", lName: "Voltas", mail: "tvoltas@mail.com", project: "Air Conditioner" },
  { uName: "iphone", fName: "Apple", lName: "phone", mail: "iphone@mail.com", project: "Mobile" },
  { uName: "oplus", fName: "One", lName: "Plus", mail: "oplus@mail.com", project: "Television" }
];

let tableDataCopy = [];
const menuTitle = document.getElementsByClassName('menu-title');

const userMenu = document.getElementById("user-menu");
const userSearchFilter = document.getElementById("btnSearchFilter");
const userCreate = document.getElementById("btnCreateUser");
const userFormSubmit = document.getElementById("btnUserNewSubmit");
const userFormReset = document.getElementById("btnReset");
const btnSearchClear = document.getElementById("btnSearchClear");
const btnUserFormClose = document.getElementById("btnUserFormClose");

const userName = document.getElementById("txtUsername");
const firstName = document.getElementById("txtFirstname");
const middleName = document.getElementById("txtMiddletname");
const lastName = document.getElementById("txtLastname");
const mailID = document.getElementById("txtMailid");
const selectProject = document.getElementById("selectProject");
const gender = document.getElementsByName("genderRadioBtn");

const unameFilter = document.getElementById("txtUserNameFilter");
const emailFilter = document.getElementById("txtEmailFilter");
const projectFilter = document.getElementById("selectProjectFilter");
 
function init(){		
	showUserList();
	loadProjectsDropdown('selectProjectFilter');
	loadProjectsDropdown('selectProject');
	eventListeners();
}

init();

function eventListeners(){
	const collapseBar = document.getElementById("collapse-bar");
	collapseBar.addEventListener("click", collapseBarEventHandler);
	
	userMenu.addEventListener("click", userMenuEventHandler);
	userSearchFilter.addEventListener("click", userSearchFilterEventHandler);
	userCreate.addEventListener("click", createUserEventHandler);
	userFormSubmit.addEventListener("click", userFormSubmitEventHandler);
	userFormReset.addEventListener("click", userFormResetEventHandler);
	btnSearchClear.addEventListener("click", searchClearEventHandler);
	btnUserFormClose.addEventListener("click", userFormCloseEventHandler);
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function loadUserTableData(){	
	const myUsrTable = document.getElementById('tblUserList');
	let rows =  document.querySelectorAll("#tblUserList thead tr");
	for (let i = rows.length - 1 ; i > 0 ; i--) {
            myUsrTable.deleteRow(i);
        }
	generateTable(myUsrTable, tableData);  
}

function showUserList () {
	tableDataCopy = tableData;
	let userListContainer = document.querySelector('.content-user-list');	
	let userCreateContainer = document.querySelector('.content-user-create');	
	userListContainer.classList.add('c-d-block');
	userCreateContainer.classList.add('c-d-none');	
	userListContainer.classList.remove('c-d-none');
	userCreateContainer.classList.remove('c-d-block');
	menuTitle.innerHTML = "Users List";	
	loadUserTableData();	
}

function showUserCreate () {
	resetUserForm();
	let userListContainer = document.querySelector('.content-user-list');	
	let userCreateContainer = document.querySelector('.content-user-create');	
	userListContainer.classList.remove('c-d-block');
	userCreateContainer.classList.remove('c-d-none');	
	userListContainer.classList.add('c-d-none');
	userCreateContainer.classList.add('c-d-block');
	menuTitle.innerHTML = "Users Create";
}
	
function loadProjectsDropdown(element){
let projects = ["Air Conditioner", "Mobile", "Television", "Laptop"];
let projetSelect = document.querySelector(`#${element}`);  
	for (let item of projects) {
	  let option = document.createElement("option");
		 option.text = item;
		 option.value = item;
	  projetSelect.add(option);
	}
}

function userSearchFilterEventHandler(uname, email, project){

	const selectedFilters = 
	{
	   uName: unameFilter.value,
	   mail: emailFilter.value,
	   project: projectFilter.value
	}

	if(selectedFilters.uName || selectedFilters.mail || selectedFilters.project)
	{
		tableData = tableDataCopy.filter(row => filterSearchItem(selectedFilters,row) );
		loadUserTableData();
	}
	else
		searchClearEventHandler();		
}

function filterSearchItem(selectedFilters, row)
{
	let addRow = false;
	for (let filterkey in selectedFilters) {		
		if (row[filterkey] && selectedFilters[filterkey]) {
			if(row[filterkey].includes(selectedFilters[filterkey]))
				addRow = true;
			else{
				addRow = false;
				break;
			}
		}
	}
	return addRow;
}

function resetUserForm(){
	userName.value = "";
	firstName.value = "";
	middleName.value = "";
	lastName.value = "";
	mailID.value = "";
	selectProject.value = "";
	document.getElementById('btnMaleRadio').checked = true;	
	document.getElementById('switchIsactive').checked = false;	
}

function collapseBarEventHandler () {
	let collapseMenu = document.querySelectorAll('.menu-collapsed');	
	let containerLeft = document.querySelector('.container-left');
	for (let menu of collapseMenu) {
	  menu.classList.toggle('c-d-none');
	}
	containerLeft.classList.toggle('custoggle');
}

function userMenuEventHandler () {
	showUserList();
}

function createUserEventHandler(){	
	searchClearEventHandler();
	showUserCreate();
}

function searchClearEventHandler()
{	
	unameFilter.value = "";
	emailFilter.value = "";
	projectFilter.value = "";
	tableData = tableDataCopy;
	loadUserTableData();	
}

function userFormCloseEventHandler (){	
	showUserList();
}

function userFormResetEventHandler () {
	resetUserForm();
}

function userFormSubmitEventHandler () {
	
	let userNameVal = userName.value;
	let firstNameVal = firstName.value;
	let middleNameVal = middleName.value;
	let lastNameVal = lastName.value;
	let mailIDVal = mailID.value;
	let selectProjectVal = selectProject.value;
	let genderVal = "Male";
	for(let i = 0; i < gender.length; i++) {
            if(gender[i].checked)
            genderVal = gender[i].value;
        }
	let switchIsactive = document.getElementById('switchIsactive').checked;	
		
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
		let GetUserData = JSON.parse(sessionStorage.User);

		let userObj = { uName: GetUserData.uName, fName: GetUserData.fName, lName: GetUserData.lName, 
		mail: GetUserData.mail, project: GetUserData.project };
		tableData.unshift(userObj);
		showUserList();
	}
}

})();