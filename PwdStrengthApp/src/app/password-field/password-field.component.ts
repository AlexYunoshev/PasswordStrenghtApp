import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.css'
})
export class PasswordFieldComponent {
  passwordText: string = '';
  passwordStrengthColors: StrengthColor[] = [StrengthColorType.Gray, StrengthColorType.Gray, StrengthColorType.Gray];

  private getStrength(): PasswordStrength  {
    const passwordLength = this.passwordText.length;
    const isPasswordHasDigits = /\d/.test(this.passwordText);
    const isPasswordHasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.passwordText);
    const isPasswordHasLetters = /[a-zA-Z]/.test(this.passwordText);

    if (passwordLength == 0) {
      return PasswordStrengthType.None;
    }
    else if (passwordLength < 8) {
      return PasswordStrengthType.Danger;
    }
    else if (isPasswordHasDigits && isPasswordHasSymbols && isPasswordHasLetters) {
      return PasswordStrengthType.Strong;
    }
    else if (isPasswordHasLetters && isPasswordHasSymbols || isPasswordHasLetters && isPasswordHasDigits || isPasswordHasDigits && isPasswordHasSymbols) {
      return PasswordStrengthType.Medium;
    }
    else {
      return PasswordStrengthType.Easy;
    }
  }
  
  public updateStrengthColor() {
    switch(this.getStrength()) {
      case PasswordStrengthType.None:
        this.passwordStrengthColors[0] = this.passwordStrengthColors[1] = this.passwordStrengthColors[2] = StrengthColorType.Gray;
        break;
      case PasswordStrengthType.Danger:
        this.passwordStrengthColors[0] = this.passwordStrengthColors[1] = this.passwordStrengthColors[2] = StrengthColorType.Red;
        break;
      case PasswordStrengthType.Easy:
        this.passwordStrengthColors[0] = StrengthColorType.Red;
        this.passwordStrengthColors[1] = this.passwordStrengthColors[2] = StrengthColorType.Gray;
        break;
      case PasswordStrengthType.Medium:
        this.passwordStrengthColors[0] = this.passwordStrengthColors[1] = StrengthColorType.Yellow;
        this.passwordStrengthColors[2] = StrengthColorType.Gray;
        break;
      case PasswordStrengthType.Strong:
        this.passwordStrengthColors[0] = this.passwordStrengthColors[1] = this.passwordStrengthColors[2] = StrengthColorType.Green;
        break;
      default: 
        this.passwordStrengthColors[0] = this.passwordStrengthColors[1] = this.passwordStrengthColors[2] = StrengthColorType.Gray;
        break;
    }
  }
}

export type PasswordStrength = 'None' | 'Danger' | 'Easy' | 'Medium' | 'Strong';
export const PasswordStrengthType = {
  None: 'None' as PasswordStrength,
  Danger: 'Danger' as PasswordStrength,
  Easy: 'Easy' as PasswordStrength,
  Medium: 'Medium' as PasswordStrength,
  Strong: 'Strong' as PasswordStrength
}


export type StrengthColor = 'Gray' | 'Red' | 'Yellow' | 'Green';
export const StrengthColorType = {
  Gray: 'Gray' as StrengthColor,
  Red: 'Red' as StrengthColor,
  Yellow: 'Yellow' as StrengthColor,
  Green: 'Green' as StrengthColor
}