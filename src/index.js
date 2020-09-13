import './styles.css';
import axios from 'axios';

axios.defaults.headers.common['Cache-Control'] = 'no-cache';

let backUpAlert = document.getElementById('backUpAlertSound');
let downAlert = document.getElementById('downAlertSound');
let testSound = document.getElementById('testSound');
let logsDiv = document.getElementById('logsDiv');

let isInternetDown = null;

const interval = setInterval(function () {
  axios
    .get('https://reqres.in/api/users')
    .then(() => {
      if (isInternetDown) backUpAlert.play();
      console.log('Your internet connection is working!');
      const timeNow = new Date();
      logsDiv.innerHTML = `<p class="success-log animate" id="success-log">${timeNow.toLocaleString()}: Internet is up.</p>` + logsDiv.innerHTML;
      let successLog = document.getElementById("success-log");
      setInterval(() => {
        successLog.classList.replace("success-log", "success-old-log")
        successLog.classList.remove("animate")
      }, 4000)
      isInternetDown = false;
    })
    .catch(() => {
      if (!isInternetDown) downAlert.play();
      console.error('Internet is down.');
      const timeNow = new Date();
      logsDiv.innerHTML +=
        `<p class="error-log">${timeNow.toLocaleString()}: Internet is down.</p>`;
      isInternetDown = true;
    });
}, 5000);

const button = document.getElementsByTagName('button')[0];
button.onclick = function () {
  testSound.play();
};
