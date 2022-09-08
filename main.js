// Main Vars
let theInput = document.querySelector('.get-repos input'),
  btn = document.querySelector('.get-btn'),
  reposData = document.querySelector('.show-data');

btn.onclick = function () {
  getRepos();
};

// Get Repos Function
function getRepos() {
  if (theInput.value == '') {
    reposData.innerHTML = '<span>Please Write Github Username.</span>';
    return 0;
  }

  fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((response) => response.json())
    .then((data) => {
      reposData.innerHTML = '';
      data.forEach((el) => {
        let mainDiv = document.createElement('div');
        mainDiv.className = 'repo-box';
        let repoName = document.createTextNode(el.name);
        mainDiv.appendChild(repoName);

        let url = document.createElement('a');
        let urlText = document.createTextNode('Visit');
        url.appendChild(urlText);
        url.href = `https://github.com/${theInput.value}/${el.name}`;
        url.target = '_blank';
        mainDiv.appendChild(url);

        let starsSpan = document.createElement('span');
        let starsText = document.createTextNode(`Stars ${el.stargazers_count}`);

        starsSpan.appendChild(starsText);

        mainDiv.appendChild(starsSpan);

        reposData.appendChild(mainDiv);
      });
    })
    .catch(
      (err) =>
        (reposData.innerHTML = `<span>There is something wrong, Please try again.</span>`),
    );
}
