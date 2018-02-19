import { MultilangResource, makeMultilangResource } from "./multi_lang";
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
    text_en?: string,
    text_de?: string,
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
            title: cardJson.title || "",
            text: makeMultilangResource(cardJson.text_en || "", cardJson.text_de || ""),
            imageSrc: cardJson.imageSrc || "",
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

            var cards: Card[] = [];

            for(let cardData of JSON.parse(data))
            {
                // loop through returned data and make cards

                cards.push(parseCardJson(cardData));
            }
            console.log(cards);
        },
        error: function( data, status, error ) { 
            console.log("Data: "+data);
            console.log("Status: "+status);
            console.log("Error: "+error);
        }
    });

    function instantiateCards()
    {

    }
}