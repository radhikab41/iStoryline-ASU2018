import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
/** @title Responsive sidenav */
@Component({
  selector: "nav-drawer",
  templateUrl: "navdrawer.component.html",
  styleUrls: ["navdrawer.component.css"]
})
export class NavDrawerComponent {
  showFiller = false;
  subTemplates = ["character", "text", "shapes", "story"];
  showText: boolean = false;
  colorChange: string = "";
  characterId: string = "";
  hero = "batman";
  @Input("newColor") newColor: string;
  @Input("newCharacter") newCharacter: string;
  @Input("hideCharacters") hideCharacters: any;
  showSubTemplate() {
    console.log("clicked");
    console.log(this.showText);
    this.showText = !this.showText;
  }

  onColorChange(colorChange: any) {
    console.log("inside parent component onColorChange", colorChange);
    this.colorChange = colorChange.color;
    this.characterId = colorChange.character;
    this.newColor = this.colorChange;
    this.newCharacter = this.characterId;
    console.log(
      "current color in parent for id",
      this.colorChange,
      this.characterId
    );
  }
  onCharacterHide(characters: any) {
    console.log("onCharacterHide navdrawer", characters);
    this.hideCharacters = characters;
  }
}
