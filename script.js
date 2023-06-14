document.addEventListener('DOMContentLoaded', () => {
    let mousePosX = 0,
        mousePosY = 0,
        mouseCircle = document.getElementById('mouse-circle');

    document.onmousemove = (e) => {
        mousePosX = e.pageX;
        mousePosY = e.pageY;
    }

    let delay = 6,
        revisedMousePosX = 0,
        revisedMousePosY = 0;

    function delayMouseFollow() {
        requestAnimationFrame(delayMouseFollow);

        revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
        revisedMousePosY += (mousePosY - revisedMousePosY) / delay; 

        mouseCircle.style.top = revisedMousePosY + 'px';
        mouseCircle.style.left = revisedMousePosX + 'px';
    }
    delayMouseFollow();


});


var iframe = document.querySelector('iframe');

function handleLazyLoad() {
  if (iframe.classList.contains('lazyload')) {
    const storeSRC = iframe.dataset.src;

    iframe.addEventListener('lazyloaded', () => {
      delete iframe.dataset.src;
      iframe.src = storeSRC;
      initPlayer();
    });
  } 
}

function initPlayer() {
  var player = new Vimeo.Player(iframe);
  player.ready().then(function (){
    console.log('player is ready!');

    // These events are not attaching? Why?
    player.on('play', function () {
      console.log('played the video!');
    });

    player.on('ended', function () {
      console.log('the video has ended');
    });
  });
} 

handleLazyLoad();
