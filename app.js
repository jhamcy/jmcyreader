const API="https://api.mangadex.org"

async function fetchAPI(url){
const res=await fetch(url)
return await res.json()
}

/* TRENDING */

async function loadTrending(){

const url=`${API}/manga?order[followedCount]=desc&limit=20&includes[]=cover_art`

const data=await fetchAPI(url)

const grid=document.getElementById("trending")

grid.innerHTML=""

data.data.forEach(m=>{

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

grid.appendChild(card)

})

}

/* SEARCH */

async function searchManga(q){

const url=`${API}/manga?title=${q}&limit=20&includes[]=cover_art`

const data=await fetchAPI(url)

const grid=document.getElementById("searchResults")

grid.innerHTML=""

data.data.forEach(m=>{

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

grid.appendChild(card)

})

}

/* BOOKMARK */

function saveBookmark(id,title,cover){

let lib=JSON.parse(localStorage.getItem("library")||"[]")

if(!lib.find(m=>m.id===id)){
lib.push({id,title,cover})
localStorage.setItem("library",JSON.stringify(lib))
alert("Bookmarked!")
}

}

function loadLibrary(){

const grid=document.getElementById("library")

if(!grid) return

let lib=JSON.parse(localStorage.getItem("library")||"[]")

grid.innerHTML=""

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