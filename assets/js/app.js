// Initialize Supabase
const SUPABASE_URL = 'https://zblbaadfiiyusxijkbmn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpibGJhYWRmaWl5dXN4aWprYm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyODA5NTQsImV4cCI6MjAzNzg1Njk1NH0.ZoeGwd1X2YaEdvgKTKIBCmxrPeEA_VDwhNmJkKk_xrU';

// The following line should correctly create the Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchData() {
    console.log(table_name)
    // Fetch data from the Supabase database
    let { data: postsData, error } = await supabase
        .from(table_name)  // Replace with your actual table name
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }
    console.log(supabase)
    console.log(postsData)

    postsData.sort((a, b) => b.id - a.id);

    // Iterate over each project in the JSON data
    const blogtable = document.getElementById('blog-posts');
    const postTemplate = document.querySelector("[blogPostTemplate]")
    const searchInput = document.querySelector("[post-search]")
    console.log(postTemplate)

    posts_storage = postsData.map(post => {
        const template = postTemplate.content.cloneNode(true).children[0];
        console.log(template)

        template.querySelector('.post-link').textContent = post.title;
        template.querySelector('.post-link').addEventListener('click', function () {
            // Populate the article content with the selected post
            document.querySelector('#post').innerHTML = `
                        <p id="inpost-tags">Tags: ${post.tags.join(', ')}</p>
                        <h2 class="major" id="inpost-title">${post.title}</h2>
                        <div class="inpost-meta">
                            <i class="far fa-user"></i><span class="author-name">  Kay Vu</span>
                                  
                            <i class="far fa-calendar-alt"></i><span class="post-date">  ${post.date}</span>
                        </div>
                        ${post.postcontent}
                    `;
            var inpostImg = document.getElementById('inpost-img');
            console.log(inpostImg)
            if (inpostImg) {
                // Get the width of the element
                var width = inpostImg.offsetWidth;
                console.log(width)

                // Convert pixels to rem assuming the base font size is 16px
                var widthInRem = width / 20;
                console.log(widthInRem)
                // Apply conditional styling
                if (widthInRem > 50) {
                    inpostImg.style.width = '100%';
                }
                // If width is less than or equal to 50rem, no action is needed ('else' condition is 'pass')
            }
        });
        template.querySelector('.post-date').textContent = '  ' + post.date;
        template.querySelector('.post-description').innerHTML = post.postcontent
            .replace(/<(?!br\s*\/?)[^>]+>/gi, '')  // Remove all HTML tags except <br>
            .replace(/<br\s*\/?>/gi, ' ')  // Replace <br> tags with spaces
            .replace(/\n/g, ' ')  // Remove newline characters
            .length > 300 ? post.postcontent
                .replace(/<(?!br\s*\/?)[^>]+>/gi, '')  // Remove all HTML tags except <br>
                .replace(/<br\s*\/?>/gi, ' ')  // Replace <br> tags with spaces
                .replace(/\n/g, ' ')  // Remove newline characters
                .slice(0, 300)
                .replace(/\s+\S*$/, '...') : post.postcontent
                    .replace(/<(?!br\s*\/?)[^>]+>/gi, '')  // Remove all HTML tags except <br>
                    .replace(/<br\s*\/?>/gi, ' ')  // Replace <br> tags with spaces
                    .replace(/\n/g, ' ');  // Remove newline characters
        template.querySelector('.post-tags').textContent = "Tags: " + post.tags.join(', ');
        template.querySelector('.read-more').addEventListener('click', function () {
            // Populate the article content with the selected post
            document.querySelector('#post').innerHTML = `
                        <p id="inpost-tags">${post.tags.join(', ')}</p>
                        <h2 class="major" id="inpost-title">${post.title}</h2>
                        <div class="inpost-meta">
                            <i class="far fa-user"></i><span class="author-name">  Kay Vu</span>
                                  
                            <i class="far fa-calendar-alt"></i><span class="post-date">  ${post.date}</span>
                        </div>
                        ${post.postcontent}
                    `;
            var inpostImg = document.getElementById('inpost-img');
            if (inpostImg) {
                // Get the width of the element
                var width = inpostImg.offsetWidth;

                // Convert pixels to rem assuming the base font size is 16px
                var widthInRem = width / 16;

                // Apply conditional styling
                if (widthInRem > 50) {
                    inpostImg.style.width = '100%';
                }
                // If width is less than or equal to 50rem, no action is needed ('else' condition is 'pass')
            }
        });
        blogtable.append(template)
        return { title: post.title, tags: post.tags, element: template }
    })
    const allTags = postsData.flatMap(post => post.tags);
    const uniqueTags = [...new Set(allTags)].sort((a, b) => b.localeCompare(a));
    const sidebar = document.querySelector('#sidebar h3');
    let selectedTags = []; // Step 1: Initialize selected tags array

    uniqueTags.forEach(tag => {
        const tagElement = document.createElement('button');
        tagElement.textContent = tag;
        tagElement.classList.add('tag');
        sidebar.insertAdjacentElement('afterend', tagElement);

        tagElement.addEventListener('click', function () {
            // Step 2: Toggle tag selection
            if (selectedTags.includes(tag)) {
                selectedTags = selectedTags.filter(t => t !== tag);
                tagElement.classList.remove('selected'); // Optional: Visual feedback
            } else {
                selectedTags.push(tag);
                tagElement.classList.add('selected'); // Optional: Visual feedback
            }

            // Step 3: Filter and show posts
            const postElements = document.querySelectorAll('.post');
            postElements.forEach((postElement, index) => {
                const post = postsData[index];
                console.log(post);
                // Check if the current post includes all selected tags
                if (selectedTags.every(tag => post.tags.includes(tag))) {
                    postElement.classList.remove('hide');
                } else {
                    postElement.classList.add('hide');
                }
            });
        });
    });
}

fetchData();  // Call the fetchData function
