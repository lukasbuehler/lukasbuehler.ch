
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

let my18nextVars = 
{
    "generalLanguageFileName": "general",
    "classesGroupName": "classes",
    "insertHtmlCommandClass": "i18n-insert-as-html",
    "classesSelectorClassPrefix": "i18n-c-",
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
    let params = 
    {
        age: 20 // TODO
    }

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
                    insertI18nextPhrase(page, group, params, [elem], true);
                }
            }
        });

        // update all the little things
        jQuery.getJSON(`/lang/${lng}/general.json`, function(data){
            // Get ids
            for (let group in data)
            {
                if(group === my18nextVars.classesGroupName)
                {
                    // Don't match groups.
                    for (let elem in data[group])
                    {
                        for (let elem2 in data[group][elem])
                        {
                            insertI18nextPhrase(my18nextVars.generalLanguageFileName, group, params, [elem, elem2], false)
                        }
                    }
                }
                else
                {
                    for (let elem in data[group])
                    {
                        insertI18nextPhrase(my18nextVars.generalLanguageFileName, group, params, [elem], true)
                    }
                }
            }
        });
    }
}

// Not sure if this is needed
function updateCardContent(language)
{
    //Update the cards with the correct language
    
}

function insertI18nextPhrase(file: String, group: String, params: Object, elems: String[], isMatchingGroup: boolean)
{
    let element: JQuery<HTMLElement>
    if(isMatchingGroup)
    {
        element = $(`#${group} .${elems.join(".")}`);
    }
    else
    {
        element = $(`.${my18nextVars.classesSelectorClassPrefix}${elems.join("-")}`)
        console.log(`.${my18nextVars.classesSelectorClassPrefix}${elems.join("-")}`);
    }

    if(element.hasClass(my18nextVars.insertHtmlCommandClass))
    {
        element.html(i18n.t(`${file}:${group}.${elems.join(".")}`, params))
    }
    else
    {
        element.text(i18n.t(`${file}:${group}.${elems.join(".")}`, params))
    }
}

function changeLng(lng)
{
    i18n.changeLanguage(lng);
}

i18n.on("languageChanged", () => {
    updateContent();
});


export default instance