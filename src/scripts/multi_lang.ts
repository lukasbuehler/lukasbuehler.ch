
import i18next from "i18next";

export interface LanguageAnswer
{
    en: string,
    de: string
}

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

export function makeMultilangResource(object: LanguageAnswer): MultilangResource
{
    let resource =
    {
        en: 
        {
            translation: 
            {
                key: object.en
            }
        },
        de:
        {
            translation: 
            {
                key: object.de
            }
        }
    };
    return resource;
}

/*
i18next
    .use(i18next.i18nextXHRBackend)
    .use(i18next.i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: "en",
        debug: "true",
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
*/
function addResouces(lang: string, namespace: string, data: Object)
{
    i18next.addResourceBundle(lang, namespace, data);
}


function updateContent()
{
    // Update all the elements with the accroding text
    
    // document.getElementById("hello_world").innerHTML = i18next.t("hello_world")
}

function updateCardContent(language)
{
    // Update the cards with the correct language
    
}

function changeLng(lng)
{
    i18next.changeLanguage(lng);
}
/*
i18next.on("languageChanged", () => {
    updateContent();
});
*/