import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, CommonModule]
})
export class UsersPage {
  users: User[] = [];
  loading = false;

  // Inyectamos ChangeDetectorRef para obligar a Angular a actualizar la vista
  constructor(
    private usersService: UsersService,
    private cdr: ChangeDetectorRef
  ) {}

  // Usamos el ciclo de vida nativo de Ionic (siempre se dispara al mostrar la página)
  async ionViewWillEnter() {
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      this.loading = true;
      this.users = await this.usersService.getActiveUsers();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.loading = false;
      // Esta línea obliga al navegador a refrescar el HTML en caso de que se quede congelado
      this.cdr.detectChanges(); 
    }
  }
}