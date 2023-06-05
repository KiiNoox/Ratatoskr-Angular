import {Component, OnInit, Renderer2} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
  title = 'ratatoskrweb';

  myScriptElement!: HTMLScriptElement;
  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {

    this.loadJsFile("assets/vendors/imagesloaded/imagesloaded.pkgd.min.js");
    this.loadJsFile("assets/vendors/simplebar/simplebar.min.js");
    this.loadJsFile("assets/js/config.js");
    this.loadJsFile("assets/vendors/popper/popper.min.js");
    this.loadJsFile("assets/vendors/bootstrap/bootstrap.min.js");
    this.loadJsFile("assets/vendors/anchorjs/anchor.min.js");
    this.loadJsFile("assets/vendors/is/is.min.js");
    this.loadJsFile("assets/vendors/fontawesome/all.min.js");
    this.loadJsFile("assets/vendors/lodash/lodash.min.js");
    this.loadJsFile("assets/polyfill.io/v3/polyfill.min58be.js");
    this.loadJsFile("assets/vendors/feather-icons/feather.min.js");
    this.loadJsFile("assets/vendors/dayjs/dayjs.min.js");
    this.loadJsFile("assets/vendors/prism/prism.js");
    this.loadJsFile("assets/js/phoenix.js");
    this.loadJsFile("assets/vendors/swiper/swiper-bundle.min.js");
    this.loadJsFile("assets/vendors/list.js/list.min.js");

  }
  public loadJsFile(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    this.renderer.appendChild(document.body, script);

  }
}
