import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Garage } from '../entities/garageEntity';
import { Service } from '../entities/serviceEntity';
import { Slotime } from '../entities/slotimesEntity';
import { ServicesService } from '../services/services.service';
import { DayOfWeek, SlotStatus } from '../utilis/utils';

@Component({
  selector: 'app-dialog-rdv',
  templateUrl: './dialog-rdv.component.html',
  styleUrls: ['./dialog-rdv.component.css']
})
export class DialogRDVComponent implements OnInit {
  panelOpenState = false;

  constructor(public dialogRef: MatDialogRef<DialogRDVComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service, private service: ServicesService) { }

  ngOnInit(): void {
    this.service.getServiceInfos(this.data.id).subscribe(service => {
      this.data.slotimes = service.slotimes;
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getSlotime(creneau: Date){
    let date = new Date(creneau);
    let min = date.getMinutes() < 9 ? '0'+date.getMinutes() : date.getMinutes();
    
    return date.getHours() + ':' + min;
  }

  getDayOfWeek(creneau: Date){
    let dayValue = new Date(creneau).getDay();
    switch (dayValue) {
      case 1:
        return DayOfWeek.MONDAY;
      case 2:
        return DayOfWeek.THURSDAY;
      case 3:
        return DayOfWeek.WEDNESDAY;
      case 4:
        return DayOfWeek.TUESDAY;
      case 5:
        return DayOfWeek.FRIDAY;
      case 6:
        return DayOfWeek.SATUDAY;
      case 7:
        return DayOfWeek.SUNDAY;
      default:
        return DayOfWeek.NODAY;
    }

  }

  slotIsAvailable(slot: Slotime){
    return slot.status === SlotStatus.AVAILABLE
  }

}
