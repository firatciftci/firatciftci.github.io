const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function wrapText(context, text, x, y, maxWidth, lineHeight, name) {
  var words = text.split(' '),
    line = '',
    lineCount = 0,
    i,
    test,
    metrics;

  for (i = 0; i < words.length; i++) {
    test = words[i];
    metrics = context.measureText(test);
    while (metrics.width > maxWidth) {
      test = test.substring(0, test.length - 1);
      metrics = context.measureText(test);
    }
    if (words[i] != test) {
      words.splice(i + 1, 0, words[i].substr(test.length));
      words[i] = test;
    }

    test = line + words[i] + ' ';
    metrics = context.measureText(test);

    if (metrics.width > maxWidth && i > 0) {
      context.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight + 10;
      lineCount++;
    } else {
      line = test;
    }
  }

  context.fillText(line, x, y);

  ctx.font = 'italic 26px Helvetica, sans-serif';

  context.fillText('– ' + name, x + 150, y + 60);
}

function drawImageActualSize() {
  var input, file, fr, img, text, name;

  input = document.getElementById('image');

  file = input.files[0];
  fr = new FileReader();
  fr.onload = createImage;
  fr.readAsDataURL(file);

  function createImage() {
    img = new Image(280, 400);
    img.onload = imageLoaded;
    img.src = fr.result;
  }

  function imageLoaded() {
    ctx.drawImage(this, 0, 0, this.width, this.height);

    text = document.querySelector('#text').value;
    name = document.querySelector('#name').value;

    ctx.rect(280, 0, 520, 400);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.fillStyle = 'white';

    ctx.font = '26px Helvetica, sans-serif';

    wrapText(ctx, text, 310, 170, 460, 18, name);
  }
}

function submitRightAnswer(n) {
  if (document.getElementById('right' + n.toString()).style.backgroundColor != 'green') {
    document.getElementById('right' + n.toString()).style.backgroundColor = 'green';
    document.getElementById('right' + n.toString()).style.color = 'white';
  }
}

function submitWrongAnswer(n) {
  if (document.getElementById('right' + n.toString()).style.backgroundColor != 'green') {
    document.getElementById('wrong' + n.toString()).style.backgroundColor = 'darkred';
    document.getElementById('right' + n.toString()).style.backgroundColor = 'green';
    document.getElementById('wrong' + n.toString()).style.color = 'white';
    document.getElementById('right' + n.toString()).style.color = 'white';
  }
}
