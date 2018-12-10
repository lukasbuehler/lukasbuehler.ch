
import i18n from "i18next"
import XHR from "i18next-xhr-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { getAge } from "./momentHelper";

export interface MultilangResource
{
    en: Object,
    de: Object,
    ch: Object
}

export function makeMultilangResource(
    key_en: string, text_en: string,
    key_de: string, text_de: string,
    key_ch: string, text_ch: string
): MultilangResource
{
    return {
        en: 
        {
            [key_en]: text_en
        },
        de:
        {
            [key_de]: text_de
        },
        ch:
        {
            [key_ch]: text_ch
        }
    }
}

let my18nextVars = 
{
    "specificPageNameSpaceSelector": "page",
    "insertAsHtmlClass": "i18c-html"
}

let parameterGetCallbacks = 
{
    "age": function() {
        return getAge("19.06.1998");
    }
}



const instance = i18n
    .use(XHR)
    .use(LanguageDetector)
    .init({
        fallbackLng: 
        {
            'default': ['en']
        },
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

export function addResources(lng: string, ns: string, resource: Object, deep?: boolean)
{

    i18n.addResourceBundle(lng, ns, resource, deep);
}

export function getTranslation(selector: string, paramsObj?: Object): string
{
    if(paramsObj)
    {
        return i18n.t(selector, paramsObj);
    }
    else
    {
        return i18n.t(selector);
    }
    
}


export function updateContent(lng?: string)
{
    // Update all the elements with the accroding text

    let params = 
    {
        my_age: parameterGetCallbacks.age()
    }

    // Get language
    lng = lng || i18n.language
    console.log(i18n.languages);
    if(lng)
    {
        // Get page name
        let page = $("body").attr("id") // fetches the current page name from the id of the body element in the DOM.

        $('.i18n').each(function(){
            let selector: string = getI18nSelector(page, this);
            if($(this).hasClass(my18nextVars.insertAsHtmlClass))
            {
                insertI18nextPhraseAsHtml($(this), selector, params);
            }
            else
            {
                insertI18nextPhraseAsText($(this), selector, params);
            }
        })
    }
}

function getI18nSelector(page: string, _elem: HTMLElement): string
{
    let classString: string = $(_elem).attr('class');
    let regEx: RegExp = /(^|\s)(i18n-([a-zA-Z0-9\-\_]+))/gm
    let _groups: RegExpExecArray = regEx.exec(classString);

    //let currentClass = _groups[2];
    let i18nSelector = makeI18nSelectorFromClassString(page, _groups[3]);

    return i18nSelector;
}

/** s is the class string without the "i18n-" prefix. */
function makeI18nSelectorFromClassString(page: string, s: string): string
{
    let _splittedString: string[] = s.split("-");
    let _nameSpace: string = _splittedString.shift();
    let _elements = _splittedString;

    if(_nameSpace === my18nextVars.specificPageNameSpaceSelector)
    {
        _nameSpace = page;
    }
    let selector: string = `${_nameSpace}:${_elements.join(".")}`;
    return selector
}

function insertI18nextPhraseAsText(element: JQuery<HTMLElement>, i18nSelector: string, params: Object)
{
    element.text(i18n.t(i18nSelector, params))
}
function insertI18nextPhraseAsHtml(element: JQuery<HTMLElement>, i18nSelector: string, params: Object)
{
    element.html(i18n.t(i18nSelector, params))
}

function changeLng(lng)
{
    i18n.changeLanguage(lng);
}

i18n.on("languageChanged", () => {
    updateContent();
});


export default instance