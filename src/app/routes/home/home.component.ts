import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pwForm = new FormGroup({
    pw_length: new FormControl(13, [Validators.min(8)]),
    include_symbols: new FormControl(true),
    include_numbers: new FormControl(true),
    include_lowercase: new FormControl(true),
    include_uppercase: new FormControl(false),
    exclude_similar: new FormControl(true),
    exclude_ambiguous: new FormControl(true),
    pw_amount: new FormControl(1),
  });

  public generatedPw: string[] = [];

  public copied = false;
  public copiedIndex: number = -1;
  public copyAllText: string = 'Copy all';

  public symbols = ['@', '#', '$', '%', '-', '_', '=', '+'];
  public numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  public lowercase = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'j',
    'k',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  public uppercase = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  public similarCharacters = ['i', 'l', '1', 'L', 'o', '0', 'O'];
  public ambiguousCharacters = [
    '{',
    '}',
    '[',
    ']',
    '(',
    ')',
    '/',
    '~',
    ',',
    ';',
    ':',
    '.',
    '<',
    '>',
  ];

  constructor() {}

  ngOnInit(): void {}

  public generate() {
    this.generatedPw = [];
    for (let i = 0; i < this.pwForm.controls.pw_amount.value; i++) {
      this.createPassword();
    }
  }

  public createPassword() {
    let usableChars = [];

    this.pwForm.controls.include_symbols.value
      ? usableChars.push(...this.symbols)
      : '';
    this.pwForm.controls.include_numbers.value
      ? usableChars.push(...this.numbers)
      : '';
    this.pwForm.controls.include_lowercase.value
      ? usableChars.push(...this.lowercase)
      : '';
    this.pwForm.controls.include_uppercase.value
      ? usableChars.push(...this.uppercase)
      : '';
    this.pwForm.controls.exclude_similar.value
      ? ''
      : usableChars.push(...this.similarCharacters);
    this.pwForm.controls.exclude_ambiguous.value
      ? ''
      : usableChars.push(...this.ambiguousCharacters);

    for (let i = usableChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [usableChars[i], usableChars[j]] = [usableChars[j], usableChars[i]];
    }

    this.generatedPw.push(Array(this.pwForm.controls.pw_length.value).fill(usableChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join(''));
    
  }

  public copyMessage(val: string, copiedIndex: number){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.copiedIndex = copiedIndex;
    this.copied = true;

    timer(1500).subscribe(()=>{
      this.copied = false;
      this.copiedIndex = -1;
    });
  }

  public copyAll(){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.generatedPw.join(',');
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.copyAllText = 'Copied all!'

    timer(1500).subscribe(()=>{
      this.copyAllText = 'Copy all'
    });
  }
}
