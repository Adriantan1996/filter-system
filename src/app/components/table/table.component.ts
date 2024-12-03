import { Component, OnInit, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

export interface Product {
  id?: string;
  tradeNumber?: string;
  portfolio?: string;
  counterParty?: string;
  price?: number;
}

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  providers: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() filteredData: any[] = [];
}
