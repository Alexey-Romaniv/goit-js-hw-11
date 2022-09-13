import { Notify } from 'notiflix';
import axios from 'axios';

export async function searchImages(search, page, gallery, loadMore) {
  const BASE_URL = 'https://pixabay.com/api/';
  //   const search = searchForm.elements.searchQuery.value;

  const per_page = 40;
  try {
    const res = await axios.get(
      `${BASE_URL}?key=29839471-7dd87ec03b57b90ea35b79230&q=${search}&page=${page}&image_type=photo&orietation=horizontal&safesearch=true&per_page=${per_page}`
    );
    console.log(res);

    console.log(search);
    if (!res.data.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const markup = res.data.hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `<div class="photo-card">
        <a href='${largeImageURL}'><img  src="${webformatURL}" alt="${tags}" loading="lazy" width='300' height=''/></a>
        <div class="info">
          <p class="info-item">
          <b>Likes</b> ${likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${downloads}
          </p>
        </div>
      </div>`
      )
      .join('');
    console.log(markup);
    gallery.insertAdjacentHTML('beforeEnd', markup);
    if (per_page * page <= res.data.totalHits) {
      loadMore.style.display = 'block';
    } else {
      loadMore.style.display = 'none';
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}
