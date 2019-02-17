class wilMenu {
  constructor(el) {
    this.el = el;
    this.countChild = this.el.querySelectorAll('li').length;
    this.moreButton = this.el.querySelector('.show-more');
    this.moreButton.addEventListener('click', event => {
      event.stopPropagation();
      event.preventDefault();
      this.moreButton.classList.toggle('active');
    });
    this.responsive();
  }

  responsive() {
    const eventResize = document.createEvent('Event');

    let widthCont = this.el.getBoundingClientRect().width;
    let widthChild = this.el.querySelectorAll('li')[1].getBoundingClientRect().width;
    let countInRow = Math.round(widthCont / widthChild) - 1;

    this.updateMenu(countInRow);

    eventResize.initEvent('eventResize', true, true);
    this.el.addEventListener('eventResize', () => {
      widthCont = this.el.getBoundingClientRect().width;
      widthChild = this.el.querySelectorAll('li')[1].getBoundingClientRect().width;
      countInRow = Math.round(widthCont / widthChild) - 1;

      this.updateMenu(countInRow);
    });
    window.addEventListener('resize', () => {
      this.el.dispatchEvent(eventResize);
    });
  }

  updateMenu(countInRow) {
    if (this.el.querySelector('.separator')) {
      this.el.querySelector('.separator').classList.remove('separator');
    }
    if (countInRow >= this.countChild - 1) {
      this.moreButton.style.display = 'none';
    } else {
      this.el.querySelectorAll('li')[countInRow].classList.add('separator');
      this.moreButton.style.display = '';
    }
  }
}


const menu = new wilMenu(document.querySelector('.grid'));

