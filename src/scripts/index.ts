// This is the entry point for all typescript scripts and the root for the bundled js in the html

import { setupPeopleScript } from "./people";
import { smoothScrollSetup } from "./smoothScroll";
import { Xmlify } from "./xmlify";

setupPeopleScript();
smoothScrollSetup();

var xmlifyIndex = new Xmlify("index");