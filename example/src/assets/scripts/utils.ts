export class Dropdown {
  container: HTMLElement;
  dropped: boolean;
  btn: any;

  constructor(container: HTMLElement) {
    this.container = container;
    this.dropped = false;

    // блок с data-dropdown-btn станет кнопкой
    this.btn = this.container.querySelector<HTMLElement>("[data-dropdown-btn]");

    if (this.btn) {
      this.btn.addEventListener("click", this.dropStateHandler.bind(this));
    }

    // data-dropdown-close на контейнере будет закрыть при клике вне контейнера
    if (this.container.hasAttribute("data-dropdown-close")) {
      document.addEventListener("click", (e) => {
        const closestEl = (e.target as HTMLElement).closest(
          "[data-dropdown-close]",
        );

        if (!closestEl || closestEl !== this.container) {
          this.close();
        }
      });
    }

    // data-open - открыт изначально
    if (this.container.hasAttribute("data-open")) {
      this.open();
    }
  }

  dropStateHandler() {
    if (this.dropped) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.dropped = true;
    this.container.classList.add("_dropped");
  }

  close() {
    this.dropped = false;
    this.container.classList.remove("_dropped");
  }
}
