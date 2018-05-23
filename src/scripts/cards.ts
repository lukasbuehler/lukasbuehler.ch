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
    image_link?: string, 
    image_classes?: string,
    visible_date: string,
    expiration_date?: string,
    state?: string,
    is_dev?: number
}

interface Card
{
    id: number,
    title: string,
    text?: MultilangResource,
    imageSrc?: string, 
    imageClasses?: string,
    visibleDate: Date,
    expirationDate?: Date,
    state?: State,
    isDev: boolean
}

function parseCardJson(cardJson: CardJson): Card
{
    var expirationDate: Date | null;
    if(cardJson.expiration_date)
    {
        expirationDate = new Date(cardJson.expiration_date);
    }

    let card: Card = 
        {
            id: Number(cardJson.id),
            title: cardJson.title || "",
            text: makeMultilangResource(cardJson.text_en || "", cardJson.text_de || ""),
            imageSrc: cardJson.image_link || "",
            imageClasses: cardJson.image_classes || "",
            visibleDate: new Date(String(cardJson.visible_date)),
            expirationDate: expirationDate,
            state: State[cardJson.state],
            isDev: Boolean(Number(cardJson.is_dev || "0"))
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

            var cards: Card[] = [];

            for(let cardData of data)
            {
                // loop through returned data and make cards

                cards.push(parseCardJson(cardData));
            }
            console.log(cards);
            instantiateSpotlightCards(cards);
        },
        error: function( data, status, error ) { 
            console.log("Data: "+data);
            console.log("Status: "+status);
            console.log("Error: "+error);
        }
    });

    function instantiateSpotlightCards(cards: Card[])
    {
        console.log("Instantiating")
        for(var i = 0; i < Math.min(3, cards.length); i++)
        {
            console.log("Making card "+i)
            // set card to slot
            let card = cards[i];

            var imageClasses: string[] = [];

            $("#spotlight .card-row").find(".cardslot").eq(i).append(
                `
                <div class="card-view shadow">
                    <img src="${card.imageSrc || ""}" alt="${card.title}" class="${card.imageClasses || ""}">
                    <h4>
                        <strong>${card.title}</strong>${""/*" "+card.titleNote*/}
                    </h4>
                    <p>${card.text.en.translation["key"]}</p>
                    <p>${card.state}</p>
                </div>
                `
            );
        }

        // Stop the spinner
        $("#spotlight i.fa-spinner").parent().hide();
    }
}