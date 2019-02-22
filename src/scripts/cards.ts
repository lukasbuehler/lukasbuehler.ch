import { MultilangResource, makeMultilangResource, getTranslation, addResources, updateContent } from "./multi_lang";

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
            instantiateCards(returnDevCards(cards), "development");
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
            addResources("de-ch", "general", // de-ch
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

            let cardButtonHtml = "";
            if(card.link)
            {
                cardButtonHtml = `
                    <a href="${card.link}" class="btn btn-primary mt-auto mr-auto ml-auto i18n i18n-general-button-read_more "></a>
                `;
            }

            let cardHtml = `
                <div class="card shadow" style="min-width: 250px;">
                    <div class="card-body d-flex flex-column">
                        <img class="card-img mt-auto ${card.imageClasses || ""}" src="${card.imageSrc || ""}" alt="${card.title}">
                        <h4 class="card-title mt-auto i18n i18n-general-cards-card_${card.id}-title"></h4>
                        <p class="card-text i18n i18n-general-cards-card_${card.id}-text"></p>
                        ${cardButtonHtml}
                    </div>
                    <div class="card-footer"><span><strong class="i18n i18n-general-cards-states-${card.state}"></strong></span></div>
                </div>
            `

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

    function returnDevCards(cards: Card[]): Card[]
    {
        for(var i=0; i < cards.length; ++i)
        {
            if(!cards[i].isDev)
            {
                cards.splice(i);
            }
        }
        return cards;
    }
}