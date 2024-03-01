


const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');
const errElement = document.getElementById('error-element');
let seletCatagori = 1000;

const faethCatagory = () =>{
    fetch('https://openapi.programming-hero.com/api/videos/categories')
.then(res => res.json())
.then(data =>  { 
    // console.log(data)
    data.data.forEach(card => {
        console.log(card)
        // newBtn.className = 'btn btn-ghost bg-slate-700 text-white text-lg'
        const newBtn = document.createElement('Button');
        newBtn.className = 'btn btn-ghost bg-slate-700 text-white text-lg'
        newBtn.innerText = card.category
        newBtn.addEventListener('click', () => feachDataByCataGori(card.category_id))
        btnContainer.appendChild(newBtn)

    })
})
}

const feachDataByCataGori = (category) => {
    seletCatagori = category; 
    console.log(category);
    fetch(`https://openapi.programming-hero.com/api/videos/category/${category}`)
    .then(res => res.json())
    .then(data => {


        // faka button

        // console.log('data count', data)
        // if(data.data.length === 0){
        //     errElement.classList.remove('hiden')
        // }
        // else{
        //     errElement.classList.add('hiden')
        // }




            cardContainer.innerHTML ="";
            data.data.forEach(video => {

            // verified icon
            const veifyId = document.getElementsByClassName('veify-bech');
            // console.log("all ok",veifyId);

            for(let ver of veifyId){
                if(video.authors[0].verified === true){
                    // console.log(video.authors[0].verified)
                    ver.classList.add('block')
                    // video.authors[0].verified.style.display = 'block';
                }
                else{
                    // video.authors[0].verified.style.display = 'none';
                    // veifyId.classList.remove('block')
                    ver.classList.remove('block')
                    // console.log(ver.classList)
                    // console.log(video.authors[0].verified)
                }
            }
            console.log(video);
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `
            <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src="${video.thumbnail}" alt="Shoes" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="Shoes" />
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex mt-3">
                                <p class="">${video.authors[0].profile_name}</p>
                                <img class="veify-bech w-6 h-6" id="" src="./images/verify.png" alt="">
                            </div>
                            <p class="mt-3">${video.others.views}</p>
                        </div>
                    </div>
                </div>
            </div>
            `
            cardContainer.appendChild(newDiv);

        })
    })
}
// ${video.authors[0].profile_name}
// ${video.authors[1].profile_picture}



faethCatagory()
feachDataByCataGori(seletCatagori)
