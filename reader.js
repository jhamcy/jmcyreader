const chapterId=new URLSearchParams(location.search).get("id")

async function load(){

const data=await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`).then(r=>r.json())

const base=data.baseUrl
const hash=data.chapter.hash

data.chapter.data.forEach(p=>{

const img=new Image()

img.src=`${base}/data/${hash}/${p}`

img.className="reader-img"

document.getElementById("pages").appendChild(img)

})

}

load()