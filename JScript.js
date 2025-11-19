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

//Search Function

$(document).ready(function() {
  const $searchInput = $('#service-search');
  const $clearButton = $('#clear-search');
  const $results = $('#search-results');
  const $servCards = $('.card-1');

  function performSearch() {
    const searchTerm = $searchInput.val().toLowerCase().trim();

    if (searchTerm === '') {
      $results.html('');
      $servCards.show();
      return;
    }

    let foundCount = 0;
    $servCards.hide();

    $servCards.each(function() {
      const $card = $(this);
      const servName = $card.find('h2').text().toLowerCase();
      const servContent = $card.find('p').text().toLowerCase();
      const servData = $card.data('service');

      if (
        servName.includes(searchTerm) ||
        servContent.includes(searchTerm) ||
        (servData && servData.toLowerCase().includes(searchTerm))
      ) {
        $card.show();
        foundCount++;
      }
    });

    if (foundCount === 0) {
      $results.html('<p class="no-results">No services found matching "' + searchTerm + '"</p>');
    } else {
      $results.html('<p class="results-found">Found ' + foundCount + ' service(s) matching "' + searchTerm + '"</p>');
    }
  }

  // Event listeners
  $searchInput.on('input', performSearch);

  $clearButton.on('click', function() {
    $searchInput.val('');
    $results.html('');
    $servCards.show();
    $searchInput.focus();
  });

  $searchInput.on('keydown', function(e) {
    if (e.key === 'Escape') {
      $searchInput.val('');
      $results.html('');
      $servCards.show();
    }
  });
});

// Form Validation & Submission Logic
document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('enquire-form') || document.getElementById('contactForm');
  const submitBtn = document.getElementById('submit-Buttn') || document.getElementById('submit-Btton');
  const successMessage = document.getElementById('successMessage');

  // ---- FORM VALIDATION FUNCTION ---- //
  function validateForm() {
    let isValid = true;

    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
      error.style.display = 'none';
    });

    // Validate First Name
    const firstName = document.getElementById('firstName');

  if (!firstName.value.trim()) {
      document.getElementById('firstNameError').style.display = 'block';
      isValid = false;
      }

  

    // Validate Last Name
    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
      document.getElementById('lastNameError').style.display = 'block';
      isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.value.trim() || !emailRegex.test(email.value)) {
      document.getElementById('emailError').style.display = 'block';
      isValid = false;
    }

    // Validate Phone (optional but must be valid if filled)
    const phone = document.getElementById('phone');
    const phoneDigits = phone?.value.replace(/\D/g, '');

    if (phone && phone.value.trim() && !/^\d{7,15}$/.test(phoneDigits)) {
      document.getElementById('phoneError').style.display = 'block';
      isValid = false;
    }

    // Validate Service Type (if present)
    const serviceType = document.getElementById('serviceType');
    if (serviceType && !serviceType.value.trim()) {
      document.getElementById('serviceTypeError').style.display = 'block';
      isValid = false;
    }

    // Validate Message
    const message = document.getElementById('message');
    if (!message.value.trim() || message.value.trim().length < 9) {
      document.getElementById('messageError').style.display = 'block';
      isValid = false;
    }

    return isValid;
  }

  //  FORM SUBMISSION  //
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (validateForm()) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting, please wait...';

        // Simulate submit
        setTimeout(function () {
          form.style.display = 'none';
          successMessage.style.display = 'block';
        }, 1500);
      }
    });
  }
});
