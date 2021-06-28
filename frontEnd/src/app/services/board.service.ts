import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private env: String;

  constructor(private http: HttpClient) {
    this.env = environment.APP_URL;
   }

   saveTask(board: any) {
    return this.http.post(this.env + 'board/saveTask', board);
   }

   saveTaskImg(board: any) {
     return this.http.post(this.env + 'board/saveTaskImg', board)
   }

   listTask() {
     return this.http.get(this.env + 'board/listTask')
   }

   updateTask(board: any) { 
     return this.http.put(this.env + "board/updateTask", board)
   }

   deleteTask(board: any) {
     return this.http.delete<any>(this.env + "board/deleteTask/" + board._id)
   }
}
