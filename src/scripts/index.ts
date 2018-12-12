// This is the entry point for all typescript scripts and the root for the bundled js in the html

//import { smoothScrollSetup } from "./smoothScroll";
import { loadCards } from "./cards";
import { closeNavbarOnItemSelection } from "./navbar"

// Import styles for webpack
import './../styles.scss';

//smoothScrollSetup();
loadCards();
closeNavbarOnItemSelection();
