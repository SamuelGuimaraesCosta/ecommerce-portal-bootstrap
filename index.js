var productsIndexPage = null;
var valueFromSearch = null;

async function getProductsOnIndexPage() {
  productsIndexPage = await fetch('https://fakestoreapi.com/products?limit=6').then(res => {
    return res.json();
  });

  document.getElementById("product1Img").src = productsIndexPage[0].image;
  document.getElementById("product2Img").src = productsIndexPage[1].image;
  document.getElementById("product3Img").src = productsIndexPage[2].image;
  document.getElementById("product4Img").src = productsIndexPage[3].image;
  document.getElementById("product5Img").src = productsIndexPage[4].image;
  document.getElementById("product6Img").src = productsIndexPage[5].image;

  document.getElementById("product1Title").innerHTML = productsIndexPage[0].title;
  document.getElementById("product2Title").innerHTML = productsIndexPage[1].title;
  document.getElementById("product3Title").innerHTML = productsIndexPage[2].title;
  document.getElementById("product4Title").innerHTML = productsIndexPage[3].title;
  document.getElementById("product5Title").innerHTML = productsIndexPage[4].title;
  document.getElementById("product6Title").innerHTML = productsIndexPage[5].title;

  document.getElementById("product1Desc").innerHTML = productsIndexPage[0].description;
  document.getElementById("product2Desc").innerHTML = productsIndexPage[1].description;
  document.getElementById("product3Desc").innerHTML = productsIndexPage[2].description;
  document.getElementById("product4Desc").innerHTML = productsIndexPage[3].description;
  document.getElementById("product5Desc").innerHTML = productsIndexPage[4].description;
  document.getElementById("product6Desc").innerHTML = productsIndexPage[5].description;

  document.getElementById("product1Id").innerHTML = "Código: " + productsIndexPage[0].id;
  document.getElementById("product2Id").innerHTML = "Código: " + productsIndexPage[1].id;
  document.getElementById("product3Id").innerHTML = "Código: " + productsIndexPage[2].id;
  document.getElementById("product4Id").innerHTML = "Código: " + productsIndexPage[3].id;
  document.getElementById("product5Id").innerHTML = "Código: " + productsIndexPage[4].id;
  document.getElementById("product6Id").innerHTML = "Código: " + productsIndexPage[5].id;

  document.getElementById("product1Price").innerHTML = "Preço: R$" + productsIndexPage[0].price;
  document.getElementById("product2Price").innerHTML = "Preço: R$" + productsIndexPage[1].price;
  document.getElementById("product3Price").innerHTML = "Preço: R$" + productsIndexPage[2].price;
  document.getElementById("product4Price").innerHTML = "Preço: R$" + productsIndexPage[3].price;
  document.getElementById("product5Price").innerHTML = "Preço: R$" + productsIndexPage[4].price;
  document.getElementById("product6Price").innerHTML = "Preço: R$" + productsIndexPage[5].price;

  document.getElementById("product1Rating").innerHTML = "Avaliação " + productsIndexPage[0].rating.rate;
  document.getElementById("product2Rating").innerHTML = "Avaliação " + productsIndexPage[1].rating.rate;
  document.getElementById("product3Rating").innerHTML = "Avaliação " + productsIndexPage[2].rating.rate;
  document.getElementById("product4Rating").innerHTML = "Avaliação " + productsIndexPage[3].rating.rate;
  document.getElementById("product5Rating").innerHTML = "Avaliação " + productsIndexPage[4].rating.rate;
  document.getElementById("product6Rating").innerHTML = "Avaliação " + productsIndexPage[5].rating.rate;

  document.getElementById("product1Link").href = "details.html?id=" + productsIndexPage[0].id;
  document.getElementById("product2Link").href = "details.html?id=" + productsIndexPage[1].id;
  document.getElementById("product3Link").href = "details.html?id=" + productsIndexPage[2].id;
  document.getElementById("product4Link").href = "details.html?id=" + productsIndexPage[3].id;
  document.getElementById("product5Link").href = "details.html?id=" + productsIndexPage[4].id;
  document.getElementById("product6Link").href = "details.html?id=" + productsIndexPage[5].id;
}

function filterProductsBySearchInput() {
  valueFromSearch = document.getElementById("searchProductsInput").value;

  localStorage.setItem("searchVariable", valueFromSearch);
}

async function getSearchedProducts() {
  var param = localStorage.getItem("searchVariable")
  if(param == "" || param == " ") {
    document.getElementById("searchedParam").innerHTML = "Todos os Produtos";
  } else {
    document.getElementById("searchedParam").innerHTML = param;
  }

  var getAllProducts = await fetch('https://fakestoreapi.com/products').then(res => {
    return res.json();
  });

  var results = getAllProducts.filter(product => {
    if(product.title.includes(param) || product.description.includes(param) || product.category.includes(param)) {
      return product;
    }
  });

  if(results.length > 0) {
    document.getElementById("noProductsFound").style.display = "none";

    let list = document.getElementById("listProducts");
 
    results.forEach((product)=>{
      let listItem  = document.createElement("a");
      let divItem   = document.createElement("div");
      let h5Item    = document.createElement("h5");
      let pList     = document.createElement("p");
      let p1List    = document.createElement("p");
      let smallList = document.createElement("small");
      let imgList   = document.createElement("img");
      
      listItem.href = "details.html?id=" + product.id;

      imgList.classList.toggle("card-img-top");

      imgList.style.width = "90px";
      imgList.style.height = "90px";

      imgList.src = product.image;

      listItem.appendChild(imgList);

      listItem.classList.toggle("list-group-item");
      listItem.classList.toggle("list-group-item-action");
      listItem.classList.toggle("flex-column");
      listItem.classList.toggle("align-items-start");

      divItem.classList.toggle("d-flex");
      divItem.classList.toggle("w-100");
      divItem.classList.toggle("justify-content-between");

      listItem.appendChild(divItem);

      h5Item.classList.toggle("mb-1");

      h5Item.innerHTML = product.title;

      divItem.appendChild(h5Item);

      pList.classList.toggle("mb-1");

      pList.innerHTML = product.description;

      listItem.appendChild(pList);

      p1List.classList.toggle("mb-1");

      p1List.innerHTML = "<strong> Preço: R$" + product.price + "</strong>";

      listItem.appendChild(p1List);

      smallList.innerHTML = "Avaliação: " + product.rating.rate;

      listItem.appendChild(smallList);

      list.appendChild(listItem);
    });
  } else {
    document.getElementById("noProductsFound").style.display = "block";
  }
}

async function loadProductDetail() {
  var param = window.location.search.split('=')[1];

  var product = await fetch('https://fakestoreapi.com/products/' + param).then(res => {
    return res.json();
  });

  document.getElementById("productImage").src = product.image;
  document.getElementById("productImage").style.width = "40%";
  document.getElementById("productTitle").innerHTML = product.title;
  document.getElementById("productCode").innerHTML = "<strong>Código:</strong> " + product.id;
  document.getElementById("productCategory").innerHTML = "<strong>Categoria:</strong> " + product.category;
  document.getElementById("productDescription").innerHTML = "<strong>Descrição:</strong> " + product.description;
  document.getElementById("productPrice").innerHTML = "<strong>Preço:</strong> R$" + product.price;
  document.getElementById("productRatings").innerHTML = "<strong>Avaliação:</strong> " + product.rating.rate + " <strong>Quantidade de avaliações:</strong> " + product.rating.count;

  console.log(product);
}