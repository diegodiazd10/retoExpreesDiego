import { Component, OnInit } from '@angular/core';
import { BoardService } from "../../services/board.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {
  public taskData: any;
  public selectedFile: any;
  public errorMessage: String

  constructor(private boardService: BoardService, private router: Router) {
    this.taskData = {};
    this.errorMessage = '';
    this.selectedFile = null;
   }

  ngOnInit(): void {
  }

  saveTask() {
    if (!this.taskData.name || !this.taskData.description) {
      console.log("Failed process: Incomplete Data");
      this.errorMessage = "Failed process: Incomplete Data";
      this.closeAlert();
      
    } else {
      this.boardService.saveTask(this.taskData).subscribe(
        (res: any) => {
          console.log(res);
          //localStorage.setItem('token', res.jwtToken)
          this.taskData = {};
          this.router.navigate(['/listTasks'])
        }, 
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      )
    }
  }

  uploadImg(event: any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0]
  }

  saveTaskImg() {
    if(!this.taskData.name || !this.taskData.description){
      console.log("Process Failed: Incomplete Data");
      this.errorMessage = "Process Failed: Incomplete Data";
      this.closeAlert();      
    } else {
      const data = new FormData();
      data.append('image', this.selectedFile, this.selectedFile.name)
      data.append('name', this.taskData.name);
      data.append('description', this.taskData.description);
      this.boardService.saveTaskImg(data).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/listTasks']);
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      )
    }
  }
  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
  }
}
