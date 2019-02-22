import { MultilangResource, makeMultilangResource, getTranslation, addResources, updateContent } from "./multi_lang";

declare function require(module: string): any;
let cardTemplate = require('../markup/templates/card.hbs');

enum State
{
    Planning = "in_planning",
    Development = "in_development",
    Cancelled = "cancelled",
    PutOff = "put_off",
    Download = "download",
    Visit = "visit",
    NewVersion = "new_version",
    Watch = "watch_now"
}

interface CardJson
{
    id: number,
    title: string,
    text_en?: string,
    text_de?: string,
    text_ch?: string,
    image_src?: string, 
    image_classes?: string,
    visible_date: string,
    expiration_date?: string,
    link?: string,
    state: string,
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
    expirationDate?: Date | "",
    link?: string
    state: State,
    isDev: boolean
}

function setLoadingErrorVisibility(visible: boolean)
{
    if(visible)
    {
        $("i.fa.loadingError").show();
        $("#spotlight i.fa-spinner").hide();
    }
    else
    {
        $("i.fa.loadingError").hide();
    }
}

function parseCardJson(cardJson: CardJson): Card
{
    var expirationDate: Date | "";
    if(cardJson.expiration_date)
    {
        expirationDate = new Date(cardJson.expiration_date);
    }

    let card: Card = 
        {
            id: Number(cardJson.id),
            title: cardJson.title || "",
            text: makeMultilangResource(
                "text", cardJson.text_en || "", 
                "text", cardJson.text_de || "",
                "text", cardJson.text_ch || ""
            ),
            imageSrc: cardJson.image_src || "",
            imageClasses: cardJson.image_classes || "",
            visibleDate: new Date(String(cardJson.visible_date)),
            expirationDate: expirationDate,
            link: cardJson.link,
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
                cards.push(parseCardJson(cardData));
            }

            // maybe sort the cards?

            cards.sort(cardCompare);
            cards = removeHiddenCards(cards);


            instantiateCards(cards, "spotlight");
            instantiateCards(filterDevCards(cards), "development");
        },
        error: function( data, status, error ) { 
            console.log(data);
            console.log("Status: "+status);
            console.log("Error: "+error);
            setLoadingErrorVisibility(true);
        }
    });

    function instantiateCards(cards: Card[], section: string)
    {
        $("#"+section).find(".card-deck").empty();
        for(var i = 0; i < Math.min(3, cards.length); i++)
        {
            let card = cards[i];

            addResources("en", "general", // en
            {
                
                "cards": 
                {
                    ["card_"+card.id]: 
                    {
                        "title": card.title,
                        "text": card.text.en["text"]
                    }
                }
                
            }, true);
            addResources("de", "general", // de
            {
                
                "cards": 
                {
                    ["card_"+card.id]: 
                    {
                        "title": card.title,
                        "text": card.text.de["text"]
                    }
                }
                
            }, true);
            addResources("de-CH", "general", // de-CH
            {
                
                "cards": 
                {
                    ["card_"+card.id]: 
                    {
                        "title": card.title,
                        "text": card.text.ch["text"]
                    }
                }
                
            }, true);

            console.log(JSON.stringify(card))
            let cardHtml = cardTemplate(card)
            $("#"+section).find(".card-deck").append(cardHtml);
        }

        updateContent();
        // Stop the spinner
        $("#"+section+" i.fa-spinner").parent().hide();
    }

    function cardCompare(a: Card, b:Card): number
    {
        if(a.visibleDate < b.visibleDate)
        {
            return 1;
        }
        if(a.visibleDate > b.visibleDate)
        {
            return -1;
        }
        return 0;
    }

    function removeHiddenCards(cards: Card[]): Card[]
    {
        for(var i=0; i < cards.length; ++i)
        {
            if(cards[i].expirationDate && cards[i].expirationDate < new Date())
            {
                cards.splice(i);
            }
        }
        return cards;
    }

    function filterDevCards(cards: Card[]): Card[]
    {
        for(var i=0; i < cards.length; ++i)
        {
            if(!cards[i].isDev)
            {
                cards.splice(i, 1);
            }
        }
        return cards;
    }
}