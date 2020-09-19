
// FOR DOWN SCROLL MOVEMENT

const DownScroll = ()=>{
    window.addEventListener("scroll",function(){
      var header = document.querySelector("header");
      header.classList.toggle("sticky",window.scrollY > 0);
    } );
    }
    
    // FOR SIDE MOVEMENT ON MOBILE VIEW
    
    const navSlide = ()=>{
        const lines= document.querySelector('.lines');
        const nav= document.querySelector('.navlinks');
        const naviLinks = document.querySelectorAll('.navlinks li');
    
        // FOR CHANGING CLASS ON CLICK ON 3 LINES
        lines.addEventListener('click',()=>{
            nav.classList.toggle('nav-active');
    
        // FOR ANIMATION OF THE SIDE MENU
        naviLinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation='';
            }
            else{
                link.style.animation=`navLinkFade 0.5s ease forwards ${index/7+0.3}s`
            }
        });
        // 3 lines animation
        lines.classList.toggle('change')
    
        });
    }
    
    // MASTER FUNCTION TO CALL ALL THE FUNCTION
    
    const header = ()=>{
        DownScroll();
        navSlide();
    }
    
    header();
    
    