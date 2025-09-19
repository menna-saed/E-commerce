import { Injectable, PLATFORM_ID, WritableSignal, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective
} from "@ngx-translate/core";
import { platform } from 'os';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class langService {
  islang: string = 'en'

  Lang: WritableSignal<string> = signal('en')
  private readonly id= inject(PLATFORM_ID)

  constructor(private translate: TranslateService, private cookies: CookieService) {

    let DefaultLang = 'en'
    
    if (isPlatformBrowser(this.id)) {
      if (this.cookies.get('lang') !== null) {
        DefaultLang = this.cookies.get('lang')
      }

      this.changelang(DefaultLang)
    }

  }


  changelang(lang: string): void {
    this.cookies.set('lang', lang)
    this.translate.setFallbackLang(lang)
    this.translate.use(lang)
    this.changeDirection(lang)

  }
  changeDirection(lang: string) {
    const direction = lang == "ar" ? "rtl" : "ltr";
    document.querySelector('html')!.dir = direction
  }

}
