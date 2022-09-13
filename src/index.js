import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { searchImages } from './js/API';
import axios from 'axios';
import { Notify } from 'notiflix';
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const morePhotoBtn = document.querySelector('.load-more');
morePhotoBtn.addEventListener('click', searchMore);
searchForm.addEventListener('submit', getArrayGallery);
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsType: 'alt',
  captionDelay: 250,
});
let page = 1;

const search = '';
async function getArrayGallery(e) {
  e.preventDefault();

  const search = searchForm.elements.searchQuery.value;
  gallery.innerHTML = '';
  searchImages(search, page, gallery, morePhotoBtn);
  lightbox.refresh();
}

function searchMore() {
  page += 1;
  searchImages(search, page, gallery, morePhotoBtn);
}
// let infScroll = new InfiniteScroll(gallery, {
//   // options
//   path: '.pagination__next',
//   append: '.post',
//   history: false,
// });
