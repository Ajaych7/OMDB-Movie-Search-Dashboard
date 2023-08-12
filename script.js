const apiKeyInput = document.getElementById('apiKeyInput');
const movieTitleInput = document.getElementById('movieTitleInput');
const searchButton = document.getElementById('searchButton');
const loader = document.getElementById('loader');
const resultsContainer = document.getElementById('results');

searchButton.addEventListener('click', searchMovies);

async function searchMovies() {
  const apiKey = apiKeyInput.value;
  const movieTitle = movieTitleInput.value;

  if (!apiKeyInput || !movieTitleInput) {
    alert('Please enter API key and movie title');
    return;
  }

  loader.style.display = 'block';
  resultsContainer.innerHTML = '';

  const apiUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Response === 'True') {
      data.Search.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${movie.Poster}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>Year: ${movie.Year}</p>
          <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
        `;
        resultsContainer.appendChild(card);
      });
    } else {
      alert('No results found.');
    }
  } catch (error) {
    alert('An error occurred while fetching data.');
  }

  loader.style.display = 'none';
}
