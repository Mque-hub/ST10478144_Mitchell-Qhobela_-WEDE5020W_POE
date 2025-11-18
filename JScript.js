function initMaps()
{

    var myCenter = new google.maps.LatLng(51.508742, -0.120850);

    var  mapProp= {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
      };

      var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

}

function setupGallery(slidesClass, captionId, modalId, demoClass) {
  let slideIndex = 1;
  const slides = document.getElementsByClassName(slidesClass);
  const caption = document.getElementById(captionId);
  const modal = document.getElementById(modalId);
  const demos = document.getElementsByClassName(demoClass);

  function showSlides(n){
      if(n>slides.length) slideIndex=1;
      if(n<1) slideIndex=slides.length;
      for(let i=0;i<slides.length;i++) slides[i].style.display="none";
      slides[slideIndex-1].style.display="block";
      if(caption) caption.innerHTML = slides[slideIndex-1].getElementsByTagName('img')[0].alt;
      if(demos) for(let i=0;i<demos.length;i++) demos[i].classList.remove("active");
      if(demos) demos[slideIndex-1].classList.add("active");
  }

  return {
      open:()=>{ modal.style.display="block"; showSlides(slideIndex); },
      close:()=>{ modal.style.display="none"; },
      plus:(n)=>{ showSlides(slideIndex+=n); },
      current:(n)=>{ showSlides(slideIndex=n); }
  }
}

// Initialize galleries
const TGFGallery = setupGallery("TGFslides","captionTGF","modalTGF","demoTGF");
const PortraitGallery = setupGallery("PortraitSlides","captionPortrait","modalPortrait","demoPortrait");
const FoodGallery = setupGallery("FoodSlides","captionFood","modalFood","demoFood");

// Bind functions globally
function openModalTGF()
{
  TGFGallery.open();
}

function closeModalTGF()
{
  TGFGallery.close();
}

function plusSlidesTGF(n)
{
  TGFGallery.plus(n);
}

function currentSlideTGF(n)
{
  TGFGallery.current(n);
}

function openModalPortrait()
{
  PortraitGallery.open();
}

function closeModalPortrait()
{
  PortraitGallery.close();
}

function plusSlidesPortrait(n)
{
  PortraitGallery.plus(n);
}

function currentSlidePortrait(n)
{
  PortraitGallery.current(n);
}

function openModalFood()
{
  FoodGallery.open();
}

function closeModalFood()
{
  FoodGallery.close();
}

function plusSlidesFood(n)
{
  FoodGallery.plus(n);
}

function currentSlideFood(n)
{
  FoodGallery.current(n);
}