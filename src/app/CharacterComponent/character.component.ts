import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LRRH } from "../../../shared";

@Component({
  selector: "character-app",
  templateUrl: "character.component.html",
  styleUrls: ["character.component.css"]
})
export class CharacterComponent implements OnInit {
  characters = new Array();
  private title: string;
  private _characterHide = new Array();
  ngOnInit() {
    this.title = "Character";
    // this.characters = LRRH.map(v => v.id);
    LRRH.map(v => this.characters.push(v.id));
    console.log(this.characters);
  }

  @Output() characterHide = new EventEmitter<any>();
  private onSelect(event) {
    this._characterHide = event;
    console.log(
      "event when selected in CharacterComponent",
      this._characterHide
    );
    this.characterHide.emit(this._characterHide);
  }
}
