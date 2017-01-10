 const fullScreenContainer = document.querySelector('#fullscreen_container');
  // Command Palette
  const commandPalette = document.querySelector('.command_palette');
  const clearScreenButton = document.querySelector('.clear');
  const fullScreenButton = document.querySelector('.fullscreen');
  const colourPicker = document.querySelector('#colour_picker');
  const currentColourViewer = document.querySelector('#current_colour');
  const thickness = document.querySelector('input[name=thickness]');
  const currentThickness = document.querySelector('#current_thickness');

  // Canvas
  const canvas = document.querySelector('#draw');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = (window.innerHeight - commandPalette.clientHeight);
  ctx.strokeStyle = 'red';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = thickness.value;


  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let lineThickness = thickness.value;
  let currentSelectedColour = 'red';

  function draw(e){
    if(!isDrawing) return;

    ctx.lineWidth = lineThickness;
    ctx.strokeStyle = `${currentSelectedColour}`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

  }

  function updateLineThickness(e){
    lineThickness = e.target.value;
    currentThickness.innerHTML = `Size: ${lineThickness}`;
  }

  function clearScreen(e){
    let confirmResponse = confirm("Are you sure you want to clear?");

    if(confirmResponse){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function fullScreen(e){
    fullScreenContainer.webkitRequestFullScreen();
    canvas.width = (window.outerWidth - 10);
    canvas.height = (window.outerHeight - commandPalette.clientHeight);
  }

  function changeColour(e){
    if(!e.target.matches('button')) return;
    
    currentSelectedColour = e.target.dataset.colour;;
    ctx.strokeStyle = `${currentSelectedColour}`;
    currentColourViewer.style.background = currentSelectedColour;
  }

  // Canvas Event Listeners

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];

  });

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);

  // Command Palette Event Listeners
  thickness.addEventListener('change', updateLineThickness);
  clearScreenButton.addEventListener('click', clearScreen);
  fullScreenButton.addEventListener('click', fullScreen)
  colourPicker.addEventListener('click', changeColour);
