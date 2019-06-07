# Doctor Lookup

#### An application which allows users to lookup doctors.

#### By **Tessa Sullivan**

## Description
This application allow users to lookup doctors by their name or by symptom.


### Specs
| Spec | Input | Output |
| :-------------     | :------------- | :------------- |
| Lookup doctors by symptom | Enter a symptom and click Search | A list of doctors appears with first name, last name, address, phone number, website and whether or not the doctor is accepting new patients |
| Lookup doctors by name | Enter a name and click Search | A list of doctors appears with first name, last name, address, phone number, website and whether or not the doctor is accepting new patients |
| Errors are reported correctly | | Application reflects error correctly |
| If no doctors meet criteria, the application reflects this correctly |||



## Setup/Installation Requirements
### Prerequisites
You must have Node.js installed.  Go to [Node.js](https://nodejs.org/en/download/current/) and download and install the appropriate version for your OS.

1. Clone this repository.
2. Go to [BetterDoctor API](https://developer.betterdoctor.com/) and register for an API key.
3. Create a file called .env and store the key there in the following format:
    ```exports.apiKey = <YOUR API KEY HERE>```

4. Run ```npm install```.
5. Run ```npm start``` This will load the application in your browser.

## Known Issues
* No known issues at this time.

## Technologies Used

* Javascript
* Webpack with Jasmine, Karma
* HTML / CSS

## Support and contact details

_Contact Tessa Sullivan @ tessa.sullivan@gmail.com_

### License

*{This software is licensed under the MIT license}*

Copyright (c) 2019 **_Tessa Sullivan_**
