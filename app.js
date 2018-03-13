document.addEventListener("DOMContentLoaded", () => {
  // UI elements //

  const search = document.getElementById('search'),
    resultsList = document.getElementById('results'),
    close = document.getElementById('close'),
    searchField = document.getElementById('search-field');
  // Event listeners //

  search.addEventListener('keyup', (e) => {
    e.preventDefault();
    clearHeading();
    const searchItem = search.value.toLowerCase();
    const searchUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${searchItem}&limit=10&format=json&utf8=1&namespace=*`;

    // Fetch Wikipedia data
    fetch(searchUrl)
      .then(resp => resp.json())
      .then(data => addLi(data))
      .catch(error => console.log('Please see the error: ' + error));
  });

  close.addEventListener('click', () => search.value = '');
  // Helper functions //

  // Create lis from data
  function addLi(arr) {
    let acc = 0,
      i = 0;
    handleUlDisplay(arr);

    if (resultsList.hasChildNodes()) { // Clear li with each keyup and repopulate with updated data
      resultsList.innerHTML = '';
    }
    while (i <= 10) {
      let content1 = arr[1][acc],
        content2 = arr[2][acc],
        content3 = arr[3][acc],
        contentBuilt = `<div>
                         <span class="flow-text">${content1}</span>
                         <p>${content2}</p>
                         <span class="more-about">More about...</span><a href="${content3}" class="waves-effect waves-light btn teal lighten-2 flow-text z-depth-5" id="more" target="_blank">${content1}</a>
                        </div`;
      let listItem = document.createElement('li');
      listItem.className = 'collection-item';
      listItem.innerHTML = (contentBuilt.includes(undefined)) ? listItem.style.display = "none" : contentBuilt;
      resultsList.appendChild(listItem);
      acc++;
      i++;
    }
  }

  // Clear the heading and wikipedia logo when entering search
  function clearHeading() {
    if (search.value === '') {
      searchField.style.display = 'initial';
      document.body.style.margin = "1% 30%";
    } else {
      searchField.style.display = 'none';
      document.body.style.margin = "1% 21%";
    }
  }

  // If there's no data returned from the api, hide the ul completely
  function handleUlDisplay(arrNoData) {
    if (search.value === '' || arrNoData[1].length === 0) {
      resultsList.style.visibility = 'hidden';
    } else {
      resultsList.style.visibility = 'visible';
    }
  }
});
