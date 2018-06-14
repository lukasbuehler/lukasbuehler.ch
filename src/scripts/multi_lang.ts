
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

export function makeMultilangResource(text_en: string, text_de: string): MultilangResource
{
    let resource =
    {
        en: 
        {
            translation: 
            {
                key: text_en
            }
        },
        de:
        {
            translation: 
            {
                key: text_de
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

    // Get page name
    let page = "index"

    // update page content
    jQuery.getJSON(`/lang/en/${page}.json`, function(data){
        // Get ids
        console.log(data);
        for (let group in data)
        {
            for (let elem in data[group])
            {
                $(`#${group} .${elem}`).text(i18n.t(`${page}:${group}.${elem}`))
            }
        }

        
    });

    // update all things


    
    //$("#welcome .intro").text(i18n.t("index:welcome.intro"))

    
}

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