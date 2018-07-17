/* 
    Made by Lukas Bühler, 2017
*/

/* 
    DEPENDENCIES:
    ~ moment.js
*/

/* 
    HOW IT WORKS:
    add a span with one of the following classes to your html markup to fill in the information on load.

    For example, 
    if you'd like to show your current age in a text don't just write it out, add the following code in it's place:

        <span class="poeple age me"></span>

    This will display your age in the text where the span tag is.
    The syntax is like this:

        <span clas="people [variable to insert] [person key]"></span>
*/

import * as moment from "moment";

// TODO Optimize! And Typescriptify!

var people =
    {
        /*
        "albert": // The person key
        {
            "name": "Albert Einstein",
            "birthday": "14.03.1897",
        }
        */
        "lukas":
        {
            "name": "Lukas Bühler",
            "birthday": "19.06.1998"
        }
    };

var variables =
    {
        "age": function (person)
        {
            var birthdayMoment = moment(person.birthday, 'DD.MM.YYYY');
            var nowMoment = moment();

            return nowMoment.diff(birthdayMoment, "years");
        }
    }


export function setupPeopleScript()
{
    // Check for moment.js
    if (typeof moment === "undefined")
    {
        // moment.js is not used.
        console.log(
            `Error: moment.js is not available. 
            Please download it and / or reference it in your markup before this script is executed`);

    }

    $("span.people").each(function ()
    {
        for (var varKey in variables)
        {
            if ($(this).hasClass(varKey))
            {
                for (var personKey in people)
                {
                    if ($(this).hasClass(personKey))
                    {
                        /* 
                            gives the function defined in variables the person named, 
                            executes it and sets the span text to the result 
                        */

                        $(this).text(variables[varKey](people[personKey]));
                        break;
                    }
                }
                break;
            }
        }

    });
};