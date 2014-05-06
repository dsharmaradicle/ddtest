$(document).ready(function(){
			$('.menu ul').hide();
		});

var handler = function(event){
	// if the target is a descendent of menu do nothing
	if($(event.target).is(".menu, .menu *")) 
	{
		$('.menu ul').slideToggle(); 
		return;
	}
	$('.menu ul').slideUp();
}
$(document).on("click", handler);

//Click on top menu click
function menuClick(page){
	//menu click links to other page
	if(page == 'profile' || page == 'patient'){
		if(localStorage.getItem('clinicname')!='' && localStorage.getItem('clinicname')!=null)
		{//go to patient page
			window.location.href='mainPage.html';
		}
		else{
			window.location.href='index.html';
		}
	}
	else{
		window.location.href='help.html';
	}
}

// JS methods for index.html
function checkAppDetails()
{	// Check if clinic profile exists or not
	if(localStorage.getItem('clinicname')!='' && localStorage.getItem('clinicname')!=null)
	{//go to patient page
		window.location.href='mainPage.html';
	}
	//if no profile exists then remain on Clinic page
}

function setvalue()
{
	// set clinic details in local storage
	localStorage.setItem('clinicname', $('#clinicname').val());	//set clinic name			document.getElementById('clinicname').value
	localStorage.setItem('pcpname', $('#pcpname').val());	//set pcpname 	document.getElementById('pcpname').value
	localStorage.setItem('email', $('#email').val());		//set email		document.getElementById('email').value
	localStorage.setItem('phone', $('#phone').val());		//set phone		document.getElementById('phone').value
	localStorage.setItem('fax', $('#fax').val());			//set fax 		document.getElementById('fax').value
	window.location.href='mainPage.html';
 
}

function formClinicValidation() {
	//validate Clinic details fields
	jQuery('.error').hide();
	var phoneno = /^\d{10}$/;
	var validationStatus = 0;
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	//validate clinic name
	var clinicname = $('#clinicname').val();					//document.getElementById('clinicname').value;
	if(clinicname == '') {
		//if clinic name is empty
		$("#clinicname_validation").css("display", "block");	//document.getElementById('clinicname_validation').style.display="block";
		validationStatus=1;
	}
	
	//validate pcp name
	var pcpname = $('#pcpname').val();							//document.getElementById('pcpname').value;
	if(pcpname == '') {
		//if PCP name is empty
		$("#pcpname_validation").css("display", "block");		//document.getElementById('pcpname_validation').style.display="block";
		validationStatus=1;
	}

	//phone number validation
	var inputphoneno = $('#phone').val(); 						//document.getElementById('phone').value;
	if(!inputphoneno.match(phoneno)) {
		//if phone number is not 10 digit
		$("#phone-validation-error").css("display", "block");	//document.getElementById('phone-validation-error').style.display="block";
		validationStatus=1;
	}

	//email validetion validation
	var inputmailformat = $('#email').val();					//document.getElementById('email').value;
	if(!inputmailformat.match(mailformat)) {
		//if phone number is not 10 digit
		$("#email-validation-error").css("display", "block");	//document.getElementById('email-validation-error').style.display="block";
		validationStatus=1;
	}

	//fax number validation
	var inputFax = $('#fax').val();								//document.getElementById('fax').value;  
	if(!inputFax.match(phoneno)) {
		$("#fax-validation-error").css("display", "block");		//document.getElementById('fax-validation-error').style.display="block";
		validationStatus=1;
	}

	if(validationStatus == 1){
		//if any of above validation fails
		return false;
	}
	else{
		//if validation is success. Set details in local storage
		setvalue();
	}
}

//JS methods for Patient page
var file_selected = false;
var counterID = 2;	//var i=2;
var currPartID = 0; //ID of current or selected image and body part MAP
//var k=0;		//currPartID
//var abc=''	//used in getImageInputID as inputID

function getImageInputID(id){
	//get image & body part id
	var inputID = id;
	var res = inputID.split("@");
	currPartID=res[1];
	$('#body').val('');	//empty bodypart text box when popup opens
}

function setFileSelected(id){
	//set file selected if image is uploaded
	file_selected=true;
}

function setBodyPart(objValue)
{	
	//set body part when click on image's body part
	var bodyPartElem = $('#bodypart'+currPartID).val();		//document.getElementById("bodypart"+currPartID).value
	if(!file_selected && bodyPartElem == '') {
		//if no image selected in Body Part image
		alert('first select the Image!');
		return;
	}
	var bodyPartID = counterID-1;
	$('#bodypart'+currPartID).val(objValue); 		//document.getElementById("bodypart"+currPartID).value=objValue;
	$('#body').val(objValue);						//document.getElementById("body").value=objValue;
	var elemImg = $('#image'+counterID);					//document.getElementById("image"+i)
	var bodyPartValue = $("#bodypart"+bodyPartID).val();	//document.getElementById("bodypart"+bodyPartID).value
	if( elemImg == null && bodyPartValue != '' ){
		// refresh jQM controls
		$('#home').trigger('create');
		counterID = counterID + 1;
		file_selected=false;
	}
}


function setImgBrowseText(elem,id){
	// set input type filename value. After change
	var filename = $(elem).val();
    $('#navImg'+id+' input[type=text]').val(filename);
}

