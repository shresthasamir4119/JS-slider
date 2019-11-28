function carousel(parent,imageWidth,imageHeight,timeInterval){
	this.imageWidth = imageWidth;
	this.imageHeight = imageHeight;
	this.parent = parent;
	this.timeInterval = timeInterval;

	var position = 0;
	var index = 0;
	var transitionSpeed = imageWidth/10;
	var status;
	var transitionCounter=0;
	var dot = [];

	var imageCarousel = document.querySelector('.'+parent);
	imageCarousel.style.width = imageWidth+'px';
	imageCarousel.style.height = imageHeight+'px';
	imageCarousel.style.overflow = 'hidden';
	imageCarousel.style.position = 'relative';

	var image = document.getElementsByTagName('img');
	for(var i = 0;i<image.length; i++){
		image[i].style.float = 'left';
	}

	//buttons next
	var createButton = document.createElement('button');
	imageCarousel.appendChild(createButton);
	createButton.style.position = 'absolute';
	createButton.style.zIndex = '20';
	createButton.innerHTML = 'next';
	createButton.style.top ='50%';
	createButton.style.right = '0';
	createButton.setAttribute('onclick','nextImage()');

	//button prev
	var createButton1 = document.createElement('button');
	imageCarousel.appendChild(createButton1);
	createButton1.style.position = 'absolute';
	createButton1.style.zIndex = '20';
	createButton1.innerHTML = 'prev';
	createButton1.style.top ='50%';
	createButton1.style.left = '0';
	createButton1.setAttribute('onclick','prevImage()');

	// var button = document.getElementsByTagName('button');
	var maxWidth = image.length*imageWidth;
	var lastPosition = maxWidth-imageWidth;
	var shiftSpeed = lastPosition/10;

	var imageContainer = document.querySelector('.image-container');
	imageContainer.style.width = maxWidth+'px';
	imageContainer.style.position = 'relative';

	function transition(direction) {
		status = 1;
		var shift = setInterval(function(){
			position+=transitionSpeed*direction;
			transitionCounter+=transitionSpeed;
			imageContainer.style.left = position+'px';
			if(transitionCounter>=imageWidth){
				clearInterval(shift);
				transitionCounter=0;
				status = 0;
			}
		},50)
	}	

	function shift(direction){
		status = 1;
		var shiftVar = setInterval(function(){
			position+=shiftSpeed*direction;
			transitionCounter+=shiftSpeed;
			imageContainer.style.left = position+'px';
			if (transitionCounter>=lastPosition) {
				clearInterval(shiftVar);
				transitionCounter=0;
				status = 0;
			} 
		},50)
	}
	function nextImage(){
		if(status==1){}
			else{
				if (position<=-lastPosition) {
					shift(1);
					index=0;
				}
				else{
					transition(-1);
					index++;
				}
			}
		indicator();
	}

	function prevImage(){
		if(status==1){
			console.log('working');
		}
		else{
			if (position>=0) {
				shift(-1);
				index = image.length-1;
			}
			else{
				transition(1);
				index--;
			}
		}
		indicator();
	}

	var mainTransition = setInterval(function(){
		nextImage();
	},timeInterval)

	var dotContainer = document.querySelector('.dot-container');
	dotContainer.style.position = 'absolute';
	dotContainer.style.bottom = '10%';
	dotContainer.style.textAlign = 'center';
	dotContainer.style.width = imageWidth+'px';

	//dot array
	for(var i = 0;i<image.length;i++){
		dot[i] = document.createElement('span');
		dotContainer.appendChild(dot[i]);
		dot[i].style.height = '25px';
		dot[i].style.width = '25px';
		dot[i].style.background = 'blue';
		dot[0].style.background = 'red';
		dot[i].style.display = 'inline-block';
		dot[i].style.margin = '0 2px';
		dot[i].style.borderRadius = '50%';
	}


	//dot notation
	function indicator(){
		for(var i=0;i<image.length;i++){
			dot[i].style.background = 'blue';
			dot[index].style.background = 'red';
		}

	}	
}

var newcarosel = new carousel('image-carousel','640','640','4000');
console.log(newcarosel);