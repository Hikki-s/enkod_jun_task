import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ICity } from '../../interfaces/city.interfaces';
import { CityService } from '../../services/city-service.service';
import { CityListComponent } from '../../components/city-list/city-list.component';
import { CityGridComponent } from '../../components/city-grid/city-grid.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cities-page',
  imports: [RouterLink, CityListComponent, CityGridComponent, AsyncPipe],
  templateUrl: './cities-page.component.html',
  styleUrl: './cities-page.component.less',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesPageComponent implements OnInit {
  view = signal<'list' | 'grid'>('list');
  cities$: Observable<ICity[]> = of([]);
  private cityService = inject(CityService);

  ngOnInit() {
    this.cities$ = this.cityService.getCities();
  }
}
