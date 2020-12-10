const inputfilter = document.getElementById('filter')
const postscontainer = document.getElementById('posts-container')
const loading = document.querySelector('.loader');

let limit = 3;
let page = 1;


async function gettingpost() {
   
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    const data = await res.json();

    return data;

} 

async function postingdata() {
    const posts = await gettingpost()

    
    posts.forEach((post) => {
        const postEl = document.createElement("div") 
       
        postEl.innerHTML = 
            `
            <div class="post">
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title"> ${post.title}</h2>
                <p class="post-body">
                   ${post.body}
                </p>
            </div>
            </div>
        
            `
            postscontainer.appendChild(postEl)

    })
}

postingdata();

// loading

function showloading() {
    loading.classList.add('show')

    setTimeout(() => {
        loading.classList.remove('show')
        setTimeout(() => {
            page++;
            postingdata();

        },2000)

    },3000)
}

// filter post by input

function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();
    
        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
          post.style.display = 'flex';
        } else {
          post.style.display = 'none';
        }
      });

}



//show initial posts

window.addEventListener('scroll', () => {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 3) {
        showloading();
    }

});

inputfilter.addEventListener('input',filterPosts)
