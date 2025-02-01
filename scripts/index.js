document.addEventListener("DOMContentLoaded", function() {

    function updateGallery() {
        const gallery = document.querySelector('.startups-gallery .row .col-md-4');
        const items = gallery.children;
        const totalItems = items.length;
        const visibleItems = 3;
        let currentIndex = 0;

        for (let i = 0; i < totalItems; i++) {
            items[i].style.display = (i >= currentIndex && i < currentIndex + visibleItems) ? 'block' : 'none';
        }
    }

    // Startups Gallery
    function startupsGallery() {
        const gallery = document.querySelector('.startups-gallery .row');
        const items = gallery.children;
        const totalItems = items.length;
        const visibleItems = 3;
        let currentIndex = 0;

        for (let i = 0; i < totalItems; i++) {
            items[i].style.display = (i >= currentIndex && i < currentIndex + visibleItems) ? 'block' : 'none';
        }

        document.getElementById('prevBtn').addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateGallery();
            }
            _gs('event', 'Previous Button Clicked');
        });

        document.getElementById('nextBtn').addEventListener('click', function() {
            if (currentIndex < totalItems - visibleItems) {
                currentIndex++;
                updateGallery();
            }
            _gs('event', 'Next Button Clicked');
        });
    }

    function domainExperts() {
        // Change domain-experts text every 5 seconds
        const domainExpertsElement = document.getElementById("domain-experts");
        const domainExpertValues = ["Tech Innovators", "Industry Leaders", "Visionary Entrepreneurs", "Creative Thinkers"];
        let currentExpertIndex = 0;

        function updateDomainExpertText() {
            currentExpertIndex = (currentExpertIndex + 1) % domainExpertValues.length;
            domainExpertsElement.textContent = domainExpertValues[currentExpertIndex];
        }

        setInterval(updateDomainExpertText, 5000); // Change text every 5 seconds
    }
    
    function scrollCarousel(target, container, direction) {
        const itemWidth = 456;
        //container.querySelector('.scrolling-wrapper .card').offsetWidth;
        container.scrollBy({
            left: direction * itemWidth,
            behavior: 'smooth'
        });
        
    }

    function displayBlogPosts(posts) {
        const blogSection = document.getElementById('blog-posts');
        blogSection.innerHTML = ''; // Clear existing posts

        const chunkSize = 5; // Number of posts to show at a time
        for (let i = 0; i < posts.length; i += chunkSize) {
            const chunk = posts.slice(i, i + chunkSize);
            
            chunk.forEach(post => {
                const col = document.createElement('div');
                //col.className = 'col-md-4 carousel-item';
                col.classList.add('col-md-4');
                col.innerHTML = `
                    <a href="${post.url}" class="text-decoration-none">
                        <div class="card h-100">
                            <img src="${post.feature_image}" class="card-img-top" alt="${post.title}" loading="lazy">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                            </div>
                        </div>
                    </a>
                `;
                blogSection.appendChild(col);
            });
        }

        // Add navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="bi bi-arrow-left-short" />';
        prevBtn.classList.add('btn', 'btn-icon-circle');
        prevBtn.disabled = true;
        prevBtn.addEventListener('click', (e) => {
            scrollCarousel(e.target, blogSection, -1);
        });

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="bi bi-arrow-right-short" />';
        nextBtn.classList.add('btn', 'btn-icon-circle', 'ms-2');
        nextBtn.addEventListener('click', (e) => {
            scrollCarousel(e.target, blogSection, 1);
        });

        const paginationControls = document.getElementById('pagination-controls');
        paginationControls.innerHTML = '<div class="col-md-10 offset-md-1 text-center"><a href="./blog" class="view-all">View All</a></div>';
        const btnControls = document.createElement('div');
        btnControls.classList.add('col-md-1', 'd-flex', 'align-right');
        btnControls.appendChild(prevBtn);
        btnControls.appendChild(nextBtn);
        paginationControls.appendChild(btnControls);
    }

    async function fetchBlogPosts() {
        const ghostApiUrl = 'https://ninjamonk.in/blog/ghost/api/content/posts';
        const apiKey = '522e81bccd56e6acb76110de58'; // Replace with your actual API key
        try {
            const response = await fetch(`${ghostApiUrl}?key=${apiKey}&limit=all&filter=tag:-clients`);
            const data = await response.json();
            displayBlogPosts(data.posts);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    fetchBlogPosts();
    //startupsGallery(); 
    domainExperts();
});
