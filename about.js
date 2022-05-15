if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready()
}
function ready(){
    let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=The_Weeknd&rvprop=content';
    fetch(url)
    .then(response => {
        return response.json()})
        .then(res =>{
            let pageId = Object.keys(res.query.pages)[0];
            var content = res.query.pages[pageId].revisions[0]['*'];
            const regex1 = /({+.*}+}+)/g;
            const regex2 = /\[+|\]+/g;
            const regex3 = /\|/g;
            const regex4 = /File.*\//g;
            const index1 = content.indexOf("'''");
            const index2 = content.indexOf("==Early");
            const index3 = content.indexOf("==Career");
            const index4 = content.indexOf("===2012");

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

            console.log(content);
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