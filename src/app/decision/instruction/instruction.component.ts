import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {
  title = 'Instruction';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goNext()
  {
    this.router.navigate(['pairedComparisonCriteria'])
  }

}
