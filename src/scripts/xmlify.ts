/**
 * xmlify lets you define text elements in multiple languages and dynamically insert them into your markup.
 * 
 * Quick guide:
 * 1) In your markup
 * 
 * 
 * What this script does:
 * 1) Search for all xml files you have configured in the folder
 * 
 */  

import * as $ from "jquery";

interface XmlifyElement {
    xmlifyTag: string;
    selector?: string;
}

export class Xmlify
{
    // Settings
    contentPath: string = "content/";
    language: string = "de";

    static defaultXmlifyTags: XmlifyElement[] = 
    [
        {xmlifyTag: "text"}, // represents text node inside element
        {xmlifyTag: "title"}, // a h1, h2, h3... or something along the line
        {xmlifyTag: "subtitle"}, // If this comes after a title it has to be smaller than the first title
        {xmlifyTag: "paragraph", selector: "p"},
    ]

    constructor(pageName: string)
    {
        this.getXmlFile(pageName, this.setHtmlFromXmlContent);
    }

    getXmlFile(pageName: string, callback: (firstNodeName: string, xml: any) => void)
    {
        $.ajax({
            url: "/content/"+pageName+".xml",
            dataType: "xml"
          })
            .done(function( data ) 
            {
                callback(pageName, data)
            });    
    }

    setHtmlFromXmlContent(firstNodeName: string, xml)
    {
        if($(xml).find(firstNodeName))
        {
            // The file exists
            console.log("found the first node named "+firstNodeName);

            $(xml).find(firstNodeName).children().each(function() {
                // Loop through all the regions (ID)
                console.log("<"+String($(this).prop("tagName")).toLowerCase()+">"); // for debugging
                Xmlify.searchXmlAndSetTextRecursively($(this));
            });
        }
        else
        {
            // The file doesn't exist
            console.log("didn't find "+firstNodeName);
        }
    }

    static searchXmlAndSetTextRecursively(searchStartElement: JQuery<HTMLElement>)
    {
        Xmlify.recurse(searchStartElement, [])
    }

    static recurse(elem: JQuery<HTMLElement>, selectorList: string[], tag?: string)
    {
        if(tag === "t" || tag === "text")
        {
            // Set the html text to the text in the tag
            Xmlify.setText(Xmlify.makeLocationSelector(selectorList), String($(elem).text()))
            return;
        }

        elem.children().each(function() 
        {
            selectorList.push(Xmlify.getXmlifyTagSelector(tag))
            Xmlify.recurse($(this), selectorList, String($(this).prop("tagName")).toLowerCase());
        });
    }

    static setText(selector: string, text: string)
    {
        $(selector).text(text)
    }

    static makeLocationSelector(selectorList: string[]): string
    {
        return selectorList.join(" ");
    }

    static getXmlifyTagSelector(tag: string): string
    {
        for(let elem of Xmlify.defaultXmlifyTags)
        {
            if(elem.xmlifyTag === tag)
            {
                // We found a tag

                if(elem.selector)
                {
                    return elem.selector;
                }
                else
                {
                    switch(elem.xmlifyTag)
                    {
                        case "title":
                            return ":header";

                        case "paragraph" || "p":
                            return "p";

                        default:
                            return "."+elem.xmlifyTag;
                    }
                }
            }
        }
    }

    isTitle(xmlTag: string): boolean
    {
        return false; // TODO
    }
}
