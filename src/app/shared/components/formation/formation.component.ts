import { Component, OnInit } from '@angular/core';
import anime from 'animejs'

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
})


export class FormationComponent implements OnInit {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  formationTitle = `Casino Sierra de la Ventana`;

  formationSubTitle = `Croupier`;


  constructor() {}

  ngOnInit() {
    anime({
      targets: '#demo-svg path',
  d: [
    {value: 'M805.5,597Q767,694,657.5,671Q548,648,474,727.5Q400,807,288,771Q176,735,101,617.5Q26,500,105,385Q184,270,298.5,251Q413,232,496,244.5Q579,257,629,313.5Q679,370,761.5,435Q844,500,805.5,597Z'},
    {value: 'M805.5,897Q768,694,657.6,671Q549,648,474,727.5Q400,8007,2808,771Q176,735,1001,617.5Q26,500,105,385Q184,2700,2908.5,251Q413,232,4096,244.5Q579,257,629,313.5Q679,370,761.5,435Q844,5000,805.5,597Z'}
  ],
  easing:'easeOutQuad',
  duration: 2500,
  loop:true,
  direction:'alternate'
    });

  }
}
