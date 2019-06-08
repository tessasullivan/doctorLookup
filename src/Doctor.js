const betterDoctor = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}`;

export class Doctor {
  getDoctor (input) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `${betterDoctor}&${input}&location=47.608013,-122.335167,50&limit=20`;
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