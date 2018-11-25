import { Component, ViewEncapsulation, OnInit, Input } from "@angular/core";

import * as d3 from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

import { LRRH } from "../../../shared";

@Component({
  selector: "line-chart",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./multi-series.component.html",
  styleUrls: ["./multi-series.component.css"]
})
export class MultiLineChartComponent implements OnInit {
  title = "Little Red Riding Hood";
  private _newColor: string;
  private _newCharacter: string;
  @Input()
  set hideCharacters(characters: any) {
    console.log("new value for hideCharacters in multi-series", characters);
    this.hideChars(characters);
  }
  // @Input() newColor: string;
  @Input()
  set newColor(color: string) {
    this._newColor = color;
    console.log("value for setted newColor", color);
  }
  @Input()
  set newCharacter(character: string) {
    this._newCharacter = character;
    console.log("value for setted newCharacter in multi-series", character);
    this.colorChange(this._newColor, this._newCharacter);
  }
  data: any;
  svg: any;
  margin = { top: 20, right: 80, bottom: 30, left: 50 };
  g: any;
  width: number;
  height: number;
  x;
  y;
  z;
  line;

  constructor() {}

  ngOnInit() {
    this.data = LRRH.map(v => v.values.map(v => v.date))[0];
    //.reduce((a, b) => a.concat(b), []);

    this.initChart();
    this.drawAxis();
    // this.colorChange();
    this.drawPath();
  }

  private colorChange(color, character): void {
    d3.select("#" + character).style("stroke", color);
  }
  private initChart(): void {
    this.svg = d3.select("#svgChart");

    this.width = this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height =
      this.svg.attr("height") - this.margin.top - this.margin.bottom;

    this.g = this.svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );

    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

    this.line = d3Shape
      .line()
      .curve(d3Shape.curveBasis)
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.pos));

    this.x.domain(d3Array.extent(this.data, (d: Date) => d));

    this.y.domain([
      d3Array.min(LRRH, function(c) {
        return d3Array.min(c.values, function(d) {
          return d.pos - 20;
        });
      }),
      d3Array.max(LRRH, function(c) {
        return d3Array.max(c.values, function(d) {
          return d.pos + 30;
        });
      })
    ]);

    this.z.domain(
      LRRH.map(function(c) {
        return c.id;
      })
    );
  }
  private hideChars(characters: any) {
    // d3.select("#" + "Grandma").style("stroke", "red");
    if (characters) {
      for (let char of characters) {
        console.log("character ", char);
        d3.select("#" + char).remove();
        d3.select("#" + char).style("font", "20px sans-serif");
        // d3.select("#" + char).style("font", "0px san-serif");
      }
    }
  }
  private drawAxis(): void {
    // this.g
    //   .append("g")
    //   .attr("class", "axis axis--x")
    //   .attr("transform", "translate(0," + this.height + ")")
    //   .call(d3Axis.axisBottom(this.x));
    // this.g
    //   .append("g")
    //   .attr("class", "axis axis--y")
    //   .call(d3Axis.axisLeft(this.y))
    //   .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 6)
    //   .attr("dy", "0.71em")
    //   .attr("fill", "#000");
    // // .text("Temperature, ºF");
  }
  // public removeLine(): void {
  //   d3.select("");
  // }
  // private colorChange(): void {
  //   d3.select("");
  // }

  private drawPath(): void {
    let city = this.g
      .selectAll(".city")
      .data(LRRH)
      .enter()
      .append("g")
      .attr("class", "city");

    city
      .append("path")
      .attr("class", "line")
      .attr("d", d => this.line(d.values))
      // .style("stroke", d => this.z(d.id));
      .style("stroke", "black")
      .attr("id", function(d) {
        return d.id;
      })
      .on("click", function(d) {
        console.log("clicked on path of id", d.id);
        d3.select("#" + d.id).style("stroke", "blue");
        d3.event.stopPropagation();
      });

    city
      .append("text")
      .datum(function(d) {
        return { id: d.id, value: d.values[d.values.length - 1] };
      })
      .attr(
        "transform",
        d =>
          "translate(" + this.x(d.value.date) + "," + this.y(d.value.pos) + ")"
      )
      .attr("x", 10)
      .attr("dy", "0.35em")
      .style("font", "13px sans-serif")
      .text(function(d) {
        return d.id;
      })
      .on("click", function(d) {
        console.log("clicked on city", d.id);
        d3.event.stopPropagation();
      });
  }
}
