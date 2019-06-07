import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Doctor } from './Doctor';

$().ready(function(){
  $("#nameSearch").submit(function(event) {

    event.preventDefault();
    let inputtedName = $("#nameLookup").val();
    $("#nameLookup").val("");
    let doctorList = new Doctor();
    let uniqueDoctors = [];
    
    let promise = doctorList.getDoctorByName(inputtedName);
    
    promise.then(function(response) {
      $("#results").empty();

      let list = JSON.parse(response);
      list.data.forEach(function(doctor) {
        doctor.practices.forEach(function(practice) {
          // Weed out duplicates
          let street2 = practice.visit_address.street2 || "";
          uniqueDoctors.push({name: practice.name,
            street: practice.visit_address.street,
            street2: street2,
            city:  practice.visit_address.city,
            state: practice.visit_address.state,
            zip: practice.visit_address.zip});
          // $("#results").append(`<li>${practice.name} ${practice.visit_address.street} ${street2}
          // ${practice.visit_address.city} ${practice.visit_address.state} ${practice.visit_address.zip}</li>`);
        });    
      })
    }, function(error) {
      console.error(`There was an error processing your request: ${error}`);
    });  // end promise

    console.log(uniqueDoctors);
    uniqueDoctors.forEach(function(doctor) {
      $("#results").append(`<li>${doctor.name} ${doctor.street} ${doctor.street2} ${doctor.city} ${doctor.state} ${doctor.zip}</li>`);
    })
  }); // end submit function
})