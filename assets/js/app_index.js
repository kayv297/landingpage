const projectButton = document.querySelector('a[href="#work"]');
const workArticle = document.getElementById('work');

projectButton.addEventListener('click', function () {
    // Initialize Supabase
    const SUPABASE_URL = 'https://zblbaadfiiyusxijkbmn.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpibGJhYWRmaWl5dXN4aWprYm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyODA5NTQsImV4cCI6MjAzNzg1Njk1NH0.ZoeGwd1X2YaEdvgKTKIBCmxrPeEA_VDwhNmJkKk_xrU';

    // The following line should correctly create the Supabase client
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    async function fetchData() {
        console.log(table_name)
        // Fetch data from the Supabase database
        let { data: projectsData, error } = await supabase
            .from(table_name)  // Replace with your actual table name
            .select('*');

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }
        console.log(supabase)
        console.log(projectsData)

        projectsData.reverse();
        // Clear existing content
        workArticle.innerHTML = '<h2 class="major">project</h2>';

        // Iterate over each project in the JSON data
        projectsData.forEach(project => {
            // Create elements for the project
            const visualimg = document.createElement('span');
            visualimg.className = 'image main';
            visualimg.innerHTML = '<img src="' + project.imageSrc + '" alt="" />';

            const titleElement = document.createElement('h3');
            titleElement.textContent = project.title;

            const descriptionElement = document.createElement('p');
            descriptionElement.innerHTML = project.description; // Using innerHTML to parse <br> tags

            const linkElement = document.createElement('a');
            linkElement.href = project.projectLink;
            linkElement.textContent = 'View Project';
            linkElement.className = 'button';
            linkElement.style = 'display: inline-block; margin: 0 auto;';
            linkElement.target = '_blank';

            const linkContainer = document.createElement('div');
            linkContainer.style = 'text-align: center;';
            linkContainer.appendChild(linkElement);

            const hr = document.createElement('hr');
            hr.className = 'separator';
            // Append elements to the work article
            workArticle.appendChild(visualimg);
            workArticle.appendChild(titleElement);
            workArticle.appendChild(descriptionElement);
            workArticle.appendChild(linkContainer);
            workArticle.appendChild(hr);
        });
    }
    fetchData();
});
//                 }