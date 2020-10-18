const photo = document.querySelector('[data-photo]');
const quote = document.querySelector('[data-quote]');
const name = document.querySelector('[data-name]');
const jobPosition = document.querySelector('[data-position]');
const buttons = document.querySelectorAll('[data-slide]');
const animationElements = [photo, quote, name, jobPosition];

const anim = {
    rightOut: 'right-out',
    rightIn: 'right-in',
    leftOut: 'left-out',
    leftIn: 'left-in',
};

const data = [
    {
        author: 'Tanya Sinclair',
        position: 'UX Engineer',
        photoUrl: './images/image-tanya.jpg',
        quote:
            '" I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. "',
    },
    {
        author: 'John Tarkpor',
        position: 'Junior Front-end Developer',
        photoUrl: './images/image-john.jpg',
        quote:
            '" If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. "',
    },
]

let currentSlide = 0;

const showData = index => {
    photo.setAttribute('src', data[index].photoUrl);
    photo.setAttribute('alt', `${data[index].author} - photo`);
    quote.textContent = data[index].quote;
    name.textContent = data[index].author;
    jobPosition.textContent = data[index].position;
};

const testimonialSlider = e => {
    if (e.target.dataset.slide === 'next') {
        currentSlide++;
        if (currentSlide === data.length) {
            currentSlide = 0;
        }
    } else {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = data.length - 1;
        }
    }
    showData(currentSlide);
};

const animationSlider = animationType => {
    return new Promise(resolve => {
        const removeAnimation = () => {
            animationElements.forEach(el => el.classList.remove(animationType));
            animationElements[0].removeEventListener('animationend', removeAnimation);
            resolve();
        };
        animationElements.forEach(el => el.classList.add(animationType));
        animationElements[0].addEventListener('animationend', removeAnimation);
    });
};

async function slider(animationOut, animationIn, e) {
    buttons.forEach(btn => (btn.disabled = true));
    await animationSlider(animationOut);
    testimonialSlider(e);
    await animationSlider(animationIn);
    buttons.forEach(btn => (btn.disabled = false));
}

const checkButtons = e => {
    e.target.dataset.slide === 'next' ? slider(anim.rightOut, anim.leftIn, e) : slider(anim.leftOut, anim.rightIn, e);
};

buttons.forEach(btn => btn.addEventListener('click', checkButtons));