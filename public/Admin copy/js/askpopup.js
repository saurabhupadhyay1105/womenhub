const crossi = document.querySelector(".close-it");
if(crossi != null){
crossi.addEventListener("click", function(e) {
        this.parentNode.style.display = "none"; 
        $("#demo2").removeClass("popScroll");
        $("#demo2").addClass("d-none");
        location.reload(true);

     //   $('body').toggleClass('none');

    })}

  
 /* '$('body').toggleClass('overlay');
$("#pop-toggle").click(function(){
  $(".popup").toggle();
 // $('body').toggleClass('overlay');
})*/

  