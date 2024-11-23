const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
const ITEMS_PER_PAGE = 10;
let currentPage = 1;

const loadPosts = async (page) => {
  try {
    const response = await axios.get(POSTS_API, {
      params: {
        _page: page,
        _limit: ITEMS_PER_PAGE,
      },
    });

    const posts = response.data;
    const container = document.getElementById('posts-container');
    container.innerHTML = ''; 

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML =  `<h3>${post.title}</h3><p>${post.body}</p>`;
      container.appendChild(postElement);
    });
  } catch (error) {
    console.error('Помилка завантаження постів:', error);
  }
};


const createPagination = (totalItems) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = ''; // Очищаємо попередні кнопки

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.classList.add('page-button');
    if (i === currentPage) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      currentPage = i;
      loadPosts(currentPage);

      document.querySelectorAll('.page-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });

    paginationContainer.appendChild(button);
  }
};

const initPagination = async () => {
  try {
    const response = await axios.get(POSTS_API);
    const totalItems = response.data.length;

    createPagination(totalItems);
    loadPosts(currentPage);
  } catch (error) {
    console.error('Помилка ініціалізації пагінації:', error);
  }
};

initPagination();