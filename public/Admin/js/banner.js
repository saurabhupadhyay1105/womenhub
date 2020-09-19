const items = document.querySelectorAll('.carousel-item');
const itemCount = items.length;
const nextItem = document.querySelector('.next');
const previousItem = document.querySelector('.previous');

let count = 0;
if(items[count] != undefined){
    items[count].classList.add('active');


function showNextItem() {
  items[count].classList.remove('active');

  if(count < itemCount - 1) {
    count++;
  } else {
    count = 0;
  }

  items[count].classList.add('active');
}

function showPreviousItem() {
  items[count].classList.remove('active');

  if(count > 0) {
    count--;
  } else {
    count = itemCount - 1;
  }

  items[count].classList.add('active');
  // Check if working...
}


function keyPress(e) {
  e = e || window.event;
  
  if (e.keyCode == '37') {
    showPreviousItem();
  } else if (e.keyCode == '39') {
    showNextItem();
  }
}
}
//window.setInterval(showNextItem,5000)


//nextItem.addEventListener('click', showNextItem);
//previousItem.addEventListener('click', showPreviousItem);
//document.addEventListener('keydown', keyPress);

