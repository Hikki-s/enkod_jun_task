import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'back-arrow',
      this.domSanitizer.bypassSecurityTrustResourceUrl('back-arrow.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'star',
      this.domSanitizer.bypassSecurityTrustResourceUrl('en-star.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'star_dark',
      this.domSanitizer.bypassSecurityTrustResourceUrl('en-star_dark.svg')
    );
  }
}
