export class ColorService {

  colors = {
    Blonde: "#edc917",
    Brune: "#7a4206",
    Ambrée: "#ffa500",
    Blanche: "#e3e8c7",
    Rouge: "#ef1952",
    Aromatisée: "#42f474"
  }
  private degree_color: string;

  getBeerColor(item) {
    const color = this.colors[item]? this.colors[item] : "#000000";
    const style ='color: ' + color;
    return style;
  }

  getDegreeColor(degree) {
    if (degree < 4) {
      this.degree_color = "#a3f76f";
    } else if (degree < 5.5){
      this.degree_color = "#f2da29";
    } else if (degree < 8) {
      this.degree_color = "#f49242";
    } else {
      this.degree_color = "#5e0909";
    }
    const style = 'background-color: ' + this.degree_color;
    return style;
  }

}
