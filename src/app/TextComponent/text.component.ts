import { Component } from "@angular/core";

@Component({
  selector: "text-component",
  templateUrl: "text.component.html",
  styleUrls: ["text.component.css"]
})
export class TextComponent {
  title = "Text";
  showTextBox: boolean = false;
  constructor() {}
  handleClick(event) {
    console.log("clicked", event.target);
    this.showTextBox = true;
  }
}
