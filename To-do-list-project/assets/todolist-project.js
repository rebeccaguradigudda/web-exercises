//checkoff specific todos by clicking
$("ul").on("click","li",function(){
    $(this).toggleClass("completed");
});
    
//click on X on delete
$("ul").on("click","span",function(event){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    event.stopPropagation();

});

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        //grabbing new todo text from input
        var todotext = $(this).val();
        $(this).val("");
        //create a new li and add to ul
        $("ul").append("<li><span>X</span>" + todotext +"</li>")
    }
    
});