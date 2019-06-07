export class Doctor {
  getDoctorByName(name) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=3592ed2c785d1f9ddfffcc104267bf81&name=${name}&location=47.608013,-122.335167,50`;
      // let url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}&name=${name}&location=47.608013,-122.335167,50`;

      request.open("GET", url, true);
      request.send();

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
    });
  }
}