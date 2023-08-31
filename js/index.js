const handleCategory = async () => {

   const response= await fetch('https://openapi.programming-hero.com/api/news/categories');

   const data = await response.json();

   const tabContainer = document.getElementById('tab-container')
   const trimedData = data.data.news_category.slice(0,3)
   trimedData.forEach((category) => {
      const div = document.createElement('div');
      div.innerHTML=`
      <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a> 
      `
      tabContainer.appendChild(div);
   }); 
}
const handleLoadNews = async (categoryId) =>{
  console.log(categoryId)
   const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
   const data = await response.json();

   const cardContainer = document.getElementById('card-container')
   cardContainer.innerHTML = "";
   data.data?.forEach((news)=> {
     console.log(news)
      const div =document.createElement('div')
      div.innerHTML=`
      <div class="card w-96 max-w-xl mx-auto bg-base-100 shadow-xl">
      <figure>
        <img src=${news?.image_url}/>
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          ${news.title.slice(0,40)}
          <div class="badge badge-secondary p-5">${news?.rating?.badge
          }</div>
        </h2>
        <p>${news.details.slice(0,40)}</p>
        <h3>total views:${news?.total_view?news?.total_view:"no views"
        }</h3>
        <div class="card-footer flex justify-between mt-8">
          <div class="flex">
            <div>
              <div class="avatar online">
                <div class="w-14 rounded-full">
                  <img src=${news.author?.img
                  } />
                </div>
              </div>
            </div>
            <div>
              <h6>${news?.author?.name
              }</h6>
              <small>${news?.author?.published_date
              }</small>
            </div>
          </div>
          <div class="card-actions justify-end">
      
            <button onclick=handleModel('${news._id}') class="btn">open modal</button>
          </div>
        </div>
      </div>
    </div>
      `
      cardContainer.appendChild(div)
   })
}

const handleModel = async (newsID) => {
  console.log(newsID)

  const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsID}`);
  const data = await response.json();
  console.log(data.data[0]);

  const modalContainer = document.getElementById('model-detail-container')
    const head = document.getElementById('head')
    head.innerText = data.data[0].title

  modalContainer.innerHTML=`
  <img src="${data.data[0].image_url}"/>

  `
     const modal = document.getElementById('my_modal_1');
     modal.showModal();
}

handleCategory()
handleLoadNews("01")