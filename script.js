const memeTemplateSelect = document.getElementById('template');
const topTextInput = document.getElementById('top-text-input');
const bottomTextInput = document.getElementById('bottom-text-input');
const generateButton = document.getElementById('generate');
const downloadButton = document.getElementById('download');
const memeImage = document.getElementById('meme');
const topText = document.getElementById('top-text');
const bottomText = document.getElementById('bottom-text');

// Fetch meme templates from the API
async function fetchMemeTemplates() {
  try {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    if (data.success) {
      data.data.memes.forEach(meme => {
        const option = document.createElement('option');
        option.value = meme.url;
        option.textContent = meme.name;
        memeTemplateSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error fetching meme templates:', error);
  }
}

fetchMemeTemplates();

// Update image preview on template change
memeTemplateSelect.addEventListener('change', () => {
  const templateUrl = memeTemplateSelect.value;
  if (templateUrl) {
    memeImage.src = templateUrl;
  }
});

// Generate meme preview
generateButton.addEventListener('click', () => {
  const templateUrl = memeTemplateSelect.value;
  if (!templateUrl) {
    alert('Please select a template!');
    return;
  }

  memeImage.src = templateUrl;
  topText.textContent = topTextInput.value;
  bottomText.textContent = bottomTextInput.value;
  downloadButton.style.display = 'block';
});

// Download meme as an image
downloadButton.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = memeImage.width;
  canvas.height = memeImage.height;

  ctx.drawImage(memeImage, 0, 0, canvas.width, canvas.height);
  ctx.font = '30px Impact';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;

  ctx.strokeText(topText.textContent, canvas.width / 2, 40);
  ctx.fillText(topText.textContent, canvas.width / 2, 40);

  ctx.strokeText(bottomText.textContent, canvas.width / 2, canvas.height - 20);
  ctx.fillText(bottomText.textContent, canvas.width / 2, canvas.height - 20);

  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL();
  link.click();
});
