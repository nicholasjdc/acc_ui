$(document).ready(function () {
    speakAndHighlight = true
    console.log("Accessibility rocks!");
    document.addEventListener('keydown', function (e) {
        if (e.code == '' || e.code == 'Unidentified' || e.code ==
        'Space') {
            speakAndHighlight = true
            e.preventDefault()
        //SPEAK
        }
        else {
            speechSynthesis.cancel();
            speakAndHighlight = false

        //STOP SPEAKING AND REMOVE HIGHLIGHT
        }
        });
        
    $("*:not(body)").hover(
        function (ev) {
            if(speakAndHighlight){
                accessibleText = ""
                if($(this).text() == ""){
                    var alttext = $(this).attr("alt")
                    var srcofimg = $(this).attr("src")
                    if ($(this).attr('alt')) {
                        accessibleText = alttext
                    //HREF IS NOT BLANK
                    } else {
                        accessibleText = srcofimg

                    //HREF IS BLANK
                    }
                }else{
                    accessibleText = $(this).text()
                }
                speechSynthesis.speak(new SpeechSynthesisUtterance(accessibleText))
                console.log($(this).text())
                $(this).addClass("highlight")
                ev.stopPropagation();
            }

        }
        ,

            function (ev) {
                speechSynthesis.cancel();
                $(this).removeClass("highlight")
                $(".highlight").removeClass('highlight')
        })
}
);
