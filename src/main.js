import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Doctor } from './Doctor';

let doctors = []; 

function extractInfo(practice){
  let street2 = practice.visit_address.street2 || "";
  let website = practice.website || "";
  let accepting;
  if (practice.accepts_new_patients) {
    accepting = "Yes";
  } else {
    accepting = "No";
  }

  doctors.push({name: practice.name,
    street: practice.visit_address.street,
    street2: street2,
    city:  practice.visit_address.city,
    state: practice.visit_address.state,
    zip: practice.visit_address.zip,
    phone: practice.phones[0].number,
    website: website,
    accepting: accepting});
}

function displayDoctorsByName(name){
  let doctorList = new Doctor();
  let promise = doctorList.getDoctorByName(name);
  
  promise.then(function(response) {
    $("#doctorList").show();
    $('tr:not(#tableHeader)').empty();

    let list = JSON.parse(response);

    list.data.forEach(function(result) {
      result.practices.forEach(function(practice) {
        extractInfo(practice);
      });    
    });

    doctors.forEach(function(doctor) {
      $("#doctorList").append(`<tr><td>${doctor.name}</td><td>${doctor.street} ${doctor.street2} ${doctor.city} ${doctor.state} ${doctor.zip}</td>
        <td>${doctor.phone}</td><td>${doctor.website}</td><td>${doctor.accepting}</td>`);
    });
  }, function(error) {
    $("#results").append(`There was an error processing your request: ${error}`);
  });  // end promise

}

$().ready(function(){
  $("#nameSearch").submit(function() {
    
    event.preventDefault();
    let inputtedName = $("#nameLookup").val();
    $("#nameLookup").val("");
    displayDoctorsByName(inputtedName);
  }); 
});