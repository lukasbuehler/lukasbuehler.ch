// This is the entry point for all typescript scripts and the root for the bundled js in the html

import { setupPeopleScript } from "./people";
import { smoothScrollSetup } from "./smoothScroll";
import { loadCards } from "./cards";
import { closeNavbarOnItemSelection } from "./navbar"

setupPeopleScript();
smoothScrollSetup();
loadCards();
closeNavbarOnItemSelection();
