import { MultilangResource, LanguageAnswer, makeMultilangResource } from "./multi_lang";
import * as $ from "jquery"; 

enum State
{
    Planning = "general:cards.states.in_planning",
    Development = "general:cards.states.development",
    Download = "general:cards.states.download",
    Visit = "general:cards.states.visit",
    NewVersion = "general:cards.states.new_version",
    Watch = "general:cards.states.watch_now"
}

interface CardJson
{
    id: number,
    title: string,
    text?: LanguageAnswer,
    imageSrc?: string, 
    visibleDateString: string,
    expirationDateString?: string,
    state?: string,
    isDev?: number
}

interface Card
{
    id: number,
    title: string,
    text?: MultilangResource,
    imageSrc?: string, 
    visibleDate: Date,
    expirationDate?: Date,
    state?: State,
    isDev: boolean
}

function parseCardJson(cardJson: CardJson): Card
{
    var expirationDate: Date | null;
    if(cardJson.expirationDateString)
    {
        expirationDate = new Date(cardJson.expirationDateString);
    }
    let card: Card = 
        {
            id: cardJson.id,
            title: cardJson.title,
            text: makeMultilangResource(cardJson.text),
            imageSrc: cardJson.imageSrc,
            visibleDate: new Date(cardJson.visibleDateString),
            expirationDate: expirationDate,
            state: State[cardJson.state],
            isDev: Boolean(cardJson.isDev) || false
        };

    return card;
}

export function loadCards()
{
    console.log("Started getting cards");

    $.ajax({
        url: "https://lukasbuehler.ch"+'/loadCards.php',
        dataType: 'json',
        success: function(data) {
            console.log(data);      
        },
        error: function( data, status, error ) { 
            console.log(data);
            console.log(status);
            console.log(error);
        }
    });

    /*
        $.each(data, function(fieldName, fieldValue) {
            $("#" + fieldName).val(fieldValue);
        });
    */
}