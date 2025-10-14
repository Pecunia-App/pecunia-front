import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserStoreService } from '../store/user.store.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<void> {
  private userStore = inject(UserStoreService);

  resolve(): void {
    this.userStore.loadUser();
  }
}
