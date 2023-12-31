// https://openapi.programming-hero.com/api/videos/categories

const functionCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const tabContainer = document.getElementById("tab-container");
    data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = ` <a onclick="loadData('${category.category_id}')" class="btn btn-active hover:bg-red-800 hover:text-white px-5">${category.category}</a> `;
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
        let postTime = timeConvert(parseInt(videos.others.posted_date || 0))
        const div = document.createElement("div");
        div.innerHTML = ` 
        <div class=" mb-5 bg-base-100">
        <figure class="w-full relative">
            <img class="rounded-md h-52 w-full" src=${videos.thumbnail}/>
            <span class="text-xs text-white rounded-md p-1 absolute bg-black bottom-0 right-0 ">${postTime}</span>
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
                <div id="badge"><img src=${videos.authors[0].verified ? "./images/verified.png" : " "}></div>
                    </h3>
            <p>${videos.others.views} views</p>
            </div>

              </div>
        </div>
      </div>
        `;
        cardContainer.append(div);

    })

    const noContent = document.getElementById("no-content");
    noContent.innerHTML = "";

    if (data.data.length === 0) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex items-center justify-center flex-col mt-20 ">
        <img src="./Images/Icon.png">
        <h1 class="font-bold text-3xl text-center mt-4">
            Oops!! Sorry, There is no <br> content here
        </h1>
        </div>
        `;
        noContent.appendChild(div);
    }
    else { }

}


function timeConvert(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let postedTime = ` ${hours} hrs ${minutes} min ago`;
    return postedTime;
}

let sortView = async (id = '1000') => {
    let viewData = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    let dataPass = await viewData.json();
    let dataPass2 = dataPass.data;
    dataSort(dataPass2);
}

let dataSort = data => {

    data.forEach((videos) => {

        let str = videos.others.views;
        let modStr = str.slice(0, -1);
        let viewsValue = parseInt(modStr)
        videos.others.views = viewsValue;

    })

    data.sort((a, b) => {
        return b.others.views - a.others.views;
    })

    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = "";

    data.forEach((videos) => {
        let postTime = timeConvert(parseInt(videos.others.posted_date || 0))
        const div = document.createElement("div");
        div.innerHTML = ` 
        <div class=" mb-5 bg-base-100">
        <figure class="w-full relative">
            <img class="rounded-md h-52 w-full" src=${videos.thumbnail}/>
            <span class="text-xs text-white rounded-md p-1 absolute bg-black bottom-0 right-0 ">${postTime}</span>
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
                <div id="badge"><img src=${videos.authors[0].verified ? "./images/verified.png" : " "}></div>
                    </h3>
            <p>${videos.others.views}K views</p>
            </div>

              </div>
        </div>
      </div>
        `;
        cardContainer.append(div);
    })

}

functionCategory();

loadData("1000");