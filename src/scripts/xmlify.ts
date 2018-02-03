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

export class Xmlify
{
    // Settings
    contentPath: string = "content/";

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
            console.log("found the first node named "+firstNodeName);
        }
        else
        {
            console.log("didn't find "+firstNodeName);
        }
    }
}
