import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CityService } from "../../services/city-service.service";
import { ICityPost } from "../../interfaces/city.interfaces";

@Component({
  selector: "app-create-city-page",
  imports: [RouterLink, MatIcon, ReactiveFormsModule],
  templateUrl: "./create-city-page.component.html",
  styleUrl: "./create-city-page.component.less",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCityPageComponent {
  private cityService = inject(CityService);
  private router = inject(Router);

  protected readonly cityForm = new FormGroup({
    name: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    description: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(250)],
    }),
    imageUrl: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern("https?://.+")],
    }),
  });

  onSubmit() {
    if (this.cityForm.valid) {
      const cityData: ICityPost = {
        name: this.cityForm.value.name ?? "",
        description: this.cityForm.value.description ?? "",
        image: this.cityForm.value.imageUrl ?? "",
        favorite: false,
      };

      this.cityService.createCity(cityData).subscribe({
        next: () => {
          this.router.navigate(["/cities"]);
        },
        error: (err) => {
          console.error("Ошибка при создании города:", err);
        },
      });
    } else {
      console.log("Форма не валидна");
    }
  }
}
