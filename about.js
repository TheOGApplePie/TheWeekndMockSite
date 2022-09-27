if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready()
}
function ready(){
    /**
     * Fetch content from the Wikipedia API using the URL.
     * Use Regular Expressions in along with the 'replace all' method to filter out unwanted data from the results json
     */
    let url = 'http://localhost:3000/about';
    fetch(url)
    .then(response => {
        return response.json()})
        .then(res =>{
            let pageId = Object.keys(res.query.pages)[0];
            var content = res.query.pages[pageId].revisions[0]['*'];

            // Capture anything between one or more of '{' and '}'
            const regex1 = /({+.*}+}+)/g;

            // Capture anything between one or more of '[' and ']'
            const regex2 = /\[+|\]+/g;

            // Capture all '|' characters
            const regex3 = /\|/g;

            // Capture anything that starts with 'File'
            const regex4 = /File.*\//g;

            // Various indices to break up the text
            const index1 = content.indexOf("'''");
            const index2 = content.indexOf("==Early");
            const index3 = content.indexOf("==Career");
            const index4 = content.indexOf("===2012");
            
            // Breaking up the initial text from the Wikipedia API into smaller paragraphs and filtering unwanted text via regex
            let text = content.substring(index1, index2);
            text = text.replaceAll(regex1, "");
            text = text.replaceAll(regex2, "");
            text = text.replaceAll(regex3, "/");

            let text2 = content.substring(index2, index3);
            text2 = text2.replaceAll(regex1, "");
            text2 = text2.replaceAll(regex2, "");
            text2 = text2.replaceAll(regex3, "/");

            let text3 = content.substring(index3, index4);
            text3 = text3.replaceAll(regex1, "");
            text3 = text3.replaceAll(regex2, "");
            text3 = text3.replaceAll(regex3, "/");
            text3 = text3.replaceAll(regex4, "");

            // Adding the text elements to the HTML as well as an image (Formatting HTML to copy from about.html)
            var textContentRow = document.createElement('div');
            var textItems = document.getElementsByClassName('inner-html-row')[0];
            textContentRow.classList.add('content-section');
            let htmlContent1 = `<p class = "opening-paragraph"> ${text}</p>
            <img class ="about-band-image" src = 'Images/TheWeeknd.png'>
            <p class = "middle-paragraph"> ${text2}</p>
            <p class = "closing-paragraph"> ${text3}</p>`;
            textContentRow.innerHTML = htmlContent1;
            textItems.append(textContentRow);

        })
}