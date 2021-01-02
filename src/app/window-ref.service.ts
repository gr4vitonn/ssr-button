import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  private readonly _native = typeof window === "object" ? window : {};

	get native(): Window {
		return this._native as Window;
	}
}
