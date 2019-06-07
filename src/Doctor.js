const betterDoctor = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}`;

export class Doctor {
  getDoctorByName(name) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `${betterDoctor}&name=${name}&location=47.608013,-122.335167,50&limit=50`;

      request.open("GET", url, true);
      request.send();

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
    });
  }
}