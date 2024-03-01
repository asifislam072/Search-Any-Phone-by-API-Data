const lodePhone = async (phone) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");

  // why not working splice conditon befor if conditon
  // phones = phones.splice(0,12)
  const showMorButton = document.getElementById("show-mor-phone");
  if (phones.length > 12) {
    showMorButton.classList.remove("hidden");
  } else {
    showMorButton.classList.add("hidden");
  }

  phones = phones.splice(0, 12);

  phoneContainer.textContent = "";
  phones.forEach((phone) => {
    // console.log(phone);
    // 1.created a div
    const phonecard = document.createElement("div");
    phonecard.classList = `card card-compact bg-gray-100 shadow-xl`;
    // 2.set innerhtml
    phonecard.innerHTML = `
                <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.brand}</h2>
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>${phone.slug}p>
                  <div class="card-actions justify-center mt-4">
                    <button onclick="showDetaisBtn('${phone.slug}')" class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
        `;
    // 3.appedchild
    phoneContainer.appendChild(phonecard);
  });
  toggleButton(false);
};

const showDetaisBtn = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const showPhoneInnner = document.getElementById('show-phone-del');
  showPhoneInnner.innerHTML=`
  
  <div class="modal-box">
                <h3 class="font-bold text-lg">${phone.name}</h3>
                <img class="w-[40%]" src="${phone.image}" alt="">
                <h3 >${phone.mainFeatures.chipSet}</h3>
                <h3 >${phone.mainFeatures.displaySize}</h3>
                <h3 >${phone.mainFeatures.memory}</h3>
                <h3 >${phone.mainFeatures.memory}</h3>
                <h3 >${phone.mainFeatures.sensors[0]}</h3>
                <p class="py-4">Press ESC key or click the button below to close</p>
                <div class="modal-action">
                  <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                  </form>
                </div>
              </div>

  `
  // show the model
  show_detais_modal.showModal();
};

// handle serch button
// const handelSerch = () =>{
//   const serchField = document.getElementById('serch-fild');
//   const serchText = serchField.value;
//   console.log(serchText)
// // }
// function inputButton(){
// // const inputFild = document.getElementById('serch-fild');
// //   const inputValue = inputFild.value;
// //   console.log(inputValue);
// }
const inputButton = () => {
  toggleButton(true);
  const inputFild = document.getElementById("serch-fild");
  const inputValue = inputFild.value;
  // console.log(inputValue)
  lodePhone(inputValue);
};

const toggleButton = (isloding) => {
  const toggleButtonLoder = document.getElementById("togol-btn");
  if (isloding) {
    toggleButtonLoder.classList.remove("hidden");
  } else {
    toggleButtonLoder.classList.add("hidden");
  }
};

// document.getElementById('secod-button').addEventListener('click', () => {
//   const secondId = document.getElementById('second-input');
//   const secondInput = secondId.value;
//   lodePhone(secondInput);
// })

lodePhone();
