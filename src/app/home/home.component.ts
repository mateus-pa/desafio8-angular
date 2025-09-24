import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { ModalService } from '../services/modal.service';
import { WelcomeModalComponent } from '../welcome-modal/welcome-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent, WelcomeModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  showModal = false;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.open();

    this.modalService.modalState$.subscribe((state) => {
      this.showModal = state;
    });
  }

  closeModal() {
    this.modalService.close();
  }
}
