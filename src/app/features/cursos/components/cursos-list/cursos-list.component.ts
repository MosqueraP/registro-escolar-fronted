import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/cursos';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule, MatIconModule,]
})
export class CursoListComponent implements OnInit {
  cursos: any[] = [];
  displayedColumns: string[] = ['idCurso', 'nombre', 'descripcion', 'creditos', 'profesor', 'acciones'];

  constructor(private service: CursoService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAsignados().subscribe(data => {
      this.cursos = data;
    });
  }

  agregar() {
    this.router.navigate(['/cursos/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/cursos/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Deseas eliminar este curso?')) {
      this.service.delete(id).subscribe(() => {
        this.cursos = this.cursos.filter(c => c.idCurso !== id);
      });
    }
  }
}
