
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
        debug: "false",
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
    jQuery.getJSON(`/lang/en/index.json`, function(data){
        // Get ids
        for (let group of data.children)
        {
            console.log(group);
            for (let obj of group.children)
            {
                console.log(obj);

                //$(`#${group.name} .${obj.name}`).text(i18n.t("index:welcome.intro"))
            }
        }

        
    });
    $("#welcome .intro").text(i18n.t("index:welcome.intro"))

    
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