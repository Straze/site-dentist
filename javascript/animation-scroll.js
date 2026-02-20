const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		
	if (entry.isIntersecting) {
		entry.target.classList.add('show');
	} else {
		
	}
     });
  });	
  const observer2 = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		
	if (entry.isIntersecting) {
		entry.target.classList.add('show2');
	} else {
		entry.target.classList.remove('show2');
	}
     });
  });	
  const observer3 = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		
	if (entry.isIntersecting) {
		entry.target.classList.add('show3');
	} else {
		entry.target.classList.remove('show3');
	}
     });
  });	

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
const hiddenElements2 = document.querySelectorAll('.hidden2');
hiddenElements2.forEach((el) => observer.observe(el));
const hiddenElements3 = document.querySelectorAll('.hidden3');
hiddenElements3.forEach((el) => observer.observe(el));