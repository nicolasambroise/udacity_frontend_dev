import "./css/bootstrap.min.css";
import "./scss/base.scss";
import "./scss/header.scss";
import "./scss/footer.scss";
import "./scss/form.scss";
import "./scss/main.scss";
import "./scss/modal.scss";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'

import avatar from "./img/avatar/AmbroiseNicolas2020Square100.png";
import bg from "./img/voyage.jpg";

// Handle UI event
import { handleSearch, handleSave, handleDisplay, handleCancel, handleDelete} from './js/formHandler.js';

// Retrieve Data to Display the Modal
//export { getCity, getTripStart, getTripEnd, countdown, showModal, displayTrip}; from './js/modal.js'

// Log reload in Dev mode
if (process.env.NODE_ENV !== 'production') {
  console.log('CHANGE !!! Looks like we are in development mode!');
}

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Export
export { handleSearch, handleSave, handleDisplay, handleCancel, handleDelete };