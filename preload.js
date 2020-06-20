// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const remote = require('electron').remote;


let waitUntilExists = (selector, callback) => {
  let wait = () => {
    setTimeout(() => {
      if (document.querySelectorAll(selector).length == 0) {
        wait()
      } else {
        callback();
      }
    }, 100)
  }
  wait();
}



window.addEventListener('DOMContentLoaded', () => {

  const header = () => {

    let cont = document.createElement('div');
    cont.textContent = "";
    cont.classList.add('header-controls');
    cont.innerHTML = `<div class='drag-region'></div><div id='controls-electron'></div>`;
    let parent = document.querySelector('.chart-page.unselectable');
    parent.prepend(cont);

    let style = document.createElement('style');
    style.innerHTML = `.js-rootresizer__contents {height: 95%} .header-controls {background-color:transparent; width:100vw; height:40px; display:flex; flex-flow:row;} .drag-region {flex-grow:1; height:40px; -webkit-app-region: drag;} #controls-electron { margin-left:auto; display:flex;} .electron-control {width:40px !important} .electron-control:hover {background-color:rgba(0,0,0,0.2);} `

    document.head.append(style);
  }

  //Add exit,minimize, maximize buttons
  const closeButton = () => {
    let button = document.createElement('div');
    button.innerHTML = `
    <div data-role="button" data-name="close">
    <span>
      <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg
          width="100%" height="100%" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" class='electron-control'>
          <g>
              <g>
                  <path fill='currentcolor'
                      d="M196.613,196.078c2.708,-2.677 2.709,-7.024 0.001,-9.7l-83.414,-82.456c-2.708,-2.677 -7.105,-2.677 -9.813,0c-2.708,2.677 -2.709,7.024 -0.001,9.7l83.414,82.456c2.708,2.677 7.105,2.677 9.813,0Z" />
                  <path fill='currentcolor'
                      d="M196.613,103.922c-2.708,-2.677 -7.105,-2.677 -9.813,0l-83.414,82.456c-2.708,2.676 -2.707,7.023 0.001,9.7c2.708,2.677 7.105,2.677 9.813,0l83.414,-82.456c2.708,-2.676 2.707,-7.023 -0.001,-9.7Z" />
              </g>
          </g>
      </svg>
    </span>

</div>
    `;
    return button;
  }

  const minimizeButton = () => {
    let button = document.createElement('div');
    button.innerHTML = `
    <div data-role="button" data-name="minimize">
    <span>
      <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg
          width="100%" height="100%" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" class='electron-control'>
          <g>
              <g>
                  <path fill='currentcolor'
                      d="M210.36,150c-0.04,-3.506 -2.92,-6.353 -6.427,-6.353l-108.013,0c-3.507,0 -6.321,2.847 -6.28,6.353c0.04,3.506 2.92,6.353 6.427,6.353l108.013,0c3.507,0 6.321,-2.847 6.28,-6.353Z" />
              </g>
          </g>
      </svg>
    </span>
</div>
    `;
    return button;
  }

  const maximizeButton = () => {
    let button = document.createElement('div');
    button.innerHTML = `
    <div data-role="button" data-name="minimize">
    <span>
      <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%"
          height="100%" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" class='electron-control'>
          <g>
              <path fill='currentcolor'
                  d="M191.217,100.499l0.559,0.047l0.555,0.078l0.551,0.11l0.543,0.14l0.534,0.17l0.524,0.2l0.512,0.229l0.499,0.258l0.483,0.285l0.466,0.311l0.448,0.338l0.429,0.362l0.407,0.385l0.386,0.407l0.362,0.429l0.337,0.448l0.312,0.467l0.285,0.483l0.257,0.498l0.229,0.512l0.2,0.524l0.171,0.535l0.14,0.543l0.109,0.55l0.078,0.555l0.048,0.559l0.015,0.561l0,79.034l-0.015,0.561l-0.048,0.559l-0.078,0.555l-0.109,0.55l-0.14,0.543l-0.171,0.535l-0.2,0.524l-0.229,0.512l-0.257,0.498l-0.285,0.483l-0.312,0.467l-0.337,0.448l-0.362,0.429l-0.386,0.407l-0.407,0.385l-0.429,0.362l-0.448,0.338l-0.466,0.311l-0.483,0.285l-0.499,0.258l-0.512,0.229l-0.524,0.2l-0.534,0.17l-0.543,0.14l-0.551,0.11l-0.555,0.078l-0.559,0.047l-0.561,0.016l-81.312,0l-0.561,-0.016l-0.559,-0.047l-0.555,-0.078l-0.551,-0.11l-0.543,-0.14l-0.534,-0.17l-0.524,-0.2l-0.512,-0.229l-0.499,-0.258l-0.483,-0.285l-0.466,-0.311l-0.448,-0.338l-0.429,-0.362l-0.407,-0.385l-0.386,-0.407l-0.362,-0.429l-0.337,-0.448l-0.312,-0.467l-0.285,-0.483l-0.257,-0.498l-0.229,-0.512l-0.2,-0.524l-0.171,-0.535l-0.14,-0.543l-0.109,-0.55l-0.078,-0.555l-0.048,-0.559l-0.015,-0.561l0,-79.034l0.015,-0.561l0.048,-0.559l0.078,-0.555l0.109,-0.55l0.14,-0.543l0.171,-0.535l0.2,-0.524l0.229,-0.512l0.257,-0.498l0.285,-0.483l0.312,-0.467l0.337,-0.448l0.362,-0.429l0.386,-0.407l0.407,-0.385l0.429,-0.362l0.448,-0.338l0.466,-0.311l0.483,-0.285l0.499,-0.258l0.512,-0.229l0.524,-0.2l0.534,-0.17l0.543,-0.14l0.551,-0.11l0.555,-0.078l0.559,-0.047l0.561,-0.016l81.312,0l0.561,0.016Zm-81.873,9.984l0,79.034l81.312,0l0,-79.034l-81.312,0Z" />
          </g>
      </svg>
    </span>
</div>
    `;
    return button;
  }

  

  let close = closeButton();
  let minimize = minimizeButton();
  let maximize = maximizeButton();

  close.addEventListener('click', ()=> {
    var window = remote.getCurrentWindow();
    window.close();
  });

  minimize.addEventListener('click', ()=> {
    var window = remote.getCurrentWindow();
    window.minimize();
  });

  maximize.addEventListener('click', ()=>{
    var window = remote.getCurrentWindow();
    if(window.isMaximized())
      window.unmaximize();
    else
      window.maximize();
  });
  
  header();

  document.querySelector('#controls-electron').append(minimize);
  document.querySelector('#controls-electron').append(maximize);
  document.querySelector('#controls-electron').append(close);

  


})