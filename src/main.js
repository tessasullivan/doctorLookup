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
    website: `<a href="${website}">${website}</a>`,
    accepting: accepting});
}

function displayDoctors(input){
  let doctorList = new Doctor();
  let promise = doctorList.getDoctor(input);
  
  $('tr:not(#tableHeader)').remove();

  promise.then(function(response) {
    $("#doctorList").show();

    let list = JSON.parse(response);

    if (list.data.length === 0) {
      $("#doctorList").hide();
      $("#results").append("There are no doctors which meet your criteria");
    } else {
      
      list.data.forEach(function(result) {
        result.practices.forEach(function(practice) {
          extractInfo(practice);
        });    
      });
      
      doctors.forEach(function(doctor) {
        $("#doctorList").append(`<tr><td>${doctor.name}</td><td>${doctor.street} ${doctor.street2} ${doctor.city} ${doctor.state} ${doctor.zip}</td>
        <td>${doctor.phone}</td><td>${doctor.website}</td><td>${doctor.accepting}</td>`);
      });
    }
  }, function(error) {
    $("#results").append(`There was an error processing your request: ${error}`);
  });  // end promise
  doctors =[]; //Empty array so new search gives new results
}



$().ready(function(){
  var input;
  var searchString;

  $("#nameSearch").submit(function(event) {
    
    event.preventDefault();
    input = $("#nameLookup").val();
    $("#nameLookup").val("");

    searchString = `name=${input}`;
    displayDoctors(searchString);
  });
  
  $("#symptomSearch").submit(function(event) {
    
    event.preventDefault();
    input = $("#symptomLookup").val();
    $("#symptomLookup").val("");

    searchString = `query=${input}`;
    displayDoctors(searchString);
  });
  
});

