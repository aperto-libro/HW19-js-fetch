const source = 'https://jsonplaceholder.typicode.com';
const startId = 1; // стартовый индекс для первого рендера
let albumsList = document.querySelector('.albums-list');
let photosList = document.querySelector('.photos-list');

async function getAlbumsList() {
  let listOfAlbums = await fetch(`${source}/albums`);

  if (listOfAlbums.ok) {
    return listOfAlbums.json();
  } else {
    console.error(error);
  }
}

async function getPhotosList(id = startId) {
  let photosOfAlbum = await fetch(`${source}/photos?albumId=${id}`);

  if (photosOfAlbum.ok) {
    return photosOfAlbum.json();
  } else {
    console.error(error);
  }
}

function renderAlbumsList(listOfAlbums) {
  let albums = '';

  for (let el of listOfAlbums) {
    let capitalLetterWord = el.title[0].toUpperCase() + el.title.slice(1); // делаем заглавную букву
    albums += `<li class="album" data-user-id="${el.userId}", data-id="${el.id}">${capitalLetterWord}</li>`;
  }
  albumsList.innerHTML = albums;
}

function renderPhotosList(listOfPhotos) {
  let photos = '';

  for (let el of listOfPhotos) {
    photos += `<li class="photo"><img src="${el.thumbnailUrl}"></li>`;
  }
  photosList.innerHTML = photos;
}

getAlbumsList().then((albumsList) => renderAlbumsList(albumsList));
getPhotosList(startId).then((photosList) => renderPhotosList(photosList));

albumsList.addEventListener('click', (e) => {
  let resultId = e.target.dataset.id;
  getPhotosList(resultId).then((photosList) => renderPhotosList(photosList));
});