var newRowID = 1;		//var temp=1;    //to create new row id
function addRow(){
	//Add new image and body part row if previous row is completly filled
	var imageValue = $("#image"+newRowID).val();		//document.getElementById("image"+newRowID).value;
	var bodyPartVal = $("#bodypart"+newRowID).val();	//document.getElementById("bodypart"+newRowID).value
	if(imageValue != null && bodyPartVal != ''  )
	{
		newRowID = newRowID+1;
		$('#buttonPlaceHolder').append('<div class="ui-block-a bodyPartImgNav" data-inset="true" id="navImg'+newRowID+'">\
											<label for="idpicture">Image:</label>\
											<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">\
												<div id="NFI-wrapper-13989448416436114" class="NFI-wrapper nicefileinput nice inputClass" style="overflow: auto; display: inline-block;"><div style="overflow: hidden; position: relative; display: block; float: left; white-space: nowrap; text-align: center;" class="NFI-button NFI13989448416436114">Browse...\
													<input type="file" onchange="setFileSelected(id);setImgBrowseText(this,'+newRowID+')" class="nicefileinput nice inputClass NFI-current" name="image'+newRowID+'" id="image'+newRowID+'" accept="image/*" style="opacity: 0; position: absolute; border: medium none; margin: 0px; padding: 0px; top: 0px; right: 0px; cursor: pointer; height: 60px;" data-styled="true">\
												</div>\
												<input type="text" readonly="readonly" style="display: block; float: left; margin: 0px; padding: 0px 5px;" class="NFI-filename NFI13989448416436114">\
												</div>\
											</div>\
										</div>\
										<div id="grid" class="ui-block-b">\
											<label for="insurancecard">Body Parts:</label>\
											<div class="ui-grid-a">\
												<div class="ui-block-a bodypart-a" style="width:77%">\
													<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">\
														<input type="text" name="bodypart'+newRowID+'" id="bodypart'+newRowID+'"  ></input>\
													</div>\
												</div>\
												<div class="ui-block-b" style="width:23%">\
													<a href="#popupBasic" data-rel="popup" data-role="button" id="button@'+newRowID+'" class="ui-btn ui-btn-inline" style="background-image:url(\'resources/images/humanbody.jpg\'); " onClick="getImageInputID(id);">Body part</a>\
												</div>\
											</div>\
										</div>');
	}else{ //if no image and no body parts then alert
		alert("first select the Image and bodyParts");
	}
}

function addQuestionnaire(){
	//add new questionnaire
	var numQuestionnaire = $('.QuestionnaireInput').length;
	var checkQuestionnaire = $('#Questionnaire'+numQuestionnaire).val();
	if(checkQuestionnaire != null && checkQuestionnaire != ''){
		nextQueID = numQuestionnaire+1;
		$('#questionnaireList').append('<div id="nav'+nextQueID+'"  data-inset="true" class="ui-block-a QuestionnaireInput">\
											<label for="Questionnaire1">Questionnaire '+nextQueID+':</label>\
											<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">\
												<div id="NFI-wrapper-1398929987124173" class="NFI-wrapper nicefileinput nice inputClass" style="overflow: auto; display: inline-block;">\
													<div style="overflow: hidden; position: relative; display: block; float: left; white-space: nowrap; text-align: center;" class="NFI-button NFI1398929987124173">Browse...\
														<input type="file" class="nicefileinput nice inputClass NFI-current QuestionnaireFile" name="Questionnaire'+nextQueID+'" id="Questionnaire'+nextQueID+'" accept="image/*" style="opacity: 0; position: absolute; border: medium none; margin: 0px; padding: 0px; top: 0px; right: 0px; cursor: pointer; height: 60px;" data-styled="true" onchange="setBrowseText(this,'+nextQueID+');">\
													</div>\
													<input type="text" readonly="readonly" style="display: block; float: left; margin: 0px; padding: 0px 5px;" class="NFI-filename NFI1398929987124173">\
												</div>\
											</div>\
										</div>');
	}
	else{
		//if previous questionnaire is empty
		alert('Please provide Questionnaire'+numQuestionnaire+' image.');
	}
}

function setBrowseText(elem,id){
	// set input type filename value. After change
	var filename = $(elem).val();
    $('#nav'+id+' input[type=text]').val(filename);
}


function submitPatientForm(){
	//validate Patient details fields
	jQuery('.error').hide();
	var phoneno = /^\d{10}$/;
	var validationStatus = 0;
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	//validate Patient name
	var Patientname = $('#fullname').val();						//Patient name
	if(Patientname == '') {
		//if Patient name is empty
		$("#patient_Name_error").css("display", "block");		//show error span
		validationStatus=1;
	}
	
	//phone number validation
	var inputphoneno = $('#phone').val(); 						//Phone number validation
	if(!inputphoneno.match(phoneno)) {
		//if phone number is not 10 digit
		$("#patient_phone_error").css("display", "block");
		validationStatus=1;
	}
	
	var idpicture = $('#idpicture').val();						//ID picture validation
	if(idpicture == '') {
		//if idpicture is empty
		$("#ID_picture_error").css("display", "block");	
		validationStatus=1;
	}
	if($('.bodyPartImgNav').length < 2){
		$("#min_bodyPart_error").css("display", "block");
	}
	else if($('.bodyPartImgNav').length == 2){
		var imageValue = $("#image2").val();
		var bodyPartVal = $("#bodypart2").val();
		if(imageValue == null || bodyPartVal == ''){
			$("#min_bodyPart_error").css("display", "block");
		}
	}
	if(validationStatus == 1){
		//if any of above validation fails
		return false;
	}
}
function formvalidation() {
	//validate phone number
	var phoneno = /^\d{10}$/;
	var inputphoneno = $('#text1').val();		// document.getElementById('text1').value;
	if(!inputphoneno.match(phoneno)) {
		$("#myAnchor").css("display", "block"); 	//document.getElementById('myAnchor').style.display="block";
		return false;
	}
}
function donePopup(){
	var bodyPart = $('#body').val();
	if(bodyPart == ''){
		alert('Please select a body part');
		return false;
	}
}	