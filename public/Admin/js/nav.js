const navItem = document.querySelector('a.toggle-nav');
navItem.addEventListener('click', toggleNavigation);
function toggleNavigation(){
  this.nextElementSibling.classList.toggle('active');
}

var globalval = 0; 


document.addEventListener("click", function(){
   globalval ++;
   sessionStorage.setItem("globalval", globalval);
   if(globalval % 5 == 0 ){
    $("#demo").removeClass("d-none");
    $(".navbar1").css("margin-top", "7vh");
}
 });
var globalval = sessionStorage.getItem("globalval");

