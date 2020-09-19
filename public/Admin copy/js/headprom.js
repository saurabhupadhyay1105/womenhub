// closes modal when X is clicked
const cross = document.querySelector(".close-btn");
if(cross != null){
cross.addEventListener("click", function(e) {
        this.parentNode.style.display = "none"; 
        $("#demo").addClass("d-none");
        $(".navbar1").css("margin-top", "0vh");
    })}

// hides flash after 5 seconds
// setTimeout(function(){
//   document.querySelector(".flash-container")
//       .style.display = "none";
// }, 5000)



