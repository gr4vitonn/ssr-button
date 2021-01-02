import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showSection = false;

  onToggleButtonClick(): void {
    this.showSection = !this.showSection;
  }
}
