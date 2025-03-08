import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, of, retry } from "rxjs";
import { ICity, ICityPost } from "../interfaces/city.interfaces";

@Injectable({
  providedIn: "root",
})
export class CityService {
  private apiUrl = "http://localhost:3000/cities";

  constructor(private http: HttpClient) {}

  getCities(): Observable<ICity[]> {
    return this.http
      .get<ICity[]>(this.apiUrl)
      .pipe(retry(3), catchError(this.handleError<ICity[]>("getCities", [])));
  }

  updateCity(id: string, cityData: ICity): Observable<ICity> {
    return this.http
      .put<ICity>(`${this.apiUrl}/${id}`, cityData)
      .pipe(catchError(this.handleError<ICity>("updateCity")));
  }

  createCity(cityData: ICityPost): Observable<ICity> {
    return this.http
      .post<ICity>(this.apiUrl, cityData)
      .pipe(catchError(this.handleError<ICity>("createCity")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
