const username = "Kanishk2254"
const container = document.getElementById("github-projects")

async function loadProjects(){

try{

const response = await fetch(`https://api.github.com/users/${username}/repos`)

const repos = await response.json()

const sorted = repos
.filter(repo => !repo.fork)
.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))

sorted.forEach(repo => {

const card = document.createElement("div")
card.className = "project-card"
card.dataset.category = "software"

card.innerHTML = `

<div class="card-image">
<img src="https://placehold.co/600x400/121212/00f3ff?text=${repo.name}">
<div class="overlay">
<i class="fas fa-code"></i>
</div>
</div>

<div class="card-content">

<h3>${repo.name.replaceAll("-", " ")}</h3>

<span class="status-completed">Repository</span>

<p>
${repo.description ? repo.description : "GitHub project repository."}
</p>

<div class="tech-stack">
<span>${repo.language ? repo.language : "Code"}</span>
<span>GitHub</span>
</div>

<a href="${repo.html_url}"
target="_blank"
rel="noopener noreferrer"
class="github-btn">

<i class="fab fa-github"></i>
View Repository

</a>

</div>

`

container.appendChild(card)

})

}
catch(error){

console.error("GitHub API error:", error)

}

}

loadProjects()