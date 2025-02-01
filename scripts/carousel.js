document.addEventListener("DOMContentLoaded", function() {
  let currentPage = 1;
  let startIndex = 0;
  let noOfPostsPerPage = 3;
  let posts = [];
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.className = "btn btn-danger";
  prevBtn.disabled = true;
  
  function updateButtonState() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(posts.length / noOfPostsPerPage);
  }

  // prevBtn.classList.add("btn", "btn-primary");
  const carouselContainer = document.getElementById("myCarousel");

  prevBtn.addEventListener("click", function() {
    if(currentPage > 1){
      currentPage--;
      startIndex = (currentPage - 1) * noOfPostsPerPage;
      displayBlogPosts();
      const newScrollPosition = startIndex * 300;
      carouselContainer.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
      updateButtonState();
    }
  });

  nextBtn.addEventListener("click", function() {
    if(currentPage < Math.ceil(posts.length / noOfPostsPerPage)){
      currentPage++;
      startIndex = (currentPage - 1) * noOfPostsPerPage;
      displayBlogPosts();
      const newScrollPosition = startIndex * 300;
      carouselContainer.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
      updateButtonState();
    }
  });

  function displayBlogPosts(){
    const carouselContainer = document.getElementById("myCarousel");
    carouselContainer.className = "wrapper";
    carouselContainer.innerHTML = "";

    //.slice(startIndex, currentPage * noOfPostsPerPage)
    posts.forEach(post => {
      const carouselItem = document.createElement("div");
      carouselItem.className = "card col-md-4";
      carouselItem.innerHTML = `
            <div class="card-body">
              <a href="${post.url}" class="text-decoration-none">
                <img src="${post.feature_image}" class="d-block w-100" alt="${post.title}">
              </a>
              <p>${post.title}</p>
            </div>
      `;
      carouselContainer.appendChild(carouselItem);
    });
    
  }


  async function fetchBlogPosts() {
    const ghostApiUrl = 'https://www.ninjamonk.in/ghost/api/content/posts/';
    const apiKey = '4d87e10fa3f68a7d4dc524e491'; // Replace with your actual API key
    try {
        const response = await fetch(`${ghostApiUrl}?key=${apiKey}&limit=all&filter=tag:-clients`);
        const data = await response.json();
        posts = data.posts;
        displayBlogPosts();
        updateButtonState();
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
  } 

  fetchBlogPosts();

});
