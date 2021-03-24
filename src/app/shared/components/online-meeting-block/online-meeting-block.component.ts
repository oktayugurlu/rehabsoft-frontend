import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-online-meeting-block',
  templateUrl: 'online-meeting-block.component.html',
  styleUrls: [ './online-meeting-block.scss' ]
})
export class OnlineMeetingBlockComponent {
  @Input()
  onlineMeeting:any;

  constructor(private notificationService:NotificationService) {

  }
}

