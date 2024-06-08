const accessKey = 'J00B8yJ5vVo2GOVVFhvUxYuF6d4N57_950gHykEU_V0';

const formEl = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById('show-more-button');

let inputData = "";
let page =1;


async function searchImages () {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1 ){
        searchResults.innerHTML = "";

        results.map((result) => {
           const imageWrapper = document.createElement('div'); 
           imageWrapper.classList.add('search-result');
           const imageUrl = document.createElement('img');
           imageUrl.src = result.urls.small;
           imageUrl.alt = result.alt_description;
           const imageTitle = document.createElement('a');
           imageTitle.href = result.links.html;
           imageTitle.target = "_blacnk";
           imageTitle.textContent = result.alt_description;

           imageWrapper.appendChild(imageUrl);
           imageWrapper.appendChild(imageTitle);
           searchResults.appendChild(imageWrapper);

        });

        page ++;
        if(page > 1) {
            showMore.style.display = "block";
        }
    }

}
formEl.addEventListener('submit', (event) => {
    event.preventDefault()
    page = 1;
    searchImages();
})

showMore.addEventListener('click', () => {
    searchImages();
})
