import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './_core/services/auth/auth.service';
import { UserStoreService } from './_core/store/user.store.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private userStore = inject(UserStoreService);

  ngOnInit() {
    this.authService.verifyToken();
    this.userStore.loadUser();
  }
}
