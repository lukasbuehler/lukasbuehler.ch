
import * as i18n from "i18next"
import * as XHR from "i18next-xhr-backend"
import * as LanguageDetecort from "i18next-browser-languagedetector"
import * as $ from "jquery";


export interface MultilangResource
{
    en: 
    {
        translation: Object
    },
    de: 
    {
        translation: Object
    }
};

export function makeMultilangResource(
    key_en: string, text_en: string, 
    key_de: string, text_de: string
): MultilangResource
{
    let resource =
    {
        en: 
        {
            translation: 
            {
                [key_en]: text_en
            }
        },
        de:
        {
            translation: 
            {
                [key_de]: text_de
            }
        }
    };
    return resource;
}


const instance = i18n
    .use(XHR)
    .use(LanguageDetecort)
    .init({
        fallbackLng: "en",
        ns: ["index", "general"],
        defaultNS: "general",
        backend: {
            loadPath: '/lang/{{lng}}/{{ns}}.json'
        },
        function(err, t) 
        {
            updateContent();
        }
    });

function addResouces(lang: string, namespace: string, data: Object)
{
    i18n.addResourceBundle(lang, namespace, data);
}


function updateContent()
{
    // Update all the elements with the accroding text

    // Get language
    let lng = "en" // as of yet hardcoded
    if(lng)
    {
        console.log("lng = "+lng)
        // Get page name
        let page = $("body").attr("id") // fetches the current page name from the id of the body element in the DOM.

        // update page content
        jQuery.getJSON(`/lang/${lng}/${page}.json`, function(data){
            // Get ids
            for (let group in data)
            {
                for (let elem in data[group])
                {
                    $(`#${group} .${elem}`).text(i18n.t(`${page}:${group}.${elem}`))
                }
            }
        });

        // update all the little things
        jQuery.getJSON(`/lang/${lng}/general.json`, function(data){
            // Get ids
            for (let group in data)
            {
                if(group === "classes")
                {
                    // Don't match ids only classes.
                    for (let elem in data[group])
                    {
                        for (let elem2 in data[group][elem])
                        {
                            $(`.i18n-${elem}-${elem2}`).text(i18n.t(`general:${group}.${elem}.${elem2}`))
                        }
                    }
                }
                else
                {
                    for (let elem in data[group])
                    {
                        $(`#${group} .${elem}`).text(i18n.t(`general:${group}.${elem}`))
                    }
                }
            }
        });

        //$("#welcome .intro").text(i18n.t("index:welcome.intro"))
    }
}

// Not sure if this is needed
function updateCardContent(language)
{
    //Update the cards with the correct language
    
}

function changeLng(lng)
{
    i18n.changeLanguage(lng);
}

i18n.on("languageChanged", () => {
    updateContent();
});


export default instance