import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HostService } from 'src/app/Services/Host/host.service';

@Component({
  selector: 'app-host-properties',
  templateUrl: './host-properties.component.html',
  styleUrls: ['./host-properties.component.css']
})
export class HostPropertiesComponent implements OnInit {

  private hostProperties: any;
  displayedColumns: string[] = ['propertyName', 'MaxNumberOfGuests', 'PricePerNight', 'Address', 'Action', 'deleteAction'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private hostService: HostService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {

  }

  ngOnInit(): void {
    this.hostService.GetPropertyByUserId().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => { console.log(error) },
      complete: () => { console.log("complete") }
    })
  }

  //From angular material (function for the search bar)
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteHostProperty(id: string) {
    this.hostService.DeleteProperty(id).subscribe(() => {
      console.log("deleted");
      this.hostService.GetPropertyByUserId().subscribe({
        next: (data: any) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => { console.log("complete") }
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open(error.error, "Close", {
          duration: 4000,
          verticalPosition: "top",
        });
      });
  }

  // deleteHostProperty(id: string): void {
  //   if (confirm('Are you sure you want to delete this property?')) {
  //     this.hostService.DeleteProperty(id).subscribe(
  //       () => console.log("Property deleted"),
  //       (error) => console.log(`Error deleting property: ${error.message}`)
  //     );
  //   } else {
  //     console.log("Delete cancelled");
  //   }
  // }

  navigateToEdit(propertyId: string): void {
    this.router.navigate(['/editProperty', propertyId]);
  }

}
