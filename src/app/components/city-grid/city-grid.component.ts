import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { ICity } from '../../interfaces/city.interfaces';
import { MatIcon } from '@angular/material/icon';
import { CityService } from '../../services/city-service.service';

@Component({
  selector: 'app-city-grid',
  imports: [MatIcon],
  templateUrl: './city-grid.component.html',
  styleUrl: './city-grid.component.less',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityGridComponent {
  @Input() cities!: ICity[];
  private cityService = inject(CityService);

  toggleFavorite(city: ICity): void {
    city.favorite = !city.favorite;
    this.cityService.updateCity(city.id, { ...city }).subscribe();
  }
}
