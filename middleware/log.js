const fs = require('fs');

let writeFunc = (file, req) => {
  let currentDate = Date();
  currentDate = currentDate.split(' ');
  currentDate = currentDate.slice(0,4);
  let logString = req.method + ' ' + req.originalUrl + ' ' + Date() + '\n';
  currentDate = currentDate.join('-');
  getLogData(file, logString, currentDate, (logData) => {
    fs.writeFile(`./logs/${currentDate}.log`, logData, (err) => {
      if(err){
        return console.error(err);
      }
    });
  });
};

let getLogData = (file, logString, currentDate, callback) => {
  let logData = logString;
  if(file.indexOf(currentDate + '.log') > -1){
    fs.readFile('./logs/'+file[file.indexOf(currentDate + '.log')], (err, data) => {
       logData += data.toString();
       return callback(logData);
     });
  } else {
    return callback(logData);
  }
};

let log = (req, res, next) => {
  fs.readdir('./logs/', (err, file) => {
    if(err) {
      return console.error(err);
    } else {
      writeFunc(file, req);
      next();
    }
  });
};

module.exports = log;