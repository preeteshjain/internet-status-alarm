import "./styles.css";
import axios from "axios";

axios.defaults.headers.common["Cache-Control"] = "no-cache";

const backUpAlert = new Audio("internet-back-online-alert.mp3");
const downAlert = new Audio("internet-down-alert.mp3");

const interval = setInterval(function () {
  axios
    .get("https://reqres.in/api/users")
    .then((response) => {
      console.log("Your internet connection is working");
      backUpAlert.play();
    })
    .catch((error) => {
      downAlert.play();
      console.error("Internet is down.");
    });
}, 5000);

const t = document.getElementsByTagName("button")[0];
t.onclick = function () {
  clearInterval(interval);
};
