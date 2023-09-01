// https://openapi.programming-hero.com/api/videos/categories

const functionCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const tabContainer = document.getElementById("tab-container")
    data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = ` <a onclick="loadData('${category.category_id}')" class="btn btn-active  px-5">${category.category}</a> `;
        tabContainer.append(div)
    });
}

const loadData = async (id) => {
    console.log(id);
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    console.log(data.data);

    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = "";

    data.data?.forEach((videos) => {
        const div = document.createElement("div");
        div.innerHTML = ` 
        <div class=" w-96 mb-5 bg-base-100">
        <figure>
            <div class="relative">
            <img class="rounded-md h-52 w-80" src=${videos.thumbnail}/>
            <span class="w-24 text-xs text-white rounded-md p-1 absolute bottom-0 right-12 ">${videos.others?.posted_date}</span>
        </div>
        </figure>
        <div class="flex gap-5 mt-3">
            <div class="avatar">
                <div class="w-12 h-12 ">
                <img class="rounded-full" src=${videos?.authors[0].profile_picture} />
                </div>
            </div>
            <div class="">
                <h2 class="font-bold">
                  ${videos.title}
                </h2>
                <div>
                <h3 class="flex items-center gap-1 my-1">
                ${videos.authors[0].profile_name}
                <div id="badge"><img src=${videos.authors[0].verified ? videos.authors[0].verified : "./Images/verified.png"} ></div>
                    </h3>
            <p>${videos.others.views} views</p>
            </div>

              </div>
        </div>
      </div>
        `;
        cardContainer.append(div)
    })
}

const timeConvert = async (seconds) => {
    let hours = Math.floor(seconds/3600);
    let minutes = Math.floor(seconds - (hours*3600)/60);

    return hours + "hrs " + minutes + "min " + "ago";
}

functionCategory();
loadData("1000");