$(document).ready(function () {
    scanRate = 10
    var state = "none" // horizontal_scanning, vertical_scanning
    xPos = 0
    yPos = 0
    showKeyboard = false
    capsLock = false

    selectedTextArea = null
    $('body').append('<div id ="x" class = "linex">')
    $('body').append('<div id ="y" class = "liney">')
    $('body').append('<button type = "button" id ="scrollbutton" class = "up">')
    $('body').append('<button type = "button" id ="scrollbuttondown" class = "down">')
    $('body').append('<div id ="keyboardSpace" class = "spaceForKeyboard">')
    $('body').append('<button type = "button" id ="keybutton" class = "keyboardbtn">')

    $.get("https://sarahmorrisonsmith.com/accessibility/keyboard.html", function (data) {
        keySpace = document.getElementById("keyboardSpace")
        $(keySpace).append(data);
        //Hidding the keyboard initially
        $('.keyboard').hide();
        showKeyboard = false;
    });

    scrollButt = document.getElementById("scrollbutton")
    scrollButt.addEventListener("click", function() {
        docHeight = $(document).height()
        $('html, body').animate({
            scrollTop: $(document).scrollTop()-docHeight/10
           }, 1000);      
        });
    
    scrollButtDown = document.getElementById("scrollbuttondown")
    scrollButtDown.addEventListener("click", function() {
        docHeight = $(document).height()
        $('html, body').animate({
            scrollTop: $(document).scrollTop()+docHeight/10
            }, 1000);      
        });

    keyButt = document.getElementById("keybutton")
    keyButt.addEventListener("click", function (){
        if(showKeyboard == false){
            showKeyboard = true
            $('.keyboard').show()
        }else{
            showKeyboard = false
            $('.keyboard').hide()

        }
       
    });
    
    click = document.elementFromPoint(xPos, yPos);
           
            simulateClick(click)
    function simulateClick(element) {
        if (!element) return;
        var dispatchEvent = function (elt, name) {
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent(name, true, true);
            elt.dispatchEvent(clickEvent);
        };
        dispatchEvent(element, 'mouseover');
        dispatchEvent(element, 'mousedown');
        dispatchEvent(element, 'click');
        dispatchEvent(element, 'mouseup');
    };
    
    function paint() {
    if(state == "horizontal_scanning") {
        document.getElementById("x").style.width = (xPos + "px")
        xPos += 1
    // update position of your horizontal scan bar
    } else if(state == "vertical_scanning") {
        document.getElementById("y").style.height = (yPos + "px")
        yPos += 1
    // update position of your vertical scan bar
    } else {
    // do nothing
    }
    }
    $(document).keydown(function(e) {
    if(e.key == " ") {
        if(state== "none"){
            state = "horizontal_scanning"
        }else if(state == "horizontal_scanning"){
            state = "vertical_scanning"
        }else{
         
            inputX = Math.round(xPos)
            inputY = Math.round(yPos )

            document.getElementById("x").style.width = ("0px")
            document.getElementById("y").style.height = ("0px")
            xPos = 0
            yPos=0
            state= "none"
           
            click = document.elementFromPoint(inputX, inputY);
            if($(click).is("input[type='text'],textarea")){
                selectedTextArea = click

            }
            if(click.classList.contains("key")){
                if(selectedTextArea == null){

                }else if(click.classList.contains("caps")){
                    capsLock = !capsLock
                }else if (click.classList.contains("tab")){
                    newChar = "    "
                    $(selectedTextArea).val($(selectedTextArea).val() + newChar);
                }else if(click.classList.contains("backspace")){
                    taVal = $(selectedTextArea).val()
                    $(selectedTextArea).val(taVal.slice(0, -1)); 
                }else if(click.classList.contains("space")){
                    newChar = " "
                    $(selectedTextArea).val($(selectedTextArea).val() + newChar);  
                }else{
                    newChar = $(click).text().trim()
                    if(capsLock){
                        newChar = newChar.toUpperCase()
                    }else{
                        newChar = newChar.toLowerCase()
                    }
                    $(selectedTextArea).val($(selectedTextArea).val() + newChar);  
                }          
            }
           
            simulateClick(click)

        }
    // update state here, given current state
        e.preventDefault();
        return false;
    }
    });
    setInterval(function() {
        paint();
    }, scanRate);
    //setInterval;

    
        
}
);
