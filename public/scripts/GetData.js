window.onload = function() {
  const getResponse = fetch("http://localhost:3000/enumIconsPaths")
  getResponse
    .then((response) => response.json())
    .then(fillMenuItems)
    .catch((error)=>alert(error))
  console.log("haben fertig")
}

function fillMenuItems(data) {
  const menu = document.querySelector("#menu")
  data.forEach((item) => {
    console.log(item.src)
    const li = document.createElement("li")
    const img = document.createElement("img")
    img.src = item.src
    img.alt = item.name
    img.style.width = "50px"
    li.appendChild(img)
    menu.appendChild(li)
  })
}
