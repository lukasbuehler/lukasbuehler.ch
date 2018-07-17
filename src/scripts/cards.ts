import { MultilangResource, makeMultilangResource, getTranslation, addResources, updateContent } from "./multi_lang";

enum State
{
    Planning = "in_planning",
    Development = "in_development",
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
    image_link?: string, 
    image_classes?: string,
    visible_date: string,
    expiration_date?: string,
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
    expirationDate?: Date,
    state: State,
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
            text: makeMultilangResource(
                "text", cardJson.text_en || "", 
                "text", cardJson.text_de || ""
            ),
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
                cards.push(parseCardJson(cardData));
            }

            // maybe sort the cards?

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
        for(var i = 0; i < Math.min(3, cards.length); i++)
        {
            let card = cards[i];

            var imageClasses: string[] = [];

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

            let cardHtml = `
                <div class="card-view shadow">
                    <img src="${card.imageSrc || ""}" alt="${card.title}" class="${card.imageClasses || ""}">
                    <h4>
                        <strong>${getTranslation("general:cards.card_"+card.id+".title")}</strong>${""/*" "+card.titleNote*/}
                    </h4>
                    <p>${getTranslation("general:cards.card_"+card.id+".text")}</p>
                    <p>${getTranslation("general:cards.states."+card.state)}</p>
                </div>
            `

            $("#spotlight .card-row").find(".cardslot").eq(i).append(cardHtml);
        }

        updateContent();
        // Stop the spinner
        $("#spotlight i.fa-spinner").parent().hide();
    }
}