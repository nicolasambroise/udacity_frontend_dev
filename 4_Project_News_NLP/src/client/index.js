import "./css/bootstrap.min.css";
import "./scss/base.scss";
import "./scss/header.scss";
import "./scss/footer.scss";
import "./scss/form.scss";
import "./scss/main.scss";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'

import avatar from "./img/avatar/AmbroiseNicolas2020Square100.png";

import { checkForName } from './js/nameChecker'
import { handleSubmitTestServer, handleSubmitTestApi } from './js/formHandlerTest'
import { handleSubmitName } from './js/formHandlerName'
import { handleSubmitURL } from './js/formHandlerURL'

console.log("CHANGE!!");

export { checkForName, handleSubmitTestServer, handleSubmitTestApi, handleSubmitName, handleSubmitURL};