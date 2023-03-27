$(document).ready(function () {
    currentText = ""
    $("body").css("position", "relative")
    $("body").append($(`<div id='magdiv' class = 'magnified'>whaaaghahghasdgh</div>`))

    currentBrowserZoom = 1.0
    currentGraphicalZoom = 1.0
    currentlyMagnifying= false;
    console.log("Lets go accessibility")
    document.addEventListener('keypress', function (e) {
       
        console.log("KEYDOWN")
        console.log(e.code)

        //Graphical Zoom
        if(e.shiftKey){
            if (e.code =='Equal') {
                currentGraphicalZoom+=.1
                $("body").css("transform", `scale(${currentGraphicalZoom})`)

                $("body").css("left", `${(currentGraphicalZoom-1) *.5 *$(window).width()}px`)
                $("body").css("top", `${(currentGraphicalZoom-1) *5 *$(window).height()}px`)
                e.preventDefault()
            } else if (e.code == 'Minus'){
                currentGraphicalZoom-=.1
                $("body").css("transform", `scale(${currentGraphicalZoom})`)

                $("body").css("left", `${(currentGraphicalZoom-1) *.5 *$(window).width()}px`)
                $("body").css("top", `${(currentGraphicalZoom-1) *5 *$(window).height()}px`)
                e.preventDefault()
            }

        //BrowserZoom
        }else{
            if (e.code =='Equal') {
                currentBrowserZoom +=0.1
                e.preventDefault()
            //SPEAK
            } else if (e.code == 'Minus'){
                currentBrowserZoom -=0.1
                e.preventDefault()
            } else if (e.code == 'Space'){
                if(currentlyMagnifying == false){
                   currentlyMagnifying=true
                   $("#magdiv").css("visibility", "visible")
                   $("#magdiv").text(`${currentText}`)
                }else{
                    $("#magdiv").css("visibility", "hidden")

                    currentlyMagnifying=false;
                }
                e.preventDefault()
            }
        }
        document.body.style.zoom = currentBrowserZoom;

       

    });
    $("*:not(body)").hover( function (ev) {
        currentText = $(this).text()
        
    })
      
    var scrolling = false
    var timer = null

    addEventListener("mousemove", (e) => {
        x = e.screenX
        if($(document).width() > $(window).width() && scrolling==false){
            
            if(x > ($(window).width() -100)){
                scrolling=true
                $('html, body').animate({
                    scrollLeft: $(window).width()
                }, 500);
                timer = setTimeout(function() {
                    scrolling = false 
                }, 1000);
            } else if(x < 100){
                scrolling=true
                $('html, body').animate({
                    scrollLeft: 0
                }, 500); 
                timer =setTimeout(function() {
                    scrolling = false 
                }, 1000);

            }
        }  


    });

}
);
