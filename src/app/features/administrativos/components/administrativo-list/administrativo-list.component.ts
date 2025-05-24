import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { AdministrativoService } from '../../services/administrativo.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-administrativo-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule, MatIconModule, MatIconModule ],
  templateUrl: './administrativo-list.component.html',
  styleUrls: ['./administrativo-list.component.css']
})
export class AdministrativoListComponent {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'telefono', 'cargo', 'departamento', 'fechaNacimiento', 'acciones'];
  administrativos: any[] = [];

  constructor(private router: Router, private service: AdministrativoService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.administrativos = data;
    });
  }

  agregar() {
    this.router.navigate(['/administrativos/nueva']);
  }

  editar(id: number) {
    this.router.navigate(['/administrativos/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Deseas eliminar este administrativo?')) {
      this.service.delete(id).subscribe(() => {
        this.administrativos = this.administrativos.filter(p => p.id !== id);
      });
    }
  }
}
