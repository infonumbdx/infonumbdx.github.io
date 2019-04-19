var enigma = []; // the leftmost column of the Google Sheets
var content = []; // second-left column
var answer = []; // third-left column
var target = []; // last column

$(function(){
    
    $('.alert').css("opacity",0);
    
    var sheetUrl = 'https://spreadsheets.google.com/feeds/cells/1xoL_TVEqgkBwVnDQvB-_rPN1dv-jbCF32TYa_dXXM6g/1/public/full?alt=json';
    
    
    $.getJSON(sheetUrl, function(data){
        var entry = data.feed.entry;
        var nbCol=4;
        

        for (var i = nbCol; i < entry.length; i+=nbCol){
            // entry[i].content.$t retrieves the content of each cell
            enigma.push(entry[i].content.$t);
            content.push(entry[i+1].content.$t);
            answer.push(entry[i+2].content.$t);
            target.push(entry[i+3].content.$t);
        }

        //console.log(entry);
        //console.log(enigma);
        //console.log(content);
        //console.log(answer);
        //console.log(target);
    })
    


});


    function testAnswer(index){
        var answerValue = $("#answerValue").val().toLowerCase().removeAccents();
        if(answer[index].toLowerCase().removeAccents()==answerValue){
            //console.log(target[index]);
            //window.location.href(target[index]);
            $(location).attr('href',target[index]);
        }else{
            $("#answerValue").val("");
            console.log("FALSE");
            reset_animation();
        }
    }


String.prototype.removeAccents = function(){
 return this
         .replace(/[áàãâä]/gi,"a")
         .replace(/[éè¨ê]/gi,"e")
         .replace(/[íìïî]/gi,"i")
         .replace(/[óòöôõ]/gi,"o")
         .replace(/[úùüû]/gi, "u")
         .replace(/[ç]/gi, "c")
         .replace(/[ñ]/gi, "n")
         .replace(/[^a-zA-Z0-9]/g," ");
}

function reset_animation() {
    $target = $('.alert');
    $target.removeClass('show');
    setTimeout("$target.addClass('show');",100)
}