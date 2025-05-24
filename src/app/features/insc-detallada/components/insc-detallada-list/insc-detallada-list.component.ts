import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { InscripcionDetalladaService } from '../../services/inscripcion';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InscModel } from '@features/insc-detallada/models/insc-detalle-model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-inscripcion-detallada-list',
  standalone: true,
  templateUrl: './insc-detallada-list.component.html',
  styleUrls: ['./insc-detallada-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class InscripcionDetalladaListComponent implements OnInit {
  displayedColumns: string[] = ['idInscripcion', 'nombreEstudiante', 'nombreCurso', 'fechaInscripcion'];
  inscripciones: InscModel[] = [];
  datosOriginales: InscModel[] = [];

  filtro: string = '';
  totalItems = 0;
  pageSize = 3;
  currentPage = 0;

  constructor(private inscService: InscripcionDetalladaService) {}

  ngOnInit(): void {
    this.getPage(this.currentPage, this.pageSize);
  }

  getPage(pageIndex: number, pageSize: number): void {
    this.inscService.getAll(pageIndex, pageSize).subscribe(data => {
      this.inscripciones = data.content;
      this.datosOriginales = data.content;
      this.totalItems = data.totalElements;
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPage(this.currentPage, this.pageSize);
  }

  aplicarFiltro(): void {
    const termino = this.filtro.trim().toLowerCase();
    this.inscripciones = this.datosOriginales.filter((i: InscModel) =>
      i.nombreEstudiante.toLowerCase().includes(termino) ||
      i.nombreCurso.toLowerCase().includes(termino)
    );
  }

  // exrportar data de inscripciones a excel
  exportarAExcel(): void {
  const worksheet = XLSX.utils.json_to_sheet(this.inscripciones);
  const workbook = { Sheets: { 'Inscripciones': worksheet }, SheetNames: ['Inscripciones'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  FileSaver.saveAs(data, `inscripciones_detalladas_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

  // exrportar data de inscripciones a Pdf
exportarAPDF(): void {
  const doc = new jsPDF();

  // Título del documento
  doc.setFontSize(18);
  doc.text('Inscripciones Detalladas', 14, 22);

  // columnas y datos
  const columnas = ['ID', 'Estudiante', 'Curso', 'Fecha'];
  const filas = this.inscripciones.map(i => [
    i.idInscripcion,
    i.nombreEstudiante,
    i.nombreCurso,
    i.fechaInscripcion
  ]);

  // tabla con autoTable
  autoTable(doc, {
    head: [columnas],
    body: filas,
    startY: 30
  });

  // Descargar archivo
  doc.save(`inscripciones_detalladas_${new Date().toISOString().slice(0, 10)}.pdf`);
}

}
