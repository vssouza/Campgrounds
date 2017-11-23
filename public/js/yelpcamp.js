
// $("#campgrounds-grid div").hover(
//     function(){
//         $(this).children("#trashcan").fadeIn(150);
//     },
//     function(event){
//         $(this).children("#trashcan").fadeOut(150);
//     }

// );

// $(document).on("click", "#trashcan", function(){
//     var id = $(this).parent().children("input").val();
//     var removeDiv = $(this).parent().parent();
//     $.ajax({
//         type: "DELETE",
//         url: "/campgrounds",
//         dataType: 'json',
//         data: {"id": id},
//         })
//     .done(function(){
//         removeDiv.fadeOut(150);
//     })
//     .fail(function( jqXHR, textStatus, errorThrown){
//         console.log("Erro ao remover o item selecionado");
//         console.log("jqXHR " + jqXHR);
//         console.log("textStatus " + textStatus);
//         console.log("errorThrown " + errorThrown);
//     });
// });