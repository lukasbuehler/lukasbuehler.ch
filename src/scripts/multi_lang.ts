
import i18next from "i18next";

i18next
    .use(i18next.i18nextXHRBackend)
    .use(i18next.i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: "en",
        debug: "true",
        ns: ["index", "general", "common"],
        defaultNS: "general",
        backend: {
            loadPath: '/lang/{{lng}}/{{ns}}.json'
        },
        function(err, t) 
        {
            updateContent();
        }
    });

function updateContent()
{
    // Update all the elements with the accroding text
    
    // document.getElementById("hello_world").innerHTML = i18next.t("hello_world")
}

function changeLng(lng)
{
    i18next.changeLanguage(lng);
}

i18next.on("languageChanged", () => {
    updateContent();
});