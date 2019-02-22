declare function require(module: string): any;
let navbarTemplate = require('../markup/templates/navbar.hbs');
let instaPostTemplate = require("../markup/templates/instaPost.hbs");
let twitterTimelinePost = require("../markup/templates/twitterTimeline.hbs");


export function addNavbarTemplate()
{
    // Navbar to index
    $("#navbar").append(navbarTemplate())
}

export function addSocialMediaTemplates()
{
    $("#insta-post").append(instaPostTemplate())
    $("#twitter-timeline").append(twitterTimelinePost())
}