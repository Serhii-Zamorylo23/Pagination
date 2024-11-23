let page = 1;

const loadPosts = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page,
        _limit: 5,
      },
    });

    const posts = response.data;

    const container = document.getElementById('posts-container');

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML =   `<h3>${post.title}</h3><p>${post.body}</p>`;
      container.appendChild(postElement);
    });

    if (posts.length < 5) {
      const loadMoreButton = document.getElementById('load-more');
      loadMoreButton.disabled = true;
      loadMoreButton.innerText = 'Усі пости завантажено';
    }
  } catch (error) {
    console.error('Помилка завантаження постів:', error);
  }
};

document.getElementById('load-more').addEventListener('click', () => {
  page++;
  loadPosts();
});

loadPosts();