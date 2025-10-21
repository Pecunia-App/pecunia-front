import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserDTO } from '../models/users/user.dto';
import { WalletDTO } from '../models/transactions/wallet.dto';
import { ProfileForm } from '../models/forms.model';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private readonly userService = inject(UserService);
  readonly user = signal<UserDTO | null>(null);
  readonly wallet = signal<WalletDTO | null>(null);
  readonly isLoadingUser = signal(false);
  readonly isLoadingWallet = signal(false);

  private hasLoadedUser = false;
  private hasLoadedWallet = false;

  get userId(): number | null {
    return this.user()?.id ?? null;
  }

  loadUser(): void {
    if (this.hasLoadedUser || this.isLoadingUser()) return;
    this.isLoadingUser.set(true);
    this.userService.getCurrentUser().subscribe({
      next: (profileForm: ProfileForm) => {
        if (profileForm.profilePicture instanceof File) return;
        const userData: UserDTO = {
          id: profileForm.id ?? 0,
          firstname: profileForm.firstname ?? '',
          lastname: profileForm.lastname ?? '',
          email: profileForm.email ?? '',
          profilePicture: profileForm.profilePicture ?? '',
        };
        this.user.set(userData);
        this.hasLoadedUser = true;
        this.loadWallet();
      },
      error: () => {
        this.user.set(null);
        this.hasLoadedUser = false;
      },
      complete: () => this.isLoadingUser.set(false),
    });
  }

  refreshUser(): void {
    this.hasLoadedUser = false;
    this.loadUser();
  }

  loadWallet(): void {
    if (this.hasLoadedWallet || this.isLoadingWallet()) return;
    const user = this.user();
    if (!user?.id) return;
    this.isLoadingWallet.set(true);
    this.userService.getWalletByUserId(user.id).subscribe({
      next: (walletData: WalletDTO) => {
        this.wallet.set(walletData);
        this.hasLoadedWallet = true;
      },
      error: () => {
        this.wallet.set(null);
        this.hasLoadedWallet = false;
      },
      complete: () => this.isLoadingWallet.set(false),
    });
  }

  refreshWallet(): void {
    this.hasLoadedWallet = false;
    this.loadWallet();
  }

  clear(): void {
    this.user.set(null);
    this.wallet.set(null);
    this.hasLoadedUser = false;
    this.hasLoadedWallet = false;
    this.isLoadingUser.set(false);
    this.isLoadingWallet.set(false);
  }
}
