const API="https://api.mangadex.org"

async function fetchAPI(url){
const res=await fetch(url)
return await res.json()
}

function createCard(m){

const title=m.attributes.title.en || Object.values(m.attributes.title)[0]

const coverRel=m.relationships.find(r=>r.type==="cover_art")

const cover=`https://uploads.mangadex.org/covers/${m.id}/${coverRel.attributes.fileName}.256.jpg`

const card=document.createElement("div")
card.className="card"

card.innerHTML=`
<img src="${cover}">
<div class="title">${title}</div>
`

card.onclick=()=>{
location=`reader.html?id=${m.id}`
}

return card
}

async function loadTrending(){

const data=await fetchAPI(`${API}/manga?order[followedCount]=desc&limit=20&includes[]=cover_art`)

const grid=document.getElementById("trending")

data.data.forEach(m=>{
grid.appendChild(createCard(m))
})

}

async function loadLatest(){

const data=await fetchAPI(`${API}/manga?order[latestUploadedChapter]=desc&limit=20&includes[]=cover_art`)

const grid=document.getElementById("latest")

data.data.forEach(m=>{
grid.appendChild(createCard(m))
})

}

async function searchManga(q){

const data=await fetchAPI(`${API}/manga?title=${q}&limit=20&includes[]=cover_art`)

const grid=document.getElementById("trending")

grid.innerHTML=""

data.data.forEach(m=>{
grid.appendChild(createCard(m))
})

}

function loadLibrary(){

let lib=JSON.parse(localStorage.getItem("library")||"[]")

const grid=document.getElementById("library")

lib.forEach(m=>{

const card=document.createElement("div")

card.className="card"

card.innerHTML=`
<img src="${m.cover}">
<div class="title">${m.title}</div>
`

card.onclick=()=>{
location=`reader.html?id=${m.id}`
}

grid.appendChild(card)

})

}

function loadContinue(){

const grid=document.getElementById("continue")

let last=JSON.parse(localStorage.getItem("continue")||"[]")

last.forEach(m=>{

const card=document.createElement("div")

card.className="card"

card.innerHTML=`
<img src="${m.cover}">
<div class="title">${m.title}</div>
`

card.onclick=()=>{
location=`viewer.html?id=${m.chapter}&manga=${m.id}`
}

grid.appendChild(card)

})

}