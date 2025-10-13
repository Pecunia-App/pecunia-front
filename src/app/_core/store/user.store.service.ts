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

  // async fileToBase64(file: File): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result as string);
  //     };
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // }

  loadUser(): void {
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
        console.log('user stocké', this.user());
        this.loadWallet(userData.id);
      },
      error: () => {
        this.user.set(null);
        this.wallet.set(null);
      },
    });
  }

  loadWallet(userId: number): void {
    if (typeof userId !== 'number' || userId === 0) {
      this.wallet.set(null);
      return;
    }
    this.userService.getWalletByUserId(userId).subscribe({
      next: (walletData: WalletDTO) => {
        this.wallet.set(walletData);
        console.log('wallet stocké', this.wallet());
      },
      error: () => this.wallet.set(null),
    });
  }

  clear(): void {
    this.user.set(null);
    this.wallet.set(null);
  }
}
